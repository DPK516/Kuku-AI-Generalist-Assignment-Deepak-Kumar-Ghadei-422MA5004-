// Continuity Guard — pre-render continuity check for AI microdrama scripts.
// User: the story / continuity editor who signs off a batch of episode scripts before they go to
// AI video + voice generation. Output: a ranked list of continuity issues, each with episode +
// timestamp evidence, plus a canonical "story bible" (who is who, aliases, places, key objects)
// that the generation pipeline can use to keep faces, voices and names stable.
//
// Rules (code) find naming drift deterministically; the LLM extracts facts and reconciles;
// code verifies every piece of LLM evidence against the real script before showing it.

import { parseShow, fmt, condense } from '../promos/parse.js';

export const PROMPT_VERSION = 'continuity-v3';

const TITLE_WORDS = new Set(['LADY', 'LORD', 'THE', 'SIR', 'DUKE', 'DUCHESS', 'DOWAGER', 'YOUNG', 'OLD', 'MR', 'MRS', 'MISS', 'DR', 'FATHER', 'MOTHER', 'MASTER', 'KING', 'QUEEN', 'PRINCE', 'PRINCESS', 'CAPTAIN', 'O.S.', 'V.O.']);
const DESCRIPTOR = /\b(MAN|WOMAN|GIRL|BOY|GOWN|STRANGER|FORMER|MYSTERIOUS|BEARDED|BLOND|BALD|SCARRED|TALL|MATRIARCH|NOBLEMAN|NOBLEWOMAN|ELDER|THUG|GUARD|MAID|VOICE|OFFICIAL|INFORMANT|VILLAGER|SCOUT|FIGHTER|PRIEST|JUDGE|CONSTABLE|HOUSEKEEPER|DRIVER|TOWNSMAN|MOTHER'S|ARISTOCRATIC|PEASANT|ROYAL|GROOM|BRIDE)\b/;
// Unnamed / role-only speaker labels: descriptors, possessives (ALEXANDER'S MOTHER) or bare titles (LORD).
export const isDescriptor = (L) => DESCRIPTOR.test(L) || /'S\b/.test(L) || L.split(/\s+/).every((w) => TITLE_WORDS.has(w));
const STOP = new Set(('The A An And But Or If When While After Before Then Now Here There This That These Those It Its He She They We You I My Your Our Their His Her Him Them Me Us Who What Why How Where Which ' +
  'Yes No Not Never Always Please Thank Sir Madam Lady Lord Duke Duchess Mother Father Brother Sister God Oh Ah Come Go Look Stop Wait Enough Let Do Did Does Is Are Was Were Be Been Have Has Had Will Would Shall Should Can Could May Might Must ' +
  'INT EXT DAY NIGHT CONTINUOUS CUT CLOSE MEDIUM WIDE SHOT CAMERA ACTION SCENE Close Medium Wide Shot Insert Low High Over Pan Push Tracking Extreme Full Profile Two Slow Quick Back Front Side Episode Every Nothing Everything Someone Something Anyone All None One Two Three ' +
  'Dowager Crown Royal Council Constable Judge Priest High Captain Guard Guards Maid Majesty Grace Ladyship Lordship Highness Mister Miss Mrs Mr Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April June July August September October November December ' +
  'Once Just Only Even Still Yet So Because Since Though Although Until Unless Whether With Without Within From Into Onto Upon About Above Below Under Between Among Through During Against Toward Towards Across Behind Beyond Beside Besides Despite Except Inside Outside Around Along').split(/\s+/));

const lev = (a, b) => {
  const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
};

/** Rule pass 1: speaker labels that probably refer to the same person, and descriptor labels. */
export function speakerVariants(show) {
  const labels = new Map(); // label -> {count, eps:Set, first:beat}
  for (const ep of show) for (const b of ep.beats) {
    if (b.type !== 'DIALOGUE') continue;
    const L = b.speaker.toUpperCase().replace(/\s+/g, ' ').trim();
    const e = labels.get(L) || { label: L, count: 0, eps: new Set(), first: b };
    e.count++; e.eps.add(ep.episode); labels.set(L, e);
  }
  const all = [...labels.values()];
  const core = (L) => L.split(/\s+/).filter((w) => !TITLE_WORDS.has(w) && !DESCRIPTOR.test(w)).join(' ');
  const groups = new Map();
  for (const e of all) {
    const k = core(e.label);
    if (!k || k.split(' ').length > 2) continue;
    const key = k.split(' ').pop(); // surname or single name
    (groups.get(key) || groups.set(key, []).get(key)).push(e);
  }
  const issues = [];
  const FEM = /\b(LADY|DUCHESS|MRS|MISS|QUEEN|PRINCESS|MOTHER|WOMAN|NOBLEWOMAN)\b/, MASC = /\b(LORD|DUKE|MR|KING|PRINCE|FATHER|MAN|NOBLEMAN|SIR)\b/;
  const role = (L) => L.split(/\s+/).filter((w) => DESCRIPTOR.test(w)).join(' ');
  for (const [key, g] of groups) {
    if (g.length < 2) continue;
    // LADY X vs LORD X are a couple, not one person; SCOUT vs FIGHTER are different people.
    if (g.some((x) => FEM.test(x.label)) && g.some((x) => MASC.test(x.label))) continue;
    const roles = new Set(g.map((x) => role(x.label)).filter(Boolean));
    if (roles.size >= 2) continue;
    issues.push({
      source: 'rules', type: 'speaker_label_drift', severity: 'high',
      title: `One character, ${g.length} speaker labels: ${g.map((x) => x.label).join(' / ')}`,
      detail: `Dialogue for what looks like the same person ("${key}") is labelled ${g.length} different ways. In an AI pipeline the speaker label usually picks the voice and the face reference, so this is how a character's voice or face changes between episodes.`,
      fix: `Pick one canonical label (e.g. "${g.sort((a, b) => b.count - a.count)[0].label}") and map the others to it in the story bible.`,
      evidence: g.map((x) => ({ ep: x.first.ep, beat: x.first.id, time: fmt(x.first.start), quote: `${x.label}: "${x.first.text.slice(0, 70)}"`, note: `${x.count} lines in Ep ${[...x.eps].sort((a, b) => a - b).slice(0, 8).join(', ')}${x.eps.size > 8 ? '…' : ''}`, verified: true })),
    });
  }
  const descriptors = all.filter((e) => isDescriptor(e.label) && e.count >= 3 && e.eps.size >= 1)
    .sort((a, b) => b.count - a.count)
    .map((e) => ({ label: e.label, lines: e.count, episodes: [...e.eps].sort((a, b) => a - b) }));
  return { issues, descriptors, labels: all.map((e) => ({ label: e.label, lines: e.count, episodes: [...e.eps].sort((a, b) => a - b) })) };
}

/** Rule pass 2: proper nouns that are spelled / named almost the same (Ashbury vs Ashburn …). */
export function nameVariants(show) {
  const occ = new Map(); // word -> [{ep, beat}]
  const mid = new Map(); // word -> times capitalised mid-sentence (evidence it is a proper noun)
  const lower = new Set(); // words that also appear in lowercase are ordinary English words
  const add = (w, ep, b) => { const l = occ.get(w) || occ.set(w, []).get(w); if (!l.some((o) => o.b.id === b.id)) l.push({ ep, b }); };
  for (const ep of show) for (const b of ep.beats) for (const m of (b.text || '').matchAll(/\b([a-z]{4,})\b/g)) lower.add(m[1]);
  const proper = (w) => !STOP.has(w) && !lower.has(w.toLowerCase());
  for (const ep of show) {
    for (const b of ep.beats) {
      if (b.type === 'CAMERA') continue;
      for (const m of (b.text || '').matchAll(/\b([A-Z][a-z]{3,})(?:'s)?\b/g)) {
        if (!proper(m[1])) continue;
        add(m[1], ep.episode, b);
        const before = (b.text || '').slice(0, m.index).trimEnd();
        if (before && !/[.!?:"“—-]$/.test(before)) mid.set(m[1], (mid.get(m[1]) || 0) + 1);
      }
    }
    for (const m of (ep.logline || '').matchAll(/\b([A-Z][a-z]{3,})(?:'s)?\b/g)) if (proper(m[1])) add(m[1], ep.episode, { id: `E${ep.episode}.logline`, start: 0, text: ep.logline, ep: ep.episode });
  }
  // A proper noun must show up capitalised mid-sentence at least once, or appear 3+ times.
  const words = [...occ.keys()].filter((w) => w.length >= 5 && ((mid.get(w) || 0) >= 1 || occ.get(w).length >= 3));
  const issues = [];
  const used = new Set();
  for (let i = 0; i < words.length; i++) {
    if (used.has(words[i])) continue;
    const cluster = [words[i]];
    for (let j = i + 1; j < words.length; j++) {
      const a = words[i], b = words[j];
      if (used.has(b)) continue;
      if (a.slice(0, 4) !== b.slice(0, 4)) continue;
      if (b.startsWith(a) && /^(s|es|ed|ing|ly|er|ers|ness)$/.test(b.slice(a.length))) continue; // morphology
      if (a.startsWith(b) && /^(s|es|ed|ing|ly|er|ers|ness)$/.test(a.slice(b.length))) continue;
      if (lev(a.toLowerCase(), b.toLowerCase()) <= Math.max(3, Math.floor(Math.max(a.length, b.length) / 3))) cluster.push(b);
    }
    if (cluster.length < 2) continue;
    // Ignore clusters of ordinary English words (lowercase versions common in the script).
    cluster.forEach((w) => used.add(w));
    issues.push({
      source: 'rules', type: 'name_drift', severity: 'high',
      title: `Name spelled ${cluster.length} ways: ${cluster.join(' / ')}`,
      detail: `These look like one proper name written differently across episodes. Voice generation will pronounce each spelling differently and subtitles will disagree. (Check: if they really are different people or places, mark it "not an issue".)`,
      fix: `Choose one spelling (most used: "${cluster.sort((x, y) => occ.get(y).length - occ.get(x).length)[0]}") and replace the rest.`,
      evidence: cluster.flatMap((w) => occ.get(w).slice(0, 2).map(({ ep, b }) => ({ ep, beat: b.id, time: fmt(b.start), quote: (b.text || '').slice(Math.max(0, (b.text || '').indexOf(w) - 40), (b.text || '').indexOf(w) + w.length + 40), note: `"${w}" × ${occ.get(w).length} (Ep ${[...new Set(occ.get(w).map((o) => o.ep))].slice(0, 6).join(', ')})`, verified: true }))),
    });
  }
  return issues;
}

/** Rule pass 3: "<owner>'s <object>" phrases — candidate prop-name drift for the LLM to judge. */
export function possessives(show) {
  const map = new Map();
  for (const ep of show) for (const b of ep.beats) {
    if (b.type === 'CAMERA') continue;
    for (const m of (b.text || '').matchAll(/\b(mother's|father's|husband's|wife's|sister's|son's|grandmother's|family's)\s+((?:[a-z-]+\s){0,2}[a-z-]+)/gi)) {
      const owner = m[1].toLowerCase(), obj = m[2].toLowerCase().replace(/\b(and|to|with|in|on|at|of|for|was|is|as|that)\b.*$/, '').trim();
      if (!obj) continue;
      const k = `${owner} ${obj}`;
      const e = map.get(k) || { owner, object: obj, count: 0, eps: new Set(), first: b };
      e.count++; e.eps.add(ep.episode); map.set(k, e);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count).map((e) => ({ owner: e.owner, object: e.object, count: e.count, episodes: [...e.eps].sort((a, b) => a - b), first: e.first.id }));
}

// ---------- LLM passes ----------
const EXTRACT = `You are a script continuity supervisor for an AI-generated vertical drama. You read episodes and record FACTS that must stay consistent:
characters (canonical name, every alias / title / speaker label used, role, relationships, physical traits, age, status changes like injured / imprisoned / married / dead, what they know),
places (every name or spelling used), key objects / props (every name used for the same object), and timeline facts (how long ago, ages, counts).
Each line of the script is "#beat start-end content" and belongs to the episode in its header. Cite evidence as {"ep": N, "beat": "#123", "quote": "exact short quote from that line"}.
Only record what the script says. No interpretation, no invented facts.`;

export async function extractFacts(llm, show, eps) {
  const text = eps.map((ep) => `===== EPISODE ${ep.episode} — ${ep.logline}\n${condense(ep)}`).join('\n\n');
  const user = `${text}

Return JSON: {"characters":[{"name":"","aliases":[""],"role":"","facts":[{"fact":"","ep":N,"beat":"#","quote":""}]}],
"places":[{"name":"","variants":[""],"facts":[{"fact":"","ep":N,"beat":"#","quote":""}]}],
"objects":[{"name":"","variants":[""],"facts":[{"fact":"","ep":N,"beat":"#","quote":""}]}],
"timeline":[{"fact":"","ep":N,"beat":"#","quote":""}]}`;
  const { data } = await llm.chatJSON(EXTRACT, user, { maxTokens: 8192, temperature: 0.1 });
  return data;
}

/**
 * Who is "LADY IN GOLD GOWN"? Small, scoped questions: one call per group of descriptor labels,
 * showing only the episodes where they speak. (One giant reconcile call got these wrong.)
 */
export async function resolveDescriptors(llm, show, descriptors, labels) {
  const named = labels.filter((l) => !isDescriptor(l.label) && l.lines >= 3).map((l) => `${l.label} (${l.lines} lines, first Ep ${l.episodes[0]})`);
  const groups = new Map();
  for (const d of descriptors) { const k = d.episodes[0]; (groups.get(k) || groups.set(k, []).get(k)).push(d); }
  const out = [];
  for (const [first, ds] of groups) {
    const eps = show.filter((e) => e.episode >= first && e.episode <= first + 1);
    const later = show.filter((e) => e.episode > first + 1 && e.episode <= first + 6).map((e) => `Ep ${e.episode}: ${e.logline}`).join('\n');
    const user = `Named speaker labels used elsewhere in the series: ${named.join('; ')}

${eps.map((e) => `===== EPISODE ${e.episode} — ${e.logline}\n${condense(e)}`).join('\n\n')}

Later loglines (context):\n${later}

For each of these UNNAMED speaker labels, say which named character it is, using the dialogue (who calls them what, who they are married/related to) and the loglines:
${ds.map((d) => `- ${d.label} (${d.lines} lines, Ep ${d.episodes.join(', ')})`).join('\n')}
Return JSON: {"resolutions":[{"label":"","is":"<one of the named speaker labels above, or NEW if they never get a name>","confidence":"high|medium|low","evidence":{"ep":N,"beat":"#","quote":"exact short quote that proves it"},"reason":"one line"}]}`;
    try {
      const { data } = await llm.chatJSON('You are a precise script continuity supervisor. Only conclude what the script supports.', user, { maxTokens: 2048, temperature: 0 });
      out.push(...(data.resolutions || []));
    } catch (e) { out.push(...ds.map((d) => ({ label: d.label, is: 'ERROR', error: String(e.message || e) }))); }
  }
  return out;
}

/** Which "<owner>'s <object>" phrases are one physical prop (the mother's book, the ring …)? */
export async function resolveProps(llm, props) {
  const list = props.filter((p) => p.count >= 1).slice(0, 50).map((p) => `${p.owner} ${p.object} — ${p.count}× in Ep ${p.episodes.slice(0, 6).join(', ')} (first ${p.first})`).join('\n');
  const user = `Possessive object phrases found in a 50-episode script (owner's object — count, episodes, first beat id):
${list}

Group the phrases that refer to the SAME physical prop but use DIFFERENT names (e.g. a book called a ledger in one episode and a journal in another).
Only group them if they clearly are the same object in the story. Ignore objects that only ever have one name.
Return JSON: {"props":[{"canonical":"best single name","variants":["owner object", "..."],"why":"one line","confidence":"high|medium|low"}]}`;
  const { data } = await llm.chatJSON('You are a precise props-continuity supervisor for a TV series.', user, { maxTokens: 2048, temperature: 0 });
  return data.props || [];
}

/** Story-logic pass on a compact fact ledger: contradictions only (names are handled by code). */
export async function reconcile(llm, show, ledgers) {
  const sys = `You are the lead continuity editor of ONE series. You get fact ledgers extracted from consecutive batches of episodes.
Find only these continuity issues:
- fact_conflict: contradicting facts (age, relationship, who owns what, physical trait, who knows a secret, how someone died / was injured)
- timeline: impossible order or status (someone imprisoned/dead/absent appears free; "three days" vs "a week")
- logic: a plot hole a viewer would call out
Do NOT report spelling or naming differences (another tool handles those).
Be strict and specific: report at most 8 issues, only where two quoted lines genuinely contradict each other. Every issue needs >= 2 evidence items quoting the script exactly, from different beats.
Severity: high = viewers would clearly notice; medium = attentive viewers notice; low = minor.`;
  const facts = ledgers.map((l) => ({ episodes: l.episodes, characters: (l.characters || []).map((c) => ({ name: c.name, facts: c.facts })), timeline: l.timeline, objects: (l.objects || []).map((o) => ({ name: o.name, facts: o.facts })) }));
  const user = `LEDGERS:\n${JSON.stringify(facts).slice(0, 120000)}

Return JSON: {"issues":[{"type":"fact_conflict|timeline|logic","severity":"high|medium|low","title":"","detail":"what contradicts what, and why a viewer would notice","evidence":[{"ep":N,"beat":"#","quote":""}],"fix":"concrete edit","pipeline_impact":"story"}]}`;
  const { data } = await llm.chatJSON(sys, user, { maxTokens: 6144, temperature: 0.1 });
  return data;
}

const toks = (s) => (s || '').toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
/** Verify LLM evidence: the beat must exist and contain (most of) the quoted words. */
export function verifyEvidence(ev, byEp) {
  const ep = byEp.get(+ev.ep);
  if (!ep) return { ...ev, verified: false, why: 'no such episode' };
  const q = toks(ev.quote);
  const n = parseInt(String(ev.beat || '').replace(/\D/g, ''), 10);
  const match = (b) => { const t = new Set(toks(b.text + ' ' + (b.speaker || ''))); return q.length ? q.filter((w) => t.has(w)).length / q.length : 0; };
  let best = null, score = 0;
  const cand = isFinite(n) ? ep.beats.filter((b) => Math.abs(b.i - n) <= 3) : [];
  for (const b of cand) { const s = match(b); if (s > score) { score = s; best = b; } }
  if (score < 0.6) for (const b of ep.beats) { const s = match(b); if (s > score) { score = s; best = b; } }
  if (score < 0.6 && q.length) { const s = q.filter((w) => toks(ep.logline).includes(w)).length / q.length; if (s >= 0.6) return { ...ev, beat: `E${ep.episode}.logline`, time: '00:00.00', verified: true, why: 'found in logline' }; }
  return best && score >= 0.6 ? { ...ev, beat: best.id, time: fmt(best.start), verified: true, matchScore: +score.toFixed(2) } : { ...ev, verified: false, why: 'quote not found in script', matchScore: +score.toFixed(2) };
}

export async function runContinuity(files, { llm = null, batchSize = 10, onProgress = () => {} } = {}) {
  const t0 = Date.now();
  const show = parseShow(files);
  if (!show.length) throw new Error('No screenplay episodes found.');
  const byEp = new Map(show.map((e) => [e.episode, e]));
  const sv = speakerVariants(show);
  const nv = nameVariants(show);
  const props = possessives(show);
  onProgress({ stage: 'rules', ruleIssues: sv.issues.length + nv.length });
  let issues = [...sv.issues, ...nv];
  let resolutions = [], propGroups = [];
  const errors = [];
  const beatById = new Map(show.flatMap((e) => e.beats.map((b) => [b.id, b])));
  const labelInfo = new Map(sv.labels.map((l) => [l.label, l]));
  // Union-find over speaker labels: rule groups first, then verified AI resolutions.
  const parent = new Map(sv.labels.map((l) => [l.label, l.label]));
  const find = (x) => { while (parent.get(x) !== x) x = parent.get(x); return x; };
  const union = (a, b) => { if (parent.has(a) && parent.has(b)) parent.set(find(a), find(b)); };
  for (const it of sv.issues) { const ls = it.title.split(': ')[1].split(' / '); ls.slice(1).forEach((l) => union(l, ls[0])); }

  if (llm) {
    // A) Who are the unnamed speaker labels?
    onProgress({ stage: 'labels' });
    try {
      resolutions = await resolveDescriptors(llm, show, sv.descriptors, sv.labels);
      // Deterministic sanity check: two labels that both speak in the same scene are two people.
      const scenesOf = new Map();
      for (const ep of show) for (const b of ep.beats) if (b.type === 'DIALOGUE') {
        const L = b.speaker.toUpperCase().replace(/\s+/g, ' ').trim();
        (scenesOf.get(L) || scenesOf.set(L, new Set()).get(L)).add(`${ep.episode}:${b.scene}`);
      }
      const members = (x) => sv.labels.map((l) => l.label).filter((l) => find(l) === find(x));
      const clash = (a, b) => {
        for (const x of members(a)) for (const y of members(b)) for (const s of scenesOf.get(x) || []) if ((scenesOf.get(y) || new Set()).has(s)) return `${x} and ${y} both speak in Ep ${s.split(':')[0]} scene ${s.split(':')[1]}`;
        return null;
      };
      for (const r of resolutions) {
        if (!r.is || /^(NEW|ERROR|UNKNOWN)$/i.test(r.is) || r.confidence === 'low' || !labelInfo.has(String(r.is).toUpperCase())) continue;
        r.evidence = r.evidence ? verifyEvidence(r.evidence, byEp) : null;
        if (!r.evidence?.verified) { r.rejected = 'evidence not found in script'; continue; }
        const c = clash(r.label, String(r.is).toUpperCase());
        if (c) { r.rejected = `impossible: ${c}`; continue; }
        union(r.label, String(r.is).toUpperCase());
        r.accepted = true;
      }
    } catch (e) { errors.push({ stage: 'labels', error: String(e.message || e) }); }

    // B) Props with several names.
    onProgress({ stage: 'props' });
    try {
      propGroups = await resolveProps(llm, props);
      for (const g of propGroups) {
        const rows = (g.variants || []).map((v) => props.find((p) => `${p.owner} ${p.object}` === String(v).toLowerCase().trim())).filter(Boolean);
        if (rows.length < 2 || g.confidence === 'low') continue;
        issues.push({
          source: 'ai+rules', type: 'prop_drift', severity: 'medium', pipeline_impact: 'face',
          title: `One prop, ${rows.length} names: ${rows.map((r) => `${r.owner} ${r.object}`).join(' / ')}`,
          detail: `${g.why || 'These phrases appear to describe the same object.'} An image/video model given different nouns will draw different objects, so the prop changes shape between episodes.`,
          fix: `Use one name ("${g.canonical}") in action lines and one reference image for it.`,
          evidence: rows.map((r) => { const b = beatById.get(r.first); return { ep: b?.ep, beat: r.first, time: b ? fmt(b.start) : '', quote: (b?.text || '').slice(0, 110), note: `"${r.owner} ${r.object}" × ${r.count} (Ep ${r.episodes.slice(0, 6).join(', ')})`, verified: !!b }; }),
        });
      }
    } catch (e) { errors.push({ stage: 'props', error: String(e.message || e) }); }

    // C) Story-logic contradictions from a fact ledger.
    const batches = [];
    for (let i = 0; i < show.length; i += batchSize) batches.push(show.slice(i, i + batchSize));
    const ledgers = [];
    for (const [k, b] of batches.entries()) {
      try {
        ledgers.push({ episodes: `${b[0].episode}-${b[b.length - 1].episode}`, ...(await extractFacts(llm, show, b)) });
      } catch (e) { errors.push({ stage: 'extract', batch: k, error: String(e.message || e) }); }
      onProgress({ stage: 'extract', done: k + 1, total: batches.length });
    }
    onProgress({ stage: 'reconcile' });
    try {
      const r = await reconcile(llm, show, ledgers);
      for (const it of r.issues || []) {
        if (!['fact_conflict', 'timeline', 'logic'].includes(it.type)) continue;
        const evidence = (it.evidence || []).map((ev) => verifyEvidence(ev, byEp));
        const okBeats = new Set(evidence.filter((e) => e.verified).map((e) => e.beat));
        issues.push({ source: 'ai', ...it, evidence, verifiedEvidence: okBeats.size, unverified: okBeats.size < 2 });
      }
    } catch (e) { errors.push({ stage: 'reconcile', error: String(e.message || e) }); }

    // Rebuild speaker-label issues from the merged clusters (rules + verified resolutions).
    const clusters = new Map();
    for (const l of sv.labels) { const root = find(l.label); (clusters.get(root) || clusters.set(root, []).get(root)).push(l); }
    issues = issues.filter((i) => i.type !== 'speaker_label_drift');
    for (const [, g] of clusters) {
      if (g.length < 2) continue;
      g.sort((a, b) => b.lines - a.lines);
      const res = resolutions.filter((r) => r.accepted && g.some((x) => x.label === r.label));
      issues.push({
        source: res.length ? 'ai+rules' : 'rules', type: 'speaker_label_drift', severity: 'high', pipeline_impact: 'voice',
        title: `One character, ${g.length} speaker labels: ${g.map((x) => x.label).join(' / ')}`,
        detail: `All of these labels speak as the same person. In an AI pipeline the speaker label usually picks the voice and the face reference, so unless they are mapped together the character's voice or face changes between episodes.${res.length ? ' Unnamed labels were matched by the AI and confirmed by a quote found in the script.' : ''}`,
        fix: `Map every label to "${g[0].label}" in the story bible (or rename them in the scripts).`,
        evidence: g.map((x) => {
          const r = res.find((y) => y.label === x.label);
          if (r?.evidence) return { ...r.evidence, note: `${x.label}: ${x.lines} lines, Ep ${x.episodes.slice(0, 6).join(', ')} — ${r.reason || ''}` };
          const b = show.find((e) => e.episode === x.episodes[0])?.beats.find((y) => y.type === 'DIALOGUE' && y.speaker.toUpperCase() === x.label);
          return { ep: x.episodes[0], beat: b?.id, time: b ? fmt(b.start) : '', quote: b ? `${x.label}: "${b.text.slice(0, 70)}"` : x.label, note: `${x.lines} lines in Ep ${x.episodes.slice(0, 8).join(', ')}`, verified: !!b };
        }),
      });
    }
  }
  const sevRank = { high: 0, medium: 1, low: 2 };
  issues.sort((a, b) => (a.unverified ? 1 : 0) - (b.unverified ? 1 : 0) || (sevRank[a.severity] ?? 3) - (sevRank[b.severity] ?? 3) || (a.source === 'rules' ? -1 : 1));

  // Story bible, built by code from verified clusters (not free-form model output).
  const clusters = new Map();
  for (const l of sv.labels) { const root = find(l.label); (clusters.get(root) || clusters.set(root, []).get(root)).push(l); }
  const bible = {
    characters: [...clusters.values()].filter((g) => g.reduce((a, x) => a + x.lines, 0) >= 3).map((g) => {
      g.sort((a, b) => b.lines - a.lines);
      return { canonical: g[0].label, speaker_labels: g.map((x) => x.label), lines: g.reduce((a, x) => a + x.lines, 0), episodes: [...new Set(g.flatMap((x) => x.episodes))].sort((a, b) => a - b).length };
    }).sort((a, b) => b.lines - a.lines),
    places: nv.map((i) => ({ canonical: (i.fix.match(/"([^"]+)"/) || [])[1], variants: i.title.split(': ')[1].split(' / ') })),
    objects: propGroups.filter((g) => g.confidence !== 'low').map((g) => ({ canonical: g.canonical, variants: g.variants })),
    unresolvedLabels: resolutions.filter((r) => !r.accepted).map((r) => ({ label: r.label, guess: r.is, confidence: r.confidence, why: r.rejected || r.reason || '' })),
  };
  issues.forEach((it, i) => { it.id = `C${String(i + 1).padStart(3, '0')}`; });
  return {
    meta: { tool: 'continuity-guard', promptVersion: PROMPT_VERSION, mode: llm ? 'ai+rules' : 'rules-only', model: llm?.model || null, episodes: show.length, runtimeSec: +((Date.now() - t0) / 1000).toFixed(1), usage: llm?.usage || null, errors, generatedAt: new Date().toISOString() },
    issues,
    bible,
    labelResolutions: resolutions,
    inventory: { speakerLabels: sv.labels, descriptorLabels: sv.descriptors, possessiveObjects: props.slice(0, 60) },
  };
}

export function toMarkdown(r) {
  const L = [`# Continuity report — ${r.meta.episodes} episodes`, '', `Mode: **${r.meta.mode}**${r.meta.model ? ` · \`${r.meta.model}\`` : ''} · prompt ${r.meta.promptVersion} · ${r.meta.runtimeSec}s · ${r.meta.generatedAt}`];
  if (r.meta.usage) L.push(`LLM usage: ${r.meta.usage.calls} calls, ${r.meta.usage.inputTokens} in / ${r.meta.usage.outputTokens} out tokens`);
  const c = (s) => r.issues.filter((i) => i.severity === s && !i.unverified).length;
  L.push('', `**${r.issues.length} issues** (high ${c('high')}, medium ${c('medium')}, low ${c('low')}; ${r.issues.filter((i) => i.unverified).length} with unverifiable evidence, listed last)`, '');
  for (const it of r.issues) {
    L.push(`## ${it.id} · [${it.severity}] ${it.title}`, `_${it.type} · found by ${it.source}${it.pipeline_impact ? ` · impact: ${it.pipeline_impact}` : ''}${it.unverified ? ' · ⚠ evidence could not be verified' : ''}_`, '', it.detail || '', '', `**Fix:** ${it.fix || '—'}`, '', '| Ep | Beat | Time | Evidence | ✓ |', '|---|---|---|---|---|');
    for (const e of it.evidence || []) L.push(`| ${e.ep} | ${e.beat} | ${e.time || ''} | ${String(e.quote || '').replace(/\|/g, '/')}${e.note ? ` (${e.note})` : ''} | ${e.verified ? '✓' : '✗'} |`);
    L.push('');
  }
  if (r.bible) {
    L.push('## Story bible (built by code from verified clusters)', '', '| Canonical speaker label | All labels for this character | Lines | Episodes |', '|---|---|---|---|');
    for (const ch of r.bible.characters || []) if ((ch.speaker_labels || []).length > 1 || ch.lines >= 15) L.push(`| ${ch.canonical} | ${(ch.speaker_labels || []).join(', ')} | ${ch.lines ?? ''} | ${ch.episodes ?? ''} |`);
    L.push('', '| Place (canonical) | Variants found |', '|---|---|', ...(r.bible.places || []).map((p) => `| ${p.canonical} | ${(p.variants || []).join(', ')} |`));
    L.push('', '| Object (canonical) | Variants found |', '|---|---|', ...(r.bible.objects || []).map((p) => `| ${p.canonical} | ${(p.variants || []).join(', ')} |`));
    if (r.bible.unresolvedLabels?.length) L.push('', '**Unnamed labels not merged** (low confidence, no verified quote, or a new character):', ...r.bible.unresolvedLabels.map((u) => `- ${u.label} → ${u.guess} (${u.confidence || '-'}) ${u.why}`));
  }
  return L.join('\n');
}
