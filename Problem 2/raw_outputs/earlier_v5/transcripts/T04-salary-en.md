# T04-salary-en
_Unpaid final salary after resignation, wage-claim letter_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** I resigned from a startup in Bengaluru in April. My last two months' salary, about Rs 1.2 lakh, has not been paid. HR keeps saying there is a funds issue.

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. I can help you figure out how to get your unpaid salary step by step.

Under the law, when you resign, your full and final wages should be paid within two working days (please verify). To help me guide you better:

1. Do you have a copy of your resignation email or letter, and an offer letter showing your salary amount?
2. Did HR give you any written promise about when the Rs 1.2 lakh will be paid?

> topic: salary · language: en · stage: intake · needs lawyer now: false · sources: wage-final

**Person:** I have my offer letter, payslips till February, and the email where they accepted my resignation with last working day 30 April.

**Haq:** That is very helpful. Having your offer letter, payslips, and resignation acceptance email gives you strong proof. 

Since they haven't paid your dues despite your resignation in April, here is the path you can take:

1. **Written Demand:** Send a formal reminder email to HR and management demanding your ₹1.2 lakh within a clear deadline.
2. **Labour Authority / SAMADHAN:** If they still don't pay, you can file a claim for unpaid wages with the state labour department or online within 3 years. 

To move forward, shall I help you draft a firm written demand email to send to HR, or would you like to practice what to say to them?

> topic: salary · language: en · stage: options · needs lawyer now: false · sources: wage-final, wage-claim, samadhan

**Case file built:**
```json
{
  "summary": "Resigned from Bengaluru startup in April; unpaid salary of Rs 1.2 lakh for last two months.",
  "person": "Employee",
  "other_side": "Startup in Bengaluru (HR)",
  "amount": "Rs 1.2 lakh",
  "key_dates": [
    {
      "date": "April 2026",
      "event": "Resignation from startup"
    },
    {
      "date": "30 April 2026",
      "event": "Last working day"
    }
  ],
  "evidence_have": [
    "Offer letter",
    "Payslips till February",
    "Resignation acceptance email with last working day"
  ],
  "evidence_missing": [
    "Written communication from HR about funds issue"
  ],
  "goal": "Recover unpaid salary of Rs 1.2 lakh",
  "deadline_risks": []
}
```

## Draft: Claim for Unpaid Wages before the State Labour Authority
```
To,
The Labour Commissioner / Authority,
[NAME OF DISTRICT] Labour Department,
[STATE LABOUR DEPARTMENT ADDRESS, BENGALURU, KARNATAKA].

Subject: Claim for recovery of unpaid wages amounting to Rs 1.2 lakh under the Code on Wages, 2019.

Respected Sir/Madam,

I, [YOUR FULL NAME], residing at [YOUR FULL ADDRESS], was employed with [STARTUP COMPANY NAME], located at [COMPANY ADDRESS IN BENGALURU]. My employment with the company ended upon my resignation, and my last working day was 30 April 2026.

1. That my monthly salary as per my offer letter was [MONTHLY SALARY AMOUNT]. However, my salary for the last two months amounting to Rs 1.2,000 has been withheld and remains unpaid by the employer despite my resignation and departure.
2. That as per Section 17 of the Code on Wages, 2019, when an employee resigns, the wages due must be paid within two working days.
3. That I have made multiple attempts to recover my dues from the HR department of the company, but they have failed to clear the payment, citing internal funds issues without any lawful justification.
4. That in support of my claim, I possess and rely upon the following documents:
   - Offer letter
   - Payslips till February
   - Resignation acceptance email with last working day dated 30 April 2026

Therefore, I respectfully request this Authority to direct the employer, [STARTUP COMPANY NAME], to immediately pay my legally due unpaid wages amounting to Rs 1.2 lakh.

Yours faithfully,

[YOUR SIGNATURE]
[YOUR FULL NAME]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
Date: [CURRENT DATE]
Place: Bengaluru
```
Placeholders to fill: [NAME OF DISTRICT], [STATE LABOUR DEPARTMENT ADDRESS, BENGALURU, KARNATAKA], [YOUR FULL NAME], [YOUR FULL ADDRESS], [STARTUP COMPANY NAME], [COMPANY ADDRESS IN BENGALURU], [MONTHLY SALARY AMOUNT], [YOUR SIGNATURE], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS], [CURRENT DATE]

How to send: 1. Print two physical copies of this claim along with photocopies of your offer letter, payslips till February, and the resignation acceptance email. 2. Submit the claim physically at the jurisdictional state labour department office in Bengaluru or check the state labour portal for online submission. 3. Keep the receiving copy or acknowledgement slip safely as proof.

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 11