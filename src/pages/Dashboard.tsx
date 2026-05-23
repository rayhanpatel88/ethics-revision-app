import { Brain, Zap, Target, AlertTriangle, TrendingUp, BookOpen, Trophy, ArrowRight, CheckCircle, Clock, Star, Layers } from 'lucide-react';
import type { UserProgress } from '../data/types';
import { topics } from '../data/topics';
import { flashcards as baseFlashcards } from '../data/flashcards';
import { expandedFlashcards } from '../data/expandedFlashcards';
import { examQuestions } from '../data/examQuestions';
import { mockExams } from '../data/mockExams';
import type { Page } from '../components/Nav';

interface Props {
  progress: UserProgress;
  readiness: number;
  onNavigate: (p: Page) => void;
}

const WEEK_LABELS: Record<string, string> = {
  week1: 'Wk 1: Codes & Ethics',
  week2: 'Wk 2: Data Privacy',
  week3: 'Wk 3: IP',
  week5: 'Wk 5: Info Gov + Red Team',
  week6: 'Wk 6: Cybersecurity',
  week9: 'Wk 9: Workplace',
};

const HIGH_RISK_TOPICS = [
  { label: 'UK GDPR 7 Principles + Lawful Bases', week: 'week2', risk: 'critical' },
  { label: 'CMA 1990: S.1, S.3, S.3ZA, S.3A + Penalties', week: 'week6', risk: 'critical' },
  { label: 'Attack Lifecycle (5 stages)', week: 'week6', risk: 'critical' },
  { label: 'Whistleblowing Escalation Ladder', week: 'week1', risk: 'critical' },
  { label: 'Gross Misconduct Procedure', week: 'week9', risk: 'high' },
  { label: 'Post Office Horizon IG Case Study', week: 'week5', risk: 'high' },
  { label: 'Frances Haugen Case + BCS Application', week: 'week1', risk: 'high' },
  { label: 'IP Four Pillars (CPTD)', week: 'week3', risk: 'high' },
];

export default function Dashboard({ progress, readiness, onNavigate }: Props) {
  const totalTopics = topics.length;
  const completedTopics = progress.topicsCompleted.length;
  const flashcards = [...baseFlashcards, ...expandedFlashcards];
  const totalExamQuestions = examQuestions.length + mockExams.reduce((sum, exam) => sum + exam.questions.length, 0);
  const attemptedExamQuestions = progress.examQuestionsAttempted.length;
  const mastered = progress.flashcardsMastered.length;
  const totalCards = flashcards.length;
  const quizAttempts = Object.keys(progress.quizScores).length;
  const avgQuiz = quizAttempts > 0
    ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / quizAttempts)
    : 0;

  const weakTopics = Object.entries(progress.quizScores)
    .filter(([, score]) => score < 60)
    .map(([topic]) => topic)
    .slice(0, 4);

  const hardCards = progress.flashcardsHard.length;

  const readinessColor = readiness >= 75 ? '#c9a7eb' : readiness >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ background: 'rgba(201,167,235,0.15)', color: '#c9a7eb', border: '1px solid rgba(201,167,235,0.3)' }} className="text-xs font-semibold px-2 py-0.5 rounded-full">25COP928</span>
            <span style={{ color: '#64748b', fontSize: 12 }}>Professionalism, Ethics & Cyber Security</span>
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            Exam Command Centre
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Target: 90%+ · Exam Date: 9 June 2025</p>
        </div>
        <div style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 16 }} className="p-4 text-center flex-shrink-0">
          <div style={{ fontSize: 36, fontWeight: 800, color: readinessColor, lineHeight: 1 }}>{readiness}%</div>
          <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>Ready</div>
        </div>
      </div>

      {/* Readiness bar */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Exam Readiness</span>
          <span style={{ color: readinessColor, fontSize: 13, fontWeight: 700 }}>{readiness}% / 100%</span>
        </div>
        <div style={{ background: '#2a1938', borderRadius: 8, height: 10, overflow: 'hidden' }}>
          <div style={{ width: `${readiness}%`, background: `linear-gradient(90deg, ${readinessColor}, #ff6aa8)`, height: '100%', borderRadius: 8, transition: 'width 0.5s ease' }} />
        </div>
        <div className="flex justify-between mt-2" style={{ color: '#475569', fontSize: 11 }}>
          <span>Topics: {completedTopics}/{totalTopics}</span>
          <span>Cards: {mastered}/{totalCards}</span>
          <span>Quiz avg: {avgQuiz > 0 ? `${avgQuiz}%` : '—'}</span>
          <span>Exam Qs: {attemptedExamQuestions}/{totalExamQuestions}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Topics Done', value: completedTopics, total: totalTopics, icon: CheckCircle, color: '#c9a7eb', page: 'topics' as Page },
          { label: 'Cards Mastered', value: mastered, total: totalCards, icon: Brain, color: '#ff6aa8', page: 'flashcards' as Page },
          { label: 'Quiz Average', value: avgQuiz > 0 ? `${avgQuiz}%` : '—', total: null, icon: Zap, color: '#f59e0b', page: 'quiz' as Page },
          { label: 'Exam Qs Done', value: attemptedExamQuestions, total: totalExamQuestions, icon: Target, color: '#8b5cf6', page: 'exam' as Page },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={() => onNavigate(stat.page)}
              style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }}
              className="p-4 text-left hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} style={{ color: stat.color }} />
                <ArrowRight size={12} style={{ color: '#475569' }} />
              </div>
              <div style={{ color: stat.color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
                {stat.total !== null && <span style={{ color: '#475569', fontSize: 14, fontWeight: 400 }}>/{stat.total}</span>}
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{stat.label}</div>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => onNavigate('flashcards')}
          style={{ background: 'linear-gradient(135deg, #4b1d74, #2a0f44)', border: '1px solid rgba(201,167,235,0.3)', borderRadius: 12 }}
          className="p-4 text-left hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} style={{ color: '#c9a7eb' }} />
            <span style={{ color: '#c9a7eb', fontSize: 13, fontWeight: 700 }}>20-Min Sprint</span>
          </div>
          <p style={{ color: '#d8b4fe', fontSize: 12 }}>Quick flashcard revision session across all topics</p>
        </button>
        <button
          onClick={() => onNavigate('weakness')}
          style={{ background: 'linear-gradient(135deg, #7c2d12, #713f12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12 }}
          className="p-4 text-left hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
            <span style={{ color: '#f59e0b', fontSize: 13, fontWeight: 700 }}>Review Weak Areas</span>
          </div>
          <p style={{ color: '#fcd34d', fontSize: 12 }}>Focus on hard flashcards and low quiz scores</p>
        </button>
        <button
          onClick={() => onNavigate('exam')}
          style={{ background: 'linear-gradient(135deg, #312e81, #1e1b4b)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 12 }}
          className="p-4 text-left hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={16} style={{ color: '#8b5cf6' }} />
            <span style={{ color: '#8b5cf6', fontSize: 13, fontWeight: 700 }}>Sample Exam Practice</span>
          </div>
          <p style={{ color: '#c4b5fd', fontSize: 12 }}>Practise exact exam question style with mark schemes</p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* High-risk topics */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} style={{ color: '#ef4444' }} />
            <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700 }}>High-Risk Exam Topics</span>
            <span style={{ color: '#64748b', fontSize: 11 }}>— must know these cold</span>
          </div>
          <div className="space-y-2">
            {HIGH_RISK_TOPICS.map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.risk === 'critical' ? '#ef4444' : '#f59e0b', flexShrink: 0 }} />
                <span style={{ color: '#cbd5e1', fontSize: 12 }}>{t.label}</span>
                <span style={{ marginLeft: 'auto', color: t.risk === 'critical' ? '#ef4444' : '#f59e0b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{t.risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly progress */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} style={{ color: '#c9a7eb' }} />
            <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700 }}>Module Coverage</span>
          </div>
          <div className="space-y-2.5">
            {Object.entries(WEEK_LABELS).map(([week, label]) => {
              const isComplete = topics
                .filter(t => t.week === week)
                .every(t => progress.topicsCompleted.includes(t.id));
              const weekTopics = topics.filter(t => t.week === week);
              const doneCount = weekTopics.filter(t => progress.topicsCompleted.includes(t.id)).length;
              const pct = weekTopics.length > 0 ? Math.round((doneCount / weekTopics.length) * 100) : 0;
              return (
                <div key={week}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ color: '#cbd5e1', fontSize: 12 }}>{label}</span>
                    <div className="flex items-center gap-1.5">
                      {isComplete && <CheckCircle size={12} style={{ color: '#c9a7eb' }} />}
                      <span style={{ color: pct === 100 ? '#c9a7eb' : '#64748b', fontSize: 11, fontWeight: 600 }}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{ background: '#2a1938', borderRadius: 4, height: 4 }}>
                    <div style={{ width: `${pct}%`, background: pct === 100 ? '#c9a7eb' : 'linear-gradient(90deg, #3b82f6, #ff6aa8)', height: '100%', borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weak areas summary */}
      {(weakTopics.length > 0 || hardCards > 0) && (
        <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }} className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} style={{ color: '#ef4444' }} />
            <span style={{ color: '#fca5a5', fontSize: 13, fontWeight: 700 }}>Current Weak Areas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hardCards > 0 && (
              <span style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)', fontSize: 11, fontWeight: 600 }} className="px-2 py-1 rounded-lg">
                {hardCards} hard flashcards
              </span>
            )}
            {weakTopics.map(t => (
              <span key={t} style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)', fontSize: 11, fontWeight: 600 }} className="px-2 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </div>
          <button onClick={() => onNavigate('weakness')} className="mt-2 text-xs" style={{ color: '#ef4444' }}>
            Fix these weaknesses →
          </button>
        </div>
      )}

      {/* Quick nav grid */}
      <div>
        <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Quick Access</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { label: 'Topics', icon: BookOpen, page: 'topics' as Page, color: '#3b82f6' },
            { label: 'Cases', icon: Layers, page: 'cases' as Page, color: '#8b5cf6' },
            { label: 'Glossary', icon: Star, page: 'glossary' as Page, color: '#f59e0b' },
            { label: 'Strategy', icon: Trophy, page: 'strategy' as Page, color: '#c9a7eb' },
            { label: 'Planner', icon: Clock, page: 'planner' as Page, color: '#ff6aa8' },
            { label: 'Mastery', icon: TrendingUp, page: 'mastery' as Page, color: '#ec4899' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 10 }}
                className="p-3 flex flex-col items-center gap-1.5 hover:border-slate-600 transition-colors"
              >
                <Icon size={16} style={{ color: item.color }} />
                <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600 }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
