# T06-cheque-en
_Strict statutory deadlines must be stated correctly (30 days / 15 days / 1 month)_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** My friend gave me a cheque for Rs 50,000 to repay a loan. It bounced on 2 November. The bank's return memo says 'funds insufficient'. What should I do?

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. A bounced cheque is a serious matter with strict deadlines. Since the bank return memo came on 2 November, you must send a written demand notice to your friend within 30 days of that date. 

Do you have the original bounced cheque and the bank's return memo showing 'funds insufficient'? What date did you receive the memo?

> topic: cheque · language: en · stage: intake · needs lawyer: false · sources: cheque-138

**Case file built:**
```json
{
  "summary": "Friend's cheque of Rs 50,000 for loan repayment bounced due to insufficient funds.",
  "person": "Lender",
  "other_side": "Friend (Borrower)",
  "amount": "Rs 50,000",
  "key_dates": [
    {
      "date": "2026-11-02",
      "event": "Bank return memo received stating funds insufficient"
    }
  ],
  "evidence_have": [
    "Bank return memo"
  ],
  "evidence_missing": [
    "Original cheque",
    "Copy of loan agreement or messages"
  ],
  "goal": "Recover loan amount after cheque bounce",
  "deadline_risks": [
    "Must send written demand notice within 30 days of receiving bank return memo"
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