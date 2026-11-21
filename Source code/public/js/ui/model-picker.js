// Shared "Model settings" panel. Keys are kept only in this browser (localStorage) and sent only
// to the provider the user picks. Default is the hosted demo proxy so reviewers need no key.
import { LLM, PRESETS } from '../core/llm.js';

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
};

export function mountModelPicker(el, { storageKey = 'kuku.model', allowNone = false } = {}) {
  const saved = store.get(storageKey, { provider: 'proxy', model: '', key: '', baseUrl: '' });
  const options = Object.entries(PRESETS).map(([k, p]) => `<option value="${k}">${p.label}</option>`).join('');
  el.innerHTML = `
    <div class="model-box">
      <label>AI provider
        <select data-f="provider">${allowNone ? '<option value="none">None — rules only (instant, free)</option>' : ''}${options}</select>
      </label>
      <label data-w="model">Model <input data-f="model" list="${storageKey}-models" placeholder="default"></label>
      <datalist id="${storageKey}-models"></datalist>
      <label data-w="key">API key <input data-f="key" type="password" autocomplete="off" placeholder="stays in this browser"></label>
      <label data-w="baseUrl" class="hidden">Base URL <input data-f="baseUrl" placeholder="https://…/v1"></label>
    </div>
    <p class="faint" style="margin:8px 0 0;font-size:12.5px" data-f="hint"></p>`;
  const $ = (f) => el.querySelector(`[data-f="${f}"]`);
  const w = (f) => el.querySelector(`[data-w="${f}"]`);
  $('provider').value = saved.provider in PRESETS || saved.provider === 'none' ? saved.provider : 'proxy';
  $('model').value = saved.model || '';
  $('key').value = saved.key || '';
  $('baseUrl').value = saved.baseUrl || '';
  const sync = () => {
    const p = $('provider').value;
    const preset = PRESETS[p];
    w('model').classList.toggle('hidden', p === 'none');
    w('key').classList.toggle('hidden', p === 'none' || !!preset?.noKey);
    w('baseUrl').classList.toggle('hidden', p !== 'custom');
    el.querySelector('datalist').innerHTML = (preset?.models || []).map((m) => `<option value="${m}">`).join('');
    $('model').placeholder = preset?.models?.[0] || 'model name';
    $('hint').textContent = p === 'none' ? 'Keyword rules only. No data leaves your browser.'
      : p === 'proxy' ? 'Uses the shared free-tier Gemini key behind this site. It is rate-limited, so for long runs add your own key (Gemini keys are free at aistudio.google.com).'
      : p === 'ollama' ? 'Runs against a model on your own machine (start Ollama with OLLAMA_ORIGINS=* so the browser can reach it).'
      : 'Your key is stored only in this browser and sent only to this provider.';
    store.set(storageKey, { provider: p, model: $('model').value, key: $('key').value, baseUrl: $('baseUrl').value });
  };
  el.addEventListener('input', sync);
  el.addEventListener('change', sync);
  sync();
  return {
    /** Returns an LLM instance, or null in rules-only mode. */
    get(log) {
      const p = $('provider').value;
      if (p === 'none') return null;
      return new LLM({ provider: p, model: $('model').value.trim() || undefined, apiKey: $('key').value.trim(), baseUrl: $('baseUrl').value.trim() || undefined, log });
    },
    describe() { const p = $('provider').value; return p === 'none' ? 'rules only' : `${PRESETS[p].label} · ${$('model').value || PRESETS[p].models[0]}`; },
  };
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function download(name, text, type = 'text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export function header(active) {
  const links = [['index.html', 'Overview'], ['promos.html', '1 · Promo Finder'], ['lawyer.html', '2 · AI Lawyer'], ['continuity.html', '3 · Continuity Guard']];
  return `<header class="topbar"><div class="wrap">
    <a class="brand" href="index.html"><span class="dot"></span>AI Generalist Submission</a>
    <nav class="nav">${links.map(([h, t]) => `<a href="${h}" ${h === active ? 'aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
  </div></header>`;
}
export { store };
