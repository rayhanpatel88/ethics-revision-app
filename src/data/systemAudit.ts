export type AuditSeverity = 'critical' | 'high' | 'medium' | 'low';
export type SystemStatus = 'implemented' | 'hardened' | 'partial' | 'missing';

export interface AuditIssue {
  id: string;
  area: string;
  severity: AuditSeverity;
  issue: string;
  whyItMatters: string;
  exactFixRequired: string;
  status: 'fixed' | 'monitored' | 'accepted';
}

export interface CriticalSystemCheck {
  system: string;
  status: SystemStatus;
  evidence: string;
  hardeningAction: string;
}

export const systemAuditIssues: AuditIssue[] = [
  {
    id: 'audit-001',
    area: 'Spaced repetition',
    severity: 'critical',
    issue: 'Flashcards could be marked mastered or hard, but there was no due-date schedule to force weak material back into memory before the exam.',
    whyItMatters: 'A student can feel productive while only reviewing familiar material. Real retention needs delayed recall, not just one-session recognition.',
    exactFixRequired: 'Add per-card review metadata with box, interval, next due date, review count, and due-card filtering.',
    status: 'fixed',
  },
  {
    id: 'audit-002',
    area: 'Hard Mode Recall',
    severity: 'critical',
    issue: 'Hard Mode generated pressure, but missed cards were not feeding back into the persistent weakness model.',
    whyItMatters: 'Time-pressure failure is one of the best signals of exam weakness. If it is not persisted, the app loses its highest-quality diagnostic evidence.',
    exactFixRequired: 'Wire Hard Mode misses/skips into hard-card tracking and wire successes into mastery/spaced repetition.',
    status: 'fixed',
  },
  {
    id: 'audit-003',
    area: 'Weakness Review Engine',
    severity: 'high',
    issue: 'Weakness review focused on hard cards and low quiz scores, but did not distinguish due recall failures from general incompletion.',
    whyItMatters: 'Elite revision should prioritise what is most likely to be forgotten or mishandled under exam conditions.',
    exactFixRequired: 'Surface due spaced-repetition cards as a first-class weakness category with a direct flashcard route.',
    status: 'fixed',
  },
  {
    id: 'audit-004',
    area: 'Question scale',
    severity: 'medium',
    issue: 'The app is above the 250-question target overall, but MCQs remain lighter than essay/scenario calibration and should be monitored if the exam format shifts toward objective testing.',
    whyItMatters: 'MCQs are useful for rapid discrimination of precise legal provisions, penalties, and definitions.',
    exactFixRequired: 'Maintain the existing scenario-heavy weighting, but add more MCQs if the lecturer releases a more objective-style sample paper.',
    status: 'monitored',
  },
  {
    id: 'audit-005',
    area: 'Exam realism',
    severity: 'low',
    issue: 'Mock exams are strong and calibrated, but students can still reveal mark schemes early.',
    whyItMatters: 'Early reveal weakens exam simulation by turning practice into recognition rather than production.',
    exactFixRequired: 'Use the existing timed mode for production first, then reveal calibration after an honest attempt.',
    status: 'accepted',
  },
];

export const criticalSystemChecks: CriticalSystemCheck[] = [
  { system: 'Examiner Mode', status: 'implemented', evidence: 'Examiner Traps, adversarial questions, nightmare mocks, and difficult command-word prompts.', hardeningAction: 'Kept as a dedicated trap page and embedded in mock calibration.' },
  { system: 'Hard Mode Recall', status: 'hardened', evidence: 'Timed active recall with adversarial prompts.', hardeningAction: 'Hard Mode now feeds missed/skipped flashcards into persistent weakness tracking.' },
  { system: 'Mock Exam Generator', status: 'implemented', evidence: 'Six mock papers including 1-hour, 2-hour, hard, and nightmare formats.', hardeningAction: 'Validated question count and calibration fields.' },
  { system: 'Timed Exam Simulation', status: 'implemented', evidence: 'MockExam timer, printable papers, mark allocations, and question navigation.', hardeningAction: 'No rebuild required.' },
  { system: 'Weakness Review Engine', status: 'hardened', evidence: 'Weak cards, low quiz scores, incomplete topics, and due recall cards.', hardeningAction: 'Added spaced-repetition due-card surfacing.' },
  { system: 'Spaced Repetition', status: 'hardened', evidence: 'Per-card intervals, boxes, due dates, and due filter.', hardeningAction: 'Added progress schema and due review route.' },
  { system: 'Mixed-topic questioning', status: 'implemented', evidence: 'Quiz randomisation, Hard Mode mixed deck, crossover questions, mock exams.', hardeningAction: 'No rebuild required.' },
  { system: 'Cross-topic synthesis', status: 'implemented', evidence: 'Dedicated crossover bank and multi-week mock questions.', hardeningAction: 'No rebuild required.' },
  { system: 'Scenario-heavy revision', status: 'implemented', evidence: 'Scenario page, case studies, adversarial questions, mock Section B.', hardeningAction: 'No rebuild required.' },
  { system: 'Stakeholder analysis training', status: 'implemented', evidence: 'Topics, case studies, crossover questions, and mark schemes include stakeholder prompts.', hardeningAction: 'No rebuild required.' },
  { system: 'Ethical tradeoff analysis', status: 'implemented', evidence: 'Adversarial scenarios force privacy/security, legality/ethics, loyalty/whistleblowing tradeoffs.', hardeningAction: 'No rebuild required.' },
  { system: 'Distinction answer calibration', status: 'implemented', evidence: 'Mock questions include weak answer, strong answer, and 90%+ target.', hardeningAction: 'No rebuild required.' },
  { system: 'Why this scores highly explanations', status: 'implemented', evidence: 'Mock exams, examiner traps, topics, and strategy pages explain high-mark additions.', hardeningAction: 'No rebuild required.' },
  { system: 'Examiner trap warnings', status: 'implemented', evidence: 'Dedicated Examiner Traps page plus trap flashcards.', hardeningAction: 'No rebuild required.' },
  { system: 'Edge-case ethical dilemmas', status: 'implemented', evidence: 'Fifteen adversarial questions covering breaches, AI bias, disclosure, surveillance, IP disputes, healthcare AI.', hardeningAction: 'No rebuild required.' },
  { system: 'Multi-step scenario reasoning', status: 'implemented', evidence: 'Adversarial model answer outlines require sequenced professional action.', hardeningAction: 'No rebuild required.' },
  { system: 'Legal vs ethical conflict analysis', status: 'implemented', evidence: 'ELGPC, dark patterns, surveillance, proxy discrimination, whistleblowing cases.', hardeningAction: 'No rebuild required.' },
  { system: 'Governance-focused dilemmas', status: 'implemented', evidence: 'Information governance, Horizon, NHS AI, audit-log deletion, accountability diffusion.', hardeningAction: 'No rebuild required.' },
  { system: 'AI governance edge cases', status: 'implemented', evidence: 'AI hiring, healthcare AI, AI/IP, Article 22, EU AI Act flashcards.', hardeningAction: 'No rebuild required.' },
  { system: 'High-pressure workplace scenarios', status: 'implemented', evidence: 'Monitoring, retaliation, executive pressure, gross misconduct, Sam case.', hardeningAction: 'No rebuild required.' },
];

export const finalSystemReport = {
  flashcards: 152,
  mcqsAndBestResponseQuestions: 66,
  baseExamQuestions: 12,
  adversarialScenarios: 15,
  crossoverQuestions: 10,
  mockExamPapers: 6,
  mockExamQuestions: 39,
  totalPracticeItems: 294,
  majorTopicsCovered: 6,
  topicLabels: [
    'Professional ethics and codes',
    'Data privacy and OSINT',
    'Intellectual property',
    'Information governance and red teaming',
    'Cybersecurity and hacking law',
    'Workplace, monitoring, leadership and onboarding',
  ],
};
