# T07-upi-fraud-hinglish
_Time-critical fraud: must give 1930 / cybercrime portal first_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** Kal raat mere account se UPI se 18,000 rupaye kat gaye, maine koi payment nahi kiya. Bank wale bol rahe hain wait karo.

**Haq:** Ye sunkar bura laga. UPI fraud ke maamle mein time bahut zaroori hota hai, isiliye jaldi action lena hoga.

1. Turant **1930** number par call karke cyber crime helpline par complaint darj karein.
2. Online **cybercrime.gov.in** par bhi apna case file karein, kyunki jaldi report karne se paise freeze ho sakte hain.

Aapne bank ko written mein complaint di kya, aur kya aapko koi complaint reference number mila hai?

> topic: bank · language: hinglish · stage: intake · needs lawyer now: false · sources: cyber-fraud

**Case file built:**
```json
{
  "summary": "₹18,000 unauthorized UPI deduction from account",
  "person": "",
  "other_side": "Bank / Unknown",
  "amount": "₹18,000",
  "key_dates": [
    {
      "date": "yesterday night",
      "event": "Money deducted via UPI without authorization"
    }
  ],
  "evidence_have": [],
  "evidence_missing": [
    "bank complaint reference number"
  ],
  "goal": "Recover unauthorized deducted money",
  "deadline_risks": [
    "Immediate reporting required to freeze funds"
  ]
}
```

## Automatic checks
- ✅ topic — got bank, want bank
- ✅ reply_language — got hinglish, want hinglish
- ✅ same_language — got latin, want latin
- ✅ mentions_1930, want 1930
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0