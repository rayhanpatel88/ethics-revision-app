export type Week = 'week1' | 'week2' | 'week3' | 'week5' | 'week6' | 'week9';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ExamRelevance = 'high' | 'medium' | 'low';

export interface Topic {
  id: string;
  week: Week;
  title: string;
  subtitle: string;
  summary: string;
  mustKnow: string[];
  definitions: { term: string; definition: string }[];
  frameworks: { name: string; description: string }[];
  laws: { name: string; description: string }[];
  examAngles: string[];
  commonTraps: string[];
  passAnswer: string[];
  twoOneAnswer: string[];
  firstAnswer: string[];
  ninetyPlusAnswer: string[];
  caseStudies: string[];
  highMarkPhrases: string[];
  memoryHook: string;
  examWeight: ExamRelevance;
}

export interface Flashcard {
  id: string;
  week: Week;
  topic: string;
  front: string;
  back: string;
  type: 'definition' | 'framework' | 'law' | 'casestudy' | 'application' | 'mistake';
  difficulty: Difficulty;
  examRelevance: ExamRelevance;
}

export interface QuizQuestion {
  id: string;
  week: Week;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanations: string[];
  difficulty: Difficulty;
  examRelevance: ExamRelevance;
  type: 'mcq' | 'scenario' | 'true-false' | 'best-response';
}

export interface ExamQuestion {
  id: string;
  week: Week;
  topic: string;
  question: string;
  marks: number;
  timeMinutes: number;
  commandWord: string;
  planningPrompts: string[];
  keyPoints: string[];
  highMarkExtras: string[];
  commonMistakes: string[];
  modelAnswerOutline: string[];
  modelAnswer?: string;
}

export interface CaseStudy {
  id: string;
  week: Week;
  title: string;
  context: string;
  scenario: string;
  ethicalIssues: string[];
  stakeholders: string[];
  professionalObligations: string[];
  relevantLaws: string[];
  risks: string[];
  possibleActions: string[];
  bestResponse: string;
  examinerExpectations: string[];
  ninetyPlusAngle: string[];
  weakAnswerMistakes: string[];
}

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  week: Week;
  whyItMatters: string;
  examApplication: string;
  exampleUsage: string;
  relatedTerms: string[];
}

export interface ContentFile {
  fileName: string;
  fileType: string;
  week: string;
  keyConcepts: string[];
  processed: boolean;
  notes: string;
}

export interface RevisionTask {
  id: string;
  time: string;
  task: string;
  type: 'flashcard' | 'quiz' | 'essay' | 'scenario' | 'read' | 'plan';
  duration: number;
  priority: 'critical' | 'high' | 'medium';
  topics: string[];
}

export interface UserProgress {
  topicsCompleted: string[];
  flashcardsMastered: string[];
  flashcardsHard: string[];
  quizScores: Record<string, number>;
  examQuestionsAttempted: string[];
  weeklyScores: Record<Week, number>;
  lastStudied: string;
  totalStudyMinutes: number;
  scenariosCompleted: string[];
  caseStudiesReviewed: string[];
}
