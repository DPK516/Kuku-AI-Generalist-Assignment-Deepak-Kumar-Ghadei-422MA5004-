# T02-deposit-hinglish-practice
_Hinglish, weaker evidence, then role-play with the landlord_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** Bhai mera landlord 2 mahine ka deposit 30000 wapas nahi de raha, bolta hai flat ganda chhoda. Kya karun?

**Haq:** Namaste! Yeh toh pareshani wali baat hai. Aapka 30,000 ka security deposit landlord nahi de raha hai, jabki deposit aapka hi paisa hota hai jo normal wear and tear ke alawa nuksan par hi kata ja sakta hai. Don't worry, hum isko step-by-step theek karenge.

Mujhe bas do baatein batayiye:
1. Aapne flat kis tareek ya mahine mein khali kiya tha?
2. Kya aapke paas rent agreement ya deposit dene ki koi receipt/bank statement hai?

> topic: deposit · language: hinglish · stage: intake · needs lawyer now: false · sources: deposit-basics

**Person:** Agreement tha but registered nahi tha, bas notary wala. Whatsapp pe usne likha tha ki deposit wapas milega.

**Haq:** Notary wala agreement aur WhatsApp chat bhi kaafi strong proof hain! Agreement hone ka matlab hai ki aapke paas likhit saboot hai ki deposit diya gaya tha, aur WhatsApp par uska maan na ki deposit wapas milega, aapke case ko aur mazboot banata hai.

Aapke paas deposit recover karne ke yeh steps hain:
1. Ek written demand notice bhejiye, jisme saaf likhiye ki paisa jaldi wapas karein.
2. Agar woh na maane, toh aap civil court mein money recovery ka case kar sakte hain (iska limit 3 saal hota hai).

Kya aap chahte hain ki main ek demand letter ka draft taiyar karoon jise aap WhatsApp ya courier se bhej sakein?

> topic: deposit · language: hinglish · stage: options · needs lawyer now: false · sources: limitation-money, deposit-basics, deposit-routes

**Case file built:**
```json
{
  "summary": "Landlord is withholding ₹30,000 security deposit claiming flat was left dirty.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "₹30,000",
  "key_dates": [],
  "evidence_have": [
    "Notary rent agreement",
    "WhatsApp chat acknowledging deposit return"
  ],
  "evidence_missing": [],
  "goal": "Recover ₹30,000 security deposit",
  "deadline_risks": []
}
```

## Practice
**Person:** Sharma ji, maine flat saaf karke chhoda tha, photos bhi hain. Mera 30000 deposit kab tak wapas karoge?
**Other side:** Dekhiye Mishra ji, aapne safai toh ki hogi par kitchen ki chimney aur bathroom ke tiles bilkul kharab the. Deep cleaning mein mera ₹8,000 kharch ho gaya hai. Baki paisa aane wale hafte mein bhej dunga, abhi thoda tang chal raha hoon.
**Coach:** Respond calmly, reference your WhatsApp chat and move-out photos as evidence, state a clear deadline (e.g., within 48 hours), and mention that the next step will be sending a formal written demand notice. (score 6)

## Automatic checks
- ✅ topic — got deposit, want deposit
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hinglish,hinglish, want hinglish
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0