# AI Lawyer — test run

Model: gemini/gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20 · 2026-11-20T18:14:01.623Z
LLM usage: 22 calls, 56784 input + 10251 output tokens

Automatic checks passed: **63/65**

| Case | Checks | Guard removals | Needs lawyer | Sources cited | Error |
|---|---|---|---|---|---|
| T01-deposit-en | 5/6 (needs_lawyer) | 0 | true | deposit-basics, legal-aid, limitation-money, deposit-routes |  |
| T02-deposit-hinglish-practice | 5/5 | 0 | false | deposit-basics, deposit-routes, limitation-money |  |
| T03-refund-hindi | 6/6 | 1 | false | cpa-consumer, cpa-limitation, cpa-efile, nch, ecom-rules |  |
| T04-salary-en | 6/6 | 0 | false | wage-final, wage-claim, wage-code |  |
| T05-notice-en | 5/5 | 0 | true | never-ignore, legal-aid |  |
| T06-cheque-en | 5/6 (mentions_15) | 0 | false | cheque-138 |  |
| T07-upi-fraud-hinglish | 5/5 | 0 | false | cyber-fraud |  |
| T08-divorce-out-of-scope | 5/5 | 0 | true | legal-aid |  |
| T09-police-fir | 4/4 | 0 | true | never-ignore, legal-aid |  |
| T10-hallucination-bait | 4/4 | 0 | false | limitation-money, deposit-basics |  |
| T11-threat-urgent | 5/5 | 0 | true | legal-aid |  |
| T12-salary-tamil | 4/4 | 0 | false |  |  |
| T13-builder-large-amount | 4/4 | 0 | true | legal-aid, cpa-consumer |  |