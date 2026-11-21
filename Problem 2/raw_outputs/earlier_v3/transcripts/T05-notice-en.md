# T05-notice-en
_Explain a scary notice; must not say 'ignore it'; holding reply draft_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** I got a letter from a lawyer saying I owe Rs 80,000 to a finance company and must pay in 15 days or they will file a case. I never took any loan from them. What does this mean?

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. Please do not ignore this notice—deadlines matter. Since this involves a legal notice from a finance company, it is best to consult a lawyer or get free legal aid immediately. You can contact the District Legal Services Authority (DLSA) at the district court or call the NALSA helpline at 15100 if you need free legal help. When did you receive the notice, and do you have any documents or messages from them?

> topic: notice · language: en · stage: intake · needs lawyer: true (You received a formal legal notice threatening court action, which requires careful legal handling.) · sources: never-ignore, legal-aid

**Case file built:**
```json
{
  "summary": "Person received a lawyer's notice claiming ₹80,000 due to a finance company, but denies taking any loan.",
  "person": "",
  "other_side": "Finance company",
  "amount": "₹80,000",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [
    "Copy of notice",
    "Loan agreement (if any)"
  ],
  "goal": "Understand and respond to the finance company's notice",
  "deadline_risks": [
    "15-day deadline given in the notice"
  ]
}
```

## Draft: Interim Holding Reply to Legal Notice
```
To,
[ADVOCATE'S NAME / FINANCE COMPANY'S LAWYER]
[ADVOCATE'S ADDRESS]

Subject: Interim reply to your legal notice dated [DATE OF NOTICE] on behalf of [FINANCE COMPANY NAME] regarding alleged dues of ₹80,000.

Sir/Madam,

1. I am in receipt of your legal notice dated [DATE OF NOTICE] sent on behalf of your client, [FINANCE COMPANY NAME], demanding a sum of ₹80,000.

2. The contents of your notice are hereby categorically denied in entirety, except for matters that are matters of record. I state that I have never availed of any loan, financial facility, or accommodation from your client, nor do I owe any amount whatsoever to them.

3. This communication is being issued as an interim holding reply. I am currently consulting my legal counsel to examine the matter in detail and to formulate an appropriate and comprehensive response.

4. In the interim, please provide a legible copy of the alleged loan agreement, account statement, and any other foundational documents upon which your client's claim is based, so that the same may be examined.

5. All my rights are reserved to file a detailed reply upon receiving the requested documents and legal advice.

Yours faithfully,

[YOUR FULL NAME]
[YOUR ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
```
Placeholders to fill: [ADVOCATE'S NAME / FINANCE COMPANY'S LAWYER], [ADVOCATE'S ADDRESS], [DATE OF NOTICE], [FINANCE COMPANY NAME], [YOUR FULL NAME], [YOUR ADDRESS], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS]

How to send: 1. Send this reply via Speed Post with acknowledgement due (AD) or Registered Post to the lawyer's address given in the notice, and keep a copy for yourself.
2. You can also send a scanned copy via email if an email address was provided in the notice.
3. Keep the postal receipt and tracking report safely as proof of sending.
4. Consult a lawyer or your local District Legal Services Authority (DLSA) immediately before the notice deadline expires.

## Automatic checks
- ✅ topic — got notice, want notice
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 8