// "Haq": legal first-aid assistant. Same engine for the web chat and the CLI test runner.
// Design: the model talks and organises; code enforces safety.
//   - red-flag rules (code) force "see a real lawyer" for criminal, family, court and danger cases
//   - the model may cite ONLY knowledge-base entries, passed in as numbered sources
//   - a citation guard (code) finds every section, Act, article and case name in the reply and
//     removes anything that is not in the knowledge base, so invented law never reaches the user

import { KB, KB_BY_ID, ALLOWED_LAWS, ALLOWED_CITES, KB_VERSION, HELPLINES } from './kb.js';

export const PROMPT_VERSION = 'haq-v6';

// ---------- 1. red flags (deterministic) ----------
const URGENT = /(suicid|kill myself|end my life|beat(s|en)? me|hit me|threat\w* to kill|acid|kidnap|locked (me )?in|domestic violence|maar(a|te|ti)|जान से|मारपीट|आत्महत्या)/i;
const NEEDS_LAWYER = [
  [/(arrest|police|\bFIR\b|bail|warrant|गिरफ्तार|पुलिस|एफआईआर)/i, 'police / criminal matter'],
  [/(summons|court (date|notice|case|hearing)|ex.?parte|अदालत|समन|सम्मन|कोर्ट)/i, 'there is a court case or summons'],
  [/(divorce|custody|dowry|maintenance|alimony|498a|तलाक|दहेज)/i, 'family-law matter'],
  // NB: not a bare "will" — v5 tests showed it firing on "he will deduct painting charges".
  [/(property (title|dispute)|land dispute|inheritance|last will|\btestament\b|probate|succession certificate|partition (suit|of (the )?property)|ज़मीन|जमीन|वसीयत)/i, 'property / inheritance matter'],
  [/(income.?tax notice|gst notice|\bED\b notice|enforcement directorate|customs)/i, 'tax / enforcement notice'],
  [/(eviction (order|suit|notice)|evict)/i, 'eviction proceedings'],
];

export function redFlags(text) {
  const reasons = [];
  let level = null;
  if (URGENT.test(text)) { level = 'urgent'; reasons.push('possible danger to someone\'s safety'); }
  for (const [rx, why] of NEEDS_LAWYER) if (rx.test(text)) { level ||= 'lawyer'; reasons.push(why); }
  const lakh = [...text.matchAll(/(\d[\d,.]*)\s*(lakh|lac|लाख|crore|करोड़)/gi)].map((m) => parseFloat(m[1].replace(/,/g, '')) * (/crore|करोड़/i.test(m[2]) ? 100 : 1));
  const rupees = [...text.matchAll(/(?:₹|rs\.?|inr)\s*([\d,]{6,})/gi)].map((m) => parseFloat(m[1].replace(/,/g, '')) / 1e5);
  if ([...lakh, ...rupees].some((v) => v >= 10)) { level ||= 'lawyer'; reasons.push('large amount (₹10 lakh+)'); }
  return { level, reasons };
}

// ---------- 1b. language detection (deterministic; the model drifted into Hinglish for English users) ----------
const SCRIPTS = [['hi', /[ऀ-ॿ]/g], ['bn', /[ঀ-৿]/g], ['pa', /[਀-੿]/g], ['gu', /[઀-૿]/g], ['or', /[଀-୿]/g],
  ['ta', /[஀-௿]/g], ['te', /[ఀ-౿]/g], ['kn', /[ಀ-೿]/g], ['ml', /[ഀ-ൿ]/g]];
const HINGLISH = /\b(hai|hain|nahi|nahin|mera|meri|mere|kya|karun|karu|kar|bhai|wapas|paisa|paise|raha|rahi|rahe|tha|thi|bolta|bola|kal|aur|lekin|mujhe|aap|kyun|kaise|gaye|diya|liya|wala|wali|abhi|bahut|kuch|sab|rupaye|mahine)\b/gi;
export const LANG_NAMES = { en: 'English', hinglish: 'Hinglish (Hindi in Roman script, as the person writes)', hi: 'Hindi in Devanagari script', bn: 'Bengali', pa: 'Punjabi', gu: 'Gujarati', or: 'Odia', ta: 'Tamil', te: 'Telugu', kn: 'Kannada', ml: 'Malayalam' };
export function detectLanguage(text) {
  let best = null, n = 0;
  for (const [code, rx] of SCRIPTS) { const c = (text.match(rx) || []).length; if (c > n) { n = c; best = code; } }
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  if (best && n >= latin / 3) return best;
  const words = text.split(/\s+/).length;
  const hing = (text.match(HINGLISH) || []).length;
  return hing >= 2 && hing / words > 0.08 ? 'hinglish' : 'en';
}

// ---------- 2. citation guard (deterministic) ----------
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
// Statute names that appear anywhere in the KB text (e.g. "Payment of Wages Act, 1936" as the law that was replaced).
const KB_MENTIONS = [...new Set(KB.flatMap((e) => [...(e.rule + ' ' + e.law).matchAll(/((?:[A-Z][A-Za-z()]+\s+(?:of\s+|on\s+)?){1,6}(?:Act|Sanhita|Adhiniyam|Code|Rules|Scheme))/g)].map((m) => m[1])))];
const lawKnown = (name) => {
  const n = norm(name).replace(/\b(the|of|india|indian)\b/g, '').replace(/\s+/g, ' ').trim();
  if (!n) return true;
  return [...ALLOWED_LAWS, ...KB_MENTIONS].some((l) => { const a = norm(l).replace(/\b(the|of|india|indian)\b/g, '').replace(/\s+/g, ' ').trim(); return a.includes(n) || n.includes(a); });
};

/** Returns { text, removed[] } with unverifiable legal references redacted. */
export function guardCitations(text) {
  const removed = [];
  let out = text;
  const redact = (match, why) => { removed.push({ ref: match.trim(), why }); return '[unverified reference removed]'; };

  // Court judgments: we never cite case law (no verified case database).
  out = out.replace(/\b[A-Z][\w.&']*(?:\s+(?:[A-Z][\w.&']*|of|and|&))*\s+v(?:s)?\.?\s+(?:the\s+)?[A-Z][\w.&']*(?:\s+[A-Z][\w.&']*)*(?:\s*\(\d{4}\))?/g, (m) => redact(m, 'court case citation'));
  out = out.replace(/\(?\d{4}\)?\s*\d+\s*SCC\s*\d+|AIR\s+\d{4}\s+SC\s+\d+/g, (m) => redact(m, 'law-report citation'));

  // Sections (English + Hindi), optionally followed by a statute name.
  const SEC = /\b(?:section|sec\.|s\.)\s*(\d+[A-Z]?)(?:\s*\(\s*\w+\s*\))*(?:\s+(?:of\s+)?(?:the\s+)?((?:[A-Z][A-Za-z]+[\s,]+){0,7}?(?:Act|Code|Sanhita|Adhiniyam|Rules)(?:,?\s*\d{4})?))?|धारा\s*(\d+[A-Z]?)/gi;
  out = out.replace(SEC, (m, num, law, hnum) => {
    const n = (num || hnum || '').toLowerCase();
    const ok = ALLOWED_CITES.some((c) => c.cite === `section ${n}` && (!law || lawKnown(law) && norm(c.law).includes(norm(law).replace(/\s*\d{4}$/, '').split(' ').slice(0, 2).join(' '))));
    return ok ? m : redact(m, law ? `section not in knowledge base for ${law.trim()}` : 'section not in knowledge base');
  });
  out = out.replace(/\bArticle\s+\d+[A-Z]?\b/g, (m) => redact(m, 'constitutional article not in knowledge base'));
  out = out.replace(/\bOrder\s+([IVXLC]+)\b(?:\s+Rule\s+\d+)?/g, (m, r) => (r === 'XXXVII' ? m : redact(m, 'CPC order not in knowledge base')));

  // Named statutes that are not in the KB.
  out = out.replace(/\b(?:the\s+)?((?:[A-Z][A-Za-z()]+\s+){1,7}(?:Act|Sanhita|Adhiniyam|Code|Rules|Regulations|Scheme))(?:,?\s*(\d{4}))?/g, (m, name) => {
    if (/^(The|This|Our|Your|Code)\s/.test(name) && name.split(' ').length <= 2) return m;
    return lawKnown(name) ? m : redact(m, 'statute not in knowledge base');
  });
  return { text: out.replace(/(\[unverified reference removed\][\s,;]*){2,}/g, '[unverified reference removed] '), removed };
}

// ---------- 3. prompts ----------
const sourcesBlock = () => KB.map((e) => `[${e.id}] ${e.law}${e.cite ? ' — ' + e.cite : ''} (confidence: ${e.confidence}): ${e.rule}`).join('\n');

const SYSTEM = `You are "Haq", a legal first-aid assistant for ordinary people in India. You are NOT a lawyer and you say so when it matters.
You help with everyday money problems: security deposit not returned, refunds / defective products / bad service, unpaid salary, cheque bounce, bank or UPI refunds, and explaining a notice someone received.

HOW TO TALK
- Reply in the SAME language and script the person uses (Hindi in Devanagari if they write Devanagari; Hinglish in Roman script if they mix; English otherwise; any other Indian language likewise).
- Plain words, short sentences, no legalese. Max ~170 words per reply. Warm but direct.
- Ask at most 2 questions at a time. First understand: what happened, when, how much money, who the other side is, what proof they have (agreement, receipts, messages, bank statements, photos).
- Once you know enough: explain where they stand and their options as a ladder (cheapest first: written demand → helpline/grievance officer → legal notice → commission/authority/court), with honest effort/time.
- Offer to prepare a document (legal notice, complaint, claim letter, reply) or to role-play the other side for practice.
- DEADLINE-CRITICAL cases (cheque bounce, online/UPI fraud, a notice with a deadline): give the complete deadline chain from SOURCES in your FIRST reply, before asking questions, because a missed day can lose the case.

HARD RULES ABOUT LAW
- You may state legal rules ONLY from the SOURCES below, and you must list the source ids you used in "used_sources".
- Never cite court judgments or case names. Never invent section numbers, Acts, limits or deadlines. If something is not covered by SOURCES, say plainly that you are not sure and a lawyer should check.
- For sources marked confidence: medium, add "(please verify)" when you state that detail.
- Never promise an outcome. Never tell someone to lie, hide evidence or threaten anyone.
- Set needs_lawyer=true (and say so kindly in the reply) for: police/criminal matters, any court summons or case already filed, family law, property OWNERSHIP/title disputes, large amounts (₹10 lakh+), the other side has a lawyer, or anything outside your scope. Mention free legal aid (NALSA 15100) when cost is a worry.
- Do NOT set needs_lawyer just because the problem involves rent, a flat or a landlord: a security-deposit, refund or unpaid-salary dispute is exactly what you exist for. People can send a demand letter or file a consumer complaint themselves; say a lawyer is only needed if it goes to a civil suit or the other side escalates.

SOURCES (knowledge base ${KB_VERSION}):
${sourcesBlock()}

OUTPUT: JSON only:
{"reply": "...message to the person...",
 "language": "en|hi|hinglish|bn|ta|te|mr|gu|kn|ml|or|pa|other",
 "topic": "deposit|consumer|salary|notice|bank|cheque|other",
 "case": {"summary": "1-2 lines in English", "person": "", "other_side": "", "amount": "", "key_dates": [{"date": "", "event": ""}], "evidence_have": [], "evidence_missing": [], "goal": "", "deadline_risks": []},
 "stage": "intake|options|drafting|practice",
 "used_sources": ["kb ids"],
 "needs_lawyer": false, "lawyer_reason": "",
 "next_actions": ["short button labels, e.g. Draft legal notice / Practice with landlord / What proof do I need?"]}
The "case" object is the FULL updated case file (merge what you knew before with what you learned now; keep facts the person stated; never invent facts; leave unknown fields empty).`;

const DOCS = {
  legal_notice: 'a formal LEGAL NOTICE / demand notice from the person to the other side (date, parties, facts in numbered paragraphs, the demand with amount and a clear deadline e.g. 15 days, consequence: further legal action, signature block)',
  consumer_complaint: 'a CONSUMER COMPLAINT draft for the District Consumer Commission (parties, facts, deficiency/unfair practice, relief sought: refund + compensation + costs, list of documents, verification) that the person can adapt on the e-filing portal',
  wage_claim: 'a LETTER/CLAIM to the labour authority (state labour department) for unpaid wages (employee details, employer, period unpaid, amount, attempts made, request for direction to pay, documents)',
  notice_reply: 'a short, careful HOLDING REPLY to a notice received: acknowledges receipt, denies liability without admitting anything, asks for documents, states the person is seeking legal advice',
  bank_complaint: 'a COMPLAINT to the bank / payment app grievance cell (transaction details, date, amount, what went wrong, request to refund within the timeline, mention escalation to the RBI Ombudsman if unresolved in 30 days)',
};
export const DOC_KINDS = Object.keys(DOCS);

// ---------- 4. engine ----------
const emptyCase = () => ({ summary: '', person: '', other_side: '', amount: '', key_dates: [], evidence_have: [], evidence_missing: [], goal: '', deadline_risks: [] });

export class Haq {
  constructor(llm) {
    this.llm = llm;
    this.history = [];
    this.case = emptyCase();
    this.topic = null;
    this.language = null;
    this.flags = { level: null, reasons: [] };
    this.log = [];
  }

  _transcript(n = 12) {
    return this.history.slice(-n).map((m) => `${m.role === 'user' ? 'PERSON' : 'HAQ'}: ${m.content}`).join('\n');
  }

  async turn(userText) {
    this.history.push({ role: 'user', content: userText });
    const rf = redFlags(this.history.filter((m) => m.role === 'user').map((m) => m.content).join('\n'));
    if (rf.level) this.flags = rf;
    const lang = detectLanguage(userText);
    const user = `REPLY LANGUAGE (detected by code from the person's last message, follow it exactly): ${LANG_NAMES[lang]}
CASE FILE SO FAR: ${JSON.stringify(this.case)}
KNOWN TOPIC: ${this.topic || 'unknown'}
${rf.level ? `SAFETY RULES TRIGGERED BY CODE: ${rf.reasons.join('; ')} -> you MUST set needs_lawyer=true${rf.level === 'urgent' ? ' and FIRST tell them to call 112 if anyone is in danger' : ''}.\n` : ''}
CONVERSATION:
${this._transcript()}

Write Haq's next message.`;
    const { data, model } = await this.llm.chatJSON(SYSTEM, user, { maxTokens: 2048, temperature: 0.3 });
    // Source ids are shown as chips in the UI; strip them from the prose.
    const idAlt = KB.map((e) => e.id).join('|');
    const ids = new RegExp(String.raw`\s*\[(?:` + idAlt + String.raw`)(?:\s*,\s*(?:` + idAlt + String.raw`))*\]`, 'g');
    const g = guardCitations(String(data.reply || '').replace(ids, ''));
    const used = (data.used_sources || []).filter((id) => KB_BY_ID[id]);
    const invalidSources = (data.used_sources || []).filter((id) => !KB_BY_ID[id]);
    let reply = g.text;
    // Escalation is decided in code. "Now": a code red flag, or a topic outside the self-help scope.
    // The model's own flag on an in-scope money dispute usually means "if it ever goes to court":
    // that becomes a soft note, not the banner (v4 tests showed prompt wording alone could not fix this).
    const SELF_HELP = new Set(['deposit', 'consumer', 'salary', 'bank', 'cheque']);
    const topic = data.topic || this.topic;
    const needsLawyer = !!rf.level || (!!data.needs_lawyer && !SELF_HELP.has(topic));
    const lawyerLater = !needsLawyer && !!data.needs_lawyer ? (data.lawyer_reason || 'if the other side refuses and it goes to court') : '';
    if (rf.level && !data.needs_lawyer) {
      reply += `\n\n⚖️ Because this involves ${rf.reasons.join(', ')}, please speak to a real lawyer. Free legal aid: call 15100 (NALSA) or visit your District Legal Services Authority.`;
    }
    if (rf.level === 'urgent' && !/112/.test(reply)) reply = `If anyone is in danger right now, call 112.\n\n${reply}`;
    if (data.case && typeof data.case === 'object') this.case = { ...emptyCase(), ...data.case };
    this.topic = data.topic || this.topic;
    this.language = lang || data.language || this.language;
    this.history.push({ role: 'assistant', content: reply });
    const out = {
      reply, model,
      language: this.language, topic: this.topic, stage: data.stage,
      case: this.case,
      sources: used.map((id) => KB_BY_ID[id]),
      needsLawyer, lawyerReason: needsLawyer ? (rf.reasons.join(', ') || data.lawyer_reason || '') : '', lawyerLater,
      redFlags: rf,
      guard: { removed: g.removed, invalidSourceIds: invalidSources },
      nextActions: (data.next_actions || []).slice(0, 4),
    };
    this.log.push({ user: userText, ...out, case: { ...this.case } });
    return out;
  }

  async draft(kind = 'legal_notice') {
    const sys = `You draft simple, correct Indian legal documents for ordinary people, using ONLY facts from the case file and law ONLY from SOURCES (cite by name; no case law; never invent sections).
Where a fact is missing write a clear placeholder in [SQUARE BRACKETS] such as [LANDLORD'S FULL ADDRESS]. Never invent names, dates, amounts or addresses.
Write the document in English (Indian legal documents are usually in English) unless the case says otherwise. Plain, firm, polite.
Write it in the PERSON'S OWN NAME and first person ("I, [YOUR FULL NAME], ...") because they are sending it themselves; never write as an advocate "on behalf of my client".
SOURCES:\n${sourcesBlock()}
Return JSON: {"title": "", "document": "full text", "placeholders": ["list of [FIELDS] the person must fill"], "how_to_send": "2-4 short steps: how to send/file it and what to keep as proof", "used_sources": ["kb ids"]}`;
    const user = `Prepare ${DOCS[kind] || DOCS.legal_notice}.\nCASE FILE: ${JSON.stringify(this.case)}\nTOPIC: ${this.topic}\nRECENT CONVERSATION:\n${this._transcript(8)}`;
    const { data, model } = await this.llm.chatJSON(sys, user, { maxTokens: 4096, temperature: 0.2 });
    const g = guardCitations(String(data.document || ''));
    const placeholders = [...new Set((g.text.match(/\[[A-Z0-9][^\]]{2,60}\]/g) || []).filter((p) => !/unverified reference/.test(p)))];
    const res = { kind, model, title: data.title || kind, document: g.text, placeholders, howToSend: data.how_to_send || '', sources: (data.used_sources || []).filter((id) => KB_BY_ID[id]).map((id) => KB_BY_ID[id]), guard: { removed: g.removed } };
    this.log.push({ draft: res });
    return res;
  }

  /** Role-play the other side so the person can rehearse, with a coaching tip each turn. */
  async practice(role, userText, practiceHistory = []) {
    const sys = `Role-play for practice. You play: ${role}, in a realistic Indian setting, speaking the person's language (match their language and script).
Be a tough but realistic counterpart: make the excuses such people really make ("there was damage", "company policy", "HR is processing it"), but do not be abusive.
After your in-character reply, step out and give ONE short coaching tip on how the person could respond more effectively (calm, specific, documented, mention a deadline and next step). Never state law beyond these SOURCES:\n${sourcesBlock()}
Return JSON: {"in_character": "...", "coach_tip": "...", "score": 1-10 (how well the person handled their last message)}`;
    const convo = [...practiceHistory, { role: 'user', content: userText }].map((m) => `${m.role === 'user' ? 'PERSON' : role.toUpperCase()}: ${m.content}`).join('\n');
    const { data, model } = await this.llm.chatJSON(sys, `CASE: ${JSON.stringify(this.case)}\n${convo}`, { maxTokens: 1024, temperature: 0.7 });
    const g = guardCitations(String(data.coach_tip || ''));
    return { inCharacter: data.in_character || '', coachTip: g.text, score: data.score, model };
  }
}

export { HELPLINES, KB, KB_VERSION };
