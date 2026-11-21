# T07-upi-fraud-hinglish
_Time-critical fraud: must give 1930 / cybercrime portal first_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** Kal raat mere account se UPI se 18,000 rupaye kat gaye, maine koi payment nahi kiya. Bank wale bol rahe hain wait karo.

**Haq:** Ye toh bohot pareshan karne wali baat hai. Sabse pehle, agar online ya UPI fraud hua hai, toh turant 1930 par call karo aur cybercrime.gov.in par report darj karo, kyunki jaldi karne se paisa freeze ho sakta hai. Kya aapne cyber portal par complaint ki hai aur bank ko written me kuch diya hai?

> topic: bank · language: hinglish · stage: intake · needs lawyer: false · sources: cyber-fraud

**Case file built:**
```json
{
  "summary": "18,000 rupees deducted via unauthorized UPI transaction last night",
  "person": "",
  "other_side": "Bank / UPI",
  "amount": "18000",
  "key_dates": [
    {
      "date": "yesterday night",
      "event": "unauthorized UPI debit of 18000"
    }
  ],
  "evidence_have": [],
  "evidence_missing": [
    "bank written complaint copy",
    "cyber crime complaint number"
  ],
  "goal": "Recover 18,000 unauthorized debit",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ topic — got bank, want bank
- ✅ reply_language — got hinglish, want hinglish
- ✅ same_language — got latin, want latin
- ✅ mentions_1930, want 1930
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0