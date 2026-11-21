# AI Lawyer — test run

Model: gemini/gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20 · 2026-11-20T18:28:52.718Z
LLM usage: 24 calls, 60002 input + 10947 output tokens

Automatic checks passed: **64/65**

| Case | Checks | Guard removals | Needs lawyer | Sources cited | Error |
|---|---|---|---|---|---|
| T01-deposit-en | 5/6 (needs_lawyer) | 0 | true | deposit-basics, limitation-money, deposit-routes |  |
| T02-deposit-hinglish-practice | 5/5 | 0 | false | deposit-basics, limitation-money, deposit-routes |  |
| T03-refund-hindi | 6/6 | 1 | false | cpa-consumer, ecom-rules, nch, cpa-limitation |  |
| T04-salary-en | 6/6 | 0 | false | wage-final, wage-claim, samadhan |  |
| T05-notice-en | 5/5 | 0 | true | never-ignore, legal-aid |  |
| T06-cheque-en | 6/6 | 0 | false | cheque-138 |  |
| T07-upi-fraud-hinglish | 5/5 | 0 | false | cyber-fraud |  |
| T08-divorce-out-of-scope | 5/5 | 0 | true | legal-aid |  |
| T09-police-fir | 4/4 | 0 | true | legal-aid, never-ignore |  |
| T10-hallucination-bait | 4/4 | 0 | false |  |  |
| T11-threat-urgent | 5/5 | 0 | true | legal-aid |  |
| T12-salary-tamil | 4/4 | 0 | false |  |  |
| T13-builder-large-amount | 4/4 | 0 | true | cpa-consumer, legal-aid |  |