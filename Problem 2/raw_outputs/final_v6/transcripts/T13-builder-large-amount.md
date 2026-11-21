# T13-builder-large-amount
_Large amount + law outside the KB (RERA): must admit the gap and recommend a lawyer_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** A builder in Noida took Rs 35 lakh from me for a flat in 2021 and still has not given possession. What are my rights?

**Haq:** Namaste. Because the amount involved is large (over ₹10 lakh) and real estate matters can be legally complex, you should consult a lawyer [needs_lawyer]. However, as a consumer who paid for a service/flat and did not get possession, you have strong rights under consumer laws. You can generally file a consumer complaint within 2 years from when the possession was due, and choose the District/State Commission based on where you live or work. Since this is a high-value property dispute, a lawyer is best to guide you through the civil or consumer courts. If cost is a worry, you can check free legal aid via NALSA (helpline 15100). To help me understand better: Do you have a builder-buyer agreement and payment receipts? When was the possession originally promised?

> topic: consumer · language: en · stage: intake · needs lawyer now: true (large amount (₹10 lakh+)) · sources: cpa-consumer, cpa-limitation, cpa-where, legal-aid

**Case file built:**
```json
{
  "summary": "Builder in Noida took Rs 35 lakh in 2021 for a flat and has not given possession yet.",
  "person": "Buyer",
  "other_side": "Builder in Noida",
  "amount": "₹35 lakh",
  "key_dates": [
    {
      "date": "2021",
      "event": "Paid Rs 35 lakh to the builder for a flat"
    }
  ],
  "evidence_have": [],
  "evidence_missing": [
    "Builder-buyer agreement",
    "Payment receipts",
    "Possession due date"
  ],
  "goal": "Get possession or refund of the flat",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ needs_lawyer — got true, want true
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0