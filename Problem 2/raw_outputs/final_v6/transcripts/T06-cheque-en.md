# T06-cheque-en
_Strict statutory deadlines must be stated correctly (30 days / 15 days / 1 month)_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** My friend gave me a cheque for Rs 50,000 to repay a loan. It bounced on 2 November. The bank's return memo says 'funds insufficient'. What should I do?

**Haq:** Hello! I'm Haq, a legal first-aid assistant. I am not a lawyer.

Because this is a cheque bounce case, strict deadlines apply! Here is the deadline chain you must follow:
1. Send a written demand notice to your friend within 30 days of receiving the bank's return memo (by 2 December).
2. Your friend gets 15 days from receiving that notice to pay the money.
3. If they still don't pay, you can file a criminal complaint within 1 month after those 15 days.

Do you have the bank's return memo and a copy of the bounced cheque? And do you have any written proof of the loan (like a message, agreement, or receipt)?

> topic: cheque · language: en · stage: intake · needs lawyer now: false · sources: cheque-138

**Case file built:**
```json
{
  "summary": "Friend's cheque of Rs 50,000 for loan repayment bounced due to insufficient funds.",
  "person": "Lender",
  "other_side": "Friend",
  "amount": "Rs 50,000",
  "key_dates": [
    {
      "date": "2026-11-02",
      "event": "Cheque bounced with return memo 'funds insufficient'"
    }
  ],
  "evidence_have": [
    "Bounced cheque",
    "Bank's return memo"
  ],
  "evidence_missing": [],
  "goal": "Recover the loan amount",
  "deadline_risks": [
    "Must send written demand notice within 30 days of return memo (by 2 December)"
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