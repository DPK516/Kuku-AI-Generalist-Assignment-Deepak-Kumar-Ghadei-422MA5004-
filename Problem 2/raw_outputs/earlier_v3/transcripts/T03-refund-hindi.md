# T03-refund-hindi
_Hindi in Devanagari, e-commerce refund, consumer complaint draft_

model: gemini-3.5-flash-lite · prompt haq-v3 · KB 2026-11-20

**Person:** मैंने एक ऑनलाइन शॉपिंग वेबसाइट से 12,000 रुपये का फ़ोन मंगवाया था, वह खराब निकला। मैंने रिटर्न कर दिया लेकिन 40 दिन हो गए, रिफंड नहीं आया।

**Haq:** नमस्ते! मैं হক (Haq) हूँ। मैं कोई वकील नहीं हूँ, लेकिन आम पैसों के मामलों में आपकी मदद कर सकता हूँ।

यह बहुत परेशानी की बात है कि 40 दिन बीत जाने के बाद भी आपको 12,000 रुपये का रिफंड नहीं मिला।

क्या आपके पास ऑर्डर नंबर, रिफंड पिकअप की रसीद या कंपनी की चैट/ईमेल का कोई सबूत है?

> topic: consumer · language: hi · stage: intake · needs lawyer: false · sources: cpa-consumer

**Person:** मेरे पास ऑर्डर आईडी, रिटर्न पिकअप की रसीद और कस्टमर केयर के ईमेल हैं। उन्होंने बस 'प्रोसेस हो रहा है' बोला।

**Haq:** यह बहुत अच्छी बात है कि आपके पास ऑर्डर आईडी, पिकअप रसीद और ईमेल के सबूत हैं।

आप कंज्यूमर प्रोटेक्शन एक्ट के तहत कंज्यूमर हैं। आपके पास आगे बढ़ने के ये रास्ते हैं:
1. **grievance officer**: सबसे पहले कंपनी के ग्रीवांस ऑफिसर को ई-मेल लिखकर याद दिलाएं। ई-कॉमर्स नियमों के मुताबिक उन्हें 48 घंटे में जवाब देना चाहिए और एक महीने में समाधान करना चाहिए।
2. **National Consumer Helpline**: अगर कंपनी बात न सुने, तो नेशनल कंज्यूमर हेल्पलाइन (1915 या consumerhelpline.gov.in) पर मुफ्त शिकायत दर्ज करें।
3. **Consumer Commission**: आप जिला उपभोक्ता आयोग में ई-दाखिला पोर्टल पर ऑनलाइन शिकायत भी कर सकते हैं। समय सीमा 2 साल है।

क्या आप कंपनी के ग्रीवांस ऑफिसर को भेजने के लिए शिकायत का एक ड्राफ्ट तैयार करना चाहते हैं?

> topic: consumer · language: hi · stage: options · needs lawyer: false · sources: cpa-consumer, cpa-limitation, cpa-efile, nch, ecom-rules

**Case file built:**
```json
{
  "summary": "Online shopping website sent a defective phone worth Rs 12,000. Returned it, but refund not received after 40 days.",
  "person": "Customer",
  "other_side": "Online shopping website",
  "amount": "Rs 12,000",
  "key_dates": [
    {
      "date": "40 days ago",
      "event": "Returned the defective phone"
    }
  ],
  "evidence_have": [
    "Order ID",
    "Return pickup receipt",
    "Customer care emails"
  ],
  "evidence_missing": [],
  "goal": "Get refund of Rs 12,000 for the defective phone",
  "deadline_risks": []
}
```

## Draft: Consumer Complaint before the District Consumer Disputes Redressal Commission
```
BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, [DISTRICT NAME]

Consumer Complaint No. ________ of 20[YEAR]

IN THE MATTER OF:
[CONSUMER'S FULL NAME]
[CONSUMER'S FULL ADDRESS]
... Complainant

VERSUS
[ONLINE SHOPPING WEBSITE COMPANY NAME],
Through its Grievance Officer / Managing Director,
[COMPANY'S REGISTERED ADDRESS]
... Opposite Party

CONSUMER COMPLAINT UNDER [unverified reference removed]

MOSTLY RESPECTFULLY SHOWETH:

1. FACTS OF THE CASE:
That the Complainant had purchased a mobile phone worth Rs 12,000 (Rupees Twelve Thousand only) from the Opposite Party's online shopping website vide Order ID [ORDER ID]. Upon delivery, the said product was found to be defective. The Complainant immediately raised a return request, and the defective phone was successfully picked up and returned to the Opposite Party on [DATE OF RETURN PICKUP / 40 days ago], as evidenced by the return pickup receipt.

2. DEFICIENCY IN SERVICE AND UNFAIR TRADE PRACTICE:
That despite 40 days having elapsed since the successful return of the defective phone, the Opposite Party has failed and neglected to issue the refund of Rs 12,000 to the Complainant. The Complainant has repeatedly followed up with the customer care via emails, wherein the Opposite Party has merely responded that the matter is "processing". Withholding the legitimate refund for an unreasonably prolonged period amounts to a clear deficiency in service and an unfair trade practice under the Consumer Protection Act, 2019.

3. JURISDICTION:
This Hon’ble Commission has the territorial and pecuniary jurisdiction to entertain, try, and adjudicate the present complaint as the value paid does not exceed ₹50 lakh and the Complainant resides/works within the territorial jurisdiction of this Commission.

4. LIMITATION:
The present complaint is being filed well within the limitation period of 2 years from the date of the cause of action, as prescribed under Section 69 of the Consumer Protection Act, 2019.

5. RELIEF SOUGHT:
In view of the facts and circumstances mentioned above, the Complainant prays that this Hon'ble Commission may be pleased to:
  a) Direct the Opposite Party to immediately refund the principal amount of Rs 12,000 (Rupees Twelve Thousand only) along with appropriate interest;
  b) Award suitable compensation for mental agony, harassment, and deficiency in service; and
  c) Grant litigation costs in favor of the Complainant.

VERIFICATION:
Verified at [CITY] on this [DAY] day of [MONTH], 20[YEAR], that the contents of paragraphs 1 to 5 are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.

[SIGNATURE OF THE COMPLAINANT]
[CONSUMER'S FULL NAME]
```
Placeholders to fill: [DISTRICT NAME], [YEAR], [CONSUMER'S FULL NAME], [CONSUMER'S FULL ADDRESS], [ONLINE SHOPPING WEBSITE COMPANY NAME], [COMPANY'S REGISTERED ADDRESS], [ORDER ID], [DATE OF RETURN PICKUP / 40 days ago], [CITY], [DAY], [MONTH], [SIGNATURE OF THE COMPLAINANT]

How to send: 1. Register and log in to the government e-filing portal (e-Jagriti). 2. Upload this complaint along with supporting documents (Order ID, Return pickup receipt, and Customer care emails). 3. Pay the applicable fee (nil for small claims up to ₹5 lakh) and keep the e-filing acknowledgement as proof.

## Automatic checks
- ✅ topic — got consumer, want consumer
- ✅ needs_lawyer — got false, want false
- ✅ reply_language — got hi,hi, want hi
- ✅ same_language — got devanagari,devanagari, want devanagari
- ✅ cites_only_kb — got ok
- ℹ️ guard_removals — got 1
- ✅ draft_uses_placeholders_not_invented_facts — got 12