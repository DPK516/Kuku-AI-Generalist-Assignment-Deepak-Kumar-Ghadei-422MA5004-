# T01-deposit-en
_Core in-scope case, English, ends with a drafted legal notice_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** I moved out of my rented flat in Pune 2 months ago. The landlord is not returning my Rs 45,000 security deposit. He says he will deduct painting charges but won't show any bill.

**Haq:** Hello! I am Haq, a legal first-aid assistant for everyday money problems. I am not a lawyer.

Since this involves a property and rental matter, it is best to consult a lawyer or legal aid, but I can help you understand your options.

Under tenancy rules, a security deposit is your money, and the landlord must return it when you vacate after lawful deductions. Deducting money for painting without a bill or proof is generally not allowed unless agreed.

Do you have a written rent agreement, and do you have WhatsApp messages or call records asking for the deposit back?

> topic: deposit · language: en · stage: intake · needs lawyer: true (This is a property and rental matter.) · sources: deposit-basics

**Person:** We had a registered 11-month rent agreement. I paid the deposit by bank transfer and I have photos and a video of the flat on the day I left. Now he ignores my calls.

**Haq:** Having a registered rent agreement, bank transfer proof, and photos/videos of the flat on the day you left gives you strong evidence. Under the law, a security deposit must be returned when you vacate, minus reasonable, documented deductions. Since this is a property matter, I must mention that you should consult a lawyer or free legal aid (call NALSA at 15100).

Your options as a ladder are:
1. Send a formal written demand notice to the landlord.
2. Attempt mediation or resolve it through a civil claim, noting that suits for money recovery generally must be filed within 3 years.

Would you like me to help you prepare a written demand notice, or would you like to practice what to say to the landlord?

> topic: deposit · language: en · stage: options · needs lawyer: true (Since this involves a property and rental matter, it is best to consult a lawyer or legal-aid.) · sources: deposit-basics, legal-aid, limitation-money, deposit-routes

**Case file built:**
```json
{
  "summary": "Landlord in Pune has not returned Rs 45,000 security deposit after moving out 2 months ago, making unjustified painting deductions without bills.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "Rs 45,000",
  "key_dates": [
    {
      "date": "2 months ago",
      "event": "Moved out of the rented flat"
    }
  ],
  "evidence_have": [
    "registered 11-month rent agreement",
    "bank transfer proof for deposit",
    "photos and video of the flat on the day of leaving"
  ],
  "evidence_missing": [
    "written communication log of ignored calls"
  ],
  "goal": "Recover Rs 45,000 security deposit",
  "deadline_risks": []
}
```

## Draft: LEGAL NOTICE CUM DEMAND FOR REFUND OF SECURITY DEPOSIT
```
LEGAL NOTICE

To,
[LANDLORD'S FULL NAME]
[LANDLORD'S FULL ADDRESS]

Date: [TODAY'S DATE]

Subject: Legal notice for immediate refund of wrongfully withheld security deposit of Rs 45,000.

Sir/Madam,

Under instructions and on behalf of my client, [TENANT'S FULL NAME], residing at [TENANT'S CURRENT ADDRESS], I do hereby serve you with this formal legal notice as under:

1. That my client was a lawful tenant in your residential premises situated at [RENTED FLAT ADDRESS, PUNE] under a registered 11-month rent agreement dated [DATE OF RENT AGREEMENT].

2. That at the time of commencement of the tenancy, my client paid an amount of Rs 45,000 (Rupees Forty-Five Thousand Only) as a security deposit via bank transfer on [DATE OF DEPOSIT TRANSFER], receipt of which was duly acknowledged by you.

3. That my client peacefully vacated and handed over the vacant possession of the said premises to you 2 months ago, specifically on [DATE OF VACATING FLAT]. On the said date of leaving, proper inspection of the flat was conducted, and photographic as well as video evidence was recorded, which clearly establishes that the premises were handed over in good condition with no damage beyond normal wear and tear.

4. That despite the peaceful handing over of the premises, you have wrongfully withheld the entire security deposit of Rs 45,000. When my client demanded the refund, you arbitrarily stated that you are making deductions for painting charges, but you have failed and neglected to provide any valid bills, receipts, or proof of actual expenses incurred.

5. That withholding the security deposit without proper justification, documented bills, or reasonable grounds constitutes a breach of the terms of the tenancy and applicable law regarding the return of deposits.

DEMAND

I hereby call upon you to clear and refund the full security deposit amount of Rs 45,000 to my client via bank transfer to [TENANT'S BANK ACCOUNT DETAILS] within 15 days of the receipt of this notice.

CONSEQUENCE OF NON-COMPLIANCE

If you fail to make the payment within the stipulated period of 15 days, my client shall be constrained to initiate further legal action, including filing a civil suit for recovery of money along with applicable interest and costs, before the competent court, at your sole risk, cost, and consequences.

Sincerely,

[ADVOCATE'S NAME OR TENANT'S NAME]
[SIGNATURE]
[CONTACT DETAILS]
```
Placeholders to fill: [LANDLORD'S FULL NAME], [LANDLORD'S FULL ADDRESS], [TODAY'S DATE], [TENANT'S FULL NAME], [TENANT'S CURRENT ADDRESS], [RENTED FLAT ADDRESS, PUNE], [DATE OF RENT AGREEMENT], [DATE OF DEPOSIT TRANSFER], [DATE OF VACATING FLAT], [TENANT'S BANK ACCOUNT DETAILS], [ADVOCATE'S NAME OR TENANT'S NAME], [SIGNATURE], [CONTACT DETAILS]

How to send: 1. Print this notice on plain paper or consult a lawyer to send it on letterhead, fill in all bracketed details, and sign it.
2. Send it to the landlord via Registered Post with Acknowledgement Due (RPAD) or via reliable courier.
3. Keep a copy of the signed notice, the postal receipt, and the tracking report safely as proof of delivery.

## Automatic checks
- ✅ topic — got deposit, want deposit
- ❌ needs_lawyer — got true, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 13