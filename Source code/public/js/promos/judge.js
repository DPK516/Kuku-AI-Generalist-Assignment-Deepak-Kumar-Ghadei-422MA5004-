// AI layer. The model reads, judges and explains, but it never writes timestamps.
// It answers in beat numbers (#123) that only exist in our parsed script; code turns them
// into times, snaps them to clean cuts and validates them. That makes timestamps hallucination-proof.

import { condense, fmt } from './parse.js';
import { cleanEnd, cleanStart, describe, transcript } from './heuristics.js';

/** The promo list, whatever key the model used ({promos:[...]}, {results:[...]}, a bare array, or a single promo). */
const listOf = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.promos)) return data.promos;
  const arr = Object.values(data || {}).find((v) => Array.isArray(v) && v.some((x) => x && x.segments));
  if (arr) return arr;
  return data?.segments ? [data] : [];
};

export const PROMPT_VERSION = 'promo-v6';

const PROMO_BRIEF = `You are a senior performance-marketing editor for vertical microdrama apps (think ReelShort / DramaBox ads on TikTok, Reels, YouTube Shorts).
A PROMO is a 20-60 second clip cut from the show itself (no new footage, no text overlays, no music edits) that makes a stranger stop scrolling and install the app.
A great promo:
1. HOOK in the first 3 seconds: a slap, a shocking line, a reveal, a humiliation, a threat — something that is instantly legible with zero context.
2. CLIFFHANGER at the cut: stop at an unresolved moment (a question hangs, a threat is made, someone bursts in, a secret is about to come out). Never cut after the resolution.
3. STANDS ALONE: a viewer who never saw the show understands who is wronged, who is the villain and what is at stake. Unexplained names, earlier-episode references and slow setup hurt.
4. EMOTION: big, primal tropes perform best — public humiliation, betrayal, hidden identity/secret billionaire, revenge, unfair accusation, protective love interest.
Default to ONE continuous stretch (cheapest to cut, no jump cuts). Join 2-3 moments only when that is clearly stronger, e.g. cold-open on the most shocking line and then play the build-up; say so in "why".`;

const CALIBRATE = `Score honestly and spread your scores: 5-6 = an ordinary promo, 8 = clearly strong, 9-10 = only the very best moment of the whole show. Most promos should NOT get 9-10.`;

const SCHEMA = `${CALIBRATE}
Return JSON exactly like:
{"promos":[{"title":"short internal name","segments":[{"from":<beat #>,"to":<beat #>}],"hook":"what happens in the first 3s (quote the line/action)","cliffhanger":"the unresolved moment we cut on (quote it)","why":"ONE line on why this works on a cold audience","scores":{"hook":1-10,"cliffhanger":1-10,"standalone":1-10,"emotion":1-10},"trope":"2-4 word trope label","spoiler":"low|medium|high","risk":"biggest weakness of this promo, honestly"}]}`;

/** Short premise built from loglines only — cheap context so the model can judge "makes sense on its own". */
export function premise(show) {
  return show.slice(0, 3).map((e) => `Ep ${e.episode}: ${e.logline}`).join('\n');
}

export async function judgeEpisode(llm, show, ep, ruleCands, { perEpisode = 3 } = {}) {
  const prev = show.find((e) => e.episode === ep.episode - 1);
  const cands = ruleCands.map((c, k) => {
    const s = c.segments[0];
    return `R${k + 1}: #${s.fromBeat}-#${s.toBeat} (${fmt(s.start)}-${fmt(s.end)}, ${c.duration.toFixed(0)}s) rule-score ${c.ruleScore}`;
  }).join('\n') || '(none)';
  const user = `SERIES PREMISE (from the first episodes):
${premise(show)}
${prev ? `\nPREVIOUS EPISODE (${prev.episode}): ${prev.logline}` : ''}

EPISODE ${ep.episode} — logline: ${ep.logline}
Episode length ${fmt(ep.duration)}. Each line is "#beat start-end content". Camera-only beats are hidden but beat numbers are global.
${condense(ep)}

Rule-based candidate windows (a cheap keyword heuristic; use, fix or ignore them):
${cands}

TASK: Find the ${perEpisode} best promos in this episode (fewer if the episode has fewer genuinely strong moments; quality over quantity). At least the first one must be a single continuous segment. Different promos should use different moments, not re-cuts of the same lines.
Rules: segments use beat numbers from this episode only; total length must be 20-60s (check the timestamps); the first beat of the first segment must BE the hook (start right on it, no slow lead-in); end right on the cliffhanger beat (do not include the answer/resolution).
${SCHEMA}`;
  const { data, model } = await llm.chatJSON(PROMO_BRIEF, user, { maxTokens: 4096, temperature: 0.4 });
  return listOf(data).map((p) => ({ ...p, model, episode: ep.episode, segments: (p.segments || []).map((s) => ({ ...s, episode: s.episode ?? ep.episode })) }));
}

/** Cross-episode montage pass: combine strong moments from different episodes. */
export async function judgeMontages(llm, show, byEp, singles, { count = 5 } = {}) {
  const bank = singles.slice(0, 24).map((p, k) => `M${k + 1} | Ep ${p.segments[0].episode} beats #${p.segments[0].fromBeat}-#${p.segments[p.segments.length - 1].toBeat} | ${p.title} | hook: ${p.hook}\n${transcript(p, byEp)}`).join('\n\n');
  const user = `SERIES PREMISE:\n${premise(show)}\n\nMOMENT BANK (best single-episode promos, with beat numbers and relative timings):\n${bank}

TASK: Propose ${count} MULTI-SEGMENT promos that join 2-3 moments, ideally from DIFFERENT episodes, into one 20-60s promo that is stronger than any single clip
(e.g. cold-open on the most shocking line from a later episode, then the set-up; or stack two humiliations then cut on the comeback threat).
Every segment must be {"episode":N,"from":#,"to":#} with beats taken from inside ONE moment above. Keep each segment >= 4s. Order segments the way they would play.
LENGTH BUDGET: add up the segment lengths using the +Xs relative timings shown — the TOTAL must be 25-55 seconds. Pick tight sub-ranges, not whole moments.
Watch for spoilers: do not reveal the biggest late-series twists in a top-of-funnel ad.
${SCHEMA}`;
  const { data, model } = await llm.chatJSON(PROMO_BRIEF, user, { maxTokens: 4096, temperature: 0.5 });
  return listOf(data).map((p) => ({ ...p, model, montage: true }));
}

/**
 * Blind critic: sees ONLY the clip transcript (no title, no show context) — like a stranger scrolling.
 * Disagreement with the judge is a quality flag for the human reviewer.
 */
export async function critique(llm, byEp, promos) {
  const items = promos.map((p) => `ID ${p.id}\n${transcript(p, byEp, { camera: true })}`).join('\n\n====\n\n');
  const sys = `You are a random 24-year-old in the US scrolling TikTok. You have NEVER heard of this show. You will read scripts of short ads (timestamps relative to the start of the ad). Be blunt and critical; most ads are mediocre.`;
  const user = `${items}

For EACH ad, answer as that viewer. Return JSON: {"reviews":[{"id":"...","stop":1-10 (would the first 3 seconds stop your scroll?),"clear":1-10 (do you understand who is who and what is at stake?),"need_next":1-10 (how badly do you need to know what happens next?),"confusing":"what confused you, or empty","verdict":"post|maybe|skip"}]}`;
  const { data } = await llm.chatJSON(sys, user, { maxTokens: 4096, temperature: 0.2 });
  // Models sometimes rename the key or return a bare array; accept any array of reviews.
  const list = Array.isArray(data) ? data : data.reviews || Object.values(data).find(Array.isArray) || [];
  return list.filter((r) => r && r.id != null && isFinite(+r.stop));
}

/** Turn beat-number segments into times; snap to clean cuts; repair length. Returns null if unusable. */
export function materialize(p, byEp, { minDur = 20, maxDur = 60 } = {}) {
  const segs = [];
  const notes = [];
  for (const s of p.segments || []) {
    const ep = byEp.get(+s.episode);
    if (!ep) { notes.push(`dropped segment: unknown episode ${s.episode}`); continue; }
    let from = +String(s.from ?? s.fromBeat).replace('#', ''), to = +String(s.to ?? s.toBeat).replace('#', '');
    if (!isFinite(from) || !isFinite(to)) { notes.push('dropped segment: bad beat numbers'); continue; }
    if (from > to) [from, to] = [to, from];
    from = Math.max(0, Math.min(from, ep.beats.length - 1)); to = Math.max(0, Math.min(to, ep.beats.length - 1));
    // The model often points "from" at a camera beat just before the hook; start on the first non-camera beat.
    let fb = ep.beats[from];
    while (fb && fb.type === 'CAMERA' && fb.i < to) fb = ep.beats[fb.i + 1];
    const tb = ep.beats[to];
    const start = cleanStart(ep, Math.max(0, fb.start - 0.3));
    const end = cleanEnd(ep, Math.min(ep.duration, tb.end + 0.2));
    segs.push({ episode: ep.episode, start: +start.toFixed(2), end: +end.toFixed(2), fromBeat: fb.i, toBeat: tb.i });
  }
  if (!segs.length) return null;
  const total = () => segs.reduce((a, s) => a + s.end - s.start, 0);
  // Too long: pull the last segment's end back to the strongest cliff that still fits.
  if (total() > maxDur + 0.5) {
    const last = segs[segs.length - 1];
    const ep = byEp.get(last.episode);
    const budget = maxDur - (total() - (last.end - last.start));
    const options = ep.beats.filter((b) => b.type !== 'CAMERA' && b.i > last.fromBeat && cleanEnd(ep, b.end + 0.2) - last.start <= budget && cleanEnd(ep, b.end + 0.2) - last.start >= 4);
    const pick = options.sort((a, b) => b.cliff - a.cliff || b.end - a.end)[0];
    if (pick) { last.end = +cleanEnd(ep, pick.end + 0.2).toFixed(2); last.toBeat = pick.i; notes.push(`trimmed to fit ${maxDur}s (cut on ${describe(pick).slice(0, 50)})`); }
  }
  // Too short: extend the last segment forward to the next decent cliff.
  if (total() < minDur - 0.5) {
    const last = segs[segs.length - 1];
    const ep = byEp.get(last.episode);
    const need = minDur - (total() - (last.end - last.start));
    const options = ep.beats.filter((b) => b.type !== 'CAMERA' && b.i > last.toBeat && cleanEnd(ep, b.end + 0.2) - last.start >= need && cleanEnd(ep, b.end + 0.2) - last.start <= maxDur);
    const pick = options.sort((a, b) => (b.cliff - a.cliff) || (a.end - b.end))[0];
    if (pick) { last.end = +cleanEnd(ep, pick.end + 0.2).toFixed(2); last.toBeat = pick.i; notes.push(`extended to reach ${minDur}s`); }
  }
  return { ...p, segments: segs, repairs: notes };
}
