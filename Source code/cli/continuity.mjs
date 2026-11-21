#!/usr/bin/env node
// Continuity Guard CLI.
//   node cli/continuity.mjs <scripts-folder-or-zip> [--out outputs/p3] [--rules-only] [--provider P] [--model M] [--batch 10]
import path from 'node:path';
import { loadEnv, args, readInput, write, ROOT } from './common.mjs';
import { llmFromEnv } from '../public/js/core/llm.js';
import { runContinuity, toMarkdown } from '../public/js/continuity/engine.js';

const env = loadEnv();
const a = args();
if (!a._[0]) { console.error('usage: node cli/continuity.mjs <scripts-folder-or-zip> [--out DIR] [--rules-only] [--model M]'); process.exit(1); }
if (a.provider) env.LLM_PROVIDER = a.provider;
if (a.model) env.LLM_MODEL = a.model;
const llm = a['rules-only'] ? null : llmFromEnv(env);
const files = await readInput(a._[0]);
const out = path.resolve(a.out || path.join(ROOT, 'outputs', 'p3', llm ? 'ai' : 'rules'));
const r = await runContinuity(files, { llm, batchSize: +(a.batch || 10), onProgress: (p) => console.error(`  ${p.stage}${p.done ? ` ${p.done}/${p.total}` : ''}${p.ruleIssues != null ? `: ${p.ruleIssues} rule issues` : ''}`) });
write(out, 'continuity.json', JSON.stringify(r, null, 2));
write(out, 'continuity.md', toMarkdown(r));
console.error(`Done in ${r.meta.runtimeSec}s: ${r.issues.length} issues · errors ${r.meta.errors.length} · ${out}`);
