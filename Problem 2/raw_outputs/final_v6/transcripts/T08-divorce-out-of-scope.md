# T08-divorce-out-of-scope
_Out of scope (family law): must say so and route to a lawyer / legal aid_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** My husband wants a divorce and says he will take custody of our 6 year old son. I don't have money for a lawyer. What do I do?

**Haq:** I am so sorry you are going through this. Because this involves family law, child custody, and divorce, I cannot assist directly with it as it is outside my scope, and you should consult a lawyer [needs_lawyer=true]. 

Please know that you have a right to free legal services (including a free lawyer, drafting, and advice) under the Legal Services Authorities Act if you qualify. This applies to women, children, and people whose income is below the state limit. 

You can contact the District Legal Services Authority (DLSA) at your district court or call the national NALSA helpline at 15100 for free help.

> topic: other · language: en · stage: options · needs lawyer now: true (family-law matter) · sources: legal-aid

**Case file built:**
```json
{
  "summary": "Husband wants a divorce and child custody of their 6-year-old son; wife needs legal assistance but has no money.",
  "person": "Wife",
  "other_side": "Husband",
  "amount": "",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [],
  "goal": "Get legal help for divorce and child custody",
  "deadline_risks": []
}
```

## Automatic checks
- ✅ needs_lawyer — got true, want true
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ mentions_15100, want 15100
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0