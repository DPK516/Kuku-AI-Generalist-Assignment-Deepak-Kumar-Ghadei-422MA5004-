#!/usr/bin/env node
// Promo finder CLI.
//   node cli/promos.mjs <folder-or-zip> [--out outputs/p1] [--rules-only]
//        [--provider gemini|groq|openrouter|openai|anthropic|ollama|custom] [--model NAME]
//        [--strong-model gemini-3.8-flash] [--episodes 1-10] [--per-episode 3] [--montages 5] [--no-critic]
// Model is configured by .env / env vars: LLM_PROVIDER, LLM_MODEL, LLM_BASE_URL, <PROVIDER>_API_KEY.
import { loadEnv, args, readInput, write, ROOT } from './common.mjs';
import { llmFromEnv } from '../public/js/core/llm.js';
import { findPromos, rerank, toCSV, toMarkdown, toEDL, toJSON } from '../public/js/promos/pipeline.js';
import fs from 'node:fs';
import path from 'node:path';

const env = loadEnv();
const a = args();
// --rerank <promos.json>: recompute flags + posting order from saved model outputs (no API calls).
if (a.rerank) {
  const res = rerank(JSON.parse(fs.readFileSync(a.rerank, 'utf8')));
  const dir = path.resolve(a.out || path.dirname(a.rerank));
  write(dir, 'promos.json', toJSON(res)); write(dir, 'promos.csv', toCSV(res)); write(dir, 'promos.md', toMarkdown(res, { top: 40 })); write(dir, 'top10.edl', toEDL(res, { ids: res.postingOrder }));
  console.error('Re-ranked', res.promos.length, 'promos · posting order:', res.postingOrder.join(', '));
  process.exit(0);
}
if (!a._[0]) {
  console.error('usage: node cli/promos.mjs <scripts-folder-or-zip> [--out DIR] [--rules-only] [--provider P] [--model M] [--episodes A-B]');
  process.exit(1);
}
if (a.provider) env.LLM_PROVIDER = a.provider;
if (a.model) env.LLM_MODEL = a.model;
const llm = a['rules-only'] ? null : llmFromEnv(env);
const strongModel = a['strong-model'] || env.LLM_STRONG_MODEL;
const strongLlm = llm && strongModel ? llmFromEnv({ ...env, LLM_MODEL: strongModel }) : null;
const files = await readInput(a._[0]);
const out = path.resolve(a.out || path.join(ROOT, 'outputs', 'p1', llm ? 'ai' : 'rules'));
console.error(`Reading ${files.length} files · mode ${llm ? `AI (${llm.provider}/${llm.model}${strongLlm ? ` + strong ${strongLlm.model}` : ''})` : 'rules-only'} · output ${out}`);

const res = await findPromos(files, {
  llm,
  strongLlm,
  perEpisode: +(a['per-episode'] || 3),
  montages: +(a.montages ?? 5),
  critic: !a['no-critic'],
  concurrency: +(a.concurrency || 3),
  episodes: a.episodes ? a.episodes.split('-').map(Number) : null,
  onProgress: (p) => {
    if (p.stage === 'judge') process.stderr.write(`\r  judged ${p.done}/${p.total} episodes${p.error ? ' (fallback on ep ' + p.episode + ')' : ''}   `);
    else if (p.stage === 'critic' && p.done) process.stderr.write(`\r  critic ${p.done}/${p.total}   `);
    else process.stderr.write(`\n  ${p.stage}${p.episodes ? `: ${p.episodes} episodes, ${p.beats} beats` : ''}\n`);
  },
});

write(out, 'promos.json', toJSON(res));
write(out, 'promos.csv', toCSV(res));
write(out, 'promos.md', toMarkdown(res, { top: 40 }));
write(out, 'top10.edl', toEDL(res, { ids: res.postingOrder }));
const pass = res.promos.filter((p) => p.validation.pass).length;
console.error(`\nDone in ${res.meta.runtimeSec}s: ${res.promos.length} promos (${pass} pass all checks), errors ${res.meta.errors.length}`);
if (res.meta.usage) console.error(`LLM: ${res.meta.usage.calls} calls, ${res.meta.usage.inputTokens} in / ${res.meta.usage.outputTokens} out tokens`);
console.error('Posting order:', res.postingOrder.join(', '));
