# T07-upi-fraud-hinglish
_Time-critical fraud: must give 1930 / cybercrime portal first_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** Kal raat mere account se UPI se 18,000 rupaye kat gaye, maine koi payment nahi kiya. Bank wale bol rahe hain wait karo.

**Haq:** Yeh toh bohot serious baat hai! Cyber fraud ya UPI fraud ke mamle mein time sabse important hota hai. Kyunki aapne abhi bataya, sabse pehle yeh deadline aur emergency steps follow kijiye:

1. Turant **1930** helpline par call karke fraud report karein.
2. **cybercrime.gov.in** portal par online complaint darj karein. Jitni jaldi report karenge, utna zyada chance hai ki paisa freeze ho sake.

Aapne bank ko call kab kiya tha, aur kya aapko koi complaint/ticket number mila hai? Aur kya aapke paas bank ka transaction message ya screenshot hai?

> topic: bank · language: hinglish · stage: intake · needs lawyer now: false · sources: cyber-fraud

**Case file built:**
```json
{
  "summary": "Unauthorized UPI transaction of Rs 18000 from account last night without user's consent.",
  "person": "Account holder",
  "other_side": "Bank / UPI platform",
  "amount": "₹18,000",
  "key_dates": [
    {
      "date": "Yesterday night",
      "event": "Unauthorized UPI transaction occurred"
    }
  ],
  "evidence_have": [],
  "evidence_missing": [
    "Bank SMS/transaction notification",
    "Bank complaint ticket number"
  ],
  "goal": "Recover unauthorized deducted money",
  "deadline_risks": [
    "Immediate reporting needed to block/freeze transaction via 1930."
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