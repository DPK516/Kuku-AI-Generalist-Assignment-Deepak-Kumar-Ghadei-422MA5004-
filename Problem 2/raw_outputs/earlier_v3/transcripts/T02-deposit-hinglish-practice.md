# T02-deposit-hinglish-practice
_Hinglish, weaker evidence, then role-play with the landlord_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** Bhai mera landlord 2 mahine ka deposit 30000 wapas nahi de raha, bolta hai flat ganda chhoda. Kya karun?

**Haq:** Main samajh sakta hoon, yeh pareshani ki baat hai. Landlord bina wajah security deposit nahi rok sakta, aur agreements ke mutabiq normal wear-and-tear ke alawa safai ya nuksan ke hi paise kat sakte hain. 

Aapko do baatein samajhni hain:
1. Kya aapke paas koi written rent agreement hai?
2. Aapne flat kis tareeq ya mahine mein khali kiya tha aur abhi tak aapki unse kya baat hui?

Hum iska rasta nikalenge - sabse pehle ek written demand bhejenge phir aage ka step sochenge.

> topic: deposit · language: hinglish · stage: intake · needs lawyer: false · sources: deposit-basics, deposit-routes

**Person:** Agreement tha but registered nahi tha, bas notary wala. Whatsapp pe usne likha tha ki deposit wapas milega.

**Haq:** Notary wala agreement bhi ek written proof ki tarah kaam karta hai, aur sabse acchi baat yeh hai ki WhatsApp par usne deposit wapas dene ki baat likhi hai! Yeh aapke liye bahut strong evidence hai.

Limit ki baat karein toh aisi money recovery ke liye aamtaur par 3 saal ka time hota hai (limitation-money). 

Ab hamara agla rasta yeh hoga:
1. Ek formal written demand notice bhejna.
2. Agar woh tab bhi na mane, toh aage civil claim ya mediation ka sochna.

Kya aap chahte hain ki main ek written demand message ka draft taiyar kar doon jo aap use WhatsApp ya email par bhej sakein?

> topic: deposit · language: hinglish · stage: options · needs lawyer: false · sources: deposit-basics, limitation-money, deposit-routes

**Case file built:**
```json
{
  "summary": "Landlord refusing to return 2 months security deposit of ₹30000 alleging flat was left dirty.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "30000",
  "key_dates": [],
  "evidence_have": [
    "Notary rent agreement",
    "WhatsApp chat where landlord wrote deposit will be returned"
  ],
  "evidence_missing": [
    "Photos of flat when vacating"
  ],
  "goal": "Get security deposit back",
  "deadline_risks": []
}
```

## Practice
**Person:** Sharma ji, maine flat saaf karke chhoda tha, photos bhi hain. Mera 30000 deposit kab tak wapas karoge?
**Other side:** Arre, aapne saaf kiya hoga apne hisaab se, par painting ka kharcha dekha hai? Bathroom ke tiles me daag the aur kitchen ka counter bhi ganda chhod ke gaye the. 30,000 poora ka poora wapas nahi ho payega, kuch deduction toh hoga hi. Jab aayenge tab dekhenge, abhi thoda busy hoon.
**Coach:** Respond calmly, firmly state that normal wear and tear is not chargeable, remind him of his written WhatsApp confirmation, set a specific deadline (e.g., 3 days), and state that you will be forced to take further legal steps if unpaid. (score 6)

## Automatic checks
- ✅ topic — got deposit, want deposit
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hinglish,hinglish, want hinglish
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0