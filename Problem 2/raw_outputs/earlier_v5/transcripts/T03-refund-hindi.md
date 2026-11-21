# T03-refund-hindi
_Hindi in Devanagari, e-commerce refund, consumer complaint draft_

model: gemini-3.5-flash-lite · prompt haq-v5 · KB 2026-11-20

**Person:** मैंने एक ऑनलाइन शॉपिंग वेबसाइट से 12,000 रुपये का फ़ोन मंगवाया था, वह खराब निकला। मैंने रिटर्न कर दिया लेकिन 40 दिन हो गए, रिफंड नहीं आया।

**Haq:** नमस्ते। यह सुनकर दुख हुआ कि आपका रिफंड अटका हुआ है। मैं कोई वकील नहीं हूँ, लेकिन मैं आपको सही रास्ता दिखा सकता हूँ। चूँकि आपने ऑनलाइन सामान खरीदा था, आप 'उपभोक्ता' (consumer) के रूप में अपने पैसे वापस पाने के हकदार हैं।

सबसे पहले, क्या आपके पास उस रिटर्न की रसीद या कूरियर ट्रैकिंग नंबर है? साथ ही, क्या आपने कंपनी के 'ग्रीवेंस ऑफिसर' (grievance officer) को ईमेल या उनकी वेबसाइट पर शिकायत दर्ज की है?

> topic: consumer · language: hi · stage: intake · needs lawyer now: false · sources: cpa-consumer, ecom-rules

**Person:** मेरे पास ऑर्डर आईडी, रिटर्न पिकअप की रसीद और कस्टमर केयर के ईमेल हैं। उन्होंने बस 'प्रोसेस हो रहा है' बोला।

**Haq:** बढ़िया! ऑर्डर आईडी, रिटर्न रसीद और ईमेल होना बहुत मजबूत सबूत हैं। ई-कॉमर्स नियमों के अनुसार, कंपनी के ग्रीवेंस ऑफिसर को 48 घंटे में शिकायत पर जवाब देना होता है और एक महीने में समाधान करना होता है।

आप चाहें तो बिना वकील के, नेशनल कंज्यूमर हेल्पलाइन पर 1915 पर कॉल करके या consumerhelpline.gov.in पर मुफ्त शिकायत दर्ज कर सकते हैं। इसके अलावा आपके पास कंज्यूमर कमीशन में जाने का भी विकल्प है (जो समस्या आने के 2 साल के भीतर किया जा सकता है)।

क्या आप चाहते हैं कि मैं ग्रीवेंस ऑफिसर या नेशनल कंज्यूमर हेल्पलाइन को भेजने के लिए एक शिकायत का ड्राफ्ट तैयार करूँ?

> topic: consumer · language: hi · stage: options · needs lawyer now: false · sources: ecom-rules, nch, cpa-limitation

**Case file built:**
```json
{
  "summary": "Online purchase of phone worth ₹12,000, received defective, returned but refund pending for 40 days.",
  "person": "Customer",
  "other_side": "Online shopping website",
  "amount": "12,000",
  "key_dates": [],
  "evidence_have": [
    "Order ID",
    "Return pickup receipt",
    "Customer care emails"
  ],
  "evidence_missing": [
    "Grievance officer complaint record"
  ],
  "goal": "Get refund of ₹12,000",
  "deadline_risks": []
}
```

## Draft: Consumer Complaint before the District Consumer Disputes Redressal Commission
```
BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION
[DISTRICT COMMISSION LOCATION, e.g., DISTRICT NEW DELHI]

Consumer Complaint No. _________ of 20[YEAR]

IN THE MATTER OF:

[YOUR FULL NAME]
[YOUR FULL ADDRESS]
...Complainant

VERSUS

[ONLINE SHOPPING WEBSITE COMPANY NAME/REPRESENTATIVE]
[ONLINE SHOPPING WEBSITE REGISTERED OFFICE ADDRESS]
...Opposite Party

CONSUMER COMPLAINT UNDER [unverified reference removed]

MOST RESPECTFULLY SHOWETH:

1. That I, [YOUR FULL NAME], the Complainant herein, am a consumer who purchased goods online from the Opposite Party for a total consideration of ₹12,000 (Rupees Twelve Thousand Only).

2. That on [DATE OF PURCHASE], I purchased a mobile phone worth ₹12,000 online from the Opposite Party's website bearing Order ID [ORDER ID].

3. That upon delivery, the said mobile phone was found to be defective. Immediately upon discovering the defect, I raised a return request with the Opposite Party. A return pickup was successfully conducted, and I received the return pickup receipt dated [DATE OF RETURN PICKUP].

4. That despite the successful return of the defective product and lapse of over 40 days, the Opposite Party has failed and neglected to process my refund of ₹12,000. I have followed up multiple times through customer care emails, wherein the Opposite Party has merely responded with standard replies stating that the refund is 'processing', constituting a clear deficiency in service and unfair trade practice.

5. That the cause of action for filing this complaint arose when the Opposite Party failed to refund the amount of ₹12,000 within a reasonable time after the return of the defective product, and continues to subsist as the refund remains withheld.

6. That this Hon'ble Commission has the territorial and pecuniary jurisdiction to entertain and try this complaint as the transaction was made online and I reside/work within the territorial jurisdiction of this Commission, and the value of goods and compensation claimed is well within the limits prescribed under the Consumer Protection Act, 2019.

PRAYER:

In view of the facts and circumstances mentioned above, it is most respectfully prayed that this Hon'ble Commission may be pleased to:

a) Direct the Opposite Party to immediately refund the principal amount of ₹12,000 (Rupees Twelve Thousand Only) along with appropriate interest;

b) Order the Opposite Party to pay compensation for mental agony, harassment, and deficiency in service; and

c) Grant the cost of this complaint to the Complainant.

AND/OR
Pass any other order(s) as this Hon'ble Commission may deem fit in the interest of justice.

COMPLAINANT

[YOUR FULL NAME]
[YOUR FULL ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL ADDRESS]

VERIFICATION:

I, [YOUR FULL NAME], the Complainant above named, do hereby verify that the contents of paragraphs 1 to 6 of the above complaint are true and correct to the best of my knowledge and belief, and no part of it is false and nothing material has been concealed therefrom.

Verified at [PLACE] on this [DAY] day of [MONTH], 20[YEAR].

COMPLAINANT
```
Placeholders to fill: [DISTRICT COMMISSION LOCATION, e.g., DISTRICT NEW DELHI], [YEAR], [YOUR FULL NAME], [YOUR FULL ADDRESS], [ONLINE SHOPPING WEBSITE COMPANY NAME/REPRESENTATIVE], [ONLINE SHOPPING WEBSITE REGISTERED OFFICE ADDRESS], [DATE OF PURCHASE], [ORDER ID], [DATE OF RETURN PICKUP], [YOUR PHONE NUMBER], [YOUR EMAIL ADDRESS], [PLACE], [DAY], [MONTH]

How to send: 1. Adapt and save the complaint text, then visit the official e-filing portal (e-Jagriti) to upload your complaint. 
2. Attach digital copies of your Order ID, return pickup receipt, and customer care emails as supporting evidence. 
3. Submit the form online and keep the acknowledgment/reference number safely as proof.

## Automatic checks
- ✅ topic — got consumer, want consumer
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hi,hi, want hi
- ✅ same_language — got devanagari,devanagari, want devanagari
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 1
- ✅ draft_uses_placeholders_not_invented_facts — got 14