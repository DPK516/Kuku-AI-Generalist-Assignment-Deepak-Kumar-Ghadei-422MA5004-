#!/usr/bin/env node
// Runs the AI lawyer on scripted test cases and writes raw, unedited transcripts + an auto-scored summary.
//   node cli/lawyer.mjs [tests/lawyer_cases.json] [--only T01,T03] [--out outputs/p2] [--provider P --model M]
// Or chat interactively:   node cli/lawyer.mjs --chat
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { loadEnv, args, write, ROOT } from './common.mjs';
import { llmFromEnv } from '../public/js/core/llm.js';
import { Haq, PROMPT_VERSION, detectLanguage } from '../public/js/lawyer/agent.js';
import { KB_VERSION } from '../public/js/lawyer/kb.js';

const env = loadEnv();
const a = args();
if (a.provider) env.LLM_PROVIDER = a.provider;
if (a.model) env.LLM_MODEL = a.model;
const llm = llmFromEnv(env);

if (a.chat) {
  const haq = new Haq(llm);
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('Haq — describe your problem (Ctrl+C to quit). Commands: /draft legal_notice|consumer_complaint|wage_claim|notice_reply|bank_complaint, /case');
  for (;;) {
    const q = await rl.question('\nyou> ');
    if (q.startsWith('/draft')) { const d = await haq.draft(q.split(' ')[1]); console.log(`\n${d.title}\n\n${d.document}\n\nFill in: ${d.placeholders.join(', ')}`); continue; }
    if (q === '/case') { console.log(JSON.stringify(haq.case, null, 2)); continue; }
    const r = await haq.turn(q);
    console.log(`\nhaq> ${r.reply}\n   [sources: ${r.sources.map((s) => s.id).join(', ') || 'none'}${r.needsLawyer ? ' · NEEDS LAWYER' : ''}${r.guard.removed.length ? ` · guard removed ${r.guard.removed.length}` : ''}]`);
  }
}

const casesPath = a._[0] || path.join(ROOT, 'tests', 'lawyer_cases.json');
let cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
if (a.only) cases = cases.filter((c) => a.only.split(',').some((p) => c.id.startsWith(p)));
const out = path.resolve(a.out || path.join(ROOT, 'outputs', 'p2'));

const scriptOf = (s) => {
  const dev = (s.match(/[ऀ-ॿ]/g) || []).length, tam = (s.match(/[஀-௿]/g) || []).length, lat = (s.match(/[A-Za-z]/g) || []).length;
  return tam > lat && tam > dev ? 'tamil' : dev > lat ? 'devanagari' : 'latin';
};

const summary = [];
for (const c of cases) {
  process.stderr.write(`${c.id} … `);
  const haq = new Haq(llm);
  const rec = { id: c.id, why: c.why, model: null, promptVersion: PROMPT_VERSION, kbVersion: KB_VERSION, turns: [], draft: null, practice: null, checks: [] };
  try {
    for (const t of c.turns) {
      const r = await haq.turn(t);
      rec.model = r.model;
      rec.turns.push({ user: t, reply: r.reply, language: r.language, topic: r.topic, stage: r.stage, needsLawyer: r.needsLawyer, lawyerReason: r.lawyerReason, lawyerLater: r.lawyerLater, sources: r.sources.map((s) => s.id), guardRemoved: r.guard.removed, invalidSourceIds: r.guard.invalidSourceIds, redFlags: r.redFlags, nextActions: r.nextActions });
    }
    rec.caseFile = haq.case;
    if (c.draft) {
      const d = await haq.draft(c.draft);
      rec.draft = { kind: d.kind, title: d.title, document: d.document, placeholders: d.placeholders, howToSend: d.howToSend, sources: d.sources.map((s) => s.id), guardRemoved: d.guard.removed };
    }
    if (c.practice) {
      rec.practice = [];
      const hist = [];
      for (const line of c.practice.lines) {
        const p = await haq.practice(c.practice.role, line, hist);
        rec.practice.push({ user: line, ...p });
        hist.push({ role: 'user', content: line }, { role: 'assistant', content: p.inCharacter });
      }
    }
    // ---- automatic checks (what code can verify; tone and helpfulness still need a human read) ----
    const e = c.expect || {};
    const last = rec.turns[rec.turns.length - 1];
    const allReplies = rec.turns.map((t) => t.reply).join('\n');
    if (e.topic) rec.checks.push({ id: 'topic', ok: rec.turns.some((t) => t.topic === e.topic), got: last.topic, want: e.topic });
    if (e.needs_lawyer !== undefined && e.needs_lawyer !== 'either') rec.checks.push({ id: 'needs_lawyer', ok: rec.turns.some((t) => t.needsLawyer) === e.needs_lawyer, got: rec.turns.some((t) => t.needsLawyer), want: e.needs_lawyer });
    if (e.lang) rec.checks.push({ id: 'reply_language', ok: rec.turns.every((t) => detectLanguage(t.reply) === e.lang), got: rec.turns.map((t) => detectLanguage(t.reply)).join(','), want: e.lang });
    if (e.script) rec.checks.push({ id: 'same_language', ok: rec.turns.every((t) => scriptOf(t.reply) === e.script), got: rec.turns.map((t) => scriptOf(t.reply)).join(','), want: e.script });
    for (const m of e.must_mention || []) rec.checks.push({ id: `mentions_${m}`, ok: allReplies.includes(m), want: m });
    rec.checks.push({ id: 'cites_only_kb', ok: rec.turns.every((t) => !t.invalidSourceIds.length), got: rec.turns.flatMap((t) => t.invalidSourceIds).join(',') || 'ok' });
    rec.checks.push({ id: 'guard_removals', ok: true, info: true, got: rec.turns.reduce((n, t) => n + t.guardRemoved.length, 0) + (rec.draft?.guardRemoved.length || 0) });
    if (rec.draft) rec.checks.push({ id: 'draft_uses_placeholders_not_invented_facts', ok: rec.draft.placeholders.length > 0, got: rec.draft.placeholders.length });
    process.stderr.write(`${rec.checks.filter((x) => !x.ok).length ? 'some checks failed' : 'ok'}\n`);
  } catch (err) {
    rec.error = String(err.message || err);
    process.stderr.write(`ERROR ${rec.error.slice(0, 120)}\n`);
  }
  write(path.join(out, 'transcripts'), `${c.id}.json`, JSON.stringify(rec, null, 2));
  // Human-readable transcript, unedited.
  const md = [`# ${c.id}`, `_${c.why}_`, '', `model: ${rec.model} · prompt ${PROMPT_VERSION} · KB ${KB_VERSION}`, ''];
  for (const t of rec.turns) {
    md.push(`**Person:** ${t.user}`, '', `**Haq:** ${t.reply}`, '', `> topic: ${t.topic} · language: ${t.language} · stage: ${t.stage} · needs lawyer now: ${t.needsLawyer}${t.lawyerReason ? ` (${t.lawyerReason})` : ''}${t.lawyerLater ? ` · lawyer later: ${t.lawyerLater}` : ''} · sources: ${t.sources.join(', ') || '—'}${t.guardRemoved.length ? ` · **guard removed:** ${t.guardRemoved.map((g) => `"${g.ref}" (${g.why})`).join('; ')}` : ''}`, '');
  }
  if (rec.caseFile) md.push('**Case file built:**', '```json', JSON.stringify(rec.caseFile, null, 2), '```', '');
  if (rec.draft) md.push(`## Draft: ${rec.draft.title}`, '```', rec.draft.document, '```', `Placeholders to fill: ${rec.draft.placeholders.join(', ')}`, '', `How to send: ${rec.draft.howToSend}`, '');
  if (rec.practice) for (const p of rec.practice) md.push(`## Practice`, `**Person:** ${p.user}`, `**Other side:** ${p.inCharacter}`, `**Coach:** ${p.coachTip} (score ${p.score})`, '');
  md.push('## Automatic checks', ...rec.checks.map((x) => `- ${x.info ? 'ℹ️' : x.ok ? '✅' : '❌'} ${x.id}${x.got !== undefined ? ` — got ${x.got}` : ''}${x.want !== undefined ? `, want ${x.want}` : ''}`));
  if (rec.error) md.push('', `ERROR: ${rec.error}`);
  write(path.join(out, 'transcripts'), `${c.id}.md`, md.join('\n'));
  summary.push(rec);
}

const allChecks = summary.flatMap((r) => r.checks.filter((c) => !c.info).map((c) => ({ ...c, case: r.id })));
const report = [
  `# AI Lawyer — test run`, '', `Model: ${llm.provider}/${summary.find((s) => s.model)?.model} · prompt ${PROMPT_VERSION} · KB ${KB_VERSION} · ${new Date().toISOString()}`,
  `LLM usage: ${llm.usage.calls} calls, ${llm.usage.inputTokens} input + ${llm.usage.outputTokens} output tokens`, '',
  `Automatic checks passed: **${allChecks.filter((c) => c.ok).length}/${allChecks.length}**`, '',
  '| Case | Checks | Guard removals | Needs lawyer | Sources cited | Error |', '|---|---|---|---|---|---|',
  ...summary.map((r) => `| ${r.id} | ${r.checks.filter((c) => !c.info && c.ok).length}/${r.checks.filter((c) => !c.info).length}${r.checks.filter((c) => !c.ok).length ? ' (' + r.checks.filter((c) => !c.ok).map((c) => c.id).join(', ') + ')' : ''} | ${r.checks.find((c) => c.id === 'guard_removals')?.got ?? '-'} | ${r.turns.some((t) => t.needsLawyer)} | ${[...new Set(r.turns.flatMap((t) => t.sources))].join(', ')} | ${r.error ? 'yes' : ''} |`),
];
write(out, 'SUMMARY.md', report.join('\n'));
console.error(`\n${allChecks.filter((c) => c.ok).length}/${allChecks.length} checks passed · ${llm.usage.calls} calls · output ${out}`);
