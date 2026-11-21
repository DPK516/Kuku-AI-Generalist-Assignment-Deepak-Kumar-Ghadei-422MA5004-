# T07-upi-fraud-hinglish
_Time-critical fraud: must give 1930 / cybercrime portal first_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** Kal raat mere account se UPI se 18,000 rupaye kat gaye, maine koi payment nahi kiya. Bank wale bol rahe hain wait karo.

**Haq:** Yeh toh bohot galat hua! Sabse pehle aapko turant cyber crime helpline par call karna chahiye. 

Kya aapne 1930 number par call kiya hai ya cybercrime.gov.in par complaint darj ki hai?

> topic: bank · language: hinglish · stage: intake · needs lawyer: false · sources: cyber-fraud

**Case file built:**
```json
{
  "summary": "Rs 18,000 deducted via unauthorized UPI transaction last night, bank asked to wait.",
  "person": "",
  "other_side": "Bank",
  "amount": "Rs 18,000",
  "key_dates": [
    {
      "date": "Yesterday night",
      "event": "Unauthorized UPI deduction"
    }
  ],
  "evidence_have": [
    "Bank statement/SMS alert"
  ],
  "evidence_missing": [
    "Cyber complaint number"
  ],
  "goal": "Recover unauthorized deducted money",
  "deadline_risks": [
    "Speed is critical for UPI fraud to freeze money"
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