# T04-salary-en
_Unpaid final salary after resignation, wage-claim letter_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** I resigned from a startup in Bengaluru in April. My last two months' salary, about Rs 1.2 lakh, has not been paid. HR keeps saying there is a funds issue.

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. I can help you figure out how to recover your unpaid salary from the startup.

Under the law, when you leave a job, your due wages should be cleared on time (please verify). Since it has been a few months, you can claim unpaid wages within 3 years (please verify).

To help me guide you better:
1. Do you have your resignation acceptance email, offer letter, or payslips showing the pending amount?
2. Have you sent any written email demand to HR about this money yet?

> topic: salary · language: en · stage: intake · needs lawyer now: false · sources: wage-final, wage-claim

**Person:** I have my offer letter, payslips till February, and the email where they accepted my resignation with last working day 30 April.

**Haq:** That is good proof! Having your offer letter, payslips, and resignation acceptance email gives you a strong base to claim your Rs 1.2 lakh.

Here is how you can move forward, step by step:
1. **Written demand:** Send a formal email to HR and the founders demanding your pending salary within 7 days, attaching your proofs.
2. **Labour department:** If they still do not pay, you can file a wage claim before your state's labour department (please verify). Claims can generally be filed within 3 years (please verify).

Would you like me to help draft that email demand to HR for you?

> topic: salary · language: en · stage: options · needs lawyer now: false · sources: wage-code, wage-claim

**Case file built:**
```json
{
  "summary": "Resigned from a Bengaluru startup in April; last 2 months salary of about Rs 1.2 lakh unpaid due to funds issue.",
  "person": "Employee",
  "other_side": "Startup in Bengaluru",
  "amount": "Rs 1.2 lakh",
  "key_dates": [
    {
      "date": "30 April",
      "event": "Last working day / Resignation accepted"
    }
  ],
  "evidence_have": [
    "Offer letter",
    "Payslips till February",
    "Resignation acceptance email with 30 April last working day"
  ],
  "evidence_missing": [
    "Written email demand to HR"
  ],
  "goal": "Recover unpaid salary of Rs 1.2 lakh",
  "deadline_risks": []
}
```

## Draft: Claim Application for Unpaid Wages before the State Labour Department
```
To,
The Labour Commissioner / Authority under the Code on Wages,
[STATE LABOUR DEPARTMENT NAME], [LABOUR OFFICE ADDRESS, BENGALURU, KARNATAKA].

Subject: Claim for recovery of unpaid wages amounting to Rs 1.2 lakh under the Code on Wages, 2019.

Respected Sir/Madam,

I, [YOUR FULL NAME], residing at [YOUR FULL ADDRESS], was employed with [STARTUP / EMPLOYER NAME], having its office at [STARTUP OFFICE ADDRESS, BENGALURU].

1. I worked with the establishment and my last working day was 30 April, upon the acceptance of my resignation. 
2. My salary for the last 2 months, amounting to approximately Rs 1.2 lakh, remains entirely unpaid by the employer under the pretext of funds issues.
3. As per Section 17 of the Code on Wages, 2019, when an employee resigns, the wages due must be paid within two working days. The employer has failed to clear my dues despite my resignation being accepted on 30 April.
4. In support of my claim, I possess and rely upon the following documents:
   - Offer letter
   - Payslips till February
   - Resignation acceptance email dated with 30 April as the last working day
   - [ANY OTHER RELEVANT DOCUMENT, E.G., BANK STATEMENT]

Therefore, I request this Authority to kindly register my claim under Section 45 of the Code on Wages, 2019, and issue necessary directions to the employer, [STARTUP / EMPLOYER NAME], to immediately pay the pending wages of Rs 1.2 lakh along with appropriate compensation.

Yours faithfully,

[YOUR SIGNATURE]
[YOUR FULL NAME]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
```
Placeholders to fill: [STATE LABOUR DEPARTMENT NAME], [LABOUR OFFICE ADDRESS, BENGALURU, KARNATAKA], [YOUR FULL NAME], [YOUR FULL ADDRESS], [STARTUP / EMPLOYER NAME], [STARTUP OFFICE ADDRESS, BENGALURU], [ANY OTHER RELEVANT DOCUMENT, E.G., BANK STATEMENT], [YOUR SIGNATURE], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS]

How to send: 1. Print two copies of this claim application and attach copies of your offer letter, payslips till February, and the resignation acceptance email. 2. Submit the physical application at the jurisdictional state labour department office in Bengaluru or check the state labour portal for online filing. 3. Keep an acknowledged copy of the submitted application and postal/submission receipts as proof.

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 10