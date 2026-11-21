# T12-salary-tamil
_Another Indian language (Tamil): reply must stay in Tamil_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** என் கம்பெனி மூன்று மாதமாக சம்பளம் கொடுக்கவில்லை. நான் சென்னையில் ஒரு கடையில் வேலை செய்கிறேன். என்ன செய்வது?

**Haq:** வணக்கம்! நான் ஹக் (Haq), சாதாரண மக்களுக்கான சட்ட உதவி உதவியாளர். நீங்கள் சம்பளம் வராததால் கஷ்டப்படுவது புரிகிறது. கவலைப்பட வேண்டாம், உங்களைப் போன்ற ஊழியர்களுக்குச் சம்பளப் பாதுகாப்பு உண்டு.

நாம் पुढे செல்வதற்கு முன், இரண்டு விஷயங்களைத் தெரிந்து கொள்ள வேண்டும்:
1. கடை அல்லது நிறுவனம் உங்களுக்கு எவ்வளவு தொகை தர வேண்டும் (சரியான தொகை எவ்வளவு)?
2. உங்களிடம் வேலை செய்ததற்கான அத்தாட்சி (அடையாள அட்டை, சம்பள சீட்டு, வங்கி அறிக்கை அல்லது குறுஞ்செய்திகள்) என்ன இருக்கிறது?

> topic: salary · language: ta · stage: intake · needs lawyer now: false · sources: —

**Case file built:**
```json
{
  "summary": "Company in Chennai did not pay salary for 3 months",
  "person": "Employee working in a shop in Chennai",
  "other_side": "Shop/Company owner",
  "amount": "",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [
    "exact amount",
    "proof of employment/salary details"
  ],
  "goal": "Recover 3 months of unpaid salary",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ reply_language — got ta, want ta
- ✅ same_language — got tamil, want tamil
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0