// Rule-based layer (no AI, free, instant, explainable).
// 1) scores every beat for "hook" (would stop a scroll) and "cliffhanger" (unresolved ending) signals,
// 2) proposes 20-60s windows that open on a hook and end on a cliffhanger,
// 3) validates any promo (from rules or from the LLM) against hard constraints.

import { fmt } from './parse.js';

const RX = (words) => new RegExp(`\\b(${words.join('|')})`, 'i');

// Physical / visual shock in ACTION, CAMERA or SFX text.
const ACTION_SHOCK = RX(['slap', 'strik', 'struck', 'punch', 'shov', 'grab', 'seiz', 'drag', 'throw', 'threw', 'hurl', 'smash', 'shatter',
  'collaps', 'faint', 'kneel', 'knelt', 'drops? to', 'kiss', 'blood', 'bleed', 'fire', 'flame', 'blaz', 'burn', 'knife', 'blade', 'sword',
  'dagger', 'pistol', 'gun', 'chain', 'shackle', 'explo', 'crash', 'whip', 'crop', 'choke', 'strangl', 'poison', 'rip', 'tear', 'noose',
  'gallows', 'red-hot', 'iron', 'brand', 'scream', 'gasp', 'kick', 'stab', 'wound', 'corpse', 'unconscious', 'arrest', 'pin', 'pinn', 'restrain',
  'reveal', 'unmask', 'crest', 'signet', 'ring', 'proposal', 'propos']);
// Shocking or high-stakes words in dialogue.
const LINE_SHOCK = RX(['marry', 'married', 'marrying', 'wedding', 'bride', 'husband', 'wife', 'divorce', 'pregnant', 'baby', 'dead', 'die', 'death', 'kill', 'murder',
  'poison', 'arsenic', 'witch', 'hang', 'execut', 'gallows', 'burn', 'betray', 'liar', 'lie', 'traitor', 'treason', 'thief', 'steal', 'stole', 'arrest',
  'guilty', 'duke', 'duchess', 'mistress', 'secret', 'truth', 'who are you', 'how dare', 'on your knees', 'disown', 'inherit', 'alive', 'blood',
  'nothing', 'worthless', 'never', 'beg', 'sister', 'mother', 'son', 'invalid', 'trial', 'confess', 'prove']);
const TONE_HOT = RX(['furious', 'shock', 'scream', 'outrag', 'venom', 'threat', 'menac', 'gloat', 'mock', 'desperat', 'horrif', 'cruel', 'sob',
  'defiant', 'enrag', 'livid', 'savage', 'icy', 'cold', 'lethal', 'murderous', 'contempt', 'disgust', 'triumph', 'sneer', 'roar', 'shout', 'yell',
  'gasp', 'stunned', 'accus', 'commanding', 'deadly', 'hiss', 'sadistic', 'vicious', 'piercing', 'broken', 'devastat', 'panic', 'terrif']);
const CLIFF_SFX = RX(['cliffhanger', 'sting', 'drone', 'swell', 'ominous', 'thud', 'boom', 'silence', 'heartbeat', 'crescendo', 'bang', 'explosion', 'slam', 'gasp']);
const THREAT = RX(['will', "you'll", 'or else', 'unless', 'before', 'until', 'never', 'hang', 'die', 'pay', 'regret', 'end you', 'tomorrow', 'dawn', 'choose']);
const DRAMA_TYPES = new Set(['DIALOGUE', 'ACTION', 'SFX']);

const clamp01 = (x) => Math.max(0, Math.min(1, x));

export function hookScore(b) {
  const t = b.text || '';
  let s = 0;
  const why = [];
  if (b.type === 'DIALOGUE') {
    s += 0.15;
    if (TONE_HOT.test(b.tone)) { s += 0.25; why.push(`tone:${b.tone}`); }
    if (/!/.test(t)) s += 0.12;
    if (/\?/.test(t)) s += 0.08;
    const words = t.split(/\s+/).length;
    if (words <= 9) s += 0.08; // punchy lines land in < 3s
    const hits = (t.match(new RegExp(LINE_SHOCK.source, 'gi')) || []).length;
    if (hits) { s += Math.min(0.4, 0.2 * hits); why.push('shock words'); }
  } else if (b.type === 'ACTION' || b.type === 'SFX' || b.type === 'CAMERA') {
    const hits = (t.match(new RegExp(ACTION_SHOCK.source, 'gi')) || []).length;
    if (hits) { s += Math.min(0.6, 0.25 * hits) * (b.type === 'CAMERA' ? 0.6 : 1); why.push('physical shock'); }
    if (b.type === 'SFX' && /slap|crack|explo|scream|crash|shatter|gunshot/i.test(t)) s += 0.25;
  }
  return { score: clamp01(s), why };
}

export function cliffScore(b, ep, idx) {
  const t = b.text || '';
  let s = 0;
  const why = [];
  const lastDrama = [...ep.beats].reverse().find((x) => DRAMA_TYPES.has(x.type));
  if (lastDrama && b.i === lastDrama.i) { s += 0.3; why.push('episode ending'); }
  const sceneEnd = ep.scenes.find((sc) => sc.id === b.scene)?.end;
  if (isFinite(sceneEnd) && sceneEnd - b.end < 2.5) { s += 0.12; why.push('scene ending'); }
  if (b.type === 'SFX' && CLIFF_SFX.test(t)) { s += 0.35; why.push('sting SFX'); }
  if (b.type === 'CAMERA' && /cut to black|freeze|smash cut/i.test(t)) { s += 0.25; why.push('cut to black'); }
  if (b.type === 'DIALOGUE') {
    if (/\?\s*$/.test(t)) { s += 0.25; why.push('open question'); }
    if (THREAT.test(t)) { s += 0.15; why.push('threat/stakes'); }
    if (/(\.\.\.|—|–|-)\s*$/.test(t)) { s += 0.15; why.push('interrupted line'); }
    if (LINE_SHOCK.test(t)) s += 0.12;
    if (TONE_HOT.test(b.tone)) s += 0.08;
  }
  if (b.type === 'ACTION' && ACTION_SHOCK.test(t)) { s += 0.2; why.push('action mid-air'); }
  // Look-ahead: a cut right before someone new enters / a door opens is a classic cliff.
  const next = ep.beats.slice(idx + 1, idx + 4).find((x) => DRAMA_TYPES.has(x.type));
  if (next && /enter|door|burst|appear|arriv|voice/i.test(next.text)) { s += 0.1; why.push('interruption next'); }
  return { score: clamp01(s), why };
}

/** Annotate beats of every episode with hook/cliff scores (mutates). */
export function scoreShow(show) {
  for (const ep of show) {
    ep.beats.forEach((b, idx) => {
      const h = hookScore(b), c = cliffScore(b, ep, idx);
      b.hook = +h.score.toFixed(3); b.hookWhy = h.why;
      b.cliff = +c.score.toFixed(3); b.cliffWhy = c.why;
    });
  }
  return show;
}

/** The time at which a cut is "clean": no dialogue line is still being spoken. */
export function cleanEnd(ep, t) {
  let end = t;
  for (const b of ep.beats) if (b.type === 'DIALOGUE' && b.start < end - 0.05 && b.end > end) end = b.end;
  return end;
}
export function cleanStart(ep, t) {
  let s = t;
  for (const b of ep.beats) if (b.type === 'DIALOGUE' && b.start < s && b.end > s + 0.05) s = b.start;
  return s;
}

/** Rule-only candidate promos for one episode (single continuous segment). */
export function heuristicCandidates(ep, { minDur = 20, maxDur = 60, perEpisode = 6 } = {}) {
  const drama = ep.beats.filter((b) => DRAMA_TYPES.has(b.type) || (b.type === 'CAMERA' && b.hook > 0.3));
  const hooks = drama.filter((b) => b.hook >= 0.45);
  const ends = ep.beats.filter((b) => b.cliff >= 0.3);
  const cands = [];
  for (const h of hooks) {
    const s = cleanStart(ep, Math.max(0, h.start - 0.4));
    let best = null;
    for (const e of ends) {
      const t = cleanEnd(ep, e.end + 0.2);
      const d = t - s;
      if (d < minDur || d > maxDur) continue;
      const inside = drama.filter((b) => b.start >= s && b.end <= t);
      const density = inside.reduce((a, b) => a + b.hook, 0) / Math.max(1, d / 5);
      const durPref = 1 - Math.abs(d - 38) / 40; // sweet spot ~30-45s
      const score = 0.38 * h.hook + 0.38 * e.cliff + 0.14 * clamp01(density) + 0.1 * durPref;
      if (!best || score > best.score) best = { e, t, d, score };
    }
    if (best) {
      cands.push({
        source: 'rules',
        episode: ep.episode,
        segments: [{ episode: ep.episode, start: +s.toFixed(2), end: +best.t.toFixed(2), fromBeat: h.i, toBeat: best.e.i }],
        duration: +best.d.toFixed(2),
        hook: describe(h),
        cliffhanger: describe(best.e),
        ruleScore: +best.score.toFixed(3),
        ruleWhy: [...h.hookWhy, ...best.e.cliffWhy],
      });
    }
  }
  // Non-max suppression: keep the best window among heavily-overlapping ones.
  cands.sort((a, b) => b.ruleScore - a.ruleScore);
  const kept = [];
  for (const c of cands) {
    const [a] = c.segments;
    if (kept.some((k) => overlap(a, k.segments[0]) > 0.5)) continue;
    kept.push(c);
    if (kept.length >= perEpisode) break;
  }
  return kept;
}

export function overlap(a, b) {
  if (a.episode !== b.episode) return 0;
  const inter = Math.max(0, Math.min(a.end, b.end) - Math.max(a.start, b.start));
  return inter / Math.min(a.end - a.start, b.end - b.start);
}

export function describe(b) {
  if (!b) return '';
  if (b.type === 'DIALOGUE') return `${b.speaker}: "${b.text}"`;
  return `[${b.type}] ${b.text}`;
}

/** Beats inside a promo, in order (for transcripts, the critic and the UI). */
export function promoBeats(promo, byEp) {
  const out = [];
  for (const seg of promo.segments) {
    const ep = byEp.get(seg.episode);
    if (!ep) continue;
    for (const b of ep.beats) if (b.start >= seg.start - 0.01 && b.start < seg.end) out.push(b);
  }
  return out;
}

export function transcript(promo, byEp, { camera = false } = {}) {
  const lines = [];
  promo.segments.forEach((seg, k) => {
    if (promo.segments.length > 1) lines.push(`--- segment ${k + 1}: Ep ${seg.episode} ${fmt(seg.start)}–${fmt(seg.end)} ---`);
    const ep = byEp.get(seg.episode);
    for (const b of ep?.beats || []) {
      if (b.start < seg.start - 0.01 || b.start >= seg.end) continue;
      if (b.type === 'CAMERA' && !camera) continue;
      const rel = (b.start - seg.start).toFixed(1).padStart(4);
      lines.push(`+${rel}s ${b.type === 'DIALOGUE' ? `${b.speaker}${b.tone ? ` (${b.tone})` : ''}: "${b.text}"` : `[${b.type}] ${b.text}`}`);
    }
  });
  return lines.join('\n');
}

/**
 * Hard checks. Never trust model timestamps: every segment is re-derived from beat numbers,
 * snapped to clean cut points and measured here.
 */
export function validate(promo, byEp, { minDur = 20, maxDur = 60 } = {}) {
  const checks = [];
  let total = 0;
  for (const seg of promo.segments) {
    const ep = byEp.get(seg.episode);
    if (!ep) { checks.push({ id: 'episode', ok: false, msg: `episode ${seg.episode} not found` }); continue; }
    if (!(seg.end > seg.start)) checks.push({ id: 'order', ok: false, msg: `segment end before start (Ep ${seg.episode})` });
    if (seg.start < -0.01 || seg.end > ep.duration + 0.5) checks.push({ id: 'bounds', ok: false, msg: `segment outside episode ${seg.episode} (0–${fmt(ep.duration)})` });
    const straddle = ep.beats.find((b) => b.type === 'DIALOGUE' && b.start < seg.end - 0.05 && b.end > seg.end + 0.05);
    if (straddle) checks.push({ id: 'clean_cut', ok: false, msg: `cuts mid-line at ${fmt(seg.end)}: "${straddle.text.slice(0, 40)}"` });
    const straddleS = ep.beats.find((b) => b.type === 'DIALOGUE' && b.start < seg.start - 0.05 && b.end > seg.start + 0.05);
    if (straddleS) checks.push({ id: 'clean_in', ok: false, msg: `starts mid-line at ${fmt(seg.start)}` });
    total += Math.max(0, seg.end - seg.start);
  }
  checks.push({ id: 'duration', ok: total >= minDur - 0.5 && total <= maxDur + 0.5, msg: `${total.toFixed(1)}s (target ${minDur}–${maxDur}s)` });
  // Hook must land in the first 3 seconds: something audible/visible and strong.
  const first = promo.segments[0];
  const ep0 = byEp.get(first?.episode);
  if (ep0) {
    const early = ep0.beats.filter((b) => b.start >= first.start - 0.01 && b.start <= first.start + 3 && b.type !== 'CAMERA');
    const best = Math.max(0, ...early.map((b) => b.hook ?? 0));
    checks.push({ id: 'hook_3s', ok: early.length > 0, msg: early.length ? `${early.length} beat(s) land in the first 3s` : 'nothing is said or done in the first 3s (silent camera move)' });
    checks.push({ id: 'hook_signal', soft: true, ok: best >= 0.3, msg: `keyword hook signal in 0–3s: ${best.toFixed(2)}` });
  }
  const last = promo.segments[promo.segments.length - 1];
  const epL = byEp.get(last?.episode);
  if (epL) {
    const tail = epL.beats.filter((b) => b.end <= last.end + 0.3 && b.end >= last.end - 4 && b.type !== 'CAMERA');
    const best = Math.max(0, ...tail.map((b) => b.cliff ?? 0));
    checks.push({ id: 'cliff_signal', soft: true, ok: best >= 0.25, msg: `keyword cliffhanger signal in last 4s: ${best.toFixed(2)}` });
  }
  for (let k = 1; k < promo.segments.length; k++) {
    const a = promo.segments[k - 1], b = promo.segments[k];
    if (a.episode === b.episode && b.start < a.end && b.end > a.start) checks.push({ id: 'overlap', ok: false, msg: 'segments overlap' });
  }
  // Hard checks decide pass/fail; soft checks are keyword signals shown to the reviewer as warnings.
  return { duration: +total.toFixed(2), checks, pass: checks.every((c) => c.ok || c.soft), warnings: checks.filter((c) => !c.ok && c.soft).length };
}

/** Fraction of the shorter promo's runtime that is shared with the other (works for multi-segment). */
export function promoOverlap(p, q) {
  let inter = 0;
  for (const a of p.segments) for (const b of q.segments) if (a.episode === b.episode) inter += Math.max(0, Math.min(a.end, b.end) - Math.max(a.start, b.start));
  const len = (x) => x.segments.reduce((s, g) => s + g.end - g.start, 0);
  return inter / Math.max(1, Math.min(len(p), len(q)));
}
