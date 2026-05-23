import { useState } from 'react';
import { FlaskConical, CheckCircle, AlertTriangle, ChevronRight, ArrowLeft, Target, Shield } from 'lucide-react';
import type { UserProgress } from '../data/types';

interface Props {
  progress: UserProgress;
  onComplete: (id: string) => void;
}

const WEEK_COLORS: Record<string, string> = {
  week1: '#c9a7eb', week2: '#3b82f6', week3: '#f59e0b',
  week5: '#8b5cf6', week6: '#ef4444', week9: '#ff6aa8',
};

const SCENARIO_PROMPTS = [
  {
    id: 'sc-001',
    caseId: 'cs-001',
    title: 'The Whistleblower\'s Dilemma',
    week: 'week1',
    marks: 10,
    prompt: 'You are a senior data scientist at a major social media platform. Your analysis reveals that the platform\'s algorithm is causing measurable psychological harm to teenage users, increasing rates of anxiety and depression by 37%. Management has instructed you not to publish this research and to delete your findings. You have evidence this has been known internally for 18 months.',
    question: 'As a computing professional bound by the BCS Code of Conduct, what should you do? Justify your response using ethical theory and professional obligations.',
    decisionOptions: [
      { id: 'a', text: 'Delete the research as instructed — your employment contract requires confidentiality and your manager has authority', risk: 'high' as const },
      { id: 'b', text: 'Escalate internally first to the ethics board or legal team before considering external disclosure', risk: 'low' as const },
      { id: 'c', text: 'Immediately leak the research to journalists to maximise public impact', risk: 'medium' as const },
      { id: 'd', text: 'Resign and then disclose — protecting yourself before acting', risk: 'medium' as const },
    ],
    bestOptionId: 'b',
    analysis: {
      bestExplanation: 'BCS Code requires prioritising public interest but also acting with integrity within professional channels. Internal escalation respects institutional process while still discharging your ethical duty. If internal channels fail, external disclosure (regulated whistleblowing) becomes justified.',
      whyOthersWrong: [
        'Option A violates BCS s.1 (public interest) — following orders is not a defence when harm is demonstrable. The Nuremberg principle applies.',
        'Option C bypasses internal process, may breach confidentiality agreements unlawfully, and undermines institutional trust even when morally motivated.',
        'Option D creates an unnecessary gap — you lose institutional leverage and protection by resigning first.',
      ],
      ethicalFrameworks: [
        'Utilitarian: total harm to millions of teenagers outweighs commercial harm from disclosure',
        'Deontological: duty of care to public (BCS s.1) supersedes duty to employer when they conflict',
        'Virtue ethics: a person of integrity would not suppress evidence of harm for career protection',
      ],
      highMarkAddition: 'A distinction answer notes the Frances Haugen parallel — she exhausted internal channels, then filed with SEC before media, establishing legal protection. The escalation sequence matters both ethically and legally.',
      relevantLaws: ['BCS Code of Conduct s.1 (Public Interest)', 'Public Interest Disclosure Act 1998', 'Employment Rights Act 1996 s.43B'],
    },
  },
  {
    id: 'sc-002',
    caseId: 'cs-002',
    title: 'The Data Harvesting Request',
    week: 'week2',
    marks: 8,
    prompt: 'You work as a developer at a political consultancy. Your manager asks you to build a system that ingests personality quiz data from 270,000 Facebook users — including the friends of quiz-takers who never consented — and combines it with voting registration data to build psychographic profiles. The manager says Facebook has "agreed" to this and the data is "anonymised".',
    question: 'Identify the UK GDPR issues with this request and explain what you should do as a computing professional.',
    decisionOptions: [
      { id: 'a', text: 'Build the system — your manager has confirmed it\'s legal and Facebook has agreed', risk: 'high' as const },
      { id: 'b', text: 'Request to see the data sharing agreement with Facebook and legal opinion before proceeding', risk: 'low' as const },
      { id: 'c', text: 'Refuse immediately and report to the ICO without further investigation', risk: 'medium' as const },
      { id: 'd', text: 'Build a limited version that only uses data from direct quiz-takers, not their friends', risk: 'medium' as const },
    ],
    bestOptionId: 'b',
    analysis: {
      bestExplanation: 'A reasonable professional would require evidence of lawful basis before building. The friends\' data has no plausible lawful basis — they never consented and no legitimate interest clearly outweighs their privacy rights. Requesting documentation is proportionate and professional.',
      whyOthersWrong: [
        'Option A — relying on manager\'s verbal assurance is insufficient. You as the developer could be implicated. Cambridge Analytica staff were investigated.',
        'Option C — immediate ICO reporting without verification could be premature. Internal challenge is the first step.',
        'Option D — friends\' data is still being processed without consent. Scale reduction does not fix the lawfulness problem.',
      ],
      ethicalFrameworks: [
        'GDPR Article 5(1)(a): lawfulness, fairness and transparency — friends never consented',
        'GDPR Article 6: no valid lawful basis for friend-data processing',
        'GDPR Article 5(1)(e): purpose limitation — quiz data cannot be repurposed for political profiling without new consent',
      ],
      highMarkAddition: 'Cambridge Analytica is the direct precedent — 87 million users affected, £500,000 ICO fine (pre-GDPR max), criminal charges against executives. Post-GDPR, the fine would be up to £17.5m or 4% global turnover.',
      relevantLaws: ['UK GDPR Articles 5, 6, 9', 'Data Protection Act 2018', 'ICO Enforcement Powers'],
    },
  },
  {
    id: 'sc-003',
    caseId: 'cs-004',
    title: 'The Insider Threat Response',
    week: 'week6',
    marks: 10,
    prompt: 'You are the CISO of a cryptocurrency exchange. A junior developer on your team has just reported that they received an unusual message from what appears to be a fake recruiter, asking them to "validate" a smart contract by running it on the live trading system. The developer ran it 20 minutes ago before realising something was wrong. You notice $1.4B of assets have moved to an unknown wallet.',
    question: 'Using the CIA Triad and CMA 1990, analyse what has happened and outline the immediate professional response.',
    decisionOptions: [
      { id: 'a', text: 'Lock the developer\'s account and alert law enforcement — they must have been complicit', risk: 'high' as const },
      { id: 'b', text: 'Activate incident response plan: preserve logs, isolate affected systems, notify regulators and law enforcement, preserve the developer as a witness', risk: 'low' as const },
      { id: 'c', text: 'Attempt to reverse the blockchain transaction immediately before doing anything else', risk: 'medium' as const },
      { id: 'd', text: 'Notify customers via social media immediately to prevent panic and maintain trust', risk: 'medium' as const },
    ],
    bestOptionId: 'b',
    analysis: {
      bestExplanation: 'Structured incident response preserves legal options, maintains evidence integrity, and meets regulatory notification duties (FCA, NCSC). The developer is likely a victim of social engineering (LULT — Low User Awareness, Low Threat Visibility) and treating them as a witness first is correct.',
      whyOthersWrong: [
        'Option A — premature accusation destroys a key witness and may create HR/legal liability. Social engineering makes victims, not accomplices.',
        'Option C — blockchain transactions are irreversible by design. Attempting reversal wastes critical incident response time.',
        'Option D — premature public disclosure without legal/regulatory coordination could breach notification obligations and cause greater market harm.',
      ],
      ethicalFrameworks: [
        'CIA Triad: Integrity breached (smart contract manipulation), Confidentiality breached (private key exposure), Availability threatened (exchange function)',
        'CMA 1990 s.3A: creating malware used in the attack; s.3: unauthorised modification of computer material',
        'GDPR Article 33: 72-hour breach notification to ICO if personal data affected',
      ],
      highMarkAddition: 'The Bybit 2025 heist ($1.5B) used exactly this LULT vector — fake LinkedIn recruiter, Safe{Wallet} UI spoofing. Distinction answers connect the attack lifecycle: Recon → Weaponise → Social Engineer → Execute → Exfiltrate. The professional response maps to each phase in reverse.',
      relevantLaws: ['Computer Misuse Act 1990 ss.1, 3, 3A', 'Financial Conduct Authority SYSC rules', 'Network and Information Systems (NIS) Regulations 2018'],
    },
  },
  {
    id: 'sc-004',
    caseId: 'cs-005',
    title: 'The Monitoring Boundary',
    week: 'week9',
    marks: 8,
    prompt: 'A manager at a law firm asks you (the IT manager) to install software that secretly records all keystrokes and screenshots of a particular paralegal\'s computer every 30 seconds, without the paralegal\'s knowledge. The manager claims they suspect the employee is leaking client files to a competitor. No HR process has been initiated and no written policy covers this level of surveillance.',
    question: 'Is this monitoring lawful? What should you do as the IT manager?',
    decisionOptions: [
      { id: 'a', text: 'Install the monitoring — the manager is your superior and the firm\'s data protection is a legitimate concern', risk: 'high' as const },
      { id: 'b', text: 'Refuse unless HR initiates a formal investigation and legal counsel confirms the monitoring is proportionate and lawful', risk: 'low' as const },
      { id: 'c', text: 'Install it for 48 hours only as a compromise, then review', risk: 'high' as const },
      { id: 'd', text: 'Monitor the network traffic only, not the keystrokes — this is less intrusive', risk: 'medium' as const },
    ],
    bestOptionId: 'b',
    analysis: {
      bestExplanation: 'The TLBP (Telecommunications (Lawful Business Practice) Regulations 2000) requires: a legitimate purpose, necessity (proportionality), and — crucially — a clear notification policy. Covert keystroke logging without policy or HR process fails the PTLN test (Proportionate, Transparent, Lawful, Necessary). Installing it exposes you and the firm to criminal liability.',
      whyOthersWrong: [
        'Option A — following manager instruction does not protect you. IT professionals who implement unlawful surveillance can be personally liable under RIPA 2000.',
        'Option C — duration does not fix the legality problem. 48 hours of unlawful covert surveillance is still unlawful.',
        'Option D — network monitoring may be proportionate if covered by policy, but the specific targeting without HR process remains an issue.',
      ],
      ethicalFrameworks: [
        'PTLN test: Proportionate (keystroke-level is disproportionate for suspicion alone), Transparent (no policy), Lawful (no HR process, no consent), Necessary (alternatives not explored)',
        'UK GDPR Art 5(1)(c): data minimisation — capturing all keystrokes is not minimal',
        'RIPA 2000 s.1: interception of private communications without authorisation is a criminal offence',
      ],
      highMarkAddition: 'The correct process is: (1) HR formal investigation trigger, (2) legal counsel sign-off on proportionality, (3) update the monitoring policy or rely on existing policy that employees have been notified of, (4) time-limited targeted monitoring with audit log. Sam\'s 1st Day scenario tests exactly whether you know this sequence.',
      relevantLaws: ['Telecommunications (Lawful Business Practice) Regulations 2000', 'Regulation of Investigatory Powers Act 2000', 'UK GDPR Article 5(1)(c)', 'Employment Practices Data Protection Code'],
    },
  },
  {
    id: 'sc-005',
    caseId: 'cs-003',
    title: 'The System Error Cover-Up',
    week: 'week5',
    marks: 10,
    prompt: 'You are a senior developer at a government IT contractor. An audit reveals your firm\'s case management software has been producing incorrect financial calculations for 4 years, causing wrongful prosecutions of 736 sub-postmasters. Your manager tells you: "This is a legal matter. Don\'t discuss it with anyone. We\'ll handle it through our lawyers. Your job is to keep the system running." Several postmasters are currently facing prosecution.',
    question: 'What are your professional and ethical obligations in this situation? What should you do?',
    decisionOptions: [
      { id: 'a', text: 'Follow your manager\'s instruction — legal matters are above your pay grade and you could breach confidentiality', risk: 'high' as const },
      { id: 'b', text: 'Escalate within the organisation to the board/ethics officer and document everything; if that fails, consider external disclosure', risk: 'low' as const },
      { id: 'c', text: 'Immediately contact the legal representatives of the affected postmasters directly', risk: 'medium' as const },
      { id: 'd', text: 'Fix the software bug immediately without disclosing its history — solving the problem is enough', risk: 'high' as const },
    ],
    bestOptionId: 'b',
    analysis: {
      bestExplanation: 'People are facing wrongful criminal prosecution. The public interest duty under BCS s.1 is triggered — you cannot remain silent. Internal escalation is the first step; external disclosure (including to regulators or even prosecutors) becomes mandatory if internal channels fail. This is exactly the LORS (Logging, Oversight, Reporting, Sanction) failure that the Post Office case exemplifies.',
      whyOthersWrong: [
        'Option A — "following orders" is the central ethical failure of the Post Office scandal. Developers, managers, and lawyers who stayed silent enabled hundreds of wrongful convictions.',
        'Option C — contacting claimants directly bypasses professional obligations and may be legally impermissible without authorisation. It is also not your primary duty channel.',
        'Option D — fixing without disclosure leaves active prosecutions based on false evidence unchallenged. People go to prison. The fix without disclosure is not sufficient.',
      ],
      ethicalFrameworks: [
        'BCS Code s.1: public interest — wrongful prosecution is a direct public harm you can prevent',
        'Information Governance LORS failure: no Logging of known errors, no Oversight of outputs, no Reporting mechanism, no Sanction for developers who knew',
        'Consequentialist: the total harm (736 wrongful prosecutions) vastly outweighs the commercial harm from disclosure',
      ],
      highMarkAddition: 'Post Office Horizon IT Inquiry (2024): the courts found that software bugs were known internally but never disclosed to defence lawyers — an obstruction of justice. The inquiry specifically criticised the professional failures of Fujitsu developers who stayed silent. This is the most important real-world IG case on the module.',
      relevantLaws: ['BCS Code of Conduct', 'Public Interest Disclosure Act 1998', 'Criminal Procedure and Investigations Act 1996 (disclosure duties)', 'Computer Misuse Act 1990 (potential misuse via concealment)'],
    },
  },
];

type Phase = 'intro' | 'decision' | 'analysis';

export default function Scenarios({ progress, onComplete }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('intro');
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const scenario = SCENARIO_PROMPTS.find(s => s.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setPhase('intro');
    setChosenOption(null);
    setShowAnalysis(false);
  };

  const handleBack = () => {
    setSelectedId(null);
    setPhase('intro');
    setChosenOption(null);
    setShowAnalysis(false);
  };

  const handleChoose = (optId: string) => {
    setChosenOption(optId);
    setPhase('analysis');
  };

  const handleRevealAnalysis = () => {
    setShowAnalysis(true);
    if (scenario) onComplete(scenario.id);
  };

  if (!scenario) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical size={18} style={{ color: '#8b5cf6' }} />
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Scenario Practice</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13 }}>Real-world professional dilemmas — pick an answer, then see the examiner-level analysis</p>
        </div>

        <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12 }} className="p-4">
          <p style={{ color: '#c4b5fd', fontSize: 13, lineHeight: 1.6 }}>
            Each scenario mirrors the exam's scenario-based questions. Choose the best professional response, then reveal the full ethical and legal analysis. Scenarios draw directly from the module's key cases.
          </p>
        </div>

        <div className="space-y-3">
          {SCENARIO_PROMPTS.map(s => {
            const color = WEEK_COLORS[s.week] || '#8b5cf6';
            const completed = progress.scenariosCompleted.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                style={{ background: '#14091f', border: `1px solid ${completed ? 'rgba(201,167,235,0.3)' : '#2a1938'}`, borderRadius: 12, padding: '14px 16px', textAlign: 'left', width: '100%' }}
                className="hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div style={{ background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 8, padding: '6px 10px', flexShrink: 0 }}>
                    <span style={{ color, fontSize: 10, fontWeight: 700 }}>{s.week.replace('week', 'Wk ')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700 }}>{s.title}</span>
                      {completed && <CheckCircle size={12} style={{ color: '#c9a7eb' }} />}
                    </div>
                    <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{s.prompt.slice(0, 120)}...</p>
                    <div className="flex gap-2 mt-2">
                      <span style={{ background: 'rgba(201,167,235,0.1)', color: '#c9a7eb', fontSize: 10, fontWeight: 700 }} className="px-1.5 py-0.5 rounded">{s.marks}M</span>
                      <span style={{ background: '#2a1938', color: '#64748b', fontSize: 10 }} className="px-1.5 py-0.5 rounded">{s.analysis.relevantLaws.length} laws</span>
                      <span style={{ background: '#2a1938', color: '#64748b', fontSize: 10 }} className="px-1.5 py-0.5 rounded">{s.analysis.ethicalFrameworks.length} frameworks</span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: '#475569', flexShrink: 0, marginTop: 2 }} />
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>How to use these scenarios</div>
          <div className="space-y-1.5">
            {['Read the scenario carefully — identify who you are and what your role is', 'Pick what you think the best option is BEFORE reading the analysis', 'Reveal the analysis and check your reasoning against the examiner-level answer', 'Note which ethical frameworks and laws apply — these are what the examiner wants to see named'].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <p style={{ color: '#94a3b8', fontSize: 12 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const color = WEEK_COLORS[scenario.week] || '#8b5cf6';
  const chosen = scenario.decisionOptions.find(o => o.id === chosenOption);
  const isCorrect = chosenOption === scenario.bestOptionId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={handleBack} style={{ color: '#64748b', fontSize: 13 }}>← Back</button>
        <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
          {scenario.week.replace('week', 'Week ')}
        </span>
        <span style={{ background: 'rgba(201,167,235,0.1)', color: '#c9a7eb', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
          {scenario.marks} marks
        </span>
      </div>

      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{scenario.title}</div>
        <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>{scenario.prompt}</p>
      </div>

      <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12 }} className="p-4">
        <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Exam Question</div>
        <p style={{ color: '#c4b5fd', fontSize: 14, lineHeight: 1.6, fontWeight: 600 }}>{scenario.question}</p>
      </div>

      {phase === 'intro' || phase === 'decision' ? (
        <div>
          <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Choose the Best Professional Response</div>
          <div className="space-y-2">
            {scenario.decisionOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleChoose(opt.id)}
                style={{
                  background: '#14091f',
                  border: '1px solid #2a1938',
                  borderRadius: 10,
                  padding: '12px 14px',
                  textAlign: 'left',
                  width: '100%',
                }}
                className="hover:border-slate-500 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span style={{ background: '#2a1938', color: '#64748b', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {opt.id.toUpperCase()}
                  </span>
                  <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{opt.text}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Decision feedback */}
          <div style={{
            background: isCorrect ? 'rgba(201,167,235,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${isCorrect ? 'rgba(201,167,235,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: 12,
            padding: '14px 16px',
          }}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle size={16} style={{ color: '#c9a7eb' }} /> : <AlertTriangle size={16} style={{ color: '#ef4444' }} />}
              <span style={{ color: isCorrect ? '#c9a7eb' : '#ef4444', fontSize: 13, fontWeight: 700 }}>
                {isCorrect ? 'Correct — that is the best professional response' : 'Not quite — see the analysis below'}
              </span>
            </div>
            <p style={{ color: isCorrect ? '#d8b4fe' : '#fca5a5', fontSize: 12 }}>
              You chose: <strong>{chosen?.text}</strong>
            </p>
            {!isCorrect && (
              <p style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>
                Best answer: <strong style={{ color: '#c9a7eb' }}>{scenario.decisionOptions.find(o => o.id === scenario.bestOptionId)?.text}</strong>
              </p>
            )}
          </div>

          <button
            onClick={handleRevealAnalysis}
            style={{ background: showAnalysis ? 'rgba(201,167,235,0.1)' : '#14091f', border: `1px solid ${showAnalysis ? 'rgba(201,167,235,0.4)' : '#2a1938'}`, color: showAnalysis ? '#c9a7eb' : '#94a3b8', borderRadius: 12, padding: '12px 20px', fontSize: 13, fontWeight: 700, width: '100%' }}
            className="flex items-center justify-center gap-2"
          >
            <Target size={14} /> {showAnalysis ? 'Analysis Shown Below' : 'Reveal Examiner-Level Analysis'}
          </button>

          {showAnalysis && (
            <div className="space-y-3">
              <div style={{ background: '#14091f', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 12 }} className="p-4">
                <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Why This Is Best</div>
                <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{scenario.analysis.bestExplanation}</p>
              </div>

              <div style={{ background: '#14091f', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }} className="p-4">
                <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Why Other Options Fail</div>
                <div className="space-y-2">
                  {scenario.analysis.whyOthersWrong.map((w, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle size={11} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                      <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{w}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#14091f', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 12 }} className="p-4">
                <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Ethical Frameworks to Apply</div>
                <div className="space-y-1.5">
                  {scenario.analysis.ethicalFrameworks.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Shield size={11} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: 2 }} />
                      <p style={{ color: '#c4b5fd', fontSize: 12, lineHeight: 1.5 }}>{f}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.25)', borderRadius: 12 }} className="p-4">
                <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>90%+ Addition — What Separates Distinction Answers</div>
                <p style={{ color: '#7dd3fc', fontSize: 13, lineHeight: 1.6, fontStyle: 'italic' }}>{scenario.analysis.highMarkAddition}</p>
              </div>

              <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
                <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Relevant Laws & Codes</div>
                <div className="flex flex-wrap gap-2">
                  {scenario.analysis.relevantLaws.map((law, i) => (
                    <span key={i} style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)', fontSize: 11, padding: '3px 8px', borderRadius: 6 }}>
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBack}
                style={{ color: '#64748b', fontSize: 12, fontWeight: 600, textAlign: 'center', width: '100%' }}
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} /> Back to all scenarios
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
