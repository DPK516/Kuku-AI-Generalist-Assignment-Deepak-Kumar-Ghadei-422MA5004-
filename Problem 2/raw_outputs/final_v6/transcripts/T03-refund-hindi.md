# T03-refund-hindi
_Hindi in Devanagari, e-commerce refund, consumer complaint draft_

model: gemini-3.5-flash-lite · prompt haq-v6 · KB 2026-11-20

**Person:** मैंने एक ऑनलाइन शॉपिंग वेबसाइट से 12,000 रुपये का फ़ोन मंगवाया था, वह खराब निकला। मैंने रिटर्न कर दिया लेकिन 40 दिन हो गए, रिफंड नहीं आया।

**Haq:** नमस्ते, मैं हक हूँ। ऑनलाइन शॉपिंग में खराब सामान और रिफंड न मिलने पर आप कंज्यूमर (उपभोक्ता) हैं और इसके लिए कानून आपकी मदद करता है। 

40 दिन बीत चुके हैं, इसलिए सबसे पहले कंपनी के ग्रीवांस ऑफिसर (शिकायत अधिकारी) को शिकायत करें। ई-कॉमर्स नियमों के अनुसार उन्हें 48 घंटे में रसीद देनी होती है और 1 महीने में समस्या हल करनी होती है। अगर वहाँ बात न बने, तो आप नेशनल कंज्यूमर हेल्पलाइन (1915 या consumerhelpline.gov.in) पर फ्री शिकायत कर सकते हैं या कंज्यूमर कमीशन जा सकते हैं।

आगे बढ़ने से पहले मुझे बताएं:
1. क्या आपके पास ऑर्डर नंबर, पेमेंट रसीद या रिटर्न पिकअप की कोई पावती (slip) है?
2. क्या आपने कंपनी के ग्रीवांस ऑफिसर से संपर्क किया था?

> topic: consumer · language: hi · stage: intake · needs lawyer now: false · sources: cpa-consumer, nch, ecom-rules

**Person:** मेरे पास ऑर्डर आईडी, रिटर्न पिकअप की रसीद और कस्टमर केयर के ईमेल हैं। उन्होंने बस 'प्रोसेस हो रहा है' बोला।

**Haq:** यह बहुत अच्छी बात है कि आपके पास ऑर्डर आईडी, रिटर्न पिकअप की रसीद और ईमेल के सबूत मौजूद हैं। इन सबूतों के साथ आपके पास रिफंड पाने के लिए मजबूत रास्ते हैं।

हम इस मामले में आगे बढ़ सकते हैं:
1. सबसे पहले, वेबसाइट के ग्रीवांस ऑफिसर को एक लिखित शिकायत भेजें जिसमें स्पष्ट रूप से रिफंड देने को कहें。
2. यदि वे फिर भी न सुनें, तो आप नेशनल कंज्यूमर हेल्पलाइन (1915 या consumerhelpline.gov.in) पर मुफ्त शिकायत दर्ज कर सकते हैं。
3. इसके बाद, आप कंज्यूमर कमीशन (e-Jagriti पोर्टल) पर ऑनलाइन शिकायत कर सकते हैं। आपके पास शिकायत करने के लिए समस्या आने की तारीख से 2 साल का समय होता है।

क्या आप ग्रीवांस ऑफिसर को भेजने के लिए शिकायत का ड्राफ्ट तैयार करना चाहते हैं?

> topic: consumer · language: hi · stage: options · needs lawyer now: false · sources: ecom-rules, nch, cpa-consumer, cpa-limitation, cpa-efile

**Case file built:**
```json
{
  "summary": "Online purchased phone worth 12,000 delivered defective, returned but refund not received after 40 days",
  "person": "Customer",
  "other_side": "Online shopping website",
  "amount": "12,000",
  "key_dates": [],
  "evidence_have": [
    "order ID",
    "return pickup slip",
    "customer care emails"
  ],
  "evidence_missing": [
    "grievance officer formal communication"
  ],
  "goal": "Get refund for defective phone",
  "deadline_risks": []
}
```

## Draft: Consumer Complaint before the District Consumer Disputes Redressal Commission
```
BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, [DISTRICT NAME]

Consumer Complaint No. ______ of 20[YY]

IN THE MATTER OF:

[YOUR FULL NAME]
[YOUR FULL ADDRESS]
...Complainant

VERSUS

[ONLINE SHOPPING WEBSITE COMPANY NAME], 
[COMPANY'S REGISTERED OFFICE ADDRESS OR CUSTOMER CARE ADDRESS]
...Opposite Party

COMPLAINT UNDER [unverified reference removed]

MOST RESPECTFULLY SHOWETH:

1. That the Complainant is an individual residing at the address given above within the territorial jurisdiction of this Hon’ble Commission, and is a "consumer" as defined under [unverified reference removed], having purchased goods for consideration from the Opposite Party.

2. That the Opposite Party is an e-commerce platform engaged in the business of online retail and sale of various goods, including mobile phones, to consumers across India.

3. That on [DATE OF PURCHASE], the Complainant purchased a mobile phone worth ₹12,000/- (Rupees Twelve Thousand Only) from the website/app of the Opposite Party vide Order ID [ORDER ID]. The Complainant paid the said amount online.

4. That upon delivery, the mobile phone was found to be defective and not in working condition. Immediately upon discovering the defect, the Complainant raised a return request with the Opposite Party.

5. That on [DATE OF RETURN PICKUP], the Opposite Party successfully picked up the defective phone from the Complainant's address, and the Complainant was provided with a return pickup slip, bearing [RETURN PICKUP SLIP NUMBER / DETAILS].

6. That despite 40 days having elapsed since the return of the defective product, the Opposite Party has failed and neglected to refund the amount of ₹12,000/-. The Complainant has followed up multiple times via customer care emails, but has only received vague responses stating that the refund is "processing", amounting to a clear deficiency in service and unfair trade practice.

7. That the cause of action for filing the present complaint arose on [DATE OF REFUND DELAY / EXPIRY OF PROMISED REFUND DATE] when 40 days passed without the refund being credited, and continues to subsist as the Opposite Party is withholding the Complainant's legitimate money.

8. That the value of the goods paid is ₹12,000/-, and compensation claimed is within the pecuniary jurisdiction of this Hon’ble District Commission under Section 34 of the Consumer Protection Act, 2019. The Complainant resides within the local limits of this Commission's jurisdiction.

RELIEF SOUGHT:
In view of the facts and circumstances mentioned above, the Complainant prays that this Hon’ble Commission may be pleased to:
(a) Direct the Opposite Party to immediately refund the principal amount of ₹12,000/- (Rupees Twelve Thousand Only) along with appropriate interest;
(b) Award compensation of ₹[COMPENSATION AMOUNT FOR MENTAL AGONY] towards mental agony, harassment, and deficiency in service caused by the Opposite Party;
(c) Award litigation costs of ₹[LITIGATION COSTS] in favor of the Complainant; and
(d) Pass any other order(s) as this Hon’ble Commission may deem fit in the interest of justice.

LIST OF DOCUMENTS ATTACHED:
1. Copy of Order ID / Purchase Invoice ([ORDER ID])
2. Copy of Return Pickup Slip
3. Copies of Customer Care Emails

VERIFICATION:
I, [YOUR FULL NAME], the Complainant above named, do hereby verify that the contents of paragraphs 1 to 8 are true to my personal knowledge and belief, and that no part of it is false and nothing material has been concealed therefrom.

Verified at [CITY/DISTRICT] on this [DAY] day of [MONTH], 20[YY].


________________________
[YOUR FULL NAME]
Complainant
```
Placeholders to fill: [DISTRICT NAME], [YOUR FULL NAME], [YOUR FULL ADDRESS], [ONLINE SHOPPING WEBSITE COMPANY NAME], [COMPANY'S REGISTERED OFFICE ADDRESS OR CUSTOMER CARE ADDRESS], [DATE OF PURCHASE], [ORDER ID], [DATE OF RETURN PICKUP], [RETURN PICKUP SLIP NUMBER / DETAILS], [DATE OF REFUND DELAY / EXPIRY OF PROMISED REFUND DATE], [COMPENSATION AMOUNT FOR MENTAL AGONY], [LITIGATION COSTS], [CITY/DISTRICT], [DAY], [MONTH]

How to send: 1. Register/Log in on the official e-Jagriti portal (e-filing portal for Consumer Commissions). 2. Fill out the complaint details using this drafted text and upload your digital copies (Order ID, return pickup slip, and emails). 3. Pay any applicable online fee (nil for small claims up to ₹5 lakh) and submit. 4. Keep the e-filing acknowledgement receipt and copies of all uploaded documents safely as proof.

## Automatic checks
- ✅ topic — got consumer, want consumer
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hi,hi, want hi
- ✅ same_language — got devanagari,devanagari, want devanagari
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 2
- ✅ draft_uses_placeholders_not_invented_facts — got 15