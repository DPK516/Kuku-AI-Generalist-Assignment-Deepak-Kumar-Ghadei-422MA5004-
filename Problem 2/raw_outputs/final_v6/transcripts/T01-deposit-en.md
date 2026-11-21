# T01-deposit-en
_Core in-scope case, English, ends with a drafted legal notice_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** I moved out of my rented flat in Pune 2 months ago. The landlord is not returning my Rs 45,000 security deposit. He says he will deduct painting charges but won't show any bill.

**Haq:** Hello! I am Haq, a legal first-aid assistant for everyday money problems. I am not a lawyer.

Landlords cannot just keep your deposit for painting without showing real, reasonable bills unless your rent agreement specifically says otherwise. You have up to 3 years to file a civil claim to get your money back.

To help you take the right steps, please tell me:
1. Do you have a written rent agreement? If yes, what does it say about painting charges and the security deposit?
2. What proof do you have of moving out and of your deposit amount (like bank statements, receipts, or WhatsApp chats with the landlord)?

> topic: deposit · language: en · stage: intake · needs lawyer now: false · sources: limitation-money, deposit-basics

**Person:** We had a registered 11-month rent agreement. I paid the deposit by bank transfer and I have photos and a video of the flat on the day I left. Now he ignores my calls.

**Haq:** Having a registered agreement, bank transfer proof, and move-out photos puts you in a strong position! A security deposit is your money and cannot be cut for painting without real bills, unless your agreement says so. Since he is ignoring calls, your best next step is a written demand letter.

Your options as a ladder:
1. Send a formal written demand (by email/WhatsApp/post) asking for your ₹45,000 back within a set date, attaching your proof.
2. Send a legal notice (often gets a quick response).
3. File a civil claim for recovery of money within 3 years.

Would you like me to help you draft a demand message to send to your landlord now?

> topic: deposit · language: en · stage: options · needs lawyer now: false · sources: deposit-basics, limitation-money, deposit-routes

**Case file built:**
```json
{
  "summary": "Landlord in Pune is withholding Rs 45,000 security deposit for painting charges without showing bills, 2 months after move-out.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "Rs 45,000",
  "key_dates": [],
  "evidence_have": [
    "Registered 11-month rent agreement",
    "Bank transfer proof for deposit",
    "Photos and video of flat on move-out day"
  ],
  "evidence_missing": [
    "Chat history with landlord"
  ],
  "goal": "Recover security deposit of Rs 45,000",
  "deadline_risks": []
}
```

## Draft: LEGAL NOTICE / DEMAND FOR REFUND OF SECURITY DEPOSIT
```
To,
[LANDLORD'S FULL NAME]
[LANDLORD'S FULL ADDRESS]

Date: [CURRENT DATE]

Subject: Legal Notice for immediate refund of security deposit of Rs 45,000

Sir/Madam,

I, [YOUR FULL NAME], residing at [YOUR CURRENT ADDRESS], state as under:

1. That we entered into a registered 11-month rent agreement dated [DATE OF RENT AGREEMENT] in respect of the residential premises situated at [RENTED PROPERTY ADDRESS IN PUNE].

2. That pursuant to the said agreement, I paid a security deposit of Rs 45,000 via bank transfer on [DATE OF DEPOSIT TRANSFER], receipt of which was duly acknowledged.

3. That I peacefully vacated and handed over the vacant possession of the said premises to you on [DATE OF MOVE-OUT]. On the said move-out day, I recorded photos and a video of the flat, which clearly establish that the premises were returned in good condition, subject only to normal wear and tear.

4. That it has been two months since I vacated the premises, but you have wrongfully withheld my security deposit of Rs 45,000 under the pretext of painting charges, without providing any genuine bills or itemized accounts for the same, which is a breach of our agreement and the principles governing security deposits.

5. That despite multiple attempts to contact you, you have failed and neglected to return my rightful money.

I hereby demand that you refund the entire security deposit amount of Rs 45,000 to my bank account [INSERT YOUR BANK ACCOUNT DETAILS FOR REFUND] within 15 (fifteen) days of receiving this notice.

In the event of your failure to refund the said amount within the stipulated period of 15 days, I shall be constrained to initiate further legal action, including filing a civil suit for recovery of money under the Code of Civil Procedure, 1908, for which you shall be liable for all additional costs and consequences.

Yours faithfully,

[YOUR FULL NAME]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]
```
Placeholders to fill: [LANDLORD'S FULL NAME], [LANDLORD'S FULL ADDRESS], [CURRENT DATE], [YOUR FULL NAME], [YOUR CURRENT ADDRESS], [DATE OF RENT AGREEMENT], [RENTED PROPERTY ADDRESS IN PUNE], [DATE OF DEPOSIT TRANSFER], [DATE OF MOVE-OUT], [INSERT YOUR BANK ACCOUNT DETAILS FOR REFUND], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS]

How to send: 1. Print two copies of this notice and send one copy to the landlord via Registered Post with Acknowledgement Due (RPAD) or Speed Post, and also send a copy via WhatsApp/email for immediate record.
2. Keep the postal receipt, tracking report, and delivery acknowledgement safely as proof of delivery.
3. Keep your registered rent agreement, bank transfer proof, and move-out photos/videos ready as evidence.

## Automatic checks
- ✅ topic — got deposit, want deposit
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 12