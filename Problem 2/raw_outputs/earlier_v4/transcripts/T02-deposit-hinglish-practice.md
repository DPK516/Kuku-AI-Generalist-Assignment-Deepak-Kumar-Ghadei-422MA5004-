# T02-deposit-hinglish-practice
_Hinglish, weaker evidence, then role-play with the landlord_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** Bhai mera landlord 2 mahine ka deposit 30000 wapas nahi de raha, bolta hai flat ganda chhoda. Kya karun?

**Haq:** Main samajh sakta hoon ki yeh pareshani ki baat hai. Landlord bina kisi valid proof ke aese paise nahi rok sakta. Aapne kab flat khali kiya tha, aur kya aapke paas rent agreement aur deposit dene ki koi slip ya bank statement hai?

> topic: deposit · language: hinglish · stage: intake · needs lawyer: false · sources: deposit-basics

**Person:** Agreement tha but registered nahi tha, bas notary wala. Whatsapp pe usne likha tha ki deposit wapas milega.

**Haq:** Notary wala agreement aur WhatsApp chat bhi kaafi useful proof hain! Usme deposit ka zikr hona achhi baat hai. Aapne flat kab khaali kiya tha, aur kya deposit dene ka koi bank transfer proof ya receipt bhi hai?

> topic: deposit · language: hinglish · stage: intake · needs lawyer: false · sources: deposit-basics

**Case file built:**
```json
{
  "summary": "Tenant's landlord refusing to return security deposit of Rs 30,000 claiming flat was dirty. Tenant has a notary rent agreement and WhatsApp chat confirming deposit.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "Rs 30000",
  "key_dates": [],
  "evidence_have": [
    "Notary rent agreement",
    "WhatsApp chat confirming deposit"
  ],
  "evidence_missing": [
    "Deposit payment proof",
    "Move-out date"
  ],
  "goal": "Recover security deposit",
  "deadline_risks": []
}
```

## Practice
**Person:** Sharma ji, maine flat saaf karke chhoda tha, photos bhi hain. Mera 30000 deposit kab tak wapas karoge?
**Other side:** Arre bhai, photos dikhane se kya hota hai? Kitchen ki chimney mein kitna grease jama tha, wo toh dekho! Painter ko bulana pada, uske 5,000 rupaye alag se lage hain aur do din flat band raha. Main pura 30,000 thodi na wapas kar sakta hoon, kuch kaat-kut ke hi milega. Abhi thodi tangi chal rahi hai, agle mahine dekhte hain.
**Coach:** Respond calmly in writing, reference your move-out photos and the rent agreement terms, state a specific deadline (e.g., 5 days) for returning the balance, and mention that you will initiate formal legal action if unpaid. (score 6)

## Automatic checks
- ✅ topic — got deposit, want deposit
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hinglish,hinglish, want hinglish
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0