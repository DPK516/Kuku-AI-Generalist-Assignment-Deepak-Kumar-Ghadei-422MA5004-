# T06-cheque-en
_Strict statutory deadlines must be stated correctly (30 days / 15 days / 1 month)_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** My friend gave me a cheque for Rs 50,000 to repay a loan. It bounced on 2 November. The bank's return memo says 'funds insufficient'. What should I do?

**Haq:** Hello! I am Haq, a legal first-aid assistant (not a lawyer). I can help you understand your options when a cheque bounces.

For a bounced cheque, strict deadlines apply. Since the bank return memo is dated 2 November, you must send a formal written demand notice to your friend within 30 days of receiving that memo. 

Do you have the bank's original return memo and a copy of the cheque? Have you spoken to your friend about this yet?

> topic: cheque · language: en · stage: intake · needs lawyer: false · sources: cheque-138

**Case file built:**
```json
{
  "summary": "Friend gave a cheque for Rs 50,000 for loan repayment which bounced due to insufficient funds on 2 November.",
  "person": "Lender",
  "other_side": "Friend (Borrower)",
  "amount": "Rs 50,000",
  "key_dates": [
    {
      "date": "2023-11-02",
      "event": "Cheque bounced due to insufficient funds"
    }
  ],
  "evidence_have": [
    "Bank return memo"
  ],
  "evidence_missing": [],
  "goal": "Recover the loan amount of Rs 50,000",
  "deadline_risks": [
    "Must send written demand notice within 30 days of receiving the bank's return memo"
  ]
}
```

## Automatic checks
- ✅ topic — got cheque, want cheque
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ mentions_30, want 30
- ❌ mentions_15, want 15
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0