# T12-salary-tamil
_Another Indian language (Tamil): reply must stay in Tamil_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** என் கம்பெனி மூன்று மாதமாக சம்பளம் கொடுக்கவில்லை. நான் சென்னையில் ஒரு கடையில் வேலை செய்கிறேன். என்ன செய்வது?

**Haq:** வணக்கம்! நான் ஹாக், உங்களுடைய சட்ட உதவி உதவியாளர். மூன்று மாதமாக சம்பளம் தராதது மிகவும் கஷ்டமானதுதான். கடையின் பெயர் என்ன, உங்களுக்கு எவ்வளவு சம்பளம் பாக்கி இருக்கிறது? மேலும், உங்களிடம் பணிபுரிந்ததற்கான அடையாள அட்டை, அப்பாயிண்ட்மெண்ட் லெட்டர் அல்லது சம்பளம் வந்த வங்கி அறிக்கை போன்ற ஏதாவது சான்றுகள் இருக்கிறதா?

> topic: salary · language: ta · stage: intake · needs lawyer: false · sources: wage-code, wage-final, wage-claim

**Case file built:**
```json
{
  "summary": "Employee in a shop in Chennai has not been paid salary for 3 months.",
  "person": "Employee at a shop in Chennai",
  "other_side": "Shop owner / Employer",
  "amount": "3 months salary",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [
    "appointment letter",
    "ID card",
    "bank statement showing past salary"
  ],
  "goal": "Recover unpaid salary",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ reply_language — got ta, want ta
- ✅ same_language — got tamil, want tamil
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0