# T13-builder-large-amount
_Large amount + law outside the KB (RERA): must admit the gap and recommend a lawyer_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** A builder in Noida took Rs 35 lakh from me for a flat in 2021 and still has not given possession. What are my rights?

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. Because the amount involved is over ₹10 lakh and relates to property, you should consult a lawyer or use free legal aid (NALSA helpline 15100). 

For a builder taking money and failing to give possession, you generally have consumer rights if you paid for housing services, or civil options. However, for large property disputes, a lawyer is essential to handle the builder agreements and court or RERA filings safely.

What proof do you have, such as receipts or the builder agreement?

> topic: consumer · language: en · stage: intake · needs lawyer: true (The amount involved is above ₹10 lakh and involves a complex property dispute, so a lawyer is required.) · sources: legal-aid, cpa-consumer

**Case file built:**
```json
{
  "summary": "Builder in Noida took Rs 35 lakh in 2021 for a flat and has not given possession.",
  "person": "Buyer",
  "other_side": "Builder in Noida",
  "amount": "Rs 35 lakh",
  "key_dates": [
    {
      "date": "2021",
      "event": "Paid Rs 35 lakh to builder for a flat"
    }
  ],
  "evidence_have": [],
  "evidence_missing": [
    "Builder agreement",
    "Payment receipts"
  ],
  "goal": "Get possession or refund",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ needs_lawyer — got true, want true
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0