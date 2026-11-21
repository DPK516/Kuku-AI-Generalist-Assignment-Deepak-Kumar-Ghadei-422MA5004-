# T04-salary-en
_Unpaid final salary after resignation, wage-claim letter_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** I resigned from a startup in Bengaluru in April. My last two months' salary, about Rs 1.2 lakh, has not been paid. HR keeps saying there is a funds issue.

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. Unpaid salary is tough, but you have options. Do you have your resignation acceptance email, and has your final settlement or full and final (F&F) statement been shared by HR?

> topic: salary · language: en · stage: intake · needs lawyer: false · sources: wage-final, wage-claim

**Person:** I have my offer letter, payslips till February, and the email where they accepted my resignation with last working day 30 April.

**Haq:** Having your offer letter, payslips, and resignation acceptance email is very helpful. Under the labour rules, wages due when you leave should be paid within two working days (please verify). 

Here is a simple ladder of options:
1. Written demand: Send a formal email/letter to HR and management demanding your Rs 1.2 lakh with a clear deadline.
2. Labour department: If they refuse, you can file a claim for unpaid wages before the state labour department (generally within 3 years).

Do you want me to help draft a formal demand email to send to HR, or would you like to practice what to say to them?

> topic: salary · language: en · stage: options · needs lawyer: false · sources: wage-final, wage-claim

**Case file built:**
```json
{
  "summary": "Resigned from a startup in Bengaluru in April; unpaid salary of Rs 1.2 lakh for the last two months.",
  "person": "Employee",
  "other_side": "Startup in Bengaluru",
  "amount": "Rs 1.2 lakh",
  "key_dates": [
    {
      "date": "30 April",
      "event": "Last working day as per resignation acceptance email"
    }
  ],
  "evidence_have": [
    "Offer letter",
    "Payslips till February",
    "Resignation acceptance email"
  ],
  "evidence_missing": [
    "Full and final (F&F) statement"
  ],
  "goal": "Recover unpaid salary of Rs 1.2 lakh",
  "deadline_risks": []
}
```

## Draft: Claim for Unpaid Wages Before the State Labour Department
```
To,
The Labour Commissioner / Authority under the Code on Wages, 2019,
[STATE LABOUR DEPARTMENT OFFICE ADDRESS, BENGALURU],

Subject: Claim for recovery of unpaid wages amounting to Rs 1.2 lakh under the Code on Wages, 2019.

Sir/Madam,

I, [YOUR FULL NAME], residing at [YOUR FULL ADDRESS], working as [YOUR JOB TITLE], state as follows:

1. That I was employed with [STARTUP COMPANY NAME], located at [STARTUP COMPANY ADDRESS IN BENGALURU], under an Offer Letter dated [DATE ON OFFER LETTER].
2. That my last working day was 30 April, as confirmed by the resignation acceptance email received from the employer.
3. That my salary for the last two months amounting to Rs 1.2 lakh remains entirely unpaid by the employer despite my resignation and completion of service.
4. That under Section 17 of the Code on Wages, 2019, when an employee resigns, the wages due must be paid within two working days.
5. That despite repeated follow-ups, the employer has failed to release my legitimate dues, citing internal fund issues, and has failed to provide a full and final (F&F) statement.
6. That I am enclosing copies of my Offer Letter, payslips till February, and the resignation acceptance email as evidence of my employment and dues.

Prayer:
In light of the above facts, I respectfully request this authority to direct the employer, [STARTUP COMPANY NAME], to immediately pay my unpaid wages of Rs 1.2 lakh along with appropriate compensation as admissible under the Code on Wages, 2019.

Yours faithfully,

[YOUR SIGNATURE]
[YOUR FULL NAME]
[YOUR CONTACT NUMBER]
[YOUR EMAIL ADDRESS]

Date: [TODAY'S DATE]
Place: Bengaluru
```
Placeholders to fill: [STATE LABOUR DEPARTMENT OFFICE ADDRESS, BENGALURU], [YOUR FULL NAME], [YOUR FULL ADDRESS], [YOUR JOB TITLE], [STARTUP COMPANY NAME], [STARTUP COMPANY ADDRESS IN BENGALURU], [DATE ON OFFER LETTER], [YOUR SIGNATURE], [YOUR CONTACT NUMBER], [YOUR EMAIL ADDRESS], [TODAY'S DATE]

How to send: 1. Print two copies of this claim letter and attach copies of your offer letter, payslips till February, and resignation acceptance email.
2. Submit the physical application at the jurisdictional state labour department office in Bengaluru or check the state labour portal for online submission.
3. Keep one stamped acknowledging copy of the submission and all proofs of delivery/receipt safely with you.

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 11