# T06-cheque-en
_Strict statutory deadlines must be stated correctly (30 days / 15 days / 1 month)_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** My friend gave me a cheque for Rs 50,000 to repay a loan. It bounced on 2 November. The bank's return memo says 'funds insufficient'. What should I do?

**Haq:** Hello! I am Haq, a legal first-aid assistant (not a lawyer). 

Because this is a cheque bounce, **deadlines are very strict** and missing them means you lose your right under this law. Here is the timeline you must follow:
1. **Within 30 days** of getting the bank's return memo (date: 2 November), you must send a formal written demand notice to your friend.
2. Your friend gets **15 days** from receiving the notice to pay the money.
3. If they still don't pay, you have **1 month** after those 15 days to file a criminal complaint in court.

To help you draft the demand notice, I need a couple of details:
1. Do you have a copy of the bank's return memo and the bounced cheque?
2. Do you have any written proof of the loan (like an agreement or messages)?

> topic: cheque · language: en · stage: intake · needs lawyer now: false · sources: cheque-138

**Case file built:**
```json
{
  "summary": "Friend gave a cheque of Rs 50,000 for a loan repayment which bounced on 2 November due to insufficient funds.",
  "person": "Lender",
  "other_side": "Friend",
  "amount": "Rs 50,000",
  "key_dates": [
    {
      "date": "2 November",
      "event": "Cheque bounced with return memo 'funds insufficient'"
    }
  ],
  "evidence_have": [
    "Bounced cheque",
    "Bank return memo"
  ],
  "evidence_missing": [
    "Written loan agreement or messages"
  ],
  "goal": "Recover Rs 50,000 loan amount",
  "deadline_risks": [
    "Must send written demand notice within 30 days of 2 November"
  ]
}
```

## Automatic checks
- ✅ topic — got cheque, want cheque
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ mentions_30, want 30
- ✅ mentions_15, want 15
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0