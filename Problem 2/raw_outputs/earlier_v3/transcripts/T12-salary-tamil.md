# T12-salary-tamil
_Another Indian language (Tamil): reply must stay in Tamil_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** என் கம்பெனி மூன்று மாதமாக சம்பளம் கொடுக்கவில்லை. நான் சென்னையில் ஒரு கடையில் வேலை செய்கிறேன். என்ன செய்வது?

**Haq:** வணக்கம், நான் ஹக். நீங்கள் பணம் சம்பந்தப்பட்ட சிக்கல்களுக்கு உதவக்கூடிய ஒரு சட்ட உதவி உதவியாளர், ஆனால் நான் வழக்கறிஞர் அல்ல. உங்கள் கடை சென்னை என்பதால், உங்களிடம் வேலை ஒப்பந்தம், வருகைப் பதிவேடு அல்லது சம்பளத் துண்டுச்சீட்டு போன்ற ஆவணங்கள் ஏதேனும் உள்ளதா? மேலும், கடை உரிமையாளரிடம் இது பற்றிக் கேட்டீர்களா?

> topic: salary · language: ta · stage: intake · needs lawyer: false · sources: —

**Case file built:**
```json
{
  "summary": "Company in Chennai hasn't paid salary for 3 months.",
  "person": "Employee working in a shop in Chennai",
  "other_side": "Shop owner / Company",
  "amount": "",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [
    "Employment agreement",
    "Attendance records",
    "Salary slips"
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