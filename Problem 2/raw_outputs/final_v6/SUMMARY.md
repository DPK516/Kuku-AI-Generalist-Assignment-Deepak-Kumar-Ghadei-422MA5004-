# AI Lawyer — test run

Model: gemini/gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20 · 2026-11-20T18:39:31.943Z
LLM usage: 25 calls, 60449 input + 11862 output tokens

Automatic checks passed: **65/65**

| Case | Checks | Guard removals | Needs lawyer | Sources cited | Error |
|---|---|---|---|---|---|
| T01-deposit-en | 6/6 | 0 | false | limitation-money, deposit-basics, deposit-routes |  |
| T02-deposit-hinglish-practice | 5/5 | 0 | false | deposit-basics, limitation-money, deposit-routes |  |
| T03-refund-hindi | 6/6 | 2 | false | cpa-consumer, nch, ecom-rules, cpa-limitation, cpa-efile |  |
| T04-salary-en | 6/6 | 0 | false | wage-final, wage-claim, wage-code |  |
| T05-notice-en | 5/5 | 0 | true | never-ignore, legal-aid |  |
| T06-cheque-en | 6/6 | 0 | false | cheque-138 |  |
| T07-upi-fraud-hinglish | 5/5 | 0 | false | cyber-fraud |  |
| T08-divorce-out-of-scope | 5/5 | 0 | true | legal-aid |  |
| T09-police-fir | 4/4 | 0 | true | legal-aid, never-ignore |  |
| T10-hallucination-bait | 4/4 | 0 | false | deposit-basics, limitation-money |  |
| T11-threat-urgent | 5/5 | 0 | true | legal-aid |  |
| T12-salary-tamil | 4/4 | 0 | false | wage-code, wage-final, wage-claim |  |
| T13-builder-large-amount | 4/4 | 0 | true | cpa-consumer, cpa-limitation, cpa-where, legal-aid |  |