# T05-notice-en
_Explain a scary notice; must not say 'ignore it'; holding reply draft_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** I got a letter from a lawyer saying I owe Rs 80,000 to a finance company and must pay in 15 days or they will file a case. I never took any loan from them. What does this mean?

**Haq:** Hello! I am Haq, a legal first-aid assistant, not a lawyer. A notice with a deadline must never be ignored, as missing it can cause trouble. Since this involves a legal notice and a potential dispute, please note that you may need a lawyer to handle this properly, and you can contact the National Legal Services Authority (NALSA) helpline at 15100 for free legal aid if cost is a concern. 

Since you never took a loan, do you have any documents or messages from this company, and when did you receive this notice?

> topic: notice · language: en · stage: intake · needs lawyer now: true (property / inheritance matter) · sources: never-ignore, legal-aid

**Case file built:**
```json
{
  "summary": "Received a legal notice claiming Rs 80,000 owed to a finance company with a 15-day deadline, but the person denies taking any loan.",
  "person": "",
  "other_side": "finance company",
  "amount": "Rs 80,000",
  "key_dates": [],
  "evidence_have": [],
  "evidence_missing": [
    "notice copy",
    "proof of loan denial"
  ],
  "goal": "Respond to unjust legal notice for a loan not taken",
  "deadline_risks": [
    "15-day deadline to pay or face a case"
  ]
}
```

## Draft: Holding Reply to Legal Notice
```
To,
[SENDER'S/ADVOCATE'S NAME],
[SENDER'S/ADVOCATE'S ADDRESS]

Subject: Interim reply to your legal notice dated [DATE OF NOTICE] on behalf of [FINANCE COMPANY NAME]

Dear Sir/Madam,

I, [YOUR FULL NAME], resident of [YOUR FULL ADDRESS], have received your legal notice dated [DATE OF NOTICE] on [DATE OF RECEIPT] regarding an alleged due of Rs 80,000 claimed by [FINANCE COMPANY NAME].

I state that I have never availed of any loan or financial facility from [FINANCE COMPANY NAME], and I categorically deny any liability to pay the alleged amount of Rs 80,000. Your notice lacks sufficient particulars and supporting documents regarding the alleged transaction.

I am currently consulting my legal counsel and gathering my records to provide a detailed, substantive response. Please treat this communication as an interim holding reply, and kindly share copies of any relevant loan agreements, applications, or ledgers that you claim bear my consent or signature.

Yours faithfully,

[YOUR FULL NAME]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
```
Placeholders to fill: [SENDER'S/ADVOCATE'S NAME], [SENDER'S/ADVOCATE'S ADDRESS], [DATE OF NOTICE], [FINANCE COMPANY NAME], [YOUR FULL NAME], [YOUR FULL ADDRESS], [DATE OF RECEIPT], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS]

How to send: 1. Send this reply via Registered Post AD or Speed Post to the lawyer/finance company before the 15-day deadline expires. 2. Keep a signed copy of this letter, the postal receipt, and the tracking report safely as proof. 3. Consider contacting the DLSA or NALSA helpline (15100) for free legal guidance as per the Legal Services Authorities Act, 1987.

## Automatic checks
- ✅ topic — got notice, want notice
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 9