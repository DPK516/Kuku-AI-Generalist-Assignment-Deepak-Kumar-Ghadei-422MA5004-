# T01-deposit-en
_Core in-scope case, English, ends with a drafted legal notice_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** I moved out of my rented flat in Pune 2 months ago. The landlord is not returning my Rs 45,000 security deposit. He says he will deduct painting charges but won't show any bill.

**Haq:** Hello! I'm Haq, a legal first-aid assistant for everyday money problems. I am not a lawyer.

Since this is a dispute over a security deposit from a rented flat, we can handle this together without a lawyer right now! A landlord must return your deposit minus reasonable, documented deductions. Withholding it without bills is unfair.

To help you get your money back step by step, please tell me:
1. Do you have a written rent agreement?
2. What proofs do you have (WhatsApp chats, move-out photos, bank transfer receipts of the deposit)?

⚖️ Because this involves property / inheritance matter, please speak to a real lawyer. Free legal aid: call 15100 (NALSA) or visit your District Legal Services Authority.

> topic: deposit · language: en · stage: intake · needs lawyer now: true (property / inheritance matter) · sources: deposit-basics

**Person:** We had a registered 11-month rent agreement. I paid the deposit by bank transfer and I have photos and a video of the flat on the day I left. Now he ignores my calls.

**Haq:** That is very helpful! Having a registered rent agreement, bank transfer proof, and move-out photos and video puts you in a strong position. A security deposit is your money, and holding it back without valid bills is a breach of your agreement. 

Since you asked about your options, here is how you can proceed step by step:
1. Written demand: Send a formal written demand letter to the landlord asking for the full refund within a set time.
2. Mediation / Legal Notice: Send a legal notice or try mediation.
3. Civil claim: File a civil suit for money recovery within 3 years from when it became due.

Would you like me to help you draft a written demand letter to send to your landlord now?

> topic: deposit · language: en · stage: options · needs lawyer now: true (property / inheritance matter) · sources: deposit-basics, limitation-money, deposit-routes

**Case file built:**
```json
{
  "summary": "Tenant moved out of rented flat in Pune 2 months ago; landlord refuses to return Rs 45,000 security deposit, claiming painting charges without showing bills.",
  "person": "Tenant",
  "other_side": "Landlord",
  "amount": "Rs 45,000",
  "key_dates": [],
  "evidence_have": [
    "Registered 11-month rent agreement",
    "Bank transfer receipt for deposit",
    "Move-out photos and video"
  ],
  "evidence_missing": [
    "WhatsApp chats"
  ],
  "goal": "Recover security deposit of Rs 45,000",
  "deadline_risks": [],
  "data": []
}
```

## Draft: LEGAL NOTICE / DEMAND FOR REFUND OF SECURITY DEPOSIT
```
To,
[LANDLORD'S FULL NAME]
[LANDLORD'S FULL ADDRESS]

Date: [DATE OF NOTICE]

Subject: Legal Notice for immediate refund of security deposit of Rs 45,000 withheld unlawfully.

Sir/Madam,

I, [YOUR FULL NAME], residing at [YOUR CURRENT ADDRESS], state as follows under instructions:

1. That we entered into a registered 11-month rent agreement dated [DATE OF RENT AGREEMENT] in respect of the residential premises situated at [RENTED FLAT ADDRESS IN PUNE].

2. That at the time of commencement of the tenancy, I paid a security deposit of Rs 45,000 via bank transfer to your account, receipt of which is duly documented by bank transfer records.

3. That I peacefully vacated and handed over the vacant possession of the said flat to you 2 months ago, on [DATE OF VACATING]. On the said date, I also recorded move-out photos and a video of the flat, which clearly establish that the premises were returned in good condition, subject only to normal wear and tear.

4. That despite my peacefully vacating the flat, you have unlawfully withheld my entire security deposit of Rs 45,000 under the pretext of painting charges, without providing any valid bills, estimates, or justification for the same.

5. As per the Rent agreement + Indian Contract Act, 1872, a security deposit is my money held against unpaid rent or damage beyond normal wear and tear, and must be returned upon vacating minus documented, reasonable deductions. Withholding the same without showing bills is a direct breach of our agreement.

I hereby demand that you refund the full security deposit of Rs 45,000 within 15 days of receiving this notice, failing which I shall be constrained to initiate further legal action, including filing a civil suit for recovery of money before the competent court.

Yours faithfully,

[YOUR SIGNATURE]
[YOUR FULL NAME]
[YOUR PHONE NUMBER]
```
Placeholders to fill: [LANDLORD'S FULL NAME], [LANDLORD'S FULL ADDRESS], [DATE OF NOTICE], [YOUR FULL NAME], [YOUR CURRENT ADDRESS], [DATE OF RENT AGREEMENT], [RENTED FLAT ADDRESS IN PUNE], [DATE OF VACATING], [YOUR SIGNATURE], [YOUR PHONE NUMBER]

How to send: 1. Send this notice via Registered Post AD or Speed Post to the landlord's address, and keep a copy for your records.
2. You may also send a copy via WhatsApp or email if available.
3. Keep the postal tracking receipt and delivery proof safely with your rent agreement, bank transfer receipt, and move-out photos and video.

## Automatic checks
- ✅ topic — got deposit, want deposit
- ❌ needs_lawyer — got true, want false
- ✅ reply_language — got en,en, want en
- ✅ same_language — got latin,latin, want latin
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 0
- ✅ draft_uses_placeholders_not_invented_facts — got 10