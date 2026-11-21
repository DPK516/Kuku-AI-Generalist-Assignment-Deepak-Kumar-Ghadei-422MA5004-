# T12-salary-tamil
_Another Indian language (Tamil): reply must stay in Tamil_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** என் கம்பெனி மூன்று மாதமாக சம்பளம் கொடுக்கவில்லை. நான் சென்னையில் ஒரு கடையில் வேலை செய்கிறேன். என்ன செய்வது?

**Haq:** வணக்கம்! நான் ஹக். நீங்கள் வேலை செய்யும் கம்பெனி 3 மாதமாக சம்பளம் தராதது கஷ்டமானதுதான். உங்கள் சம்பளம் மொத்தம் எவ்வளவு பாக்கி? கடைசியாக உங்களிடம் என்னென்ன ஆதாரங்கள் உள்ளன (அட்டவணை, வேலை செய்யும் அட்டை, சம்பள ஸ்லிப், வாக்குவாதம் செய்த மெசேஜ்கள்)?

> topic: salary · language: ta · stage: intake · needs lawyer now: false · sources: wage-code, wage-final, wage-claim

**Case file built:**
```json
{
  "summary": "Employee working in a shop in Chennai has not received salary for 3 months.",
  "person": "Employee in Chennai shop",
  "other_side": "Shop management/Employer",
  "amount": "",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [
    "total unpaid amount",
    "proof of employment",
    "messages or salary slips"
  ],
  "goal": "Get unpaid salary for 3 months",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ reply_language — got ta, want ta
- ✅ same_language — got tamil, want tamil
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0