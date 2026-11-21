# Raw outputs (unedited)

Every file here was written by the tools themselves. Nothing was hand-edited. The input pack (Kuku's scripts) is **not** included; only tool outputs are. The outputs quote short lines from the scripts so a reviewer can check each pick.

All AI runs used **Gemini 3.5 Flash-Lite on the free tier** (with automatic fallback to 3.1 Flash-Lite when overloaded). Earlier runs are kept on purpose: they show bugs the tests caught and what changed.

## p1/ — Promo Finder (full input pack, 50 episodes)
| Folder | What it is |
|---|---|
| `final_ai/` | **Final run.** `promos.md` (readable report with clip scripts), `promos.csv`, `promos.json` (everything, incl. per-promo checks, critic review, score parts), `top10.edl` (CMX3600 EDL of the posting order), `run.log`. `promos.before_rerank.json` is the same run before the `--rerank` step (pure code: new flag rule, no model calls). |
| `rules_only/` | Same input, no AI: keyword rules only (0.1 s, free). The baseline. |
| `earlier_run1_critic_top30_bug/` | First AI run. The blind critic only reviewed the top 30, which distorted the ranking. |
| `earlier_run2_silent_drop_bug/` | Second AI run. The model answered under a different JSON key for Ep 1 and Ep 5, and those episodes silently got no promos. Fixed afterwards. |
| `EVAL_vs_gold.md`, `promo_gold.json` | Every run scored against 12 must-have moments picked by reading the scripts. |

## p2/ — Haq, AI lawyer (13 test cases written for this)
| Folder | What it is |
|---|---|
| `final_v6/` | **Final run: 65/65 automatic checks.** `SUMMARY.md` plus one `.md` (readable) and `.json` (everything) transcript per case: replies, case file, sources cited, guard removals, drafts, practice role-play. |
| `earlier_v3/`, `earlier_v4/`, `earlier_v5/` | Earlier prompt/code versions (63/65, 63/65, 64/65). The doc explains each failure and fix. |
| `test_cases.json` | The 13 cases and their expected behaviour. |
| `guard_unit_tests.txt` | 22 unit tests of the citation guard and red-flag rules (no AI). |

## p3/ — Continuity Guard (full input pack, 50 episodes)
| Folder | What it is |
|---|---|
| `final_ai/` | **Final run.** `continuity.md` (16 issues with episode, beat and timestamp evidence, and a story bible), `continuity.json` (incl. every AI label resolution, and whether it was accepted or why rejected). |
| `rules_only/` | No AI: 6 issues in 0.1 s. |
| `earlier_run1_single_reconcile/` | First design (one big AI call). It duplicated rule findings and produced a wrong story bible. Kept to show why the design changed. |
| `earlier_run2_no_same_scene_check/` | Before the "two labels in the same scene are two people" rule. It merged the Dowager Duchess into Catherine. |

Re-run everything: see `README.md` in the source zip (`node cli/promos.mjs`, `node cli/lawyer.mjs`, `node cli/continuity.mjs`).
