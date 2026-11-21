# T05-notice-en
_Explain a scary notice; must not say 'ignore it'; holding reply draft_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** I got a letter from a lawyer saying I owe Rs 80,000 to a finance company and must pay in 15 days or they will file a case. I never took any loan from them. What does this mean?

**Haq:** Hello! I am Haq, a legal first-aid assistant. Please note I am not a lawyer. A legal notice from a finance company for a loan you never took is serious and must not be ignored. Since this involves a legal notice and potential court case, you should consult a lawyer or use free legal aid (call the NALSA helpline at 15100). When did you receive the notice, and do you have any documents or messages from them?

> topic: notice · language: en · stage: intake · needs lawyer: true (This involves a formal legal notice threatening a case, which requires a lawyer's guidance or free legal aid.) · sources: never-ignore, legal-aid

**Case file built:**
```json
{
  "summary": "Received a lawyer's letter/notice claiming Rs 80,000 due to a finance company for an alleged loan never taken.",
  "person": "Recipient of the notice",
  "other_side": "Finance company",
  "amount": "Rs 80,000",
  "key_dates": [],
  "evidence_have": [
    "Lawyer's letter/notice"
  ],
  "evidence_missing": [
    "Loan agreement",
    "Bank statements"
  ],
  "goal": "Understand the notice and respond to a false loan claim",
  "deadline_risks": [
    "15-day deadline to pay or face a case"
  ]
}
```

## Draft: Interim Holding Reply to Legal Notice
```
To,
[ADVOCATE'S NAME OR FINANCE COMPANY'S NAME],
[SENDER'S ADDRESS],

Subject: Interim reply to your legal notice dated [DATE OF NOTICE] regarding alleged dues of Rs 80,000.

Sir/Madam,

I, [YOUR FULL NAME], resident of [YOUR FULL ADDRESS], am in receipt of your legal notice dated [DATE OF NOTICE] sent on behalf of your client, [FINANCE COMPANY'S NAME]. 

I categorically deny any liability whatsoever regarding the alleged loan amount of Rs 80,000 mentioned in your notice. I have never availed of any such loan from your client. 

As your notice refers to a transaction of which I have no knowledge or record, please provide copies of the alleged loan agreement, account statements, and any supporting documents relied upon, so that I may examine the matter fully.

I am currently consulting my legal counsel to review the matter in detail. A substantive reply will be submitted upon receipt of the requested documents and completion of legal advice.

Yours faithfully,

[YOUR FULL NAME]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
```
Placeholders to fill: [ADVOCATE'S NAME OR FINANCE COMPANY'S NAME], [SENDER'S ADDRESS], [DATE OF NOTICE], [YOUR FULL NAME], [YOUR FULL ADDRESS], [FINANCE COMPANY'S NAME], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS]

How to send: 1. Send this interim reply via Speed Post or Registered Post with Acknowledgement Due (RPAD) to the lawyer/company who sent the notice, and keep a copy for your records along with the postal receipt. 2. Keep the original notice and envelope safely. 3. Consult a lawyer or contact your District Legal Services Authority (DLSA) or call the NALSA helpline at 15100 before the 15-day deadline expires.

## Automatic checks
- ✅ topic — got notice, want notice
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 8