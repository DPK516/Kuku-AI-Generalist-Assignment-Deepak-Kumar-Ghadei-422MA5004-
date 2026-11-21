# T04-salary-en
_Unpaid final salary after resignation, wage-claim letter_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** I resigned from a startup in Bengaluru in April. My last two months' salary, about Rs 1.2 lakh, has not been paid. HR keeps saying there is a funds issue.

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. I can help you understand your options for recovering your unpaid salary.

Since you resigned in April and haven't received your last two months' salary (₹1.2 lakh), under the law, wages due upon resignation should be paid promptly. To help me guide you better, do you have your employment contract, resignation acceptance email, or payslips showing the dues? And what is the name of the startup?

> topic: salary · language: en · stage: intake · needs lawyer: false · sources: wage-final, wage-claim

**Person:** I have my offer letter, payslips till February, and the email where they accepted my resignation with last working day 30 April.

**Haq:** I am Haq, a legal first-aid assistant, not a lawyer. It is great that you have your offer letter, payslips, and the resignation acceptance email with your last working day as April 30. That is solid proof.

Under the law, wages due should be paid promptly. Since your last working day was in April, you are well within the 3-year time limit to claim your unpaid salary. 

Here is your usual path forward:
1. Written demand: Send a formal written email or letter to HR and management demanding your ₹1.2 lakh.
2. Labour department: If they still refuse, you can file a claim for unpaid wages before the state labour department (or online depending on your sector).

Would you like me to help draft a formal demand email to the startup, or do you want to practice what to say to HR?

> topic: salary · language: en · stage: options · needs lawyer: false · sources: wage-code, wage-final, wage-claim

**Case file built:**
```json
{
  "summary": "Resigned from a Bengaluru startup in April; unpaid salary of about ₹1.2 lakh for the last two months.",
  "person": "Employee",
  "other_side": "Startup in Bengaluru",
  "amount": "₹1,20,000",
  "key_dates": [
    {
      "date": "30 April",
      "event": "Last working day / Resignation acceptance"
    }
  ],
  "evidence_have": [
    "Offer letter",
    "Payslips till February",
    "Resignation acceptance email"
  ],
  "evidence_missing": [
    "March and April payslips or salary calculation"
  ],
  "goal": "Recover unpaid salary of ₹1.2 lakh",
  "deadline_risks": []
}
```

## Draft: Claim for Unpaid Wages before the State Labour Department
```
BEFORE THE LABOUR AUTHORITY / COMMISSIONER
[DISTRICT NAME] DISTRICT, KARNATAKA

In the matter of:
[EMPLOYEE'S FULL NAME], residing at [EMPLOYEE'S FULL ADDRESS]
... Complainant / Employee

Versus

[STARTUP/COMPANY'S FULL NAME], having its office at [COMPANY'S FULL ADDRESS]
... Opposite Party / Employer

CLAIM APPLICATION UNDER THE CODE ON WAGES, 2019 FOR RECOVERY OF UNPAID WAGES

1. The Complainant was employed with the Opposite Party startup from [DATE OF JOINING] up to 30 April [YEAR], on which date the Complainant's resignation was formally accepted, making 30 April the last working day.

2. As per Section 17 of the Code on Wages, 2019, when an employee resigns, the wages due must be paid within two working days of the last working day.

3. The Opposite Party has illegally withheld the Complainant's salary for the last two months (March and April), amounting to a total sum of ₹1,20,000 (Rupees One Lakh Twenty Thousand only).

4. Despite the resignation acceptance email dated 30 April confirming the last working day and repeated follow-ups by the Complainant, the Opposite Party has failed to disburse the dues, citing internal funds issues.

5. The Complainant relies upon the following documents attached herewith:
   - Offer letter issued by the Opposite Party
   - Payslips up to February
   - Resignation acceptance email dated 30 April
   - [ANY OTHER SUPPORTING DOCUMENT, IF AVAILABLE]

6. The Complainant has approached this Authority within the limitation period prescribed under Section 45 of the Code on Wages, 2019.

PRAYER
In view of the facts stated above, the Complainant respectfully prays that this Authority may be pleased to:

a) Direct the Opposite Party to immediately pay the unpaid wages amounting to ₹1,20,000 to the Complainant;
b) Pass any such further orders as this Authority may deem fit in the interest of justice.

Date: [TODAY'S DATE]
Place: Bengaluru

[SIGNATURE]
[EMPLOYEE'S FULL NAME]
Complainant
```
Placeholders to fill: [DISTRICT NAME], [EMPLOYEE'S FULL NAME], [EMPLOYEE'S FULL ADDRESS], [STARTUP/COMPANY'S FULL NAME], [COMPANY'S FULL ADDRESS], [DATE OF JOINING], [YEAR], [ANY OTHER SUPPORTING DOCUMENT, IF AVAILABLE], [TODAY'S DATE], [SIGNATURE]

How to send: 1. Print two copies of this claim along with copies of your offer letter, payslips till February, and the resignation acceptance email. 2. File the claim physically at the Karnataka State Labour Department office having jurisdiction over Bengaluru, or check the state labour portal. 3. Keep a stamped receiving copy of the application as proof.

## Automatic checks
- ✅ topic — got salary, want salary
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 10