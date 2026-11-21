#!/usr/bin/env node
// Scores promo results against the hand-picked gold moments.
//   node cli/eval_promos.mjs outputs/p1/ai/promos.json [outputs/p1/rules/promos.json ...]
// Metrics (per results file):
//   recall@all  - share of gold moments covered (>=50% of the moment window) by ANY promo in that episode
//   recall@top3 - same, using only the 3 highest-ranked promos of that episode (what an editor would look at first)
//   hook-in-3s  - for found moments, does the promo start within 3s of the moment's first beat?
//   posted      - gold moments that made it into the 10-item posting order
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, write } from './common.mjs';

const gold = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests', 'promo_gold.json'), 'utf8')).moments;
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node cli/eval_promos.mjs <promos.json> [...]'); process.exit(1); }

// Overlap divided by the SHORTER of (moment, promo's segments in that episode): a tight 20s cut taken from
// inside a 60s moment counts as finding it, and so does a promo that contains the whole moment.
// (v1 of this metric divided by the moment length only, which wrongly favoured long clips.)
const cover = (p, g) => {
  const segs = p.segments.filter((s) => s.episode === g.episode);
  const inter = segs.reduce((a, s) => a + Math.max(0, Math.min(s.end, g.end) - Math.max(s.start, g.start)), 0);
  const len = segs.reduce((a, s) => a + (s.end - s.start), 0);
  return len ? inter / Math.min(g.end - g.start, len) : 0;
};

const rows = [];
const lines = ['# Promo Finder — evaluation against gold moments', '', `Gold: ${gold.length} must-have moments in ${new Set(gold.map((g) => g.episode)).size} episodes (tests/promo_gold.json).`, ''];
for (const f of files) {
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  const posted = new Set(r.postingOrder || []);
  let all = 0, top3 = 0, hook = 0, inPost = 0;
  const detail = [];
  for (const g of gold) {
    const eps = r.promos.filter((p) => p.segments.some((s) => s.episode === g.episode));
    const best = eps.map((p) => ({ p, c: cover(p, g) })).sort((a, b) => b.c - a.c)[0];
    const top = eps.sort((a, b) => a.rank - b.rank).slice(0, 3);
    const foundAll = best && best.c >= 0.5;
    const foundTop = top.some((p) => cover(p, g) >= 0.5);
    const seg = foundAll ? best.p.segments.find((s) => s.episode === g.episode) : null;
    const hookOk = seg && Math.abs(seg.start - g.start) <= 3;
    const post = foundAll && r.promos.some((p) => posted.has(p.id) && cover(p, g) >= 0.5);
    all += foundAll ? 1 : 0; top3 += foundTop ? 1 : 0; hook += hookOk ? 1 : 0; inPost += post ? 1 : 0;
    detail.push(`| ${g.id} | ${foundAll ? `✅ ${best.p.id} (${Math.round(best.c * 100)}%)` : `❌ best ${best ? Math.round(best.c * 100) + '%' : '—'}`} | ${foundTop ? '✅' : '❌'} | ${seg ? `${(seg.start - g.start).toFixed(1)}s` : '—'} | ${post ? '✅' : ''} | ${g.what.slice(0, 70)} |`);
  }
  const n = gold.length;
  rows.push({ file: f, mode: r.meta.mode, model: r.meta.model, promos: r.promos.length, recallAll: all / n, recallTop3: top3 / n, hookIn3s: all ? hook / all : 0, posted: inPost });
  lines.push(`## ${r.meta.mode}${r.meta.model ? ` · ${r.meta.model}` : ''} — \`${path.relative(ROOT, f)}\``, '',
    `**Recall (any promo): ${all}/${n} · Recall (top-3 per episode): ${top3}/${n} · Starts within 3s of the moment: ${hook}/${all} · In the posting order: ${inPost}**`, '',
    '| Gold | Found (coverage) | In top 3 | Start offset | Posted | Moment |', '|---|---|---|---|---|---|', ...detail, '');
}
const out = write(path.join(ROOT, 'outputs', 'p1'), 'EVAL.md', lines.join('\n'));
console.table(rows.map((x) => ({ mode: x.mode, model: x.model, promos: x.promos, 'recall@all': x.recallAll.toFixed(2), 'recall@top3': x.recallTop3.toFixed(2), 'hook≤3s': x.hookIn3s.toFixed(2), posted: x.posted })));
console.error('wrote', out);
