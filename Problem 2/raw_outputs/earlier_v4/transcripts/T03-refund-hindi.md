# T03-refund-hindi
_Hindi in Devanagari, e-commerce refund, consumer complaint draft_

model: gemini-3.5-flash-lite · prompt haq-v4 · KB 2026-11-20

**Person:** मैंने एक ऑनलाइन शॉपिंग वेबसाइट से 12,000 रुपये का फ़ोन मंगवाया था, वह खराब निकला। मैंने रिटर्न कर दिया लेकिन 40 दिन हो गए, रिफंड नहीं आया।

**Haq:** नमस्ते, मैं हक हूँ। आपकी परेशानी मैं समझ सकता हूँ। ऑनलाइन खरीदा हुआ फोन खराब निकला और रिटर्न के बाद भी 40 दिन से रिफंड नहीं मिला, तो आप इस पर कार्रवाई कर सकते हैं।

यह जानने के लिए कि आगे क्या करना है, कृपया मुझे बताएं:
1. क्या आपके पास रिटर्न की रसीद या पिकअप का सबूत (मैसेज, ईमेल) है?
2. क्या आपने वेबसाइट के ग्रीवांस ऑफिसर या ग्राहक सेवा (customer care) से बात की है?

> topic: consumer · language: hi · stage: intake · needs lawyer: false · sources: cpa-consumer

**Person:** मेरे पास ऑर्डर आईडी, रिटर्न पिकअप की रसीद और कस्टमर केयर के ईमेल हैं। उन्होंने बस 'प्रोसेस हो रहा है' बोला।

**Haq:** आपके पास ऑर्डर आईडी, पिकअप रसीद और ईमेल जैसे अच्छे सबूत हैं। ई-कॉमर्स नियमों के अनुसार, उनका ग्रीवांस ऑफिसर एक महीने में शिकायत हल करने के लिए बाध्य है। 

हम आगे इन तरीकों से बढ़ सकते हैं:
1. नेशनल कंज्यूमर हेल्पलाइन (1915 या consumerhelpline.gov.in) पर मुफ्त शिकायत दर्ज करें।
2. ई-जागृति पोर्टल पर कंज्यूमर कमीशन में शिकायत दर्ज करें (₹5 लाख तक के दावे पर कोई फीस नहीं)।

क्या आप नेशनल कंज्यूमर हेल्पलाइन पर शिकायत दर्ज करने के लिए मदद चाहते हैं?

> topic: consumer · language: hi · stage: options · needs lawyer: false · sources: cpa-consumer, cpa-efile, ecom-rules, nch

**Case file built:**
```json
{
  "summary": "Defective phone purchased online for Rs 12,000 returned, but refund not received after 40 days.",
  "person": "Customer",
  "other_side": "Online shopping website",
  "amount": "₹12,000",
  "key_dates": [],
  "evidence_have": [
    "Order ID",
    "Return pickup receipt",
    "Customer care emails"
  ],
  "evidence_missing": [],
  "goal": "Get refund for defective returned phone",
  "deadline_risks": []
}
```

## Draft: Consumer Complaint under Section 35 of the Consumer Protection Act, 2019
```
BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, [DISTRICT NAME]

COMPLAINT NO. ________ OF 2024

IN THE MATTER OF:
[YOUR FULL NAME]
[YOUR FULL ADDRESS]
[YOUR PHONE NUMBER]
...COMPLAINANT

VERSUS

[NAME OF ONLINE SHOPPING WEBSITE]
[ADDRESS OF GRIEVANCE OFFICER/REGISTERED OFFICE]
...OPPOSITE PARTY

COMPLAINT UNDER [unverified reference removed]

1. I, [YOUR FULL NAME], the Complainant, purchased a mobile phone from the Opposite Party on [DATE OF PURCHASE] for a total sum of ₹12,000 (Order ID: [ORDER ID]).
2. Upon delivery, the product was found to be defective. I initiated a return request, and the product was picked up by the Opposite Party on [DATE OF PICKUP] (Return Pickup Receipt attached).
3. Despite 40 days having passed since the return, the Opposite Party has failed to process the refund of ₹12,000. I have sent multiple emails to their customer care, but I have only received vague responses stating the matter is 'under process'.
4. This constitutes a 'deficiency in service' and an 'unfair trade practice' under the Consumer Protection Act, 2019.

RELIEF SOUGHT:
I respectfully pray that this Hon'ble Commission may direct the Opposite Party to:
a) Refund the amount of ₹12,000;
b) Pay compensation of ₹[AMOUNT] for mental agony and harassment;
c) Pay litigation costs of ₹[AMOUNT].

VERIFICATION:
I, [YOUR FULL NAME], verify that the contents of paragraphs 1 to 4 are true to my knowledge and belief.

[DATE]
[YOUR SIGNATURE]
```
Placeholders to fill: [DISTRICT NAME], [YOUR FULL NAME], [YOUR FULL ADDRESS], [YOUR PHONE NUMBER], [NAME OF ONLINE SHOPPING WEBSITE], [ADDRESS OF GRIEVANCE OFFICER/REGISTERED OFFICE], [DATE OF PURCHASE], [ORDER ID], [DATE OF PICKUP], [AMOUNT], [DATE], [YOUR SIGNATURE]

How to send: 1. Register on the e-Jagriti portal (e-filing.nic.in). 2. Upload the complaint draft along with copies of your Order ID, return pickup receipt, and email correspondence. 3. Submit the complaint online. 4. Keep a digital copy of the filed complaint and the acknowledgment receipt for your records.

## Automatic checks
- ✅ topic — got consumer, want consumer
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hi,hi, want hi
- ✅ same_language — got devanagari,devanagari, want devanagari
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 1
- ✅ draft_uses_placeholders_not_invented_facts — got 12