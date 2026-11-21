# T05-notice-en
_Explain a scary notice; must not say 'ignore it'; holding reply draft_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** I got a letter from a lawyer saying I owe Rs 80,000 to a finance company and must pay in 15 days or they will file a case. I never took any loan from them. What does this mean?

**Haq:** Namaste, I am Haq. You got a legal notice, and a notice with a deadline must never be ignored. A court summons or notice needs prompt action so the other side cannot claim things without your reply. Since you never took a loan, this might be a mistake or fraud.

Because this involves a legal notice and potential court case, you should consult a lawyer or get free legal aid. You can contact the District Legal Services Authority (DLSA) at your district court or call the NALSA helpline at 15100 if you need free help.

To understand better: when did you receive this notice, and do you have any documents from them?

> topic: notice · language: en · stage: intake · needs lawyer now: true (You have received a legal notice demanding payment with a deadline, which requires professional legal advice to draft a proper reply.) · sources: never-ignore, legal-aid

**Case file built:**
```json
{
  "summary": "Person received a lawyer's letter demanding Rs 80,000 for a finance company loan they claim they never took.",
  "person": "Recipient of notice",
  "other_side": "Finance company / lawyer",
  "amount": "Rs 80,000",
  "key_dates": [],
  "evidence_have": [
    "Legal notice/letter"
  ],
  "evidence_missing": [
    "Loan agreement",
    "Communication history"
  ],
  "goal": "Understand and respond to the notice for a loan not taken",
  "deadline_risks": [
    "15 days deadline mentioned in the notice"
  ]
}
```

## Draft: Holding Reply to Legal Notice
```
To,
[ADVOCATE/SENDER'S NAME OR FINANCE COMPANY NAME]
[SENDER'S ADDRESS]

Subject: Interim reply to your notice dated [DATE OF NOTICE] regarding alleged loan account [LOAN ACCOUNT NUMBER/DETAILS]

Sir/Madam,

I, [YOUR FULL NAME], am in receipt of your legal notice dated [DATE OF NOTICE] on [DATE YOU RECEIVED IT], demanding a sum of Rs. 80,000 on behalf of your client [FINANCE COMPANY NAME]. 

At the outset, I categorically deny each and every allegation, claim, and demand made in your notice. I state that I have never availed of any loan from your client, nor have I signed any loan agreement or received any such amount. 

I am currently consulting my legal counsel and gathering my records to prepare a detailed and comprehensive response. In the meantime, please provide me with clear copies of the alleged loan agreement, KYC documents, bank account statements showing disbursement of the said amount, and any other documents relied upon by your client in this matter.

This letter is issued without prejudice to my rights and contentions.

Yours faithfully,

[YOUR FULL NAME]
[YOUR ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
```
Placeholders to fill: [ADVOCATE/SENDER'S NAME OR FINANCE COMPANY NAME], [SENDER'S ADDRESS], [DATE OF NOTICE], [LOAN ACCOUNT NUMBER/DETAILS], [YOUR FULL NAME], [DATE YOU RECEIVED IT], [FINANCE COMPANY NAME], [YOUR ADDRESS], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS]

How to send: 1. Print the holding reply and sign it. 2. Send it via Speed Post with acknowledgement due (AD) to the lawyer or finance company before the deadline expires. 3. Keep a copy of the letter, the postal receipt, and the tracking report safely as proof.

## Automatic checks
- ✅ topic — got notice, want notice
- ✅ reply_language — got en, want en
- ✅ same_language — got latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 10