// Deterministic screenplay parser (no AI). Turns Kuku's timestamped screenplay text into beats.
// A "beat" is one timestamped block: CAMERA, ACTION, SFX or a DIALOGUE line.

export const toSec = (ts) => {
  const m = String(ts).trim().match(/^(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)$/);
  if (!m) return NaN;
  return (+(m[1] || 0)) * 3600 + (+m[2]) * 60 + (+m[3]);
};
export const fmt = (s) => {
  if (!isFinite(s)) return '?';
  const m = Math.floor(s / 60), r = s - m * 60;
  return `${String(m).padStart(2, '0')}:${r.toFixed(2).padStart(5, '0')}`;
};

const HEADER = /^\*\*(.+?):\*\*\s*$/;
const TIMING = /^Start:\s*\(([\d:.]+)\)\s*\|\s*End:\s*\(([\d:.]+)\)/i;

function classify(label) {
  const L = label.trim();
  if (/^CAMERA$/i.test(L)) return { type: 'CAMERA' };
  if (/^ACTION$/i.test(L)) return { type: 'ACTION' };
  if (/^(SOUND\s*FX|SFX|MUSIC|SOUND)$/i.test(L)) return { type: 'SFX' };
  if (/^(TEXT|ON[- ]SCREEN TEXT|SUPER|TITLE)/i.test(L)) return { type: 'TEXT' };
  // Dialogue: "NAME (O.S.) (Tone, Tone)" — last parenthetical is the delivery/emotion tag.
  const parens = [...L.matchAll(/\(([^)]*)\)/g)].map((m) => m[1].trim());
  const speaker = L.replace(/\([^)]*\)/g, '').trim();
  const flags = parens.filter((p) => /^(O\.S\.|V\.O\.|CONT'D|O\.C\.)$/i.test(p));
  const tone = parens.filter((p) => !flags.includes(p)).join(', ');
  return { type: 'DIALOGUE', speaker, tone, offscreen: flags.length > 0 };
}

/** Parse one episode file. `name` is the filename (used to recover the episode number). */
export function parseEpisode(text, name = '') {
  const lines = text.replace(/\r/g, '').split('\n');
  const meta = {};
  for (const l of lines.slice(0, 12)) {
    const m = l.match(/^(EPISODE NUMBER|EPISODE LOGLINE|CONTINUITY NOTES|EPISODE TITLE):\s*(.*)$/i);
    if (m) meta[m[1].toUpperCase()] = m[2].trim();
  }
  let num = parseInt((meta['EPISODE NUMBER'] || '').replace(/\D+/g, ''), 10);
  if (!isFinite(num)) num = parseInt((name.match(/episode[-_ ]?(\d+)/i) || [])[1], 10);

  const scenes = [], beats = [];
  let scene = null, cur = null;
  const flush = () => {
    if (cur && isFinite(cur.start)) {
      cur.text = cur.text.join(' ').replace(/\s+/g, ' ').trim().replace(/^"(.*)"$/, '$1');
      if (cur.text || cur.type === 'CAMERA') beats.push(cur);
    }
    cur = null;
  };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    let m;
    if ((m = l.match(/^SCENE\s+(\d+)/i)) && !l.includes(':')) {
      flush();
      scene = { id: +m[1], heading: '', start: NaN, end: NaN };
      scenes.push(scene);
      continue;
    }
    if (scene && (m = l.match(/^Scene heading:\s*(.*)$/i))) { scene.heading = m[1]; continue; }
    if (scene && (m = l.match(/^Scene start:\s*([\d:.]+)/i))) { scene.start = toSec(m[1]); continue; }
    if (scene && (m = l.match(/^Scene end:\s*([\d:.]+)/i))) { scene.end = toSec(m[1]); continue; }
    if ((m = l.match(HEADER))) {
      flush();
      cur = { ...classify(m[1]), label: m[1], scene: scene ? scene.id : 0, start: NaN, end: NaN, text: [] };
      continue;
    }
    if (cur && (m = l.match(TIMING)) && !isFinite(cur.start)) { cur.start = toSec(m[1]); cur.end = toSec(m[2]); continue; }
    if (/^---\s*SCRIPT (START|END)/i.test(l)) { flush(); continue; }
    if (cur && l) cur.text.push(l);
  }
  flush();
  beats.sort((a, b) => a.start - b.start || (a.type === 'CAMERA') - (b.type === 'CAMERA'));
  beats.forEach((b, i) => { b.i = i; b.ep = num; b.id = `E${num}.${i}`; });
  const duration = Math.max(0, ...beats.map((b) => b.end), ...scenes.map((s) => s.end || 0));
  const issues = [];
  if (!beats.length) issues.push('no timestamped beats found');
  if (!isFinite(num)) issues.push('episode number not found');
  beats.forEach((b) => { if (!(b.end >= b.start)) issues.push(`bad timing at ${b.id}`); });
  return {
    episode: num,
    file: name,
    logline: meta['EPISODE LOGLINE'] || '',
    continuity: meta['CONTINUITY NOTES'] || '',
    duration,
    scenes,
    beats,
    issues,
  };
}

/** Parse many files: [{name, text}] -> episodes sorted by number. */
export function parseShow(files) {
  return files
    .filter((f) => /\.txt$/i.test(f.name) || /SCRIPT START/.test(f.text))
    .map((f) => parseEpisode(f.text, f.name))
    .filter((e) => e.beats.length)
    .sort((a, b) => a.episode - b.episode);
}

/** Compact, token-cheap rendering of an episode for the LLM: drops most camera notes. */
export function condense(ep, { keepCamera = false, from = 0, to = Infinity } = {}) {
  const out = [];
  for (const b of ep.beats) {
    if (b.start < from || b.start > to) continue;
    if (b.type === 'CAMERA' && !keepCamera && !/cut to black|slap|smash|freeze|reveal/i.test(b.text)) continue;
    const who = b.type === 'DIALOGUE' ? `${b.speaker}${b.tone ? ` (${b.tone})` : ''}: "${b.text}"` : `[${b.type}] ${b.text}`;
    out.push(`#${b.i} ${fmt(b.start)}-${fmt(b.end)} ${who}`);
  }
  return out.join('\n');
}
