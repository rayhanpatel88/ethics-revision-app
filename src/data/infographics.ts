import type { Week } from './types';

export interface Infographic {
  id: string;
  title: string;
  week: Week;
  topic: string;
  src: string;
  focus: string[];
  examUse: string;
}

const ROOT = '/resources/infographics';

export const infographics: Infographic[] = [
  {
    id: 'info-ai-reasonableness',
    title: 'AI and the Reasonableness Standard',
    week: 'week6',
    topic: 'AI governance',
    src: `${ROOT}/AI_and_the_Reasonableness_Standard.png`,
    focus: ['Reasonableness', 'AI baseline', 'liability', 'professional judgement'],
    examUse: 'Use for AI governance essays where machine performance changes what counts as reasonable human conduct.',
  },
  {
    id: 'info-cyber-ethics',
    title: 'Cyber Security Professional Ethics Guide',
    week: 'week1',
    topic: 'Professional ethics',
    src: `${ROOT}/Cyber_Security_Professional_Ethics_Guide.png`,
    focus: ['Normative ethics', 'BCS', 'ACM', 'unethical situations'],
    examUse: 'Use for code-of-conduct answers and whistleblowing escalation questions.',
  },
  {
    id: 'info-cyber-foundations',
    title: 'Cybersecurity Essentials: Foundations, Threats and UK Law',
    week: 'week6',
    topic: 'Cybersecurity law',
    src: `${ROOT}/Cybersecurity_Essentials_and_UK_Law (1).png`,
    focus: ['CIA triad', 'hacker hats', 'attack lifecycle', 'CMA penalties'],
    examUse: 'Use for short CMA and attack lifecycle questions where precision matters.',
  },
  {
    id: 'info-cyber-defence',
    title: 'Cybersecurity Essentials: Defence, Attacks and UK Law',
    week: 'week6',
    topic: 'Cybersecurity law',
    src: `${ROOT}/Cybersecurity_Essentials_and_UK_Law.png`,
    focus: ['CIA objectives', 'assets', 'vulnerabilities', 'legal penalties'],
    examUse: 'Use as a visual recap for the CIA triad, threat concepts, and CMA offence escalation.',
  },
  {
    id: 'info-leadership',
    title: 'Ethical Leadership Path and Growth',
    week: 'week9',
    topic: 'Leadership',
    src: `${ROOT}/Ethical_Leadership_Path_and_Growth.png`,
    focus: ['leadership vs management', 'self-assessment', 'training gaps', 'pair mentoring'],
    examUse: 'Use for Week 9 leadership and workplace culture answers.',
  },
  {
    id: 'info-online-footprint',
    title: 'Digital Shadows: Ethics of Your Online Footprint',
    week: 'week2',
    topic: 'OSINT and privacy',
    src: `${ROOT}/Ethics_of_Your_Online_Footprint.png`,
    focus: ['OSINT', 'aggregation problem', 'consent paradox', 'privacy harms'],
    examUse: 'Use for OSINT questions that ask why public data can still create ethical privacy harm.',
  },
  {
    id: 'info-data-protection-evolution',
    title: 'Data Privacy: Evolution of Personal Protection',
    week: 'week2',
    topic: 'UK GDPR',
    src: `${ROOT}/Evolution_of_Data_Protection_Laws.png`,
    focus: ['DPA 1998', 'UK GDPR', 'DPA 2018', 'rights', 'breach reporting'],
    examUse: 'Use for legal evolution questions and comparisons between old and modern data protection duties.',
  },
  {
    id: 'info-ip-four-pillars',
    title: 'Four Pillars of Intellectual Property',
    week: 'week3',
    topic: 'Intellectual property',
    src: `${ROOT}/Four_Pillars_of_Intellectual_Property.png`,
    focus: ['copyright', 'patents', 'trade marks', 'design rights', 'AI training data'],
    examUse: 'Use for IP classification questions and software patentability discussion.',
  },
  {
    id: 'info-ig-value-risk',
    title: 'Information Governance: Balancing Data Value and Risk',
    week: 'week5',
    topic: 'Information governance',
    src: `${ROOT}/Information_Governance_Value_and_Risk.png`,
    focus: ['data value', 'risk', 'IG council', 'lifecycle', 'poor governance'],
    examUse: 'Use for Records Management vs Compliance and IG programme questions.',
  },
  {
    id: 'info-ip-risks',
    title: 'Intellectual Property: Pillars and Pitfalls',
    week: 'week3',
    topic: 'IP risk assessment',
    src: `${ROOT}/Intellectual_Property_Pillars_and_Risks.png`,
    focus: ['licensing', 'scraping', 'AI mining', 'risk scoring', 'briefing structure'],
    examUse: 'Use for IP workshop-style risk assessment and legal briefing questions.',
  },
  {
    id: 'info-cma-ethics',
    title: 'Navigating the Computer Misuse Act',
    week: 'week6',
    topic: 'CMA and professional ethics',
    src: `${ROOT}/Navigating_the_Computer_Misuse_Act.png`,
    focus: ['CMA sections', 'dual-use tools', 'stakeholders', 'AI risk', 'quantum risk'],
    examUse: 'Use for CMA critique questions and professional responsibility in emerging cyber threats.',
  },
  {
    id: 'info-monitoring-risks-a',
    title: 'Navigating Workplace Monitoring Risks',
    week: 'week9',
    topic: 'Workplace monitoring',
    src: `${ROOT}/Navigating_Workplace_Monitoring_Risks.png`,
    focus: ['surveillance harms', 'morale', 'privacy', 'impact assessments', 'minimisation'],
    examUse: 'Use for workplace monitoring questions that require both legal and psychological risk analysis.',
  },
  {
    id: 'info-monitoring-risks-b',
    title: 'Workplace Monitoring Risks: Ethics and Mitigation',
    week: 'week9',
    topic: 'Workplace monitoring',
    src: `${ROOT}/Navigating_Workplace_Monitoring_Risks (1).png`,
    focus: ['RIPA', 'GDPR', 'transparent policy', 'data minimisation', 'employee trust'],
    examUse: 'Use as a second visual recap for PTLN-style monitoring answers.',
  },
  {
    id: 'info-red-teaming',
    title: 'The Art of Red Teaming',
    week: 'week5',
    topic: 'Red teaming',
    src: `${ROOT}/The_Art_of_Red_Teaming.png`,
    focus: ['threat actor matrix', 'negative stakeholders', 'adversarial view', 'harm discovery'],
    examUse: 'Use for red-team questions that ask why defensive thinking must include adversarial imagination.',
  },
  {
    id: 'info-onboarding-gap',
    title: 'The Onboarding Gap: Sam’s First Day',
    week: 'week9',
    topic: 'Onboarding ethics',
    src: `${ROOT}/The_Onboarding_Experience_Gap.png`,
    focus: ['cognitive overload', 'manager assumptions', 'psychological safety', 'neurodiversity'],
    examUse: 'Use for Sam’s First Day, neurodiversity, and manager empathy-gap questions.',
  },
];
