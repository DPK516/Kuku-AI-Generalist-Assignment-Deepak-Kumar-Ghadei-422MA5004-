# T02-deposit-hinglish-practice
_Hinglish, weaker evidence, then role-play with the landlord_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** Bhai mera landlord 2 mahine ka deposit 30000 wapas nahi de raha, bolta hai flat ganda chhoda. Kya karun?

**Haq:** Hello! Main Haq hoon, aapka legal first-aid assistant. Yeh tenant ya consumer disputes mein aapki madad kar sakta hoon (main lawyer nahi hoon). 

Landlord aapka ₹30,000 security deposit nahi de raha, yeh pareshani wali baat hai. Aam taur par agreement ke mutabiq, landlord ko vacating ke baad reasonable aur documented deductions ke baad deposit wapas dena hota hai. 

Aage badhne ke liye bas mujhe yeh bataiye:
1. Kya aapke paas koi written rent agreement hai aur kab aapne flat khali kiya?
2. Kya aapke paas flat handover karte waqt ki photos ya videos hain, ya deposit payment ka koi proof?

> topic: deposit · language: hinglish · stage: intake · needs lawyer now: false · sources: deposit-basics

**Person:** Agreement tha but registered nahi tha, bas notary wala. Whatsapp pe usne likha tha ki deposit wapas milega.

**Haq:** Notary wala agreement bhi ek proof hota hai, aur WhatsApp chats toh bohot strong evidence hain jisme usne deposit wapas dene ki baat maani hai! 

Aapke paas abhi yeh raste hain (cheapest se shuru karte hain):
1. **Written Demand:** Landlord ko ek formal written message ya notice bhejiye jisme saaf likhiye ki 30,000 wapas karein, kyunki WhatsApp par unhone wapas dene ka waada kiya tha.
2. **Legal Notice & Civil Claim:** Agar woh phir bhi na maane, toh aap 3 saal ke andar court mein recovery ka civil claim daal sakte hain. 

Kya aap chahte hain ki main landlord ko bhejne ke liye ek draft demand message tayyar karoon?

(Note: Agar baat aage court tak jati hai tabhi lawyer ki zarurat padegi, warna aap khud demand bhej sakte hain.)

> topic: deposit · language: hinglish · stage: options · needs lawyer now: false · sources: limitation-money, deposit-basics, deposit-routes

**Case file built:**
```json
{
  "summary": "Landlord is withholding a 2-month security deposit of ₹30,000, claiming the flat was left dirty.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "₹30,000",
  "key_dates": [],
  "evidence_have": [
    "Notary rent agreement",
    "WhatsApp chat confirming deposit return promise"
  ],
  "evidence_missing": [
    "Move-out date",
    "Photos/videos of flat condition",
    "Deposit payment proof"
  ],
  "goal": "Get the security deposit of ₹30,000 refunded",
  "deadline_risks": []
}
```

## Practice
**Person:** Sharma ji, maine flat saaf karke chhoda tha, photos bhi hain. Mera 30000 deposit kab tak wapas karoge?
**Other side:** Arre bhai, photos hone se kya hota hai? Kitchen ki chimney dekhi hai aapne? Kitna grease jama tha! Paint ka kharcha aur deep cleaning me mera 15,000 kharch ho gaya hai. Baki paisa mai agle mahine de dunga, abhi thoda tang chal raha hu.
**Coach:** Respond calmly, mention a specific deadline in writing (e.g., 'Please transfer the remaining amount by Friday'), and state that you will rely on the written WhatsApp confirmation of the full deposit return if needed. (score 7)

## Automatic checks
- ✅ topic — got deposit, want deposit
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hinglish,hinglish, want hinglish
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0