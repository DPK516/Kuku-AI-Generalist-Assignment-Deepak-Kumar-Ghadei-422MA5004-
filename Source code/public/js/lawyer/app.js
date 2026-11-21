import { Haq } from './agent.js';
import { KB } from './kb.js';
import { mountModelPicker, esc, download, header } from '../ui/model-picker.js';

document.getElementById('hdr').innerHTML = header('lawyer.html');
const $ = (id) => document.getElementById(id);
const picker = mountModelPicker($('model'), { storageKey: 'kuku.lawyer.model' });
let haq = null;
const pracHist = [];
const ensure = () => (haq ||= new Haq(picker.get()));
$('modeLabel').textContent = 'Model: ' + picker.describe();
$('model').addEventListener('change', () => { $('modeLabel').textContent = 'Model: ' + picker.describe(); if (haq) haq.llm = picker.get(); });

// ---------- chat ----------
const msgs = $('msgs');
function bubble(cls, html) {
  const d = document.createElement('div');
  d.className = `msg ${cls}`;
  d.innerHTML = html;
  msgs.appendChild(d);
  msgs.scrollTop = 1e9;
  return d;
}
bubble('bot', esc('Namaste! I\'m Haq. Tell me what happened, in any language: a deposit not returned, a refund stuck, salary not paid, or a notice you don\'t understand.\n\nनमस्ते! आप हिंदी में भी लिख या बोल सकते हैं।'));
const STARTERS = ['My landlord won\'t return my deposit', 'मेरा रिफंड नहीं आया', 'Salary not paid after I resigned', 'I got a legal notice'];
const setChips = (list) => { $('chips').innerHTML = list.map((t) => `<button class="ghost">${esc(t)}</button>`).join(''); };
setChips(STARTERS);
$('chips').addEventListener('click', (e) => {
  const t = e.target.closest('button')?.textContent;
  if (!t) return;
  if (/draft|notice|complaint|letter|ड्राफ्ट|नोटिस/i.test(t) && haq?.history.length) { tab('docs'); return; }
  if (/practi|role|अभ्यास/i.test(t) && haq?.history.length) { tab('practice'); return; }
  send(t);
});

async function send(text) {
  text = (text ?? $('input').value).trim();
  if (!text) return;
  $('input').value = '';
  bubble('user', esc(text));
  const wait = bubble('bot', '<span class="typing"><i></i><i></i><i></i></span>');
  $('send').disabled = true;
  try {
    const r = await ensure().turn(text);
    const meta = [
      r.needsLawyer ? '<span class="pill warn">⚖ talk to a lawyer</span>' : r.lawyerLater ? `<span class="pill" title="${esc(r.lawyerLater)}">⚖ lawyer only if it goes to court</span>` : '',
      ...r.sources.map((s) => `<span class="pill ${s.confidence === 'high' ? 'good' : 'warn'}" title="${esc(s.rule)}">${esc(s.law)}${s.cite ? ' ' + esc(s.cite) : ''}</span>`),
      r.guard.removed.length ? `<span class="pill bad" title="${esc(r.guard.removed.map((g) => g.ref + ' — ' + g.why).join('\n'))}">🛡 ${r.guard.removed.length} unverified reference(s) removed</span>` : '',
    ].join('');
    wait.innerHTML = esc(r.reply) + (meta ? `<div class="meta">${meta}</div>` : '');
    setChips(r.nextActions.length ? r.nextActions : ['Draft a legal notice', 'What proof do I need?', 'Practice with the other side']);
    renderCase(r);
    if ($('speak').checked) speak(r.reply, r.language);
  } catch (e) {
    wait.className = 'msg sys';
    wait.textContent = 'Could not reach the model: ' + e.message + ' — try again, or add your own key under Model.';
  } finally { $('send').disabled = false; }
}
$('send').addEventListener('click', () => send());
$('input').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });

// ---------- case file + sources ----------
const li = (xs) => (xs?.length ? `<ul>${xs.map((x) => `<li>${esc(typeof x === 'string' ? x : `${x.date ? x.date + ' — ' : ''}${x.event || ''}`)}</li>`).join('')}</ul>` : '<dd class="faint">—</dd>');
const seenSources = new Map();
function renderCase(r) {
  const c = r.case;
  $('caseFile').innerHTML = `<dl>
    <dt>Summary</dt><dd>${esc(c.summary) || '<span class="faint">—</span>'}</dd>
    <dt>You</dt><dd>${esc(c.person) || '—'}</dd><dt>Other side</dt><dd>${esc(c.other_side) || '—'}</dd>
    <dt>Amount</dt><dd>${esc(c.amount) || '—'}</dd><dt>Goal</dt><dd>${esc(c.goal) || '—'}</dd>
    <dt>Timeline</dt>${li(c.key_dates)}
    <dt>Proof you have ✓</dt>${li(c.evidence_have)}
    <dt>Proof to collect</dt>${li(c.evidence_missing)}
    <dt>Deadlines to watch</dt>${li(c.deadline_risks)}
  </dl><button class="small" id="dlCase" style="margin-top:10px">Download case file</button>`;
  $('dlCase').onclick = () => download('case-file.json', JSON.stringify({ topic: r.topic, case: c, conversation: haq.history }, null, 2), 'application/json');
  for (const s of r.sources) seenSources.set(s.id, s);
  $('sources').innerHTML = [...seenSources.values()].map(srcHtml).join('') || '<p class="muted">No laws cited yet.</p>';
  const box = $('lawyerBox');
  if (r.needsLawyer) {
    box.classList.remove('hidden');
    box.innerHTML = `<b>⚖ Please talk to a real lawyer</b><p class="muted" style="margin:6px 0 0;font-size:14px">${esc(r.lawyerReason || 'This needs professional advice.')}<br>Can't afford one? Free legal aid is your right: call <b>15100</b> or visit the District Legal Services Authority at your district court.${r.redFlags.level === 'urgent' ? '<br><b>If anyone is in danger, call 112 now.</b>' : ''}</p>`;
  }
}
const srcHtml = (s) => `<div class="src ${s.confidence}"><b>${esc(s.law)}${s.cite ? ' · ' + esc(s.cite) : ''}</b> <span class="pill ${s.confidence === 'high' ? 'good' : 'warn'}">${s.confidence === 'high' ? 'checked' : 'verify detail'}</span><br>${esc(s.rule)}<br><a href="${s.source}" target="_blank" rel="noopener">source ↗</a></div>`;
$('kbAll').innerHTML = KB.map(srcHtml).join('');

// ---------- documents ----------
$('draftBtn').addEventListener('click', async () => {
  if (!haq?.history.length) { $('docOut').innerHTML = '<p class="muted">Tell Haq about your problem first. The draft is built from your case file.</p>'; return; }
  $('draftBtn').disabled = true;
  $('docOut').innerHTML = '<p class="muted">Drafting…</p>';
  try {
    const d = await haq.draft($('docKind').value);
    $('docOut').innerHTML = `<h3>${esc(d.title)}</h3><div class="doc">${esc(d.document).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>')}</div>
      ${d.placeholders.length ? `<p style="font-size:14px"><b>Fill in before sending:</b> ${d.placeholders.map(esc).join(', ')}</p>` : ''}
      ${d.howToSend ? `<p class="muted" style="font-size:14px"><b>How to send:</b> ${esc(Array.isArray(d.howToSend) ? d.howToSend.join(' ') : d.howToSend)}</p>` : ''}
      ${d.guard.removed.length ? `<p class="pill bad">🛡 removed ${d.guard.removed.length} unverified reference(s)</p>` : ''}
      <div class="row"><button class="small" id="dlDoc">Download .txt</button><button class="small" id="cpDoc">Copy</button><button class="small" id="prDoc">Print / PDF</button></div>`;
    $('dlDoc').onclick = () => download(`${d.kind}.txt`, d.document);
    $('cpDoc').onclick = () => navigator.clipboard.writeText(d.document);
    $('prDoc').onclick = () => { const w = open(''); w.document.write(`<pre style="white-space:pre-wrap;font:14px/1.6 Georgia,serif;max-width:720px;margin:40px auto">${esc(d.document)}</pre>`); w.print(); };
  } catch (e) { $('docOut').innerHTML = `<p class="pill bad">${esc(e.message)}</p>`; }
  $('draftBtn').disabled = false;
});

// ---------- practice ----------
$('pracSend').addEventListener('click', async () => {
  const line = $('pracIn').value.trim();
  if (!line) return;
  $('pracIn').value = '';
  const box = document.createElement('div');
  box.innerHTML = `<div class="msg user" style="max-width:100%">${esc(line)}</div><div class="msg bot" style="max-width:100%"><span class="typing"><i></i><i></i><i></i></span></div>`;
  $('pracLog').appendChild(box);
  try {
    const p = await ensure().practice($('role').value || 'the other side', line, pracHist);
    pracHist.push({ role: 'user', content: line }, { role: 'assistant', content: p.inCharacter });
    box.lastElementChild.innerHTML = `<b>${esc($('role').value)}:</b> ${esc(p.inCharacter)}<div class="note" style="margin-top:8px">💡 ${esc(p.coachTip)}${p.score ? ` <span class="pill">you: ${p.score}/10</span>` : ''}</div>`;
  } catch (e) { box.lastElementChild.textContent = e.message; }
});
$('pracIn').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('pracSend').click(); });

// ---------- tabs ----------
function tab(name) {
  document.querySelectorAll('[role=tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === name));
  document.querySelectorAll('[data-pane]').forEach((p) => p.classList.toggle('hidden', p.dataset.pane !== name));
}
document.querySelector('.tabs').addEventListener('click', (e) => { const t = e.target.dataset.tab; if (t) tab(t); });

// ---------- voice (Web Speech API; Chrome / Edge) ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
if (!SR) { $('mic').disabled = true; $('mic').title = 'Voice input needs Chrome or Edge'; }
$('mic').addEventListener('click', () => {
  if (rec) { rec.stop(); return; }
  rec = new SR();
  rec.lang = $('voiceLang').value;
  rec.interimResults = true;
  rec.continuous = false;
  $('mic').classList.add('on');
  let finalText = '';
  rec.onresult = (e) => {
    let t = '';
    for (const r of e.results) { t += r[0].transcript; if (r.isFinal) finalText = t; }
    $('input').value = t;
  };
  rec.onend = () => { $('mic').classList.remove('on'); rec = null; if (finalText.trim()) send(finalText); };
  rec.onerror = () => { $('mic').classList.remove('on'); rec = null; };
  rec.start();
});
const LANG_VOICE = { hi: 'hi-IN', en: 'en-IN', hinglish: 'hi-IN', ta: 'ta-IN', bn: 'bn-IN', te: 'te-IN', mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', or: 'or-IN', pa: 'pa-IN' };
function speak(text, lang) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\[unverified reference removed\]/g, ''));
  u.lang = LANG_VOICE[lang] || $('voiceLang').value;
  const v = speechSynthesis.getVoices().find((x) => x.lang === u.lang);
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
