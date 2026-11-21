# AI Generalist assignment: three prototypes

| | Tool | Web | CLI |
|---|---|---|---|
| 1 | **Promo Finder**: ranked 20–60s promos from timestamped microdrama screenplays | `promos.html` | `node cli/promos.mjs <scripts.zip or folder>` |
| 2 | **Haq**: legal first aid for India (deposit, refund, salary, cheque, UPI, notices), text or voice, any language | `lawyer.html` | `node cli/lawyer.mjs` (test cases) · `node cli/lawyer.mjs --chat` |
| 3 | **Continuity Guard**: pre-render name, label and fact drift check for AI microdrama scripts | `continuity.html` | `node cli/continuity.mjs <scripts.zip or folder>` |

There is no build step and there are no dependencies, only Node 20+ (for the CLI) or a modern browser. The same ES modules in `public/js/` run in both.

## Run

```bash
# 1. put a key in .env (free Gemini key: https://aistudio.google.com/apikey)
echo "GEMINI_API_KEY=..." > .env

# 2. Problem 1 — writes outputs/p1/ai/{promos.json,csv,md,top10.edl}
node cli/promos.mjs path/to/scripts.zip --strong-model gemini-3.8-flash
node cli/promos.mjs path/to/scripts.zip --rules-only        # no key needed

# 3. Problem 2 — runs tests/lawyer_cases.json, writes outputs/p2/
node cli/lawyer.mjs
node tests/guard.test.mjs                                  # citation-guard unit tests (no key)

# 4. Problem 3 — writes outputs/p3/ai/continuity.{json,md}
node cli/continuity.mjs path/to/scripts.zip

# local web app
node tools/serve.mjs 8787   # then open http://localhost:8787
```

## Swap the model

Every LLM call goes through `public/js/core/llm.js`. That includes an OpenAI-compatible path (Gemini, Groq, OpenRouter, OpenAI, Together, Ollama, any gateway) and a native Anthropic path. Switch with env vars:

```bash
LLM_PROVIDER=anthropic ANTHROPIC_API_KEY=... LLM_MODEL=claude-sonnet-5-5 node cli/promos.mjs scripts.zip
LLM_PROVIDER=custom LLM_BASE_URL=https://your-gateway/v1 LLM_API_KEY=... LLM_MODEL=... node cli/promos.mjs scripts.zip
```

In the web app, use the **Model** panel. Keys stay in that browser's localStorage. The hosted "demo key" option goes through a Netlify edge function (`netlify/edge-functions/llm.js`) that holds a free-tier key server-side.

## Layout

```
public/js/core/       llm.js (provider-agnostic client, retries, model fallback, rpm pacing), files.js (zip reader)
public/js/promos/     parse.js (screenplay → beats) · heuristics.js (rules + validators) · judge.js (LLM prompts) · pipeline.js (orchestration + exports)
public/js/lawyer/     kb.js (the only law it may cite) · agent.js (red flags, citation guard, chat/draft/practice)
public/js/continuity/ engine.js (rule passes, fact ledger, reconcile, evidence verification)
cli/                  Node entry points · tests/ test cases + unit tests · outputs/ raw outputs
```

The input pack is confidential: it is not in this source and is not hosted.
