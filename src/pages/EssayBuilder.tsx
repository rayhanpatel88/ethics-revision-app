import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Copy, CheckCircle, Star, Target, BookOpen } from 'lucide-react';
import { examStrategy } from '../data/examStrategy';

interface EssayTemplate {
  id: string;
  title: string;
  week: string;
  marks: number;
  commandWord: string;
  question: string;
  peelStructure: {
    point: string;
    evidence: string[];
    explanation: string;
    link: string;
  }[];
  introGuide: string;
  conclusionGuide: string;
  keyLegislation: string[];
  keyTheories: string[];
  caseStudyHooks: string[];
  highMarkTargets: string[];
  wordGuidance: string;
  markerFocus: string;
}

const ESSAY_TEMPLATES: EssayTemplate[] = [
  {
    id: 'e-001',
    title: 'Ethical Theory in Professional Practice',
    week: 'week1',
    marks: 20,
    commandWord: 'Critically Evaluate',
    question: 'Critically evaluate how a computing professional should apply ethical theory when faced with a conflict between employer instructions and public interest.',
    introGuide: 'Define the conflict: professional duty vs. public interest. Name the relevant frameworks (BCS Code of Conduct, ACM Code) and signal the ethical theories you will apply. One sentence to set up your argument direction.',
    peelStructure: [
      {
        point: 'Utilitarianism provides a strong basis for prioritising public interest in large-scale harm scenarios',
        evidence: ['BCS Code s.1: members must act in the public interest', 'Frances Haugen: suppressed internal research showing 37% increase in teen anxiety', 'Bentham/Mill: total utility of millions of users > commercial utility of platform'],
        explanation: 'Under utilitarian calculus, when employer instructions generate net negative utility (widespread harm), the professional is obligated to act against those instructions. Haugen\'s disclosure maximised total welfare by enabling regulatory intervention.',
        link: 'However, pure utilitarianism struggles with measurement — how do we quantify psychological harm? This is where deontological constraints add rigour.',
      },
      {
        point: 'Deontological ethics establishes categorical professional duties that cannot be overridden by consequences',
        evidence: ['Kant\'s categorical imperative: act only on maxims you could universalise', 'BCS Code s.2: professionals must not bring the profession into disrepute', 'ACM Code 1.2: avoid harm; 2.5: give comprehensive and thorough evaluations'],
        explanation: 'A deontologist argues the duty to warn of harm is categorical — it cannot be traded off against commercial interests. If every professional suppressed safety-critical findings when instructed, the entire basis of professional trust would collapse (the universalisability test fails).',
        link: 'Virtue ethics enriches this further by asking not just what to do, but what kind of professional one should be.',
      },
      {
        point: 'Virtue ethics frames the question around professional character, not just rule-following',
        evidence: ['MacIntyre: virtues are excellences required by the practice itself', 'ELGPC virtues: Empathy, Leadership, Good Judgement, Professional Competence', 'Whistleblowing as an act of courage: the virtuous professional acts despite personal risk'],
        explanation: 'A virtue ethicist would note that a computing professional of good character would not suppress safety data regardless of instructions. The courageous, just, and competent professional speaks truth to power. This explains why Haugen is praised not just for what she did, but for who she proved herself to be.',
        link: 'Yet virtue ethics is criticised for cultural relativism — what counts as virtuous varies across professional cultures.',
      },
      {
        point: 'The escalation framework (internal → regulator → public) operationalises the ethical obligation',
        evidence: ['BCS Code escalation sequence: internal ethics officer → management → regulator → public interest', 'Public Interest Disclosure Act 1998: legal protection for regulated disclosure', 'Haugen: SEC filing before media — following the correct sequence'],
        explanation: 'Professional codes do not simply say "whistleblow" — they specify a sequence. Jumping to public disclosure without exhausting internal channels undermines institutional trust and may not be legally protected. The escalation framework synthesises all three theories: it maximises welfare (utilitarian), discharges duty proportionately (deontological), and reflects the judgement of a virtuous professional.',
        link: 'This has direct application to the exam — the question is not whether to act, but how to act and in what order.',
      },
    ],
    conclusionGuide: 'Synthesise all three frameworks — they converge on the same conclusion (act in public interest) but by different routes. The BCS Code operationalises this into the escalation sequence. A distinction conclusion notes that professional codes are not alternatives to ethical theory but applications of it.',
    keyLegislation: ['BCS Code of Conduct (2022)', 'ACM Code of Ethics (2018)', 'Public Interest Disclosure Act 1998', 'Employment Rights Act 1996 s.43B'],
    keyTheories: ['Utilitarianism (Bentham/Mill)', 'Deontological ethics (Kant)', 'Virtue ethics (Aristotle/MacIntyre)', 'ELGPC professional virtues'],
    caseStudyHooks: ['Frances Haugen (Facebook/Meta, 2021)', 'BCS escalation framework', 'ACM 2.5 evaluation principle'],
    highMarkTargets: ['Apply all three ethical theories, not just one', 'Name specific BCS/ACM provisions', 'Acknowledge tensions between frameworks before synthesising', 'Use Haugen as application, not just as example'],
    wordGuidance: '~600 words for a 20-mark answer (~30 words per mark). Intro: 60w. Four PEEL paragraphs: ~120w each. Conclusion: 60w.',
    markerFocus: 'Examiners want to see: (1) named ethical theories applied analytically, not described; (2) specific BCS/ACM provisions; (3) real-world case used as evidence, not anecdote; (4) synthesis that resolves tensions between frameworks.',
  },
  {
    id: 'e-002',
    title: 'UK GDPR Compliance Analysis',
    week: 'week2',
    marks: 15,
    commandWord: 'Analyse',
    question: 'Analyse the extent to which UK GDPR Article 5 principles would apply to a proposed data-sharing arrangement between a UK tech company and a US-based analytics firm processing personal data for marketing purposes.',
    introGuide: 'Frame the legal context: UK GDPR post-Brexit applies in UK; GDPR internationally. The data-sharing arrangement triggers multiple Art. 5 principles and international transfer rules. Signal your analytical structure.',
    peelStructure: [
      {
        point: 'Article 5(1)(a) lawfulness, fairness and transparency requires a valid lawful basis before any processing begins',
        evidence: ['Art. 6 GDPR: six lawful bases — most likely consent (Art. 6(1)(a)) or legitimate interests (Art. 6(1)(f))', 'ICO guidance: marketing requires consent for most direct contact', 'Cambridge Analytica: processed political data without valid basis — £500k fine'],
        explanation: 'Marketing processing requires the company to identify and document a lawful basis before sharing. Consent must be freely given, specific, informed and unambiguous (Art. 7). Legitimate interests requires a balancing test — commercial marketing interests rarely outweigh individual privacy interests without additional safeguards.',
        link: 'Even with a valid basis, the purpose limitation principle constrains what the US firm can do with the data.',
      },
      {
        point: 'Article 5(1)(b) purpose limitation prevents repurposing personal data for incompatible uses',
        evidence: ['Art. 5(1)(b): collected for specified, explicit and legitimate purposes; not further processed incompatibly', 'Cambridge Analytica: quiz data repurposed for political profiling — the paradigm case', 'ICO v Facebook (2019): £500k fine for allowing incompatible processing'],
        explanation: 'If the personal data was originally collected for one purpose (e.g. service provision) and is now being shared for marketing analytics, this is a purpose change requiring fresh lawful basis or compatibility assessment. The company must document the compatibility analysis under Art. 5(2) accountability principle.',
        link: 'Minimisation adds a further constraint on what data can be shared at all.',
      },
      {
        point: 'Article 5(1)(c) data minimisation requires only data necessary for the specific purpose to be transferred',
        evidence: ['Art. 5(1)(c): adequate, relevant and limited to what is necessary', 'ICO guidance: share pseudonymised data where possible', 'GDPR Recital 39: personal data should be processed only if the purpose of the processing could not reasonably be fulfilled by other means'],
        explanation: 'A marketing analytics arrangement that transfers full personal profiles (name, location, purchase history, device identifiers) when only aggregate segments are needed would breach minimisation. The company should assess whether anonymised or aggregated data would achieve the marketing purpose. Unnecessary data transfer is a per se GDPR violation.',
        link: 'Beyond the data itself, the international transfer creates additional obligations.',
      },
      {
        point: 'Chapter V international transfer rules apply because the US is not an "adequate" country under UK GDPR',
        evidence: ['UK GDPR Art. 44-49: transfer to third countries requires adequate protection or appropriate safeguards', 'US is not on UK\'s adequacy list (Schrems II invalidated EU-US Privacy Shield; UK has its own data bridge)', 'UK-US Data Bridge (2023): available if US entity is certified; requires due diligence', 'Standard Contractual Clauses: alternative mechanism — binding data processor obligations'],
        explanation: 'The company must verify the US firm is either certified under the UK-US Data Bridge or execute Standard Contractual Clauses (Art. 46). Without a transfer mechanism, the data sharing is unlawful regardless of any other compliance steps. This is a separate legal hurdle from Art. 5 compliance.',
        link: 'Ultimately, the accountability principle (Art. 5(2)) requires the company to demonstrate compliance with all of this.',
      },
    ],
    conclusionGuide: 'Conclude that Art. 5 imposes multiple concurrent obligations — not a checklist but a framework. The arrangement requires: valid lawful basis, documented purpose limitation analysis, minimisation assessment, and international transfer mechanism. Failure at any stage renders the arrangement unlawful. A 90%+ answer notes the accountability principle makes the data controller responsible for demonstrating compliance, not just achieving it.',
    keyLegislation: ['UK GDPR Articles 5, 6, 7, 44-49', 'Data Protection Act 2018', 'UK-US Data Bridge (2023)', 'ICO Enforcement Powers (up to £17.5m / 4% global turnover)'],
    keyTheories: ['LFPASIC-A mnemonic (Lawful, Fair, Purposeful, Accurate, Storage-limited, Integrity, Confidentiality, Accountable)', 'Privacy by Design (Art. 25)', 'Data minimisation principle'],
    caseStudyHooks: ['Cambridge Analytica (2016–2018): purpose limitation and lawful basis failures', 'TikTok ICO investigation (2023): children\'s data processing', 'Schrems II (2020): invalidation of EU-US Privacy Shield'],
    highMarkTargets: ['Cite specific GDPR articles (not just "GDPR says")', 'Distinguish lawful basis from international transfer mechanism', 'Use Cambridge Analytica as negative precedent (not just as "example")', 'Mention accountability principle (Art. 5(2)) as the overarching obligation'],
    wordGuidance: '~450 words for a 15-mark answer. Intro: 50w. Four paragraphs: ~90w each. Conclusion: 50w.',
    markerFocus: 'Examiners want: specific GDPR articles cited; understanding that multiple obligations run concurrently; international transfer treated as a separate issue; accountability principle as the meta-obligation; real case as negative precedent.',
  },
  {
    id: 'e-003',
    title: 'CMA 1990 Cybersecurity Analysis',
    week: 'week6',
    marks: 10,
    commandWord: 'Explain',
    question: 'Explain how the Computer Misuse Act 1990 applies to a sophisticated supply-chain attack where an attacker compromises a third-party software vendor\'s update server to push malware to target organisations.',
    introGuide: 'Identify this as a multi-stage attack (supply chain). Signal that multiple CMA provisions apply at different attack stages. Brief context on why the CMA needs to stretch to cover sophisticated modern attacks.',
    peelStructure: [
      {
        point: 'Section 1 CMA 1990 applies to the initial unauthorised access of the software vendor\'s systems',
        evidence: ['CMA s.1: knowingly causing a computer to perform any function with intent to secure access, where access is unauthorised', 'R v Gold and Schifreen [1988]: established the broad scope of "access"', 'Mens rea: intent to access, knowledge it is unauthorised'],
        explanation: 'The attacker\'s initial breach of the vendor\'s update server constitutes a s.1 offence — they cause the server to perform functions (authenticate, accept connections) with intent to secure unauthorised access. Maximum sentence: 2 years. This is the entry point offence.',
        link: 'But the attacker\'s purpose goes beyond mere access — they intend to use that access to commit further offences.',
      },
      {
        point: 'Section 3 applies to the modification of the update server and injection of malware into the legitimate software package',
        evidence: ['CMA s.3: unauthorised modification of computer material with intent to impair operation, prevent/hinder access, or enable another offence', 'Trojanised SolarWinds update (2020): paradigm supply-chain attack', 'Modification: the legitimate update package is altered to include malicious payload'],
        explanation: 'Injecting malware into a legitimate software update constitutes modification of computer material (the update files) with intent to impair operation of the victim organisations\' computers. This is a s.3 offence carrying up to 10 years. The scale — potentially thousands of downstream victims — is an aggravating factor at sentencing.',
        link: 'If the attacker specifically designed malware tools for this attack, s.3A applies independently.',
      },
      {
        point: 'Section 3A covers the creation and distribution of the malware used in the attack',
        evidence: ['CMA s.3A (added by Police and Justice Act 2006): making, supplying or obtaining articles for use in computer misuse offences', '"Article" includes any program or data: R v Mangham [2012]', 'Max 2 years — intended for tools, not attacks themselves'],
        explanation: 'If the attackers wrote or obtained the malware tool used to compromise the update server and modify the packages, s.3A is also engaged. The tool itself is an "article" even before being used. This provision addresses the upstream creation of attack infrastructure.',
        link: 'The CIA Triad provides a framework to assess the total impact of the attack across all three dimensions.',
      },
    ],
    conclusionGuide: 'Synthesise: the CMA applies at every stage — s.1 (initial access), s.3 (modification of update), s.3A (tool creation). Conclude that the CMA\'s broad drafting means it stretches to modern sophisticated attacks. A 90%+ answer acknowledges limitations: jurisdictional reach is limited (attackers are often overseas), and CMA must be read alongside NIS Regulations 2018 for critical infrastructure.',
    keyLegislation: ['Computer Misuse Act 1990 ss.1, 3, 3A', 'Police and Justice Act 2006 (added s.3A)', 'Serious Crime Act 2015 (added s.3ZA: attacks on critical infrastructure)', 'NIS Regulations 2018'],
    keyTheories: ['CIA Triad (Confidentiality, Integrity, Availability)', 'Attack lifecycle (Recon, Weaponise, Deliver, Exploit, Install, Command, Execute)', 'HUHT/LULT threat matrix'],
    caseStudyHooks: ['SolarWinds attack (2020): supply chain compromise of 18,000+ organisations', 'Bybit heist (2025): supply-chain social engineering', 'R v Mangham [2012]: Facebook hacker convicted under CMA'],
    highMarkTargets: ['Name all three CMA provisions with their specific elements', 'Map the attack stages to specific provisions', 'Reference a real supply-chain case (SolarWinds)', 'Acknowledge jurisdictional limitations of CMA'],
    wordGuidance: '~300 words for a 10-mark answer. Intro: 30w. Three paragraphs: ~80w each. Conclusion: 40w.',
    markerFocus: 'Examiners want: specific CMA sections and elements; attack mapped to provisions (not abstract); at least one real case; acknowledgement of CMA limitations.',
  },
  {
    id: 'e-004',
    title: 'Workplace Monitoring Ethics and Law',
    week: 'week9',
    marks: 12,
    commandWord: 'Discuss',
    question: 'Discuss the legal and ethical constraints on employer monitoring of employee computer use in the UK.',
    introGuide: 'Frame the tension: employers\' legitimate interests (security, productivity, compliance) vs. employees\' privacy rights (ECHR Art. 8, UK GDPR). Signal the four-part PTLN test as your analytical framework.',
    peelStructure: [
      {
        point: 'The PTLN test (Proportionate, Transparent, Lawful, Necessary) is the core legal framework for assessing monitoring legitimacy',
        evidence: ['RIPA 2000: interception of communications requires authorisation or employee consent', 'Telecommunications (Lawful Business Practice) Regulations 2000: sets out when employers can lawfully monitor', 'PTLN: four cumulative requirements — failing any one makes monitoring unlawful'],
        explanation: 'The TLBP Regulations permit employers to monitor communications on their networks for specified purposes (security, compliance, quality). But monitoring is only lawful if it is proportionate (no more intrusive than necessary), transparent (employees are notified in advance via clear policy), lawful (a legal basis exists), and necessary (cannot be achieved by less intrusive means). All four must be satisfied simultaneously.',
        link: 'Transparency is particularly critical — covert monitoring that employees do not know about fails this test in almost all circumstances.',
      },
      {
        point: 'UK GDPR imposes additional obligations: lawful basis, minimisation, and data subject rights apply to monitoring data',
        evidence: ['UK GDPR Art. 6(1)(f): legitimate interests — must be balanced against employee rights', 'ICO Employment Practices Code: monitoring must be necessary, documented, and subject to privacy impact assessment', 'Art. 13/14: employees must be informed about monitoring at time of collection'],
        explanation: 'Even where monitoring is justified under TLBP Regulations, the employer is a data controller processing personal data (browsing history, keystroke logs, email content). UK GDPR requires a lawful basis, minimisation (only capture what is necessary), and privacy notice. Covert keystroke logging of all employees without justification fails minimisation. Individual targeting requires HR process documentation.',
        link: 'The ethical dimension goes further — even technically lawful monitoring can constitute an ethical violation.',
      },
      {
        point: 'Virtue ethics and professional duty constrain the IT professional who implements monitoring systems',
        evidence: ['BCS Code s.1: act in public interest — employees are the public the professional serves', 'BCS Code s.6: respect for confidentiality and privacy', 'A computing professional who implements unlawful monitoring is complicit in the violation'],
        explanation: 'The IT professional asked to implement covert monitoring has independent professional obligations. If the monitoring would be unlawful, following the manager\'s instruction does not discharge the professional\'s duty — it makes them complicit. A virtuous professional challenges the instruction, escalates to HR/legal, and documents their objection. This is not passive — it is an active professional obligation.',
        link: 'The Sam\'s 1st Day scenario operationalises all these constraints in a realistic workplace setting.',
      },
    ],
    conclusionGuide: 'Conclude that lawful monitoring requires satisfying PTLN test, UK GDPR compliance, and ECHR Art. 8 proportionality simultaneously. These are not separate hurdles but overlapping frameworks. A distinction answer notes that the ethical obligations of the IT professional are independent of what the employer instructs — professional codes do not exempt IT staff from responsibility for the systems they build.',
    keyLegislation: ['RIPA 2000', 'Telecommunications (Lawful Business Practice) Regulations 2000', 'UK GDPR Articles 5, 6, 13', 'Employment Practices Data Protection Code (ICO)', 'ECHR Article 8 (Human Rights Act 1998)'],
    keyTheories: ['PTLN test (Proportionate, Transparent, Lawful, Necessary)', 'Privacy by Design (UK GDPR Art. 25)', 'Virtue ethics (BCS professional character)', 'Least intrusive means principle'],
    caseStudyHooks: ['Sam\'s 1st Day (module case study)', 'Barbulescu v Romania [2017] (ECtHR: covert monitoring violated Art. 8)', 'ICO Employment Practices Code enforcement cases'],
    highMarkTargets: ['Name TLBP Regulations explicitly (not just RIPA)', 'Apply PTLN as a four-part test (not just mention it)', 'Discuss IT professional\'s independent obligations under BCS Code', 'Acknowledge ECHR Art. 8 as the constitutional backdrop'],
    wordGuidance: '~360 words for a 12-mark answer. Intro: 40w. Three paragraphs: ~100w each. Conclusion: 50w.',
    markerFocus: 'Examiners want: TLBP Regulations (often missed — not just RIPA), PTLN test applied analytically, UK GDPR compliance obligations, professional duty of IT implementer, real case (Sam\'s 1st Day or Barbulescu).',
  },
];

const WEEK_COLORS: Record<string, string> = {
  week1: '#c9a7eb', week2: '#3b82f6', week3: '#f59e0b',
  week5: '#8b5cf6', week6: '#ef4444', week9: '#ff6aa8',
};

export default function EssayBuilder() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'structure' | 'phrases' | 'checklist'>('structure');
  const [expandedPara, setExpandedPara] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const template = ESSAY_TEMPLATES.find(t => t.id === selected);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!template) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={18} style={{ color: '#ff6aa8' }} />
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Essay Builder</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13 }}>PEEL-structured essay scaffolds — fully broken down by paragraph, evidence, and examiner focus</p>
        </div>

        <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 12 }} className="p-4">
          <p style={{ color: '#7dd3fc', fontSize: 12, lineHeight: 1.6 }}>
            Each template gives you the PEEL structure (Point → Evidence → Explanation → Link) for each paragraph, plus the key legislation, theories, high-mark additions, and what the examiner is marking for. Use these to plan your answer before writing.
          </p>
        </div>

        <div className="space-y-3">
          {ESSAY_TEMPLATES.map(t => {
            const color = WEEK_COLORS[t.week] || '#64748b';
            return (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12, padding: '14px 16px', textAlign: 'left', width: '100%' }}
                className="hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div style={{ background: `${color}15`, borderRadius: 8, padding: '6px 10px', flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ color, fontSize: 9, fontWeight: 700 }}>{t.week.replace('week', 'WK ')}</div>
                    <div style={{ color, fontSize: 14, fontWeight: 800 }}>{t.marks}M</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span style={{ background: '#2a1938', color: '#64748b', fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }} className="px-1.5 py-0.5 rounded">{t.commandWord}</span>
                    </div>
                    <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{t.title}</div>
                    <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{t.question.slice(0, 120)}...</p>
                    <div style={{ color: '#475569', fontSize: 11, marginTop: 6 }}>{t.peelStructure.length} paragraphs · {t.keyLegislation.length} laws · {t.keyTheories.length} theories</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* General essay tips */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
          <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Universal Essay Writing Rules for This Module</div>
          <div className="space-y-2">
            {[
              'Every paragraph: name the ethical theory OR the legal provision — not a vague description',
              'Every case study: explain WHY it is relevant to your argument, not just what happened',
              'Opening sentence of each paragraph: your POINT (the claim) — make it clear and arguable',
              'Conclusion: synthesise don\'t summarise. Resolve tensions between frameworks rather than listing them',
              'Command words: "Explain" = describe + cause/effect. "Analyse" = break down + evaluate each part. "Discuss" = arguments for AND against. "Critically Evaluate" = weigh evidence, reach justified verdict',
              'Never write "this is complex" without explaining the complexity. Never write "there are many views" without naming them',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={11} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
                <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const color = WEEK_COLORS[template.week] || '#64748b';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => setSelected(null)} style={{ color: '#64748b', fontSize: 13 }}>← Back</button>
        <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
          {template.week.replace('week', 'Week ')}
        </span>
        <span style={{ background: '#2a1938', color: '#64748b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} className="px-2 py-0.5 rounded-full">
          {template.commandWord}
        </span>
        <span style={{ background: 'rgba(201,167,235,0.1)', color: '#c9a7eb', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
          {template.marks} marks
        </span>
      </div>

      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{template.title}</div>
        <p style={{ color: '#f1f5f9', fontSize: 15, lineHeight: 1.7, fontWeight: 500 }}>{template.question}</p>
        <p style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>{template.wordGuidance}</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2">
        {(['structure', 'phrases', 'checklist'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: activeSection === tab ? 'rgba(255,106,168,0.15)' : '#14091f',
              color: activeSection === tab ? '#38bdf8' : '#64748b',
              border: `1px solid ${activeSection === tab ? 'rgba(255,106,168,0.4)' : '#2a1938'}`,
            }}
          >
            {tab === 'structure' ? '📝 PEEL Structure' : tab === 'phrases' ? '⚡ Key Content' : '✓ Examiner Checklist'}
          </button>
        ))}
      </div>

      {activeSection === 'structure' && (
        <div className="space-y-3">
          {/* Intro */}
          <div style={{ background: '#14091f', border: '1px solid rgba(255,106,168,0.3)', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Introduction</div>
            <p style={{ color: '#7dd3fc', fontSize: 13, lineHeight: 1.6 }}>{template.introGuide}</p>
          </div>

          {/* PEEL paragraphs */}
          {template.peelStructure.map((para, i) => {
            const isExpanded = expandedPara === i;
            return (
              <div key={i} style={{ background: '#14091f', border: `1px solid ${isExpanded ? '#4c315f' : '#2a1938'}`, borderRadius: 12, overflow: 'hidden' }}>
                <button
                  onClick={() => setExpandedPara(isExpanded ? null : i)}
                  className="w-full p-4 flex items-start gap-3 text-left"
                >
                  <div style={{ background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color, fontSize: 11, fontWeight: 800 }}>P{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{para.point}</p>
                  </div>
                  {isExpanded ? <ChevronUp size={14} style={{ color: '#475569', flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: '#475569', flexShrink: 0 }} />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    <div>
                      <div style={{ color: '#f59e0b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Evidence (cite these)</div>
                      <div className="space-y-1.5">
                        {para.evidence.map((e, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b', marginTop: 6, flexShrink: 0 }} />
                            <p style={{ color: '#fcd34d', fontSize: 12, lineHeight: 1.5 }}>{e}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#c9a7eb', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Explanation (your analysis)</div>
                      <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.6 }}>{para.explanation}</p>
                    </div>
                    <div>
                      <div style={{ color: '#8b5cf6', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Link (transition to next point)</div>
                      <p style={{ color: '#c4b5fd', fontSize: 12, lineHeight: 1.5, fontStyle: 'italic' }}>{para.link}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Conclusion */}
          <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Conclusion</div>
            <p style={{ color: '#d8b4fe', fontSize: 13, lineHeight: 1.6 }}>{template.conclusionGuide}</p>
          </div>
        </div>
      )}

      {activeSection === 'phrases' && (
        <div className="space-y-4">
          <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Key Legislation to Cite</div>
            <div className="space-y-1.5">
              {template.keyLegislation.map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                  <span style={{ color: '#fcd34d', fontSize: 12 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Ethical Theories & Frameworks</div>
            <div className="space-y-1.5">
              {template.keyTheories.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#8b5cf6', flexShrink: 0 }} />
                  <span style={{ color: '#c4b5fd', fontSize: 12 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Case Study Hooks</div>
            <div className="space-y-1.5">
              {template.caseStudyHooks.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <BookOpen size={11} style={{ color: '#ff6aa8', flexShrink: 0 }} />
                  <span style={{ color: '#7dd3fc', fontSize: 12 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.25)', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              <Star size={11} style={{ display: 'inline', marginRight: 4 }} />
              What Gets You 90%+
            </div>
            <div className="space-y-1.5">
              {template.highMarkTargets.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Star size={11} style={{ color: '#ff6aa8', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#7dd3fc', fontSize: 12, lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High mark phrases from exam strategy */}
          <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>High-Mark Phrases (from 90%+ Strategy)</div>
            <div className="space-y-2">
              {examStrategy.highMarkPhrases.slice(0, 5).map((phrase, i) => (
                <div key={i} style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.15)', borderRadius: 8, padding: '8px 10px' }} className="flex items-center justify-between gap-2">
                  <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.5, fontStyle: 'italic' }}>{phrase}</p>
                  <button onClick={() => handleCopy(phrase)} style={{ color: '#475569', flexShrink: 0 }}>
                    {copied ? <CheckCircle size={12} style={{ color: '#c9a7eb' }} /> : <Copy size={12} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'checklist' && (
        <div className="space-y-4">
          <div style={{ background: '#14091f', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>What the Examiner is Marking For</div>
            <p style={{ color: '#fcd34d', fontSize: 13, lineHeight: 1.6 }}>{template.markerFocus}</p>
          </div>

          <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Pre-Submission Checklist</div>
            <div className="space-y-2">
              {[
                `Named at least ${template.keyLegislation.length} specific legal provisions (not just "the law says")`,
                `Applied at least 2 ethical theories (${template.keyTheories.slice(0, 2).join(', ')})`,
                `Referenced at least 1 case study (${template.caseStudyHooks[0]})`,
                'Every paragraph has a clear POINT in the opening sentence',
                'Evidence is cited with source (case name, article number, code section)',
                'Explanation follows evidence — you\'ve said WHY it matters, not just what it says',
                'Conclusion synthesises tensions (doesn\'t just list points again)',
                'No paragraph longer than ~150 words without a clear sub-structure',
                `Answer is approximately the right length (${template.wordGuidance.split('.')[0]})`,
                'You have answered the actual question, not a version you prefer',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={12} style={{ color: '#c9a7eb', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#d8b4fe', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }} className="p-4">
            <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Common Examiner Criticisms — Don't Do These</div>
            <div className="space-y-2">
              {examStrategy.commonExaminerCriticisms.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Target size={11} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
