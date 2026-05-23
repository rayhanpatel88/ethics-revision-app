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
  // ===== GAP-FILL QUESTIONS: WEEK 1 =====
  {
    id: 'q-026', week: 'week1', topic: 'ACM Code', type: 'mcq',
    question: 'Which ACM principle is most directly engaged when a developer discovers that a deployed system is causing avoidable harm to users?',
    options: ['Respect privacy only', 'Avoid harm and prioritise the public good', 'Maximise employer profit', 'Protect intellectual property at all costs'],
    correctIndex: 1,
    explanation: 'The ACM Code places the public good and avoidance of harm at the centre of professional conduct. Privacy and IP may matter too, but the core duty in this scenario is to prevent foreseeable user harm.',
    wrongExplanations: ['Privacy may be relevant, but the question is about avoidable harm generally.', 'Professional codes do not reduce ethics to employer profit.', 'IP protection cannot override duties to prevent serious public harm.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-027', week: 'week1', topic: 'Ethical Theories', type: 'scenario',
    question: 'A deontological answer to a data ethics problem would focus most strongly on:',
    options: ['Whether the action maximises total happiness', 'Whether the actor follows duties such as honesty, consent, respect and fairness', 'Whether the organisation benefits financially', 'Whether the public ever finds out'],
    correctIndex: 1,
    explanation: 'Deontology is duty-based ethics. In computing scenarios, strong answers often use duties such as honesty, respect for autonomy, informed consent, confidentiality and fairness.',
    wrongExplanations: ['That is utilitarian reasoning, not deontological reasoning.', 'Financial benefit is not the test for deontological ethics.', 'Whether conduct is discovered is not the same as whether it is ethically right.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-028', week: 'week1', topic: 'Whistleblowing', type: 'best-response',
    question: 'Which action best protects a whistleblower under PIDA-style reasoning?',
    options: ['Posting allegations anonymously on social media first', 'Making a protected disclosure in good faith through appropriate internal or prescribed external channels with evidence', 'Leaking all company documents to competitors', 'Waiting until harm is irreversible before acting'],
    correctIndex: 1,
    explanation: 'A strong whistleblowing answer links public interest, evidence, good faith, proportionality and the escalation ladder. Protected disclosure is not a free pass for reckless leaking.',
    wrongExplanations: ['Social media is usually a last resort, not the first step.', 'Leaking to competitors is unlikely to be proportionate or public-interest focused.', 'Professionals should act before avoidable harm becomes irreversible.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-029', week: 'week1', topic: 'Virtue Ethics', type: 'scenario',
    question: 'A junior developer quietly notices a safety flaw but fears annoying senior staff. Which virtue ethics framing is strongest?',
    options: ['Ask what a courageous, honest and practically wise professional would do', 'Calculate the company share price impact only', 'Check whether the flaw is already public knowledge', 'Ignore the flaw unless asked directly'],
    correctIndex: 0,
    explanation: 'Virtue ethics asks what kind of professional character is being shown. Courage, honesty, practical wisdom and integrity are especially relevant when raising difficult technical concerns.',
    wrongExplanations: ['Share price is not the centre of virtue ethics.', 'Public knowledge does not determine professional character.', 'Ignoring the flaw conflicts with integrity and courage.'],
    difficulty: 'medium', examRelevance: 'medium'
  },
  {
    id: 'q-030', week: 'week1', topic: 'Professional Identity', type: 'mcq',
    question: 'Why do exam answers often say computing professionals have duties beyond ordinary employees?',
    options: ['They can never be dismissed', 'They control complex systems whose risks are hard for the public and managers to see', 'They are always legally liable for every bug', 'They are exempt from business objectives'],
    correctIndex: 1,
    explanation: 'Professional responsibility is heightened because computing experts understand risks, dependencies and hidden harms that non-specialists may miss. This supports duties to warn, document and challenge unsafe decisions.',
    wrongExplanations: ['Professional duties do not make employees immune from dismissal.', 'Liability depends on facts and law; the ethical point is broader.', 'Ethics must be balanced with business aims, not separated from them entirely.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  // ===== GAP-FILL QUESTIONS: WEEK 2 =====
  {
    id: 'q-031', week: 'week2', topic: 'Lawful Bases', type: 'scenario',
    question: 'A university wants to process student attendance data because it is necessary to provide education and meet regulatory duties. Which GDPR concept is most relevant?',
    options: ['Lawful basis for processing', 'Copyright assignment', 'Gross misconduct', 'Computer misuse authorisation'],
    correctIndex: 0,
    explanation: 'GDPR requires a lawful basis for processing personal data. In a university context, this may involve public task, contract, legal obligation or legitimate interests depending on the exact processing purpose.',
    wrongExplanations: ['Copyright does not authorise personal data processing.', 'Gross misconduct is an employment issue, not a lawful basis.', 'CMA authorisation concerns access to computer systems, not data protection basis.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-032', week: 'week2', topic: 'Data Minimisation', type: 'best-response',
    question: 'An app collects users\' date of birth, home address and passport number to send a weekly newsletter. What is the strongest GDPR criticism?',
    options: ['There is no issue if the privacy policy mentions it', 'It likely breaches data minimisation because the data is excessive for the stated purpose', 'It is only a copyright issue', 'It is acceptable because newsletters are low risk'],
    correctIndex: 1,
    explanation: 'Data minimisation requires personal data to be adequate, relevant and limited to what is necessary. A newsletter normally needs an email address, not passport numbers or home addresses.',
    wrongExplanations: ['A privacy policy does not cure excessive collection.', 'Copyright is not the issue.', 'Low-risk purposes still need GDPR-compliant processing.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-033', week: 'week2', topic: 'Privacy by Design', type: 'mcq',
    question: 'Privacy by design means:',
    options: ['Adding a privacy policy after launch', 'Building privacy safeguards into the system from the start and by default', 'Deleting all data immediately after collection', 'Using encryption instead of consent in every case'],
    correctIndex: 1,
    explanation: 'Privacy by design and default require data protection to be integrated into architecture, defaults, access controls, retention, logging and user choices from the beginning.',
    wrongExplanations: ['A late privacy policy is notice, not design.', 'Retention can be lawful where justified; immediate deletion is not always required.', 'Encryption is valuable but does not replace all GDPR obligations.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-034', week: 'week2', topic: 'Automated Decisions', type: 'scenario',
    question: 'A recruitment system automatically rejects applicants with no human review and the decision has a serious effect on them. Which GDPR concern is most direct?',
    options: ['Article 22 automated decision-making and profiling', 'Section 3 Computer Misuse Act', 'Trade mark infringement', 'Passing off'],
    correctIndex: 0,
    explanation: 'GDPR Article 22 concerns solely automated decisions with legal or similarly significant effects. Strong answers mention safeguards, transparency, meaningful information and the ability to contest decisions.',
    wrongExplanations: ['CMA s.3 concerns unauthorised impairment, not automated recruitment decisions.', 'Trade marks do not address automated personal data decisions.', 'Passing off is unrelated to automated profiling.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-035', week: 'week2', topic: 'Processors', type: 'scenario',
    question: 'A company outsources payroll processing to a cloud provider. Under GDPR, what should a strong answer emphasise?',
    options: ['Outsourcing removes the company\'s data protection responsibility', 'The controller must use an appropriate processor contract and remain accountable', 'The cloud provider becomes the only controller automatically', 'GDPR no longer applies once data is in the cloud'],
    correctIndex: 1,
    explanation: 'Using a processor does not remove controller accountability. The controller needs due diligence, contractual controls, security obligations, audit rights and clear processing instructions.',
    wrongExplanations: ['Accountability cannot be outsourced away.', 'Roles depend on purposes and means, not automatic labels.', 'Cloud processing remains within GDPR where personal data is processed.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-036', week: 'week2', topic: 'Cookies and PECR', type: 'mcq',
    question: 'For non-essential tracking cookies, the safest UK compliance position is:',
    options: ['Use them by default unless the user complains', 'Obtain clear prior consent and provide meaningful information', 'Hide them in terms and conditions only', 'Treat them as anonymous even if they build user profiles'],
    correctIndex: 1,
    explanation: 'PECR and UK GDPR require meaningful transparency and consent for non-essential tracking cookies. Consent should be active, informed and freely given.',
    wrongExplanations: ['Complaint-based consent is not valid consent.', 'Terms alone are unlikely to provide valid cookie consent.', 'Profiles can still be personal data even if identifiers are indirect.'],
    difficulty: 'medium', examRelevance: 'medium'
  },
  // ===== GAP-FILL QUESTIONS: WEEK 3 =====
  {
    id: 'q-037', week: 'week3', topic: 'Trade Marks', type: 'scenario',
    question: 'A startup launches a payment app using a name and logo very similar to a famous bank, causing users to think it is connected. Which IP issue is strongest?',
    options: ['Trade mark infringement and passing off', 'CMA s.1 unauthorised access', 'GDPR lawful basis', 'Patent novelty only'],
    correctIndex: 0,
    explanation: 'Similar branding that causes confusion engages trade mark infringement and passing off. Passing off protects goodwill against misrepresentation causing damage.',
    wrongExplanations: ['No computer access issue is described.', 'GDPR may arise if personal data is processed, but the branding problem is IP.', 'Patent novelty concerns inventions, not confusing branding.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-038', week: 'week3', topic: 'Ownership', type: 'best-response',
    question: 'A freelancer writes code for a client without a written IP assignment. What is the safest legal exam point?',
    options: ['The client automatically owns all copyright because they paid', 'The freelancer may retain copyright unless there is a valid assignment, while the client may have an implied licence', 'Nobody owns the code', 'Copyright only protects printed code, not software'],
    correctIndex: 1,
    explanation: 'Payment alone does not necessarily transfer copyright from an independent contractor. A written assignment is safest; otherwise the client may only have an implied licence to use the work.',
    wrongExplanations: ['Automatic employer ownership is different from contractor ownership.', 'Copyright exists automatically when original work is created.', 'Software code is protected by copyright.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  {
    id: 'q-039', week: 'week3', topic: 'Open Source', type: 'mcq',
    question: 'Which licence is most associated with copyleft obligations requiring derivative works to be distributed under the same licence?',
    options: ['MIT', 'GPL', 'Apache 2.0', 'A private NDA'],
    correctIndex: 1,
    explanation: 'GPL is the classic copyleft licence. MIT and Apache are permissive licences; Apache also includes express patent licence terms.',
    wrongExplanations: ['MIT is permissive, not strong copyleft.', 'Apache 2.0 is permissive and includes patent provisions, not GPL-style copyleft.', 'An NDA is a confidentiality contract, not an open-source licence.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-040', week: 'week3', topic: 'AI and Copyright', type: 'scenario',
    question: 'A company trains an AI model on large amounts of copyrighted material. Which answer best reflects the exam nuance?',
    options: ['Training is always lawful because AI is new', 'Training is always criminal theft', 'The position is legally and ethically contested; analyse copyright exceptions, licensing, transparency, market harm and fairness', 'Copyright cannot apply to digital works'],
    correctIndex: 2,
    explanation: 'High-scoring answers avoid absolutes. AI training raises contested questions about copying, text and data mining, licensing, market substitution, author consent and fairness.',
    wrongExplanations: ['Novel technology does not remove copyright duties.', 'The law is more nuanced than calling all training criminal theft.', 'Digital works can be copyright protected.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  {
    id: 'q-041', week: 'week3', topic: 'Database Rights', type: 'mcq',
    question: 'Database right is most likely to protect:',
    options: ['The investment in obtaining, verifying or presenting the contents of a database', 'A moral feeling that data should be private', 'Any idea written in a notebook', 'The right to hack a database for research'],
    correctIndex: 0,
    explanation: 'Database right protects substantial investment in obtaining, verifying or presenting database contents. It is distinct from copyright in the structure or individual works.',
    wrongExplanations: ['Privacy is a data protection issue, not database right.', 'Ideas alone are not protected in that way.', 'Database right does not authorise unauthorised access.'],
    difficulty: 'medium', examRelevance: 'medium'
  },
  {
    id: 'q-042', week: 'week3', topic: 'Design Rights', type: 'scenario',
    question: 'A competitor copies the distinctive visual layout and product appearance of a hardware device, but not its internal code. Which IP right may be most relevant?',
    options: ['Design rights', 'GDPR portability', 'CMA s.3ZA', 'Whistleblowing protection'],
    correctIndex: 0,
    explanation: 'Design rights can protect the appearance of a product, including shape and configuration. They are different from copyright in software code and from patents for inventions.',
    wrongExplanations: ['Data portability is unrelated to product appearance.', 'CMA s.3ZA concerns serious unauthorised computer damage.', 'Whistleblowing protection is not an IP right.'],
    difficulty: 'medium', examRelevance: 'medium'
  },
  // ===== GAP-FILL QUESTIONS: WEEK 5 =====
  {
    id: 'q-043', week: 'week5', topic: 'Retention Schedules', type: 'mcq',
    question: 'A retention schedule is important in Information Governance because it:',
    options: ['Keeps all records forever in case they are useful', 'Defines how long different records are kept and when they should be archived or deleted', 'Removes the need for access controls', 'Only applies to printed files'],
    correctIndex: 1,
    explanation: 'Retention schedules support lifecycle governance, legal compliance, storage control and data minimisation. Keeping everything forever increases risk and cost.',
    wrongExplanations: ['Indefinite retention is usually poor governance.', 'Access controls are still needed.', 'Retention applies to digital and physical records.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-044', week: 'week5', topic: 'Data Classification', type: 'scenario',
    question: 'A hospital labels records as public, internal, confidential and highly sensitive. What IG control is this?',
    options: ['Data classification', 'Passing off', 'Virtue ethics', 'Patent registration'],
    correctIndex: 0,
    explanation: 'Data classification assigns handling requirements based on sensitivity and risk. It supports access control, retention, encryption and incident response.',
    wrongExplanations: ['Passing off is an IP issue.', 'Virtue ethics is not an information handling control.', 'Patent registration protects inventions, not record sensitivity.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-045', week: 'week5', topic: 'LORS', type: 'best-response',
    question: 'In Information Governance, the LORS lens is useful because it forces an answer to consider:',
    options: ['Legal, organisational, reputational and security dimensions together', 'Only whether the software compiles', 'Only employee discipline', 'Logo, ownership, revenue and sales'],
    correctIndex: 0,
    explanation: 'LORS helps structure governance analysis across legal duties, organisational processes, reputational trust and security risks. It prevents narrow answers that treat IG as only IT.',
    wrongExplanations: ['Technical correctness alone is not governance.', 'Discipline may be relevant but is too narrow.', 'Those are not the LORS dimensions used for IG analysis.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-046', week: 'week5', topic: 'Accountability', type: 'scenario',
    question: 'A system failure occurs and each supplier, manager and operator claims someone else was responsible. Which IG problem does this show?',
    options: ['Accountability diffusion', 'Trade mark dilution', 'Consent fatigue only', 'A valid defence to all liability'],
    correctIndex: 0,
    explanation: 'Accountability diffusion occurs when responsibility is spread so widely that no one owns risk, audit, correction or escalation. Strong governance assigns clear accountable owners.',
    wrongExplanations: ['Trade marks are unrelated.', 'Consent fatigue is a privacy UX problem, not the core governance failure here.', 'Diffusion is a problem, not a complete defence.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-047', week: 'week5', topic: 'Structured vs Unstructured Data', type: 'mcq',
    question: 'Which example is unstructured information that still needs governance?',
    options: ['A payroll table with columns for salary and employee ID', 'Email chains and meeting notes about a complaint', 'A database primary key', 'A numeric attendance field only'],
    correctIndex: 1,
    explanation: 'Unstructured information such as emails, chats, notes and documents can contain crucial evidence and personal data. IG must govern it through retention, search, access and audit controls.',
    wrongExplanations: ['A payroll table is structured data.', 'A primary key is structured database metadata.', 'A single numeric field is structured data.'],
    difficulty: 'easy', examRelevance: 'medium'
  },
  {
    id: 'q-048', week: 'week5', topic: 'Red Teaming', type: 'scenario',
    question: 'A red team exercise includes angry customers, regulators, journalists and insider threats, not just hackers. What concept is being applied?',
    options: ['Negative stakeholder mapping', 'Copyright assignment', 'Data portability', 'Patent examination'],
    correctIndex: 0,
    explanation: 'Negative stakeholder mapping identifies actors who may exploit, criticise, resist or be harmed by a system. It expands risk analysis beyond technical attackers.',
    wrongExplanations: ['Copyright assignment transfers IP ownership, not threat perspectives.', 'Portability is a GDPR right.', 'Patent examination is unrelated to stakeholder threat modelling.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-049', week: 'week5', topic: 'Digital Twins', type: 'mcq',
    question: 'Why might a red team use a digital twin?',
    options: ['To test attacks and failures in a realistic simulation without harming the live system', 'To avoid documenting authorisation', 'To replace all legal compliance', 'To guarantee that no real attack can happen'],
    correctIndex: 0,
    explanation: 'Digital twins let teams explore failures, attack paths and resilience in a controlled model. They reduce risk but do not remove the need for authorisation, governance or real-world monitoring.',
    wrongExplanations: ['Authorisation is still essential.', 'Compliance cannot be replaced by simulation.', 'Testing improves resilience but never guarantees perfect security.'],
    difficulty: 'medium', examRelevance: 'medium'
  },
  // ===== GAP-FILL QUESTIONS: WEEK 6 =====
  {
    id: 'q-050', week: 'week6', topic: 'CMA 1990', type: 'mcq',
    question: 'Which Computer Misuse Act offence is most clearly about making, supplying or obtaining tools for computer misuse?',
    options: ['Section 1', 'Section 2', 'Section 3A', 'Article 22'],
    correctIndex: 2,
    explanation: 'CMA s.3A targets making, supplying or obtaining articles for use in computer misuse offences. In exam answers, context matters because many dual-use tools also have legitimate security uses.',
    wrongExplanations: ['Section 1 is unauthorised access.', 'Section 2 is unauthorised access with intent to commit further offences.', 'Article 22 is GDPR automated decision-making, not CMA.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-051', week: 'week6', topic: 'CMA 1990', type: 'scenario',
    question: 'A hacker accesses a system without permission and then installs malware that disrupts operations. Which offence is most likely added beyond s.1?',
    options: ['Section 3 unauthorised acts impairing operation of a computer', 'Passing off', 'Database right', 'TLBP monitoring'],
    correctIndex: 0,
    explanation: 'Unauthorised access is s.1. Installing malware that impairs operation or access to data points to s.3. Serious damage to welfare or national security could escalate to s.3ZA.',
    wrongExplanations: ['Passing off is a branding/IP issue.', 'Database right protects database investment.', 'TLBP concerns workplace communications monitoring.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-052', week: 'week6', topic: 'Pen Testing', type: 'best-response',
    question: 'During an authorised penetration test, the tester finds an out-of-scope server with a serious vulnerability. What is the best response?',
    options: ['Exploit it fully because the intention is defensive', 'Stop, document the finding, notify the client and seek written scope variation before further testing', 'Ignore it forever because it is out of scope', 'Post details publicly to force a fix'],
    correctIndex: 1,
    explanation: 'Authorisation is scope-bound. A professional tester should avoid scope creep, preserve evidence, notify the client and obtain written permission before testing additional systems.',
    wrongExplanations: ['Good intentions do not authorise out-of-scope access.', 'Ignoring a serious risk is poor professional practice; escalation is needed.', 'Public disclosure before responsible escalation is disproportionate.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  {
    id: 'q-053', week: 'week6', topic: 'Responsible Disclosure', type: 'scenario',
    question: 'A student finds a vulnerability in a university portal by accident. Which response is ethically strongest?',
    options: ['Quietly test how far access can go', 'Report promptly through responsible disclosure channels, avoid further access and preserve evidence', 'Sell the vulnerability online', 'Delete logs to avoid embarrassment'],
    correctIndex: 1,
    explanation: 'Responsible disclosure means minimising harm, avoiding further unauthorised access, documenting facts and reporting through appropriate channels. Curiosity does not justify continued probing.',
    wrongExplanations: ['Further probing may become unauthorised access.', 'Selling the vulnerability maximises risk.', 'Deleting logs is dishonest and may worsen legal exposure.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-054', week: 'week6', topic: 'AI and Humanism', type: 'mcq',
    question: 'A humanist critique of automated decision systems would most likely emphasise:',
    options: ['Human dignity, agency, reasonableness and the need for meaningful human accountability', 'That automation is always illegal', 'That accuracy alone settles all ethical questions', 'That humans should never use computers'],
    correctIndex: 0,
    explanation: 'The big-question material asks you to go beyond technical performance. Humanist reasoning asks whether people remain respected as agents, whether decisions are reasonable, and who can be held accountable.',
    wrongExplanations: ['Automation is not always illegal.', 'Accuracy matters but does not settle dignity, consent, appeal or accountability.', 'Humanism is not anti-computer; it asks technology to serve human values.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-055', week: 'week6', topic: 'Reasonableness Standard', type: 'best-response',
    question: 'In an ethics exam, the "reasonableness standard" is best used to ask:',
    options: ['Would a responsible professional, with the available evidence and foreseeable risks, regard this action as justified?', 'Did the organisation make the most profit?', 'Was the system built using the newest technology?', 'Can the actor avoid being caught?'],
    correctIndex: 0,
    explanation: 'Reasonableness focuses on justifiable professional judgement: evidence, proportionality, foreseeability, alternatives, documentation and the position of affected stakeholders.',
    wrongExplanations: ['Profit alone is not an ethical standard.', 'Novel technology does not prove ethical quality.', 'Avoiding detection is not reasonableness.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-056', week: 'week6', topic: 'Critical Infrastructure', type: 'scenario',
    question: 'Malware disrupts a water treatment system and risks serious harm to public health. Which CMA concept may become relevant beyond ordinary s.3 impairment?',
    options: ['Section 3ZA serious damage', 'Copyright fair dealing', 'Employee implied licence', 'Cookie consent'],
    correctIndex: 0,
    explanation: 'CMA s.3ZA addresses unauthorised acts causing or risking serious damage, including to human welfare, the environment, the economy or national security.',
    wrongExplanations: ['Fair dealing is copyright, not cyber harm.', 'Employee implied licence is not relevant to critical infrastructure malware.', 'Cookie consent is a privacy issue.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  // ===== GAP-FILL QUESTIONS: WEEK 9 =====
  {
    id: 'q-057', week: 'week9', topic: 'Monitoring Reasons', type: 'mcq',
    question: 'Which is the strongest legitimate business reason for workplace monitoring?',
    options: ['Curiosity about employees\' private lives', 'Detecting crime, protecting systems, meeting regulatory duties or verifying business transactions', 'Embarrassing disliked employees', 'Collecting as much data as possible for future use'],
    correctIndex: 1,
    explanation: 'Workplace monitoring needs a legitimate business purpose. Common valid purposes include security, regulatory compliance, detecting crime and maintaining service standards.',
    wrongExplanations: ['Curiosity is not a legitimate purpose.', 'Targeting disliked employees is unfair and disproportionate.', 'Excessive collection conflicts with necessity and proportionality.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-058', week: 'week9', topic: 'Biometric Monitoring', type: 'scenario',
    question: 'An employer introduces fingerprint clock-in for all staff. What is the strongest data protection concern?',
    options: ['Biometric data can be special category data and requires a strong lawful basis, necessity and safeguards', 'Fingerprints are never personal data', 'Consent is always valid in employment because staff can refuse freely', 'No issue arises if the scanner is cheap'],
    correctIndex: 0,
    explanation: 'Biometric data used for identification is highly sensitive and may be special category data. Employment consent is often problematic because of power imbalance, so necessity and safeguards matter.',
    wrongExplanations: ['Fingerprints used for identification are personal data.', 'Employment consent is not automatically freely given.', 'Cost has no bearing on data protection compliance.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  {
    id: 'q-059', week: 'week9', topic: 'Gross Misconduct', type: 'best-response',
    question: 'Which disciplinary sequence best reflects a fair gross misconduct process?',
    options: ['Dismiss first, investigate if the employee appeals', 'Investigate, suspend on full pay if necessary, invite to a hearing, allow representation, decide based on evidence and offer appeal', 'Ask colleagues to vote', 'Use monitoring data secretly without giving the employee a chance to respond'],
    correctIndex: 1,
    explanation: 'A fair process follows investigation, notice, hearing, representation, evidence-based decision and appeal. Summary dismissal without process risks unfair dismissal even where allegations are serious.',
    wrongExplanations: ['Investigation must precede dismissal.', 'Colleague voting is not a fair disciplinary process.', 'Secret evidence without response undermines procedural fairness.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-060', week: 'week9', topic: "Sam's 1st Day", type: 'scenario',
    question: 'Sam completes mandatory training late because the onboarding system was inaccessible and nobody checked in. What is the strongest ethical point?',
    options: ['Sam alone is at fault because deadlines are deadlines', 'The organisation should consider reasonable adjustments, proactive support and whether its process created avoidable disadvantage', 'The manager should ignore all training requirements', 'This is only an IP problem'],
    correctIndex: 1,
    explanation: 'Strong Sam answers recognise individual responsibility but also examine psychological safety, accessibility, reasonable adjustment and whether the workplace system set the employee up to fail.',
    wrongExplanations: ['A one-sided blame answer misses organisational ethics.', 'Support does not mean ignoring mandatory training.', 'IP is not the relevant issue.'],
    difficulty: 'medium', examRelevance: 'high'
  },
  {
    id: 'q-061', week: 'week9', topic: 'AI Productivity Monitoring', type: 'scenario',
    question: 'A company uses AI to score employees automatically and trigger disciplinary warnings. What should a top answer include?',
    options: ['Only whether the model is accurate', 'Transparency, proportionality, bias, human review, data minimisation and possible Article 22 concerns', 'That AI monitoring is always lawful if employees are paid', 'That managers can avoid responsibility by blaming the algorithm'],
    correctIndex: 1,
    explanation: 'AI workplace monitoring combines employment fairness, privacy and automated decision concerns. Human review and accountability are vital where serious effects follow from automated scoring.',
    wrongExplanations: ['Accuracy is necessary but not sufficient.', 'Payment does not waive employee rights.', 'Algorithms do not remove managerial accountability.'],
    difficulty: 'hard', examRelevance: 'high'
  },
  {
    id: 'q-062', week: 'week9', topic: 'PTLN', type: 'mcq',
    question: 'In the PTLN workplace monitoring framework, Proportionality mainly asks:',
    options: ['Is the monitoring no more intrusive than necessary for the stated purpose?', 'Is the monitoring expensive?', 'Can HR access every message forever?', 'Was the employee unpopular?'],
    correctIndex: 0,
    explanation: 'Proportionality asks whether monitoring is suitable, necessary and balanced against employee privacy. Blanket intrusive monitoring is hard to justify where targeted measures would work.',
    wrongExplanations: ['Cost is not the core proportionality test.', 'Unlimited access is usually disproportionate.', 'Popularity is irrelevant to legality and ethics.'],
    difficulty: 'easy', examRelevance: 'high'
  },
  {
    id: 'q-063', week: 'week9', topic: 'Neurodiversity and Management', type: 'best-response',
    question: 'A manager notices a new employee is quiet and missing informal cues. What is the best professional response?',
    options: ['Assume silence means everything is fine', 'Create a low-pressure check-in, clarify expectations in writing and offer support without forcing disclosure', 'Demand a medical diagnosis immediately', 'Exclude them from complex work'],
    correctIndex: 1,
    explanation: 'Good management builds psychological safety and accessibility without requiring disclosure. Written clarity, proactive check-ins and respectful support are strong ethical responses.',
    wrongExplanations: ['Silence is not reliable evidence of wellbeing.', 'Demanding diagnosis is intrusive and may be discriminatory.', 'Exclusion removes opportunity rather than providing support.'],
    difficulty: 'medium', examRelevance: 'high'
  },
];
