// Curated legal knowledge base. THIS is the only law the assistant is allowed to cite.
// Every entry: plain-language rule, source link, and an honest confidence level.
//   high   = stable, widely documented; safe to state.
//   medium = correct to my knowledge but the detail (a section number, a limit, a portal name)
//            may have changed; the UI shows "verify" next to it.
// Scope (by design, narrow and deep): everyday money disputes — security deposit, consumer refund,
// unpaid salary, cheque bounce, bank/UPI refunds — plus "explain this notice" and free legal aid.
// Not covered: criminal defence, family/divorce, property title, immigration, tax disputes.

export const KB_VERSION = '2026-11-20';

export const KB = [
  // ---------- cross-cutting ----------
  { id: 'legal-aid', topics: ['all'], confidence: 'high',
    law: 'Legal Services Authorities Act, 1987', cite: 'Section 12',
    rule: 'Free legal services (a free lawyer, drafting, advice) are a legal right for women, children, SC/ST members, industrial workmen, persons with disability, people in custody, victims of disasters or trafficking, and anyone whose income is below the limit set by their state. Ask the District Legal Services Authority (DLSA) at the district court, or call the NALSA helpline 15100.',
    source: 'https://nalsa.gov.in/' },
  { id: 'limitation-money', topics: ['deposit', 'salary', 'all'], confidence: 'high',
    law: 'Limitation Act, 1963', cite: '',
    rule: 'A civil suit to recover money (for example an unpaid deposit or a loan) must generally be filed within 3 years from when the money became due. After that the court can refuse to hear it.',
    source: 'https://www.indiacode.nic.in/handle/123456789/1565' },
  { id: 'legal-notice', topics: ['deposit', 'salary', 'consumer', 'all'], confidence: 'high',
    law: 'Code of Civil Procedure, 1908', cite: 'Section 80',
    rule: 'A legal notice is a formal written demand. For most private disputes it is not legally required before going to court, but it creates a dated record and often settles the matter. It IS mandatory before suing the government (Section 80 CPC: two months\' notice).',
    source: 'https://www.indiacode.nic.in/handle/123456789/2191' },
  { id: 'new-criminal-laws', topics: ['all'], confidence: 'high',
    law: 'Bharatiya Nyaya Sanhita, 2023', cite: '',
    rule: 'Since 1 July 2024 the Indian Penal Code (IPC) has been replaced by the Bharatiya Nyaya Sanhita, 2023 (BNS), the CrPC by the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) and the Evidence Act by the Bharatiya Sakshya Adhiniyam, 2023. Old IPC section numbers do not apply to new cases.',
    source: 'https://www.mha.gov.in/en/commoncontent/new-criminal-laws' },
  { id: 'never-ignore', topics: ['notice', 'all'], confidence: 'high',
    law: 'General practice', cite: '',
    rule: 'A court summons or a notice with a deadline must never be ignored. If you miss a court date the case can be decided against you without hearing your side (an ex-parte order). Note the date, keep the envelope, and get a lawyer or legal-aid help before the deadline.',
    source: 'https://nalsa.gov.in/' },

  // ---------- consumer / refunds ----------
  { id: 'cpa-consumer', topics: ['consumer'], confidence: 'high',
    law: 'Consumer Protection Act, 2019', cite: '',
    rule: 'If you paid for goods or a service (online or offline) and got a defective product, poor service, a refund that was promised but not paid, or an unfair trade practice, you are a "consumer" and can complain to a Consumer Commission. E-commerce purchases are covered.',
    source: 'https://www.indiacode.nic.in/handle/123456789/15256' },
  { id: 'cpa-limitation', topics: ['consumer'], confidence: 'high',
    law: 'Consumer Protection Act, 2019', cite: 'Section 69',
    rule: 'A consumer complaint must be filed within 2 years from the date the problem arose (cause of action). Late complaints need a strong reason for the delay.',
    source: 'https://www.indiacode.nic.in/handle/123456789/15256' },
  { id: 'cpa-where', topics: ['consumer'], confidence: 'high',
    law: 'Consumer Protection Act, 2019', cite: 'Section 34',
    rule: 'You can file in the District Commission where you live or work, not only where the company is based.',
    source: 'https://www.indiacode.nic.in/handle/123456789/15256' },
  { id: 'cpa-limits', topics: ['consumer'], confidence: 'medium',
    law: 'Consumer Protection (Jurisdiction) Rules, 2021', cite: '',
    rule: 'Which commission: District Commission if the value paid is up to ₹50 lakh; State Commission ₹50 lakh–₹2 crore; National Commission above ₹2 crore. (Limits set in 2021; confirm current limits on the portal.)',
    source: 'https://consumeraffairs.nic.in/' },
  { id: 'cpa-efile', topics: ['consumer'], confidence: 'medium',
    law: 'Consumer Commission e-filing', cite: '',
    rule: 'Complaints can be filed online on the government e-filing portal (e-Jagriti, which replaced e-Daakhil), without a lawyer. Court fees are nil for small claims (up to ₹5 lakh as of the 2020 regulations). Confirm the current fee on the portal.',
    source: 'https://e-jagriti.gov.in/' },
  { id: 'nch', topics: ['consumer'], confidence: 'high',
    law: 'National Consumer Helpline (Dept. of Consumer Affairs)', cite: '',
    rule: 'Before going to a commission you can register a free grievance with the National Consumer Helpline: call 1915 or use consumerhelpline.gov.in / the NCH app. Many companies resolve complaints at this stage.',
    source: 'https://consumerhelpline.gov.in/' },
  { id: 'ecom-rules', topics: ['consumer'], confidence: 'high',
    law: 'Consumer Protection (E-Commerce) Rules, 2020', cite: '',
    rule: 'Every e-commerce platform must have a grievance officer who must acknowledge your complaint within 48 hours and resolve it within one month. Use this first and keep the ticket number.',
    source: 'https://consumeraffairs.nic.in/' },
  { id: 'rbi-ombudsman', topics: ['consumer', 'bank'], confidence: 'high',
    law: 'RBI Integrated Ombudsman Scheme, 2021', cite: '',
    rule: 'For a failed transaction, wrong debit, or refund stuck with a bank, NBFC or payment app: complain to the bank first; if it does not reply within 30 days or rejects you, file free with the RBI Ombudsman at cms.rbi.org.in.',
    source: 'https://cms.rbi.org.in/' },
  { id: 'cyber-fraud', topics: ['consumer', 'bank'], confidence: 'high',
    law: 'National Cyber Crime Reporting Portal', cite: '',
    rule: 'For online or UPI fraud, call 1930 immediately and report on cybercrime.gov.in. Speed matters: money can sometimes be frozen if reported within hours.',
    source: 'https://cybercrime.gov.in/' },

  // ---------- tenancy / deposit ----------
  { id: 'deposit-basics', topics: ['deposit'], confidence: 'high',
    law: 'Rent agreement + Indian Contract Act, 1872', cite: '',
    rule: 'A security deposit is your money held against unpaid rent or damage beyond normal wear and tear. Unless your agreement says otherwise, the landlord must return it when you vacate, minus documented, reasonable deductions. Withholding it without reason is a breach of the agreement, and you can recover it with a civil claim.',
    source: 'https://www.indiacode.nic.in/handle/123456789/2187' },
  { id: 'model-tenancy', topics: ['deposit'], confidence: 'medium',
    law: 'Model Tenancy Act, 2021', cite: '',
    rule: 'The central Model Tenancy Act caps the residential deposit at 2 months\' rent and requires refund at handover after lawful deductions, with a Rent Authority to decide disputes. It is a MODEL law: it applies only in states that have adopted it. Otherwise your state\'s rent law and your agreement apply.',
    source: 'https://mohua.gov.in/' },
  { id: 'deposit-routes', topics: ['deposit'], confidence: 'medium',
    law: 'Code of Civil Procedure, 1908', cite: 'Order XXXVII',
    rule: 'Usual path: written demand, then legal notice, then mediation or Lok Adalat, then a civil suit for recovery of money (within 3 years). If there is a written agreement, a faster "summary suit" under Order XXXVII CPC may be available in courts where that procedure is notified. A lawyer is advisable for filing a suit.',
    source: 'https://www.indiacode.nic.in/handle/123456789/2191' },

  // ---------- salary / wages ----------
  { id: 'wage-code', topics: ['salary'], confidence: 'medium',
    law: 'Code on Wages, 2019', cite: '',
    rule: 'The Code on Wages, 2019 (in force with the other labour codes from 21 November 2025) replaced the Payment of Wages Act, 1936 and the Minimum Wages Act, 1948. It requires timely payment of wages to employees and lets them claim unpaid wages before a labour authority.',
    source: 'https://labour.gov.in/' },
  { id: 'wage-final', topics: ['salary'], confidence: 'medium',
    law: 'Code on Wages, 2019', cite: 'Section 17',
    rule: 'When an employee resigns, is removed, dismissed or retrenched, wages due must be paid within two working days.',
    source: 'https://labour.gov.in/' },
  { id: 'wage-claim', topics: ['salary'], confidence: 'medium',
    law: 'Code on Wages, 2019', cite: 'Section 45',
    rule: 'Claims for unpaid or delayed wages can be filed before the authority appointed under the Code (your state labour department), generally within 3 years. Senior managerial staff may fall outside the labour-authority route and use a civil suit instead.',
    source: 'https://labour.gov.in/' },
  { id: 'samadhan', topics: ['salary'], confidence: 'medium',
    law: 'Ministry of Labour — SAMADHAN portal', cite: '',
    rule: 'Wage and industrial disputes can also be raised online on the SAMADHAN portal (samadhan.labour.gov.in). It is mainly for the central sphere; for most private shops and offices the state labour department is the right office.',
    source: 'https://samadhan.labour.gov.in/' },

  // ---------- cheque bounce ----------
  { id: 'cheque-138', topics: ['salary', 'deposit', 'cheque'], confidence: 'high',
    law: 'Negotiable Instruments Act, 1881', cite: 'Section 138',
    rule: 'If a cheque given to pay a debt bounces: send a written demand notice within 30 days of receiving the bank\'s return memo. The payer then has 15 days to pay. If they don\'t, you can file a criminal complaint within 1 month after those 15 days. These deadlines are strict.',
    source: 'https://www.indiacode.nic.in/handle/123456789/2189' },

  // ---------- government delays ----------
  { id: 'rti', topics: ['notice', 'all'], confidence: 'high',
    law: 'Right to Information Act, 2005', cite: '',
    rule: 'To find out the status of a government application, file an RTI: ₹10 fee, and the public authority must reply within 30 days. Online at rtionline.gov.in for central bodies.',
    source: 'https://rtionline.gov.in/' },
];

export const KB_BY_ID = Object.fromEntries(KB.map((e) => [e.id, e]));

/** Statute names the guard recognises as "verified" (anything else that looks like law gets flagged). */
export const ALLOWED_LAWS = [...new Set(KB.map((e) => e.law))];

/** Sections we can stand behind, normalised like "section 69|consumer protection act". */
export const ALLOWED_CITES = KB.filter((e) => e.cite).map((e) => ({ cite: e.cite.toLowerCase(), law: e.law.toLowerCase(), id: e.id }));

export const TOPICS = {
  deposit: 'Security deposit / rent',
  consumer: 'Refund / defective product / service',
  salary: 'Unpaid salary / dues',
  notice: 'A notice I don\'t understand',
  bank: 'Bank / UPI / payment app',
  cheque: 'Cheque bounce',
  other: 'Something else',
};

export function kbFor(topic) {
  return KB.filter((e) => e.topics.includes(topic) || e.topics.includes('all'));
}

export const HELPLINES = [
  { name: 'Free legal aid (NALSA)', value: '15100', url: 'https://nalsa.gov.in/' },
  { name: 'National Consumer Helpline', value: '1915', url: 'https://consumerhelpline.gov.in/' },
  { name: 'Cyber fraud', value: '1930', url: 'https://cybercrime.gov.in/' },
  { name: 'Emergency', value: '112', url: '' },
];
