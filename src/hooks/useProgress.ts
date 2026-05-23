import { useState, useEffect } from 'react';
import type { UserProgress } from '../data/types';
import { topics } from '../data/topics';
import { flashcards as baseFlashcards } from '../data/flashcards';
import { expandedFlashcards } from '../data/expandedFlashcards';
import { examQuestions } from '../data/examQuestions';
import { mockExams } from '../data/mockExams';

const DEFAULT_PROGRESS: UserProgress = {
  topicsCompleted: [],
  flashcardsMastered: [],
  flashcardsHard: [],
  quizScores: {},
  examQuestionsAttempted: [],
  weeklyScores: { week1: 0, week2: 0, week3: 0, week5: 0, week6: 0, week9: 0 },
  lastStudied: '',
  totalStudyMinutes: 0,
  scenariosCompleted: [],
  caseStudiesReviewed: [],
};

const STORAGE_KEY = 'ethics_revision_progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PROGRESS, ...JSON.parse(stored) } : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeTopic = (topicId: string) => {
    setProgress(p => ({
      ...p,
      topicsCompleted: p.topicsCompleted.includes(topicId)
        ? p.topicsCompleted.filter(id => id !== topicId)
        : [...p.topicsCompleted, topicId],
      lastStudied: new Date().toISOString(),
    }));
  };

  const masterFlashcard = (cardId: string) => {
    setProgress(p => ({
      ...p,
      flashcardsMastered: p.flashcardsMastered.includes(cardId)
        ? p.flashcardsMastered
        : [...p.flashcardsMastered, cardId],
      flashcardsHard: p.flashcardsHard.filter(id => id !== cardId),
    }));
  };

  const markFlashcardHard = (cardId: string) => {
    setProgress(p => ({
      ...p,
      flashcardsHard: p.flashcardsHard.includes(cardId)
        ? p.flashcardsHard
        : [...p.flashcardsHard, cardId],
      flashcardsMastered: p.flashcardsMastered.filter(id => id !== cardId),
    }));
  };

  const recordQuizScore = (topicId: string, score: number) => {
    setProgress(p => ({
      ...p,
      quizScores: { ...p.quizScores, [topicId]: Math.max(p.quizScores[topicId] || 0, score) },
      lastStudied: new Date().toISOString(),
    }));
  };

  const attemptExamQuestion = (questionId: string) => {
    setProgress(p => ({
      ...p,
      examQuestionsAttempted: p.examQuestionsAttempted.includes(questionId)
        ? p.examQuestionsAttempted
        : [...p.examQuestionsAttempted, questionId],
    }));
  };

  const completeScenario = (scenarioId: string) => {
    setProgress(p => ({
      ...p,
      scenariosCompleted: p.scenariosCompleted.includes(scenarioId)
        ? p.scenariosCompleted
        : [...p.scenariosCompleted, scenarioId],
    }));
  };

  const reviewCaseStudy = (csId: string) => {
    setProgress(p => ({
      ...p,
      caseStudiesReviewed: p.caseStudiesReviewed.includes(csId)
        ? p.caseStudiesReviewed
        : [...p.caseStudiesReviewed, csId],
    }));
  };

  const addStudyMinutes = (minutes: number) => {
    setProgress(p => ({ ...p, totalStudyMinutes: p.totalStudyMinutes + minutes }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  const getReadinessScore = (): number => {
    const totalTopics = topics.length || 1;
    const totalFlashcards = baseFlashcards.length + expandedFlashcards.length || 1;
    const totalExamQuestions = examQuestions.length + mockExams.reduce((sum, exam) => sum + exam.questions.length, 0) || 1;
    const topicsScore = Math.min(progress.topicsCompleted.length / totalTopics * 25, 25);
    const flashcardsScore = Math.min(progress.flashcardsMastered.length / totalFlashcards * 25, 25);
    const quizScores = Object.values(progress.quizScores);
    const avgQuiz = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;
    const quizScore = Math.min(avgQuiz / 100 * 25, 25);
    const examScore = Math.min(progress.examQuestionsAttempted.length / totalExamQuestions * 25, 25);
    return Math.round(topicsScore + flashcardsScore + quizScore + examScore);
  };

  return {
    progress,
    completeTopic,
    masterFlashcard,
    markFlashcardHard,
    recordQuizScore,
    attemptExamQuestion,
    completeScenario,
    reviewCaseStudy,
    addStudyMinutes,
    resetProgress,
    getReadinessScore,
  };
}
