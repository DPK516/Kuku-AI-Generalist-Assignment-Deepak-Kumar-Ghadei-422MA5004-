// Hosted demo proxy: lets reviewers try the tools without bringing an API key.
// The free-tier Gemini key lives in a Netlify environment variable and never reaches the browser.
// Responds immediately and streams whitespace keep-alives until the model answers, so long
// LLM calls are not cut off by the edge runtime's time-to-first-byte limit.

const UPSTREAM = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
const MODELS = new Set(['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-lite-latest']);
const MAX_BODY = 600_000;

// Same-origin by default; additionally allow a locally served copy of the UI (http://localhost:PORT),
// so the tools can be run on confidential scripts locally while still using the hosted demo key.
const corsFor = (request) => {
  const o = request.headers.get('origin') || '';
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o)
    ? { 'access-control-allow-origin': o, 'access-control-allow-headers': 'content-type, authorization', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'origin' }
    : {};
};

export default async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsFor(request) });
  if (request.method !== 'POST') return new Response('POST only', { status: 405 });
  const key = Netlify.env.get('GEMINI_API_KEY');
  if (!key) return Response.json({ error: { code: 503, message: 'Demo key not configured on this deployment — add your own key in Model settings.' } });
  const raw = await request.text();
  if (raw.length > MAX_BODY) return Response.json({ error: { code: 413, message: 'Request too large for the demo proxy.' } });
  let body;
  try { body = JSON.parse(raw); } catch { return Response.json({ error: { code: 400, message: 'bad JSON' } }); }
  if (!MODELS.has(body.model)) body.model = 'gemini-3.5-flash';
  body.max_tokens = Math.min(+body.max_tokens || 4096, 8192);
  delete body.stream;

  const enc = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const beat = setInterval(() => controller.enqueue(enc.encode(' ')), 5000);
      try {
        const r = await fetch(UPSTREAM, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
          body: JSON.stringify(body),
        });
        let text = await r.text();
        if (!r.ok) {
          let msg = text.slice(0, 400);
          try { const j = JSON.parse(text); msg = (Array.isArray(j) ? j[0] : j).error?.message || msg; } catch { /* keep raw */ }
          text = JSON.stringify({ error: { code: r.status, message: msg } });
        }
        controller.enqueue(enc.encode(text));
      } catch (e) {
        controller.enqueue(enc.encode(JSON.stringify({ error: { code: 502, message: String(e) } })));
      } finally {
        clearInterval(beat);
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...corsFor(request) } });
};

export const config = { path: '/api/llm' };
