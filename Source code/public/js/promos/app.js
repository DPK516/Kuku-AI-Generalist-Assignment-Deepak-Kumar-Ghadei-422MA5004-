import { readFileList } from '../core/files.js';
import { parseShow, fmt } from './parse.js';
import { findPromos, toCSV, toMarkdown, toEDL, toJSON } from './pipeline.js';
import { mountModelPicker, esc, download, header, store } from '../ui/model-picker.js';

document.getElementById('hdr').innerHTML = header('promos.html');
const $ = (id) => document.getElementById(id);
const picker = mountModelPicker($('model'), { storageKey: 'kuku.promos.model', allowNone: true });
let files = [], result = null;
const reviews = store.get('kuku.promos.reviews', {});

// ---------- input ----------
async function take(list) {
  files = await readFileList(list);
  const show = parseShow(files);
  if (!show.length) { $('parsed').innerHTML = '<span class="pill bad">No timestamped screenplay episodes found in those files</span>'; $('run').disabled = true; return; }
  const mins = show.reduce((a, e) => a + e.duration, 0) / 60;
  const issues = show.flatMap((e) => e.issues);
  $('parsed').innerHTML = `<span class="pill good">✓ ${show.length} episodes</span> <span class="pill">${show.reduce((a, e) => a + e.beats.length, 0)} beats</span> <span class="pill">${mins.toFixed(1)} min of runtime</span> ${issues.length ? `<span class="pill warn">${issues.length} parse warnings</span>` : ''}`;
  $('run').disabled = false;
  const calls = show.length + 1 + Math.ceil(show.length * 2.4 / 8);
  $('est').textContent = `≈ ${calls} model calls · ~${Math.round(show.length * 4.8)}k tokens`;
}
const drop = $('drop');
drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('over'); });
drop.addEventListener('dragleave', () => drop.classList.remove('over'));
drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('over'); take(e.dataTransfer.files); });
$('file').addEventListener('change', (e) => take(e.target.files));
$('openJson').addEventListener('click', () => $('jsonFile').click());
$('jsonFile').addEventListener('change', async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  try { result = JSON.parse(await f.text()); render(); } catch (err) { alert('Could not read that JSON: ' + err.message); }
});

// ---------- run ----------
const log = (m) => { $('log').textContent += m + '\n'; $('log').scrollTop = 1e9; };
$('run').addEventListener('click', async () => {
  $('run').disabled = true; $('log').textContent = ''; $('bar').style.width = '3%';
  const llm = picker.get(log);
  const range = $('range').value.trim().match(/^(\d+)\s*-\s*(\d+)$/);
  log(`Mode: ${picker.describe()}`);
  try {
    result = await findPromos(files, {
      llm,
      perEpisode: +$('perEp').value || 3,
      montages: +$('mont').value || 0,
      critic: $('critic').checked,
      episodes: range ? [+range[1], +range[2]] : null,
      onProgress: (p) => {
        if (p.stage === 'parsed') log(`Parsed ${p.episodes} episodes / ${p.beats} beats`);
        if (p.stage === 'judge') { $('bar').style.width = `${5 + 75 * p.done / p.total}%`; log(`Episode ${p.episode} judged${p.error ? ' — model error, used rules fallback' : ''} (${p.done}/${p.total})`); }
        if (p.stage === 'montage') { $('bar').style.width = '84%'; log('Building cross-episode montages…'); }
        if (p.stage === 'critic' && p.done) $('bar').style.width = `${86 + 13 * p.done / p.total}%`;
        else if (p.stage === 'critic') { $('bar').style.width = '86%'; log('Blind critic reviewing every promo…'); }
      },
    });
    // Attach transcripts so the on-screen result matches the exported JSON.
    result = { ...JSON.parse(toJSON(result)), _byEp: result._byEp };
    $('bar').style.width = '100%';
    log(`Done in ${result.meta.runtimeSec}s`);
    render();
  } catch (e) {
    log('Error: ' + e.message);
  } finally { $('run').disabled = false; }
});

// ---------- render ----------
const bar = (v, max = 10) => `<div class="bar" title="${v}/${max}"><i style="width:${Math.max(0, Math.min(100, (v / max) * 100))}%"></i></div>`;
function render() {
  $('results').classList.remove('hidden');
  const r = result, m = r.meta;
  const pass = r.promos.filter((p) => p.validation.pass).length;
  const flagged = r.promos.filter((p) => p.flags?.length).length;
  const cost = m.usage ? (m.usage.inputTokens * 0.1 + m.usage.outputTokens * 0.4) / 1e6 : 0; // ≈ paid Flash-Lite-class pricing ($0.10 / $0.40 per M tokens)
  $('stats').innerHTML = [
    [r.promos.length, 'promos found'], [`${pass}`, 'pass hard checks'], [flagged, 'flagged for review'],
    [m.episodes, 'episodes'], [m.mode === 'rules-only' ? 'rules' : (m.model || '').replace('gemini-', 'g-'), 'mode / model'],
    [m.usage ? `${Math.round((m.usage.inputTokens + m.usage.outputTokens) / 1000)}k` : '0', 'tokens'],
    [m.usage ? `$${cost.toFixed(3)}` : '$0', 'cost at Flash-Lite rates'], [`${m.runtimeSec}s`, 'runtime'],
  ].map(([b, s]) => `<div class="stat"><b>${esc(b)}</b><span>${s}</span></div>`).join('');

  $('postList').innerHTML = r.postingOrder.map((id) => {
    const p = r.promos.find((x) => x.id === id);
    return `<li><div><a href="#${p.id}"><b>${esc(p.title)}</b></a><br><span class="muted">${esc(p.why)}</span></div><span class="pill">${p.validation.duration.toFixed(0)}s · Ep ${[...new Set(p.segments.map((s) => s.episode))].join('+')}</span></li>`;
  }).join('');

  const eps = r.episodes;
  const top = new Set(r.postingOrder);
  $('timeline').innerHTML = eps.map((e) => {
    const blocks = r.promos.flatMap((p) => p.segments.filter((s) => s.episode === e.episode).map((s) => `<i class="${top.has(p.id) ? 'top' : ''}" title="${esc(p.id + ' ' + p.title)}" data-go="${p.id}" style="left:${(s.start / e.duration) * 100}%;width:${Math.max(0.6, ((s.end - s.start) / e.duration) * 100)}%"></i>`)).join('');
    return `<div class="tl-row"><span>Ep${e.episode}</span><div class="tl-track">${blocks}</div></div>`;
  }).join('');
  $('timeline').onclick = (ev) => { const id = ev.target.dataset.go; if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  list();
}

function list() {
  const f = $('fShow').value;
  const rows = result.promos.filter((p) => f === 'all' || (f === 'pass' && p.validation.pass) || (f === 'flag' && (p.flags?.length || !p.validation.pass)) || (f === 'approved' && reviews[key(p)]?.v === 'ok') || (f === 'montage' && p.montage));
  $('list').innerHTML = rows.map(card).join('') || '<p class="muted">Nothing matches this filter.</p>';
}
$('fShow').addEventListener('change', list);
const key = (p) => p.segments.map((s) => `${s.episode}@${s.start}`).join('|');

function card(p) {
  const s = p.scores || {};
  const bad = p.validation.checks.filter((c) => !c.ok);
  const rv = reviews[key(p)] || {};
  const tags = [
    p.postRank ? `<span class="pill accent">Post #${p.postRank}</span>` : '',
    p.montage ? '<span class="pill info">cross-episode montage</span>' : p.segments.length > 1 ? '<span class="pill info">stitched</span>' : '<span class="pill">continuous</span>',
    p.trope && p.trope !== 'n/a (rules mode)' ? `<span class="pill">${esc(p.trope)}</span>` : '',
    p.spoiler && p.spoiler !== 'unknown' ? `<span class="pill ${p.spoiler === 'high' ? 'bad' : p.spoiler === 'medium' ? 'warn' : ''}">spoiler: ${esc(p.spoiler)}</span>` : '',
    ...bad.map((c) => `<span class="pill ${c.soft ? 'warn' : 'bad'}" title="${esc(c.msg)}">${c.soft ? '⚠' : '✕'} ${esc(c.id)}</span>`),
    !bad.length ? '<span class="pill good">✓ all checks</span>' : '',
    ...(p.flags || []).map((f) => `<span class="pill warn">${esc(f)}</span>`),
  ].join(' ');
  return `<article class="card promo ${rv.v === 'ok' ? 'approved' : rv.v === 'no' ? 'rejected' : ''}" id="${p.id}">
    <div class="rank">${p.rank}<small>${p.score.toFixed(2)}</small></div>
    <div>
      <div class="row"><h3 style="margin:0">${esc(p.title)}</h3><span class="faint mono">${p.id}</span><span class="spacer"></span>
        <button class="small" data-rv="ok" data-k="${esc(key(p))}">✓ Approve</button><button class="small ghost" data-rv="no" data-k="${esc(key(p))}">✕ Reject</button></div>
      <div class="segs">${p.segments.map((g, k) => `<span class="seg">${p.segments.length > 1 ? `${k + 1}. ` : ''}Ep ${g.episode} · ${fmt(g.start)} → ${fmt(g.end)} · ${(g.end - g.start).toFixed(1)}s</span>`).join('')}<span class="seg"><b>${p.validation.duration.toFixed(1)}s</b> total</span></div>
      <div class="row" style="gap:6px">${tags}</div>
      <div class="hc"><div><b>Hook (0–3s)</b>${esc(p.hook)}</div><div><b>Cliffhanger (cut)</b>${esc(p.cliffhanger)}</div></div>
      <p style="margin:6px 0"><b>Why it works:</b> ${esc(p.why)}</p>
      ${s.hook != null ? `<div class="scores"><div>Hook ${s.hook}${bar(s.hook)}</div><div>Cliffhanger ${s.cliffhanger}${bar(s.cliffhanger)}</div><div>Stands alone ${s.standalone}${bar(s.standalone)}</div><div>Emotion ${s.emotion}${bar(s.emotion)}</div></div>` : ''}
      ${p.critic ? `<p class="muted" style="font-size:13.5px;margin:4px 0"><b>Blind critic</b> (saw only this clip): stop ${p.critic.stop}/10 · clear ${p.critic.clear}/10 · need-next ${p.critic.need_next}/10 → <b>${esc(p.critic.verdict)}</b>${p.critic.confusing ? ` — “${esc(p.critic.confusing)}”` : ''}</p>` : ''}
      ${p.risk ? `<p class="muted" style="font-size:13.5px;margin:4px 0"><b>Risk:</b> ${esc(p.risk)}</p>` : ''}
      ${p.repairs?.length ? `<p class="faint" style="font-size:12.5px;margin:4px 0">Auto-repairs: ${esc(p.repairs.join('; '))}</p>` : ''}
      <details><summary>Clip script (times relative to clip start)</summary><pre class="script">${esc(p.transcript || '')}</pre></details>
      <textarea rows="1" placeholder="Editor note…" data-note="${esc(key(p))}" style="margin-top:8px">${esc(rv.note || '')}</textarea>
    </div></article>`;
}
$('list').addEventListener('click', (e) => {
  const b = e.target.closest('[data-rv]');
  if (!b) return;
  const k = b.dataset.k;
  reviews[k] = { ...(reviews[k] || {}), v: reviews[k]?.v === b.dataset.rv ? null : b.dataset.rv };
  store.set('kuku.promos.reviews', reviews);
  list();
});
$('list').addEventListener('change', (e) => {
  const k = e.target.dataset.note;
  if (!k) return;
  reviews[k] = { ...(reviews[k] || {}), note: e.target.value };
  store.set('kuku.promos.reviews', reviews);
});

document.querySelector('.filters').addEventListener('click', (e) => {
  const x = e.target.dataset.x;
  if (!x || !result) return;
  const withReviews = { ...result, promos: result.promos.map((p) => ({ ...p, review: reviews[key(p)] || null })) };
  if (x === 'csv') download('promos.csv', toCSV(withReviews), 'text/csv');
  if (x === 'md') download('promos.md', toMarkdown(withReviews, { top: 60 }), 'text/markdown');
  if (x === 'json') download('promos.json', toJSON(withReviews), 'application/json');
  if (x === 'edl') {
    const approved = result.promos.filter((p) => reviews[key(p)]?.v === 'ok').map((p) => p.id);
    download('promos.edl', toEDL(result, { ids: approved.length ? approved : result.postingOrder }));
  }
});
