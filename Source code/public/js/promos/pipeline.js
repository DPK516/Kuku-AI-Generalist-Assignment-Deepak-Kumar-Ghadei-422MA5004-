// End-to-end promo finder. Same code runs in the CLI (Node) and the web app (browser).
//   parse (code) -> score beats + rule candidates (code) -> AI judge per episode (LLM, optional)
//   -> cross-episode montages (LLM) -> materialize + validate (code) -> blind critic (LLM)
//   -> rank + diversify (code) -> exports (JSON / CSV / Markdown / EDL)

import { parseShow, fmt } from './parse.js';
import { scoreShow, heuristicCandidates, validate, overlap, promoOverlap, transcript } from './heuristics.js';
import { judgeEpisode, judgeMontages, critique, materialize, PROMPT_VERSION } from './judge.js';

const mergeUsage = (...ls) => {
  const u = { calls: 0, inputTokens: 0, outputTokens: 0, ms: 0, byModel: {} };
  for (const l of new Set(ls.filter(Boolean))) {
    u.calls += l.usage.calls; u.inputTokens += l.usage.inputTokens; u.outputTokens += l.usage.outputTokens; u.ms += l.usage.ms;
    for (const [m, v] of Object.entries(l.usage.byModel)) {
      const t = (u.byModel[m] ||= { calls: 0, inputTokens: 0, outputTokens: 0 });
      t.calls += v.calls; t.inputTokens += v.inputTokens; t.outputTokens += v.outputTokens;
    }
  }
  return u;
};

const pool = async (items, n, fn) => {
  const out = new Array(items.length);
  let k = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (k < items.length) { const i = k++; out[i] = await fn(items[i], i); }
  }));
  return out;
};

export async function findPromos(files, opts = {}) {
  const {
    llm = null, // null => rules-only mode (no API key needed)
    strongLlm = null, // optional stronger model for the few high-leverage calls (montage + critic)
    perEpisode = 3,
    montages = 5,
    concurrency = 4,
    critic = true,
    onProgress = () => {},
    episodes = null, // optional [from, to] range
  } = opts;
  const t0 = Date.now();
  const strong = strongLlm || llm;
  let show = parseShow(files);
  if (episodes) show = show.filter((e) => e.episode >= episodes[0] && e.episode <= episodes[1]);
  if (!show.length) throw new Error('No screenplay episodes found. Expecting Kuku-format .txt files with timestamped beats.');
  scoreShow(show);
  const byEp = new Map(show.map((e) => [e.episode, e]));
  onProgress({ stage: 'parsed', episodes: show.length, beats: show.reduce((a, e) => a + e.beats.length, 0) });

  // 1) Rule candidates (always computed; they are the fallback and a prior for the model).
  const ruleCands = new Map(show.map((ep) => [ep.episode, heuristicCandidates(ep)]));

  let promos = [];
  const errors = [];
  if (!llm) {
    for (const [, cands] of ruleCands) {
      for (const c of cands.slice(0, perEpisode)) {
        promos.push({
          ...c,
          title: `Ep ${c.episode} @ ${fmt(c.segments[0].start)}`,
          why: `Rules: ${[...new Set(c.ruleWhy)].join(', ') || 'keyword density'}`,
          scores: { hook: +(c.ruleScore * 10).toFixed(1), cliffhanger: +(c.ruleScore * 10).toFixed(1), standalone: 5, emotion: 5 },
          trope: 'n/a (rules mode)', spoiler: 'unknown', risk: 'Keyword heuristic: cannot judge context or if it makes sense on its own.',
        });
      }
    }
  } else {
    // 2) AI judge per episode.
    let done = 0;
    // Graceful degradation: the rule candidates stand in when the model fails or returns nothing usable.
    const fallback = (ep, why) => ruleCands.get(ep.episode).slice(0, 2).map((c) => ({ ...c, title: `Ep ${c.episode} (rules fallback)`, why: `${why}; rule-based pick`, scores: { hook: 5, cliffhanger: 5, standalone: 4, emotion: 5 }, segments: c.segments.map((s) => ({ ...s, from: s.fromBeat, to: s.toBeat })) }));
    const perEp = await pool(show, concurrency, async (ep) => {
      let out;
      try {
        out = (await judgeEpisode(llm, show, ep, ruleCands.get(ep.episode), { perEpisode })).map((p) => materialize(p, byEp)).filter(Boolean);
        if (!out.length) {
          errors.push({ stage: 'judge', episode: ep.episode, error: 'model returned no usable promos (empty or unparseable list)' });
          out = fallback(ep, 'Model returned no usable promos').map((p) => materialize(p, byEp)).filter(Boolean);
        }
        onProgress({ stage: 'judge', done: ++done, total: show.length, episode: ep.episode });
      } catch (e) {
        errors.push({ stage: 'judge', episode: ep.episode, error: String(e.message || e) });
        onProgress({ stage: 'judge', done: ++done, total: show.length, episode: ep.episode, error: true });
        out = fallback(ep, 'Model call failed').map((p) => materialize(p, byEp)).filter(Boolean);
      }
      return out;
    });
    promos = perEp.flat();
  }

  // 3) Validate + score.
  const score = (p) => {
    const s = p.scores || {};
    const n = (x) => Math.max(0, Math.min(10, +x || 0)) / 10;
    let v = 0.3 * n(s.hook) + 0.3 * n(s.cliffhanger) + 0.25 * n(s.standalone) + 0.15 * n(s.emotion);
    const firstEp = p.segments[0].episode;
    // Funnel fit (assumption): a viewer who clicks lands on the show from Ep 1; early-episode promos
    // match what they will watch first and sit before the paywall, so they convert better.
    const funnel = firstEp <= 5 ? 0.06 : firstEp <= 12 ? 0.04 : firstEp <= 25 ? 0.015 : 0;
    const spoil = p.spoiler === 'high' ? -0.08 : p.spoiler === 'medium' ? -0.03 : 0;
    const v2 = -0.06 * p.validation.checks.filter((c) => !c.ok && !c.soft).length - 0.015 * p.validation.warnings;
    const stitch = p.segments.length > 1 && !p.montage ? -0.02 : 0; // the brief: usually one continuous stretch
    const agree = p.montage || p.source === 'rules' ? 0 : (ruleCands.get(firstEp) || []).some((c) => overlap(c.segments[0], p.segments[0]) > 0.5) ? 0.02 : 0;
    p.scoreParts = { quality: +v.toFixed(3), funnel, spoiler: spoil, validation: +v2.toFixed(3), ruleAgreement: agree };
    p.scoreParts.stitchPenalty = stitch;
    return +(v + funnel + spoil + v2 + agree + stitch).toFixed(4);
  };
  for (const p of promos) { p.validation = validate(p, byEp); p.score = score(p); }

  // De-duplicate near-identical picks (keep higher score).
  promos.sort((a, b) => b.score - a.score);
  const uniq = [];
  for (const p of promos) {
    if (uniq.some((u) => promoOverlap(u, p) > 0.6)) { p.duplicateOf = uniq.find((u) => promoOverlap(u, p) > 0.6).title; continue; }
    uniq.push(p);
  }
  promos = uniq;

  // 4) Cross-episode montages.
  if (llm && montages > 0) {
    onProgress({ stage: 'montage' });
    try {
      const singles = promos.filter((p) => p.validation.pass);
      const ms = await judgeMontages(strong, show, byEp, singles, { count: montages });
      for (const m of ms.map((p) => materialize(p, byEp)).filter(Boolean)) {
        m.validation = validate(m, byEp); m.score = score(m); promos.push(m);
      }
    } catch (e) { errors.push({ stage: 'montage', error: String(e.message || e) }); }
  }

  promos.sort((a, b) => b.score - a.score);
  promos.forEach((p, i) => { p.id = `P${String(i + 1).padStart(3, '0')}`; });

  // 5) Blind critic on EVERY promo (it must see all of them, or reviewed and unreviewed scores are not comparable).
  if (llm && critic) {
    onProgress({ stage: 'critic' });
    const B = 8;
    const review = async (batch) => {
      try {
        const reviews = await critique(strong, byEp, batch);
        for (const r of reviews) {
          const p = batch.find((x) => x.id === r.id || x.id === `P${String(r.id).replace(/\D/g, '').padStart(3, '0')}`);
          if (p) p.critic = { ...r, stop: +r.stop, clear: +r.clear, need_next: +r.need_next };
        }
      } catch (e) { errors.push({ stage: 'critic', error: String(e.message || e) }); }
    };
    for (let i = 0; i < promos.length; i += B) {
      await review(promos.slice(i, i + B));
      onProgress({ stage: 'critic', done: Math.min(promos.length, i + B), total: promos.length });
    }
    // One retry for anything the model skipped, so coverage gaps are rare and visible.
    const missing = promos.filter((p) => !p.critic);
    for (let i = 0; i < missing.length; i += B) await review(missing.slice(i, i + B));
    const still = promos.filter((p) => !p.critic).length;
    if (still) errors.push({ stage: 'critic', error: `${still} promos left without a critic review after retry` });
    const cn = (c) => (c.stop + c.clear + c.need_next) / 30;
    const reviewed = promos.filter((p) => p.critic);
    const mean = reviewed.length ? reviewed.reduce((a, p) => a + cn(p.critic), 0) / reviewed.length : 0.5;
    for (const p of promos) {
      p.scoreParts.judgeScore = p.score; // pre-critic score, kept so ranking can be recomputed offline (--rerank)
      if (!p.critic) { p.scoreParts.critic = +mean.toFixed(3); p.scoreParts.criticImputed = true; }
      else p.scoreParts.critic = +cn(p.critic).toFixed(3);
      p.score = +(0.6 * p.score + 0.4 * p.scoreParts.critic).toFixed(4);
    }
  }
  const order = finalize(promos);

  return {
    meta: {
      tool: 'kuku-promo-finder',
      promptVersion: PROMPT_VERSION,
      mode: llm ? 'ai+rules' : 'rules-only',
      model: llm ? llm.model : null,
      provider: llm ? llm.provider : null,
      episodes: show.length,
      runtimeSec: +((Date.now() - t0) / 1000).toFixed(1),
      strongModel: strongLlm ? strongLlm.model : null,
      usage: llm ? mergeUsage(llm, strongLlm) : null,
      errors,
      generatedAt: new Date().toISOString(),
    },
    promos,
    postingOrder: order.map((p) => p.id),
    episodes: show.map((e) => ({ episode: e.episode, duration: e.duration, logline: e.logline, ruleCandidates: ruleCands.get(e.episode).length })),
    _byEp: byEp,
  };
}

/**
 * Flags + posting order (pure code over saved model outputs, so it can be re-run without API calls).
 * The critic's one-word verdict proved noisy between runs (mostly "maybe" in one run, "skip" for 103/112
 * in the next), so only its numeric scores gate posting: a clip is held back if a cold viewer scores
 * it <= 3 for stopping power or clarity.
 */
export function finalize(promos) {
  // The judge is inflated across the board, so "disagreement" is measured on ranks, not raw gaps:
  // top quarter by the judge but bottom quarter by the critic.
  const q = (arr, f) => { const s = arr.map(f).sort((a, b) => a - b); return [s[Math.floor(s.length * 0.25)], s[Math.floor(s.length * 0.75)]]; };
  const reviewed = promos.filter((p) => p.critic && p.scoreParts);
  const [, judgeTop] = reviewed.length ? q(reviewed, (p) => p.scoreParts.judgeScore ?? p.scoreParts.quality) : [0, Infinity];
  const [criticLow] = reviewed.length ? q(reviewed, (p) => p.scoreParts.critic) : [-Infinity];
  for (const p of promos) {
    p.flags = [];
    if (!p.critic) continue;
    const c = p.critic;
    if (c.stop <= 3) p.flags.push('weak opening for a cold viewer');
    if (c.clear <= 3) p.flags.push('confusing without context');
    if ((p.scoreParts?.judgeScore ?? p.scoreParts?.quality) >= judgeTop && p.scoreParts?.critic <= criticLow) p.flags.push('judge and critic disagree');
  }
  promos.sort((a, b) => b.score - a.score);
  // Posting order: greedy diversification so the first week is not five versions of one scene.
  const order = [];
  const eligible = promos.filter((p) => p.validation.pass && !(p.critic && (p.critic.stop <= 3 || p.critic.clear <= 3)));
  while (order.length < Math.min(10, eligible.length)) {
    let best = null, bestV = -Infinity;
    for (const p of eligible) {
      if (order.includes(p)) continue;
      let pen = 0;
      for (const q of order) {
        if (q.trope && p.trope && q.trope.toLowerCase() === p.trope.toLowerCase()) pen += 0.05;
        if (Math.abs(q.segments[0].episode - p.segments[0].episode) <= 1) pen += 0.04;
        if (promoOverlap(p, q) > 0.3) pen += 0.2; // same moment re-cut
      }
      const v = p.score - pen;
      if (v > bestV) { bestV = v; best = p; }
    }
    order.push(best);
  }
  promos.forEach((p) => { delete p.postRank; });
  order.forEach((p, i) => { p.postRank = i + 1; });
  promos.forEach((p, i) => { p.rank = i + 1; });
  return order;
}

/** Re-rank a saved result (e.g. after changing flag rules or weights) without calling any model. */
export function rerank(result) {
  for (const p of result.promos) {
    if (p.scoreParts?.judgeScore == null && p.scoreParts) {
      // Older files: rebuild the pre-critic score from its parts.
      const s = p.scoreParts;
      s.judgeScore = +((s.quality || 0) + (s.funnel || 0) + (s.spoiler || 0) + (s.validation || 0) + (s.ruleAgreement || 0) + (s.stitchPenalty || 0)).toFixed(4);
    }
    if (p.critic) p.scoreParts.critic = +((p.critic.stop + p.critic.clear + p.critic.need_next) / 30).toFixed(3);
    if (p.scoreParts?.judgeScore != null && p.scoreParts.critic != null) p.score = +(0.6 * p.scoreParts.judgeScore + 0.4 * p.scoreParts.critic).toFixed(4);
  }
  const order = finalize(result.promos);
  result.postingOrder = order.map((p) => p.id);
  result.meta.reranked = new Date().toISOString();
  return result;
}

// ---------- exports ----------
const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export function toCSV(result) {
  const head = ['rank', 'post_order', 'id', 'title', 'episodes', 'segments', 'duration_s', 'hook', 'cliffhanger', 'why', 'hook_score', 'cliff_score', 'standalone', 'emotion', 'trope', 'spoiler', 'critic_verdict', 'flags', 'checks_failed', 'score'];
  const rows = result.promos.map((p) => [
    p.rank, p.postRank || '', p.id, p.title,
    [...new Set(p.segments.map((s) => s.episode))].join('+'),
    p.segments.map((s) => `Ep${s.episode} ${fmt(s.start)}-${fmt(s.end)}`).join(' | '),
    p.validation.duration, p.hook, p.cliffhanger, p.why,
    p.scores?.hook, p.scores?.cliffhanger, p.scores?.standalone, p.scores?.emotion, p.trope, p.spoiler,
    p.critic?.verdict || '', (p.flags || []).join('; '), p.validation.checks.filter((c) => !c.ok).map((c) => (c.soft ? 'warn:' : '') + c.id).join(';'), p.score,
  ]);
  return [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
}

export function toMarkdown(result, { top = 25 } = {}) {
  const byEp = result._byEp;
  const L = [];
  const m = result.meta;
  L.push(`# Promo picks — ${m.episodes} episodes`, '', `Mode: **${m.mode}**${m.model ? ` · model \`${m.model}\` (${m.provider})` : ''} · prompt ${m.promptVersion} · ${m.runtimeSec}s · generated ${m.generatedAt}`);
  if (m.usage) L.push(`LLM usage: ${m.usage.calls} calls, ${m.usage.inputTokens} input + ${m.usage.outputTokens} output tokens`);
  if (m.errors.length) L.push(`Errors: ${m.errors.length} (see JSON)`);
  L.push('', '## Post these first', '');
  for (const id of result.postingOrder) {
    const p = result.promos.find((x) => x.id === id);
    L.push(`${p.postRank}. **${p.id} — ${p.title}** (${p.validation.duration}s, ${p.segments.map((s) => `Ep ${s.episode} ${fmt(s.start)}–${fmt(s.end)}`).join(' + ')}) — ${p.why}`);
  }
  L.push('', `## All promos (top ${Math.min(top, result.promos.length)} of ${result.promos.length}, ranked)`, '');
  for (const p of result.promos.slice(0, top)) {
    L.push(`### ${p.rank}. ${p.id} — ${p.title}${p.montage ? ' (montage)' : ''}`, '');
    L.push('| # | Episode | Start | End | Length |', '|---|---|---|---|---|');
    p.segments.forEach((s, k) => L.push(`| ${k + 1} | ${s.episode} | ${fmt(s.start)} | ${fmt(s.end)} | ${(s.end - s.start).toFixed(1)}s |`));
    L.push('', `- **Hook:** ${p.hook}`, `- **Cliffhanger:** ${p.cliffhanger}`, `- **Why it works:** ${p.why}`);
    if (p.scores) L.push(`- **Scores:** hook ${p.scores.hook} · cliff ${p.scores.cliffhanger} · standalone ${p.scores.standalone} · emotion ${p.scores.emotion} · trope *${p.trope}* · spoiler ${p.spoiler} · final ${p.score}`);
    if (p.critic) L.push(`- **Blind critic:** stop ${p.critic.stop} · clear ${p.critic.clear} · need-next ${p.critic.need_next} → ${p.critic.verdict}${p.critic.confusing ? ` (“${p.critic.confusing}”)` : ''}`);
    if (p.risk) L.push(`- **Risk:** ${p.risk}`);
    const bad = p.validation.checks.filter((c) => !c.ok);
    L.push(`- **Checks:** ${bad.length ? bad.map((c) => `${c.soft ? '⚠️' : '❌'} ${c.id}: ${c.msg}`).join('; ') : '✅ all passed'}${p.repairs?.length ? ` · repairs: ${p.repairs.join('; ')}` : ''}${p.flags?.length ? ` · flags: ${p.flags.join(', ')}` : ''}`);
    const tx = p.transcript || (byEp ? transcript(p, byEp) : '');
    if (tx) L.push('', '```', tx, '```');
    L.push('');
  }
  return L.join('\n');
}

/** CMX3600 EDL so an editor can drop the picks straight onto a Premiere/Resolve timeline. */
export function toEDL(result, { fps = 30, ids = null } = {}) {
  const tc = (sec) => {
    const f = Math.round(sec * fps);
    const ff = f % fps, s = Math.floor(f / fps) % 60, mi = Math.floor(f / fps / 60) % 60, h = Math.floor(f / fps / 3600);
    return [h, mi, s, ff].map((x) => String(x).padStart(2, '0')).join(':');
  };
  const L = ['TITLE: KUKU PROMO PICKS', 'FCM: NON-DROP FRAME', ''];
  let rec = 3600, n = 1;
  for (const p of result.promos.filter((x) => !ids || ids.includes(x.id))) {
    for (const s of p.segments) {
      const d = s.end - s.start;
      L.push(`${String(n++).padStart(3, '0')}  EP${String(s.episode).padStart(3, '0')}    V     C        ${tc(s.start)} ${tc(s.end)} ${tc(rec)} ${tc(rec + d)}`);
      L.push(`* FROM CLIP NAME: EPISODE ${s.episode}`, `* COMMENT: ${p.id} ${p.title}`.slice(0, 120));
      rec += d;
    }
    rec += 2; // 2s gap between promos
  }
  return L.join('\n');
}

export function toJSON(result) {
  const { _byEp, ...rest } = result;
  // Self-contained: each promo carries its transcript so the file can be reviewed without the scripts.
  if (_byEp) rest.promos = rest.promos.map((p) => ({ ...p, transcript: p.transcript || transcript(p, _byEp) }));
  return JSON.stringify(rest, null, 2);
}
