import type { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  // ===== WEEK 1: CODES OF CONDUCT =====
  {
    id: 'q-001', week: 'week1', topic: 'Ethical Theories', type: 'mcq',
    question: 'An employee believes their company is acting unethically but is unsure what to do. What should they do FIRST?',
    options: ['Immediately contact the press', 'Raise the issue informally within the team, gathering facts and suggesting solutions', 'Report directly to the ICO', 'Resign immediately'],
    correctIndex: 1,
    explanation: 'The BCS whistleblowing escalation ladder requires starting internally — document, gather evidence, and raise informally within the organisation first. External escalation (including regulators and press) is a later step, only taken if internal channels fail.',
    wrongExplanations: ['Contacting the press is the LAST resort after all other channels are exhausted.', 'The ICO is a prescribed body for data protection breaches — but you must first exhaust internal channels.', 'Resignation is not the professional response — BCS codes require active engagement with the issue.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-002', week: 'week1', topic: 'Ethical Theories', type: 'scenario',
    question: 'A company is deciding whether to release a new app quickly to beat competitors, even though it has known security risks. A utilitarian analysis would conclude:',
    options: ['Release immediately — competition matters above all', 'Delay and fix issues because the overall harm to users from security breaches outweighs competitive benefits', 'Release with a disclaimer — this satisfies the duty of honesty', 'The decision should be taken by the CEO alone — it\'s a business decision'],
    correctIndex: 1,
    explanation: 'Utilitarian ethics focuses on maximising the greatest good for the greatest number. Security risks affecting potentially many users create greater overall harm than the competitive benefit to the company. The utilitarian conclusion is to delay and fix.',
    wrongExplanations: ['This ignores the harm-prevention calculus central to utilitarianism.', 'A disclaimer does not remove the harm; deontology might focus on honesty, not utilitarianism.', 'Utilitarianism is not about who decides but about the outcome for all stakeholders.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-003', week: 'week1', topic: 'BCS/ACM', type: 'best-response',
    question: 'Which statement best describes the relationship between legal compliance and professional ethics under the BCS Code?',
    options: ['Legal compliance is sufficient for professional conduct', 'Ethics and law are identical — if something is legal, it is ethical', 'Legal compliance is a floor, not a ceiling — ethics demands more than mere legality', 'The BCS code only applies in criminal contexts'],
    correctIndex: 2,
    explanation: 'The BCS Code explicitly requires professionals to act beyond mere compliance. Facebook\'s practices may have been technically lawful while being profoundly unethical. The ELGPC hierarchy shows ethics sits above law.',
    wrongExplanations: ['This fundamentally misunderstands the professional ethics framework.', 'Law and ethics are distinct — Cambridge Analytica was partly lawful but deeply unethical.', 'The BCS Code applies across all professional contexts, not just criminal ones.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-004', week: 'week1', topic: 'Whistleblowing', type: 'scenario',
    question: 'Frances Haugen\'s disclosure of Facebook\'s internal documents was ethically justified because:',
    options: ['She acted impulsively without trying internal channels first', 'She first raised concerns internally, then escalated to regulators, then went public — following the escalation ladder correctly', 'Whistleblowing is always justified regardless of process', 'She was legally required to disclose the information'],
    correctIndex: 1,
    explanation: 'Haugen first raised concerns within Facebook, then escalated externally. Her disclosure was ethically justified under both BCS and ACM codes because she followed the correct escalation ladder and ongoing serious public harm existed after internal channels failed.',
    wrongExplanations: ['Haugen did not act impulsively — she carefully documented and escalated correctly.', 'Whistleblowing requires following the escalation ladder — arbitrary disclosure is not justified.', 'There was no legal requirement — this was a moral/professional choice.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-005', week: 'week1', topic: 'Ethical Theories', type: 'true-false',
    question: 'TRUE or FALSE: Deontological ethics holds that the consequences of an action determine its moral worth.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'FALSE. Deontology (Kant) holds that the moral worth of an action is determined by whether it conforms to rules and duties — NOT by its consequences. This is the fundamental distinction from consequentialism. The categorical imperative says: act only as you could will your action to be universalised, regardless of outcomes.',
    wrongExplanations: [],
    difficulty: 'easy', examRelevance: 'high'
  },
  // ===== WEEK 2: DATA PRIVACY =====
  {
    id: 'q-006', week: 'week2', topic: 'UK GDPR', type: 'scenario',
    question: 'A user contacts a company and asks for all their personal data to be deleted. Under UK GDPR, the company:',
    options: ['Must always delete all data immediately', 'May accept the request unless there is a valid reason to retain the data (legal obligation, legitimate purpose)', 'Never has to comply with deletion requests', 'Can only delete data after 6 months'],
    correctIndex: 1,
    explanation: 'The right to erasure (Art. 17 GDPR) is not absolute. The company may decline if: data is necessary for legal obligation, public interest, or other overriding purpose. But if no valid retention basis exists, the company should comply with the deletion request.',
    wrongExplanations: ['The right to erasure has exceptions — legal obligations, public interest, scientific research may override it.', 'UK GDPR expressly provides the right to erasure under Art. 17.', 'There is no 6-month waiting period in GDPR.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-007', week: 'week2', topic: 'UK GDPR', type: 'scenario',
    question: 'A company operating across several EU countries claims it must deal with multiple data protection authorities. Is this consistent with GDPR?',
    options: ['Yes — each country has its own DPA and companies must engage all of them', 'No — GDPR\'s one-stop-shop mechanism means a company primarily deals with ONE DPA in its main establishment country', 'Yes — but only for large companies with over 250 employees', 'No — companies only deal with the UK ICO regardless of location'],
    correctIndex: 1,
    explanation: 'GDPR\'s one-stop-shop mechanism means a company mainly deals with the DPA in the country of its main establishment. This reduces regulatory fragmentation. Multiple simultaneous DPA engagement contradicts this principle.',
    wrongExplanations: ['The one-stop-shop mechanism reduces multiple DPA engagement.', 'The 250-employee threshold relates to record-keeping obligations, not the one-stop-shop.', 'Post-Brexit UK and EU GDPR operate separately — UK companies with EU operations may engage both UK ICO and lead EU DPA.'],
    difficulty: 'medium', examRelevance: 'medium'
  },
  {
    id: 'q-008', week: 'week2', topic: 'GDPR Principles', type: 'best-response',
    question: 'Which GDPR Principle is described as the "master principle" and why?',
    options: ['P1 (Lawfulness) — because all processing must be lawful', 'P3 (Data Minimisation) — because collecting less data reduces risk', 'P7 (Accountability) — because controllers must DEMONSTRATE compliance with all other principles', 'P6 (Integrity & Confidentiality) — because security is most important'],
    correctIndex: 2,
    explanation: 'P7 (Accountability) is the master principle because it transforms GDPR from rule-following into active governance obligation. The controller must be able to DEMONSTRATE compliance with P1-P6 — not merely intend to comply. This is why DPOs, audit trails, Privacy by Design, and retention policies exist.',
    wrongExplanations: ['Lawfulness is essential but P7 encompasses all other principles through the demonstration requirement.', 'Data minimisation is important but P7 is the overarching governance obligation.', 'Security is important but P7 requires demonstrated compliance across all six other principles.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-009', week: 'week2', topic: 'Personal Data', type: 'mcq',
    question: 'Which of the following is an example of "special category data" under UK GDPR?',
    options: ['Name and email address', 'Job title and employer', 'Biometric data used for identification purposes', 'Home address'],
    correctIndex: 2,
    explanation: 'Biometric data processed for identification purposes is special category data under Art. 9 GDPR, requiring explicit consent or specific lawful basis. Other examples: health, genetic, racial/ethnic origin, political opinions, religious beliefs, sexual orientation, trade union membership.',
    wrongExplanations: ['Name and email are personal data but not special category.', 'Job title and employer are personal data but not special category.', 'Home address is personal data but not special category.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-010', week: 'week2', topic: 'OSINT', type: 'scenario',
    question: 'A security researcher combines publicly available data: a person\'s name (from LinkedIn), home neighbourhood (from photo metadata), daily gym time (from Strava), and workplace (from a company directory). This illustrates:',
    options: ['Lawful data collection — all sources are public', 'The aggregation problem — individually harmless data combined creates a surveillance profile violating privacy as autonomy', 'A violation of the Computer Misuse Act', 'Normal OSINT practice with no ethical concerns'],
    correctIndex: 1,
    explanation: 'The aggregation problem: each individual data point may be public and legally accessible, but combined they create a surveillance capability enabling targeting, stalking, or harm that no single piece would enable. GDPR\'s "identifiable person" definition addresses this risk. Legally permitted ≠ ethically acceptable.',
    wrongExplanations: ['Even if legally accessible, GDPR\'s broad personal data definition and privacy-as-autonomy principle mean this raises serious ethical concerns.', 'No CMA offence is committed by accessing public data — the issue is ethical/privacy, not criminal.', 'This illustrates why OSINT requires ethical analysis even when legal.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  // ===== WEEK 3: IP =====
  {
    id: 'q-011', week: 'week3', topic: 'Copyright', type: 'mcq',
    question: 'Under the Copyright, Designs and Patents Act 1988, which of the following is automatically protected by copyright without registration?',
    options: ['A novel cryptographic algorithm', 'A new product design for a router', 'Software source code written by a developer', 'A company brand name and logo'],
    correctIndex: 2,
    explanation: 'Software source code is protected by copyright automatically under CDPA 1988 — no registration required. Copyright protects the expression (the code) not the idea (the algorithm). The algorithm itself is not protectable by copyright; the code implementing it is.',
    wrongExplanations: ['A cryptographic algorithm is an idea — not protectable by copyright. Could be patented if it provides a technical contribution.', 'A product design may qualify for design rights, not necessarily copyright.', 'Brand names/logos are protected by trade marks (registered) or passing off (unregistered), not copyright.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-012', week: 'week3', topic: 'Patents', type: 'scenario',
    question: 'A developer creates a new software application that implements a more efficient algorithm for detecting network intrusions, reducing false positives by 40%. Is this patentable in the UK?',
    options: ['Yes — all software innovations are patentable', 'No — all software is categorically excluded from patent protection', 'Potentially yes — if it provides a technical solution to a technical problem (Aerotel four-step test)', 'Only if registered within 6 months of creation'],
    correctIndex: 2,
    explanation: 'Under Aerotel/Macrossan, software can be patentable if it provides a technical contribution to a technical problem. A novel network intrusion detection architecture with measurable technical improvement likely qualifies — it is not merely an abstract algorithm but provides a technical solution. Must pass all four Aerotel steps.',
    wrongExplanations: ['Software is excluded "as such" — only patentable if technical contribution exists.', 'Software is not categorically excluded — the Aerotel test allows patents for technical contributions.', 'The timing relates to patent applications, not creation dates specifically.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  {
    id: 'q-013', week: 'week3', topic: 'Licensing', type: 'scenario',
    question: 'A startup incorporates GPL-licensed open source code into its commercial product. The most significant legal risk is:',
    options: ['The startup must pay a licence fee to the GPL creator', 'The viral effect of GPL may require the entire commercial product to be open-sourced', 'The startup may only use GPL code for non-commercial purposes', 'GPL code cannot be modified'],
    correctIndex: 1,
    explanation: 'GPL\'s "copyleft" or "viral effect" means any derivative work must be released under the same GPL licence. Incorporating GPL code into commercial software may trigger an obligation to open-source the entire product — eliminating trade secret protection and competitive advantage.',
    wrongExplanations: ['GPL is free to use — there is no licence fee, but the viral effect is the risk.', 'GPL can be used commercially — but the viral licensing obligation applies to commercial use too.', 'GPL code CAN be modified, but modified versions must also be GPL-licensed.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-014', week: 'week3', topic: 'Key Cases', type: 'mcq',
    question: 'The Infopaq v Danske Dagblades (2009) ECJ ruling established that:',
    options: ['Copyright requires a minimum of 100 words to subsist', 'Reproducing as few as 11 words can constitute copyright infringement if they reflect the author\'s own intellectual creation', 'Computer-generated works have no copyright protection', 'GDPR applies to all copyright materials'],
    correctIndex: 1,
    explanation: 'Infopaq established that even 11 words constitute infringement if they reflect the "author\'s own intellectual creation" — the originality threshold. This is profoundly important for AI/LLM output debates: any generated text that reproduces even short extracts from protected works may infringe.',
    wrongExplanations: ['There is no 100-word minimum in copyright law.', 'CDPA 1988 s.9(3) does provide protection for computer-generated works.', 'GDPR is data protection law, not IP law.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  // ===== WEEK 5: INFORMATION GOVERNANCE =====
  {
    id: 'q-015', week: 'week5', topic: 'Information Governance', type: 'mcq',
    question: 'What is the key distinction between Records Management and Compliance in Information Governance?',
    options: ['They are the same thing — both focus on regulatory requirements', 'Records Management focuses on the lifecycle of information (create, use, archive, delete); Compliance focuses on meeting legal and regulatory requirements through audits and monitoring', 'Compliance is only relevant for public sector organisations', 'Records Management only applies to paper documents'],
    correctIndex: 1,
    explanation: 'Records Management is operational data stewardship across the information lifecycle. Compliance is about meeting external legal and regulatory requirements through monitoring and audits. Both are components of the broader IG framework but serve different purposes.',
    wrongExplanations: ['They are distinct: RM is lifecycle-focused, Compliance is regulation-focused.', 'Compliance applies to all organisations — private sector faces GDPR, financial regulations, etc.', 'Records Management applies to all information types: electronic, paper, digital.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-016', week: 'week5', topic: 'Post Office Horizon', type: 'scenario',
    question: 'The Post Office Horizon scandal is best described as a failure of:',
    options: ['Marketing and public relations', 'Technical skill — the software was simply too difficult to program correctly', 'Information Governance — specifically failures of accuracy (P4) and accountability (P7) with accountability diffusion across multiple parties', 'Employment law only — it was a workforce management failure'],
    correctIndex: 2,
    explanation: 'The Post Office Horizon scandal is a definitive IG case study: P4 (Accuracy) failure — faulty data accepted as ground truth; P7 (Accountability) failure — no audit mechanism or challenge process; accountability diffusion — neither Fujitsu nor Post Office leadership faced prosecution despite causing 900+ wrongful prosecutions.',
    wrongExplanations: ['This was a governance failure with catastrophic human consequences, not a PR issue.', 'The scandal was fundamentally an IG and governance failure, not purely a technical one.', 'The wrongful prosecutions make this an IG, data quality, and accountability failure at its core.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-017', week: 'week5', topic: 'Red Teaming', type: 'mcq',
    question: 'In the HUHT/LULT threat actor framework, which category demands the HIGHEST defensive priority?',
    options: ['LULT — Low capability, Low motivation', 'LUHT — Low capability, High motivation', 'HULT — High capability, Low motivation', 'HUHT — High capability, High motivation'],
    correctIndex: 3,
    explanation: 'HUHT (High capability, High motivation) actors are the most dangerous — they have both the ability and the specific intent to attack your organisation. Examples: nation-state APTs targeting critical infrastructure. Response: simulate their specific TTPs (Tactics, Techniques, Procedures) in red team exercises.',
    wrongExplanations: ['LULT requires only basic hygiene — patching and MFA.', 'LUHT requires access controls and insider threat focus — lower priority than HUHT.', 'HULT requires monitoring for targeting shift but is lower priority than HUHT.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  // ===== WEEK 6: CYBERSECURITY =====
  {
    id: 'q-018', week: 'week6', topic: 'CMA 1990', type: 'scenario',
    question: 'A person logs into a company computer system without permission and copies some files. Under the Computer Misuse Act, what offence has been committed and what is the maximum penalty?',
    options: ['No offence — they only copied, not modified, the files', 'Section 1 — Unauthorised Access — up to 2 years imprisonment and/or unlimited fine', 'Section 3 — Unauthorised Modification — up to 10 years', 'Section 3ZA — Serious Damage — up to life imprisonment'],
    correctIndex: 1,
    explanation: 'Logging in without authorisation and copying files constitutes CMA S.1 (Unauthorised Access to computer material) — accessing any computer material without authorisation and with knowledge of that lack of authorisation. Maximum penalty: 2 years imprisonment and/or unlimited fine.',
    wrongExplanations: ['Copying files constitutes accessing computer material — S.1 applies even without modification.', 'S.3 applies to unauthorised modification/impairment — copying alone does not impair the system.', 'S.3ZA requires serious damage to national infrastructure or human welfare — not applicable here.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-019', week: 'week6', topic: 'Pen Testing', type: 'mcq',
    question: 'What makes penetration testing lawful under the Computer Misuse Act?',
    options: ['The tester\'s professional qualifications (e.g., CREST, CEH)', 'Written authorisation from the system owner negating the mens rea of unauthorised access', 'GDPR compliance documentation', 'The tester being employed by the target organisation'],
    correctIndex: 1,
    explanation: 'Written authorisation from the system owner negates the mens rea element of CMA S.1 — "knowledge of no authorisation." With a Letter of Authorisation, access becomes authorised and therefore lawful. Professional qualifications do NOT in themselves make hacking lawful.',
    wrongExplanations: ['Professional qualifications are good practice but do not legally authorise access.', 'GDPR documentation is irrelevant to CMA authorisation.', 'Employment at the target does not automatically authorise access to specific systems.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-020', week: 'week6', topic: 'CIA Triad', type: 'scenario',
    question: 'A ransomware attack encrypts a hospital\'s patient records, making them inaccessible during an emergency. Which aspect of the CIA Triad is PRIMARILY affected?',
    options: ['Confidentiality — the data is now visible to attackers', 'Integrity — the data has been modified', 'Availability — the data cannot be accessed when needed', 'All three equally'],
    correctIndex: 2,
    explanation: 'The primary impact is on Availability — the data/system is inaccessible when needed. This is the defining feature of ransomware attacks. Confidentiality may also be affected (data potentially exfiltrated), and integrity may be affected (encryption modifies files) — but the primary, immediate harm is unavailability.',
    wrongExplanations: ['Confidentiality may be secondarily affected if data is exfiltrated before encryption.', 'Integrity is secondarily affected (encryption modifies files) but the primary harm is unavailability.', 'While all three may be affected, the primary and definitional impact of ransomware is on Availability.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-021', week: 'week6', topic: 'Attack Lifecycle', type: 'scenario',
    question: 'In the Bybit heist (2025), attackers compromised a third-party signing interface (Safe{Wallet}) and implanted malicious JavaScript before the actual theft. Which attack lifecycle stage does this represent?',
    options: ['Reconnaissance', 'Gaining Access', 'Maintaining Access', 'Covering Tracks'],
    correctIndex: 2,
    explanation: 'Implanting malicious JavaScript in the Safe{Wallet} interface BEFORE the actual theft represents the Maintaining Access stage — establishing a persistent backdoor or mechanism to execute the eventual attack. The compromise of Safe{Wallet}\'s developer environment was the Gaining Access stage.',
    wrongExplanations: ['Reconnaissance was gathering information about Bybit\'s cold wallet infrastructure.', 'Gaining Access was compromising the Safe{Wallet} developer environment via supply chain.', 'Covering Tracks comes AFTER the theft — hiding evidence of the attack.'],
    difficulty: 'hard', examRelevance: 'medium'
  },
  // ===== WEEK 9: WORKPLACE =====
  {
    id: 'q-022', week: 'week9', topic: 'Monitoring', type: 'scenario',
    question: 'An employer installs keystroke logging software on all employee computers without informing staff, to detect a suspected data leaker. This is problematic because:',
    options: ['Keystroke logging is always illegal', 'It fails the PTLN test — specifically Transparency (no notice) and Proportionality (blanket monitoring of all for suspected breach by one)', 'Only the suspected employee should be monitored, regardless of notice', 'It violates CMA S.1'],
    correctIndex: 1,
    explanation: 'This fails the PTLN test on at least two grounds: Transparency — employees must be informed (ACAS, TLBP Regulations); Proportionality — blanket keylogging for all staff fails proportionality when only one person is suspected. Also: keystroke logging has a very high legal threshold even when disclosed.',
    wrongExplanations: ['Keystroke logging is not always illegal — but it has a very high threshold and requires transparency.', 'Even targeted monitoring requires PTLN satisfaction and employee notice.', 'CMA S.1 relates to unauthorised computer access — employers accessing their own systems is not a CMA offence.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-023', week: 'week9', topic: 'Gross Misconduct', type: 'mcq',
    question: 'During a gross misconduct investigation, an employee is suspended. What are the correct conditions for this suspension?',
    options: ['Unpaid suspension for up to 30 days', 'Paid suspension for up to five working days while the investigation proceeds', 'Immediate summary dismissal without investigation', 'The employee must work from home during investigation — no suspension'],
    correctIndex: 1,
    explanation: 'Suspension during investigation should be on FULL PAY, typically for up to five working days while the matter is being investigated. Unpaid suspension may constitute unlawful deduction from wages. Investigation and disciplinary process must follow before any dismissal.',
    wrongExplanations: ['Suspension should be on full pay — unpaid suspension risks unlawful deduction claims.', 'Summary dismissal without investigation violates ACAS Code and risks unfair dismissal findings.', 'While remote working is sometimes used, formal suspension on full pay is the standard procedure.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-024', week: 'week9', topic: "Sam's 1st Day", type: 'scenario',
    question: "In Sam's 1st Day, the manager says 'If new joiners struggle, they tend to ask.' What professional/ethical failure does this represent?",
    options: ['Good management practice — new joiners should ask questions', 'Assumption-driven leadership — the manager treats absence of feedback as success, rather than proactively checking wellbeing and creating psychological safety', 'A GDPR compliance issue', 'Normal new starter behaviour — first days are always difficult'],
    correctIndex: 1,
    explanation: 'The manager\'s assumption that "no news = good news" represents a failure of empathetic, proactive leadership. Psychological safety — the ability to raise concerns without fear — is a leadership OUTPUT, not a structural guarantee. A good leader checks in proactively, especially for new starters who may not know what they don\'t know.',
    wrongExplanations: ['While asking questions is good, creating an environment where people feel safe to ask is the manager\'s responsibility.', 'While GDPR elements exist (monitoring training completion), the primary failure is leadership ethics.', 'Acknowledging difficulty does not excuse failure to support — especially for potentially neurodiverse employees.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-025', week: 'week9', topic: 'Monitoring', type: 'best-response',
    question: 'Under the TLBP Regulations 2000, an employer can monitor employee communications WITHOUT explicit consent if:',
    options: ['The employer believes the employee is underperforming', 'The monitoring is for a legitimate business purpose, employees have been informed monitoring may occur, and it is proportionate', 'The employer has a general acceptable use policy in place', 'The monitoring is done by HR rather than IT'],
    correctIndex: 1,
    explanation: 'TLBP Regulations 2000 create three conjunctive conditions (ALL must be met): (1) legitimate business purpose (crime detection, regulatory compliance, business transaction verification, system standards); (2) all reasonable steps taken to inform employees; (3) proportionate to stated purpose. Failure on any limb = RIPA breach.',
    wrongExplanations: ['Performance suspicion is not a valid TLBP ground — requires legitimate business purpose.', 'A general AUP alone is insufficient — specific notice and proportionality are also required.', 'The identity of who monitors is irrelevant to TLBP compliance — the conditions must be met regardless.'],
    difficulty: 'hard', examRelevance: 'high'
  },
];
