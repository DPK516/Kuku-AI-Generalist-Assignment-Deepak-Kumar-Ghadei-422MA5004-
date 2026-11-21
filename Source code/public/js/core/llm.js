// Provider-agnostic LLM client. Runs unchanged in Node 18+ and in the browser (only uses fetch).
// Swapping the model = changing { provider, model, apiKey, baseUrl } — nothing else in the pipeline changes.
//
// Every provider below except Anthropic speaks the OpenAI "chat/completions" dialect, so one code
// path covers Gemini, Groq, OpenRouter, OpenAI, Together, a local Ollama, or Kuku's own gateway.

export const PRESETS = {
  gemini: {
    label: 'Google Gemini (free tier)',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    // Free tier (Nov 2026): flash-lite = 500 requests/day, 15/min; flash = 20/day. Lite is the workhorse.
    models: ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-flash-lite-latest'],
    style: 'openai',
    rpm: 14,
  },
  proxy: {
    label: 'Demo key (hosted, rate-limited)',
    baseUrl: '/api/llm',
    models: ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'],
    style: 'openai',
    noKey: true,
    rpm: 14,
  },
  groq: { label: 'Groq', baseUrl: 'https://api.groq.com/openai/v1', models: ['llama-3.3-70b-versatile'], style: 'openai' },
  openrouter: { label: 'OpenRouter', baseUrl: 'https://openrouter.ai/api/v1', models: ['google/gemini-3.5-flash'], style: 'openai' },
  openai: { label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', models: ['gpt-5-mini'], style: 'openai' },
  anthropic: { label: 'Anthropic Claude', baseUrl: 'https://api.anthropic.com/v1', models: ['claude-sonnet-5-5'], style: 'anthropic' },
  ollama: { label: 'Local Ollama', baseUrl: 'http://localhost:11434/v1', models: ['llama3.1'], style: 'openai', noKey: true },
  custom: { label: 'Any OpenAI-compatible endpoint', baseUrl: '', models: [''], style: 'openai' },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Pull the first JSON object/array out of a model reply (handles ```json fences and chatter). */
export function extractJSON(text) {
  if (!text) throw new Error('empty model reply');
  let t = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch { /* fall through */ }
  const start = t.search(/[[{]/);
  if (start < 0) throw new Error('no JSON in reply: ' + t.slice(0, 200));
  const open = t[start], close = open === '{' ? '}' : ']';
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < t.length; i++) {
    const c = t[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === open) depth++;
    else if (c === close && --depth === 0) return JSON.parse(t.slice(start, i + 1));
  }
  throw new Error('unterminated JSON in reply');
}

export class LLM {
  /**
   * @param {object} cfg { provider, model, apiKey, baseUrl, temperature, maxRetries, log }
   */
  constructor(cfg = {}) {
    const preset = PRESETS[cfg.provider || 'gemini'] || PRESETS.custom;
    this.provider = cfg.provider || 'gemini';
    this.style = cfg.style || preset.style;
    this.baseUrl = (cfg.baseUrl || preset.baseUrl).replace(/\/$/, '');
    this.models = cfg.model ? [cfg.model, ...preset.models.filter((m) => m !== cfg.model)] : [...preset.models];
    this.apiKey = cfg.apiKey || '';
    this.temperature = cfg.temperature ?? 0.4;
    this.maxRetries = cfg.maxRetries ?? 4;
    this.rpm = cfg.rpm ?? preset.rpm ?? 0; // client-side pacing to stay under free-tier per-minute limits
    this._slot = 0;
    this.log = cfg.log || (() => {});
    this.usage = { calls: 0, inputTokens: 0, outputTokens: 0, ms: 0, byModel: {} };
  }

  get model() { return this.models[0]; }

  async _pace() {
    if (!this.rpm) return;
    const gap = 60000 / this.rpm, now = Date.now();
    const at = Math.max(now, this._slot);
    this._slot = at + gap;
    if (at > now) await sleep(at - now);
  }

  async _call(model, system, user, { json, maxTokens, temperature }) {
    await this._pace();
    const t0 = Date.now();
    let url, headers, body;
    if (this.style === 'anthropic') {
      url = `${this.baseUrl}/messages`;
      headers = {
        'content-type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      };
      body = { model, system, max_tokens: maxTokens, temperature, messages: [{ role: 'user', content: user }] };
    } else {
      url = this.baseUrl.endsWith('/api/llm') ? this.baseUrl : `${this.baseUrl}/chat/completions`;
      headers = { 'content-type': 'application/json' };
      if (this.apiKey) headers.authorization = `Bearer ${this.apiKey}`;
      body = {
        model,
        temperature,
        max_tokens: maxTokens,
        messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: user }],
      };
      if (json) body.response_format = { type: 'json_object' };
    }
    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    const raw = await res.text();
    if (!res.ok) {
      const err = new Error(`${res.status} ${raw.slice(0, 300)}`);
      err.status = res.status;
      throw err;
    }
    let data = JSON.parse(raw);
    if (Array.isArray(data)) data = data[0] || {};
    if (data.error) {
      // The hosted proxy always answers 200 (it streams keep-alives), so errors arrive in the body.
      const err = new Error(`${data.error.code || ''} ${String(data.error.message || data.error).slice(0, 300)}`);
      err.status = +data.error.code || 500;
      throw err;
    }
    const text = this.style === 'anthropic'
      ? (data.content || []).map((c) => c.text || '').join('')
      : data.choices?.[0]?.message?.content || '';
    const u = data.usage || {};
    const inT = u.prompt_tokens ?? u.input_tokens ?? 0, outT = u.completion_tokens ?? u.output_tokens ?? 0;
    this.usage.calls++; this.usage.inputTokens += inT; this.usage.outputTokens += outT; this.usage.ms += Date.now() - t0;
    const bm = (this.usage.byModel[model] ||= { calls: 0, inputTokens: 0, outputTokens: 0 });
    bm.calls++; bm.inputTokens += inT; bm.outputTokens += outT;
    return { text, model };
  }

  /** Chat with retry + model fallback. Returns { text, model }. */
  async chat(system, user, opts = {}) {
    const o = { json: false, maxTokens: 4096, temperature: this.temperature, ...opts };
    let lastErr;
    for (const model of this.models) {
      for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
        try {
          return await this._call(model, system, user, o);
        } catch (e) {
          lastErr = e;
          const transient = !e.status || e.status === 429 || e.status >= 500;
          if (e.status === 404 || e.status === 400 && /model/i.test(e.message)) break; // model gone -> next model
          if (e.status === 429 && /per day|PerDay|daily/i.test(e.message)) break; // daily quota spent -> next model now
          if (!transient) throw e;
          const wait = Math.min(30000, 1500 * 2 ** attempt) + Math.random() * 500;
          this.log(`  ${model}: ${String(e.message).slice(0, 80)} — retry in ${Math.round(wait / 1000)}s`);
          await sleep(wait);
          if (attempt >= 2 && e.status === 503) break; // overloaded model: fall back sooner
        }
      }
      this.log(`  falling back from ${model}`);
    }
    throw lastErr;
  }

  /** Chat and parse a JSON object out of the reply; one repair round if the JSON is broken. */
  async chatJSON(system, user, opts = {}) {
    const r = await this.chat(system, user, { ...opts, json: true });
    try {
      return { data: extractJSON(r.text), model: r.model };
    } catch (e) {
      const fix = await this.chat('Return only valid JSON. No prose.', `Fix this into valid JSON:\n${r.text.slice(0, 12000)}`, { ...opts, json: true });
      return { data: extractJSON(fix.text), model: fix.model };
    }
  }
}

/** Build an LLM from env-style config (Node CLI). */
export function llmFromEnv(env) {
  const provider = env.LLM_PROVIDER || 'gemini';
  const keyVar = { gemini: 'GEMINI_API_KEY', groq: 'GROQ_API_KEY', openrouter: 'OPENROUTER_API_KEY', openai: 'OPENAI_API_KEY', anthropic: 'ANTHROPIC_API_KEY' }[provider];
  return new LLM({
    provider,
    model: env.LLM_MODEL || undefined,
    baseUrl: env.LLM_BASE_URL || undefined,
    apiKey: env.LLM_API_KEY || (keyVar ? env[keyVar] : ''),
    log: (m) => process.stderr.write(m + '\n'),
  });
}
