import { readFileList } from '../core/files.js';
import { parseShow } from '../promos/parse.js';
import { runContinuity, toMarkdown } from './engine.js';
import { mountModelPicker, esc, download, header, store } from '../ui/model-picker.js';

document.getElementById('hdr').innerHTML = header('continuity.html');
const $ = (id) => document.getElementById(id);
const picker = mountModelPicker($('model'), { storageKey: 'kuku.cont.model', allowNone: true });
let files = [], result = null;
const reviews = store.get('kuku.cont.reviews', {});

async function take(list) {
  files = await readFileList(list);
  const show = parseShow(files);
  if (!show.length) { $('parsed').innerHTML = '<span class="pill bad">No timestamped screenplay episodes found</span>'; return; }
  $('parsed').innerHTML = `<span class="pill good">✓ ${show.length} episodes</span> <span class="pill">${show.reduce((a, e) => a + e.beats.length, 0)} beats</span>`;
  $('run').disabled = false;
  $('est').textContent = `≈ ${Math.ceil(show.length / 10) + 23} model calls`;
}
const drop = $('drop');
drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('over'); });
drop.addEventListener('dragleave', () => drop.classList.remove('over'));
drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('over'); take(e.dataTransfer.files); });
$('file').addEventListener('change', (e) => take(e.target.files));
$('openJson').addEventListener('click', () => $('jsonFile').click());
$('jsonFile').addEventListener('change', async (e) => { try { result = JSON.parse(await e.target.files[0].text()); render(); } catch (err) { alert(err.message); } });

const log = (m) => { $('log').textContent += m + '\n'; $('log').scrollTop = 1e9; };
$('run').addEventListener('click', async () => {
  $('run').disabled = true; $('log').textContent = ''; $('bar').style.width = '5%';
  try {
    result = await runContinuity(files, {
      llm: picker.get(log),
      onProgress: (p) => {
        if (p.stage === 'rules') log(`Rules found ${p.ruleIssues} naming issues`);
        if (p.stage === 'extract') { $('bar').style.width = `${10 + 70 * p.done / p.total}%`; log(`Fact ledger: batch ${p.done}/${p.total}`); }
        if (p.stage === 'reconcile') { $('bar').style.width = '85%'; log('Reconciling across the series…'); }
      },
    });
    $('bar').style.width = '100%';
    log(`Done in ${result.meta.runtimeSec}s`);
    render();
  } catch (e) { log('Error: ' + e.message); }
  $('run').disabled = false;
});

const key = (it) => it.title;
function render() {
  $('results').classList.remove('hidden');
  const r = result;
  const n = (s) => r.issues.filter((i) => i.severity === s).length;
  const rev = r.issues.filter((i) => reviews[key(i)]);
  const acc = rev.filter((i) => reviews[key(i)] === 'ok').length;
  $('stats').innerHTML = [[r.issues.length, 'issues'], [n('high'), 'high severity'], [n('medium'), 'medium'], [r.issues.filter((i) => i.unverified).length, 'unverified evidence'], [rev.length ? `${Math.round((acc / rev.length) * 100)}%` : '—', `accepted (${rev.length} reviewed)`], [r.meta.mode, r.meta.model || 'mode'], [`${r.meta.runtimeSec}s`, 'runtime']]
    .map(([b, s]) => `<div class="stat"><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('');
  list();
  if (r.bible) {
    $('bibleCard').classList.remove('hidden');
    const t = (rows, cols) => `<table class="bible"><tr>${cols.map((c) => `<th>${c[0]}</th>`).join('')}</tr>${rows.map((x) => `<tr>${cols.map((c) => `<td>${esc([].concat(x[c[1]] ?? '').join(', '))}</td>`).join('')}</tr>`).join('')}</table>`;
    $('bible').innerHTML = `<p class="faint" style="font-size:13px">Built by code from the verified clusters, not free-form model output. Hand this to the voice/face casting step.</p><h3>Characters</h3>${t((r.bible.characters || []).filter((c) => (c.speaker_labels || []).length > 1 || c.lines >= 15), [['Canonical label', 'canonical'], ['All labels for this character', 'speaker_labels'], ['Lines', 'lines'], ['Episodes', 'episodes']])}
      <h3 style="margin-top:14px">Places</h3>${t(r.bible.places || [], [['Canonical', 'canonical'], ['Variants found', 'variants']])}
      <h3 style="margin-top:14px">Objects</h3>${t(r.bible.objects || [], [['Canonical', 'canonical'], ['Variants found', 'variants']])}
      ${(r.bible.unresolvedLabels || []).length ? `<h3 style="margin-top:14px">Unnamed labels not merged</h3>${t(r.bible.unresolvedLabels, [['Label', 'label'], ['AI guess', 'guess'], ['Confidence', 'confidence'], ['Why not merged', 'why']])}` : ''}`;
  }
}
function list() {
  const f = $('fSev').value;
  const rows = result.issues.filter((i) => f === 'all' || i.severity === f || (f === 'open' && !reviews[key(i)]));
  $('list').innerHTML = rows.map((it) => {
    const v = reviews[key(it)];
    return `<article class="card issue ${v === 'ok' ? 'accepted' : v === 'no' ? 'rejected' : ''}">
      <div class="row"><span class="mono faint">${it.id}</span><span class="pill ${it.severity === 'high' ? 'bad' : it.severity === 'medium' ? 'warn' : ''}">${esc(it.severity)}</span><span class="pill">${esc(it.type)}</span><span class="pill ${it.source === 'rules' ? 'info' : 'accent'}">found by ${esc(it.source)}</span>${it.pipeline_impact ? `<span class="pill">impact: ${esc(it.pipeline_impact)}</span>` : ''}${it.unverified ? '<span class="pill warn">⚠ evidence not verified</span>' : ''}
        <span class="spacer"></span><button class="small" data-v="ok" data-k="${esc(key(it))}">✓ Real issue</button><button class="small ghost" data-v="no" data-k="${esc(key(it))}">✕ Not an issue</button></div>
      <h3>${esc(it.title)}</h3>
      <p class="muted" style="margin:0">${esc(it.detail || '')}</p>
      <p style="margin:0"><b>Fix:</b> ${esc(it.fix || '—')}</p>
      <table class="ev"><tr><th>Ep</th><th>Beat</th><th>Time</th><th>Evidence in the script</th><th></th></tr>
      ${(it.evidence || []).map((e) => `<tr><td>${esc(e.ep)}</td><td class="mono">${esc(e.beat)}</td><td class="mono">${esc(e.time || '')}</td><td>${esc(e.quote)}${e.note ? ` <span class="faint">(${esc(e.note)})</span>` : ''}</td><td title="${e.verified ? 'quote found in the script' : esc(e.why || 'not found')}">${e.verified ? '✓' : '✗'}</td></tr>`).join('')}</table>
    </article>`;
  }).join('') || '<p class="muted">No issues match.</p>';
}
$('fSev').addEventListener('change', list);
$('list').addEventListener('click', (e) => {
  const b = e.target.closest('[data-v]');
  if (!b) return;
  reviews[b.dataset.k] = reviews[b.dataset.k] === b.dataset.v ? undefined : b.dataset.v;
  store.set('kuku.cont.reviews', reviews);
  render();
});
$('dlMd').onclick = () => download('continuity.md', toMarkdown(result), 'text/markdown');
$('dlJson').onclick = () => download('continuity.json', JSON.stringify({ ...result, reviews }, null, 2), 'application/json');
$('dlBible').onclick = () => download('story-bible.json', JSON.stringify(result.bible || {}, null, 2), 'application/json');
