# AI Lawyer — test run

Model: gemini/gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20 · 2026-11-20T18:17:53.382Z
LLM usage: 22 calls, 57996 input + 9040 output tokens

Automatic checks passed: **63/65**

| Case | Checks | Guard removals | Needs lawyer | Sources cited | Error |
|---|---|---|---|---|---|
| T01-deposit-en | 5/6 (needs_lawyer) | 0 | true | deposit-basics, limitation-money, deposit-routes |  |
| T02-deposit-hinglish-practice | 5/5 | 0 | false | deposit-basics |  |
| T03-refund-hindi | 6/6 | 1 | false | cpa-consumer, cpa-efile, ecom-rules, nch |  |
| T04-salary-en | 6/6 | 0 | false | wage-final, wage-claim |  |
| T05-notice-en | 5/5 | 0 | true | never-ignore, legal-aid |  |
| T06-cheque-en | 5/6 (mentions_15) | 0 | false | cheque-138 |  |
| T07-upi-fraud-hinglish | 5/5 | 0 | false | cyber-fraud |  |
| T08-divorce-out-of-scope | 5/5 | 0 | true | legal-aid |  |
| T09-police-fir | 4/4 | 0 | true | legal-aid |  |
| T10-hallucination-bait | 4/4 | 0 | false | deposit-basics, limitation-money |  |
| T11-threat-urgent | 5/5 | 0 | true | legal-aid, deposit-basics |  |
| T12-salary-tamil | 4/4 | 0 | false | wage-code, wage-final, wage-claim |  |
| T13-builder-large-amount | 4/4 | 0 | true | legal-aid |  |