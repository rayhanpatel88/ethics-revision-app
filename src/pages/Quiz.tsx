import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, ChevronRight, RefreshCw, Trophy, Zap } from 'lucide-react';
import { quizQuestions } from '../data/quizzes';
import type { UserProgress, Week } from '../data/types';

interface Props {
  progress: UserProgress;
  onScore: (topic: string, score: number) => void;
}

const WEEK_LABELS: Record<Week, string> = {
  week1: 'Wk 1: Ethics', week2: 'Wk 2: Privacy', week3: 'Wk 3: IP',
  week5: 'Wk 5: IG & Red Team', week6: 'Wk 6: Cyber', week9: 'Wk 9: Workplace',
};

export default function Quiz({ progress, onScore }: Props) {
  const [filterWeek, setFilterWeek] = useState<Week | 'all'>('all');
  const [quizState, setQuizState] = useState<'select' | 'active' | 'results'>('select');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(quizQuestions);

  const filtered = useMemo(() =>
    filterWeek === 'all' ? quizQuestions : quizQuestions.filter(q => q.week === filterWeek),
    [filterWeek]
  );

  const startQuiz = () => {
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, Math.min(10, filtered.length));
    setActiveQuestions(shuffled);
    setAnswers(new Array(shuffled.length).fill(null));
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizState('active');
  };

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const correct = answers.filter((a, i) => a === activeQuestions[i].correctIndex).length;
      const score = Math.round((correct / activeQuestions.length) * 100);
      onScore(`quiz_${filterWeek}_${Date.now()}`, score);
      setQuizState('results');
    }
  };

  const correctCount = answers.filter((a, i) => a === activeQuestions[i]?.correctIndex).length;
  const score = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

  const q = activeQuestions[currentIndex];
  const isCorrect = selectedOption === q?.correctIndex;

  if (quizState === 'select') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Quiz Engine</h1>
        <p style={{ color: '#64748b', fontSize: 13 }}>{quizQuestions.length} questions · scenario-based · multiple choice</p>

        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4 space-y-3">
          <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block' }}>Filter by Week</label>
          <div className="flex flex-wrap gap-2">
            {['all', ...Object.keys(WEEK_LABELS)].map(w => (
              <button
                key={w}
                onClick={() => setFilterWeek(w as Week | 'all')}
                style={{ background: filterWeek === w ? 'rgba(201,167,235,0.15)' : '#2a1938', border: `1px solid ${filterWeek === w ? 'rgba(201,167,235,0.4)' : '#4c315f'}`, color: filterWeek === w ? '#c9a7eb' : '#94a3b8', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600 }}
              >
                {w === 'all' ? 'All Weeks' : WEEK_LABELS[w as Week]}
              </button>
            ))}
          </div>
          <p style={{ color: '#475569', fontSize: 12 }}>{filtered.length} questions available</p>
        </div>

        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <h3 style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Previous Quiz Scores</h3>
          {Object.entries(progress.quizScores).length === 0 ? (
            <p style={{ color: '#475569', fontSize: 13 }}>No quizzes completed yet.</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(progress.quizScores).slice(-5).map(([topic, score]) => (
                <div key={topic} className="flex items-center justify-between">
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>Quiz attempt</span>
                  <span style={{ color: score >= 80 ? '#c9a7eb' : score >= 60 ? '#f59e0b' : '#ef4444', fontSize: 13, fontWeight: 700 }}>{score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={startQuiz} style={{ background: 'linear-gradient(135deg, #4b1d74, #2a0f44)', border: '1px solid rgba(201,167,235,0.4)', color: '#c9a7eb', borderRadius: 12, padding: '14px 24px', fontSize: 15, fontWeight: 700, width: '100%' }} className="flex items-center justify-center gap-2">
          <Zap size={18} /> Start Quiz ({Math.min(10, filtered.length)} questions)
        </button>
      </div>
    );
  }

  if (quizState === 'results') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 16 }} className="p-8 text-center">
          <Trophy size={48} style={{ color: score >= 80 ? '#c9a7eb' : score >= 60 ? '#f59e0b' : '#ef4444', margin: '0 auto 16px' }} />
          <div style={{ fontSize: 56, fontWeight: 800, color: score >= 80 ? '#c9a7eb' : score >= 60 ? '#f59e0b' : '#ef4444', lineHeight: 1 }}>{score}%</div>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>{correctCount} / {activeQuestions.length} correct</p>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
            {score >= 90 ? '🎯 Excellent! Near-distinction level.' : score >= 70 ? '✅ Good — keep reinforcing weak areas.' : '⚠️ Review these topics — retry for higher score.'}
          </p>
        </div>

        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4 space-y-3">
          <h3 style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700 }}>Answer Review</h3>
          {activeQuestions.map((question, i) => {
            const ans = answers[i];
            const correct = ans === question.correctIndex;
            return (
              <div key={i} style={{ borderLeft: `3px solid ${correct ? '#c9a7eb' : '#ef4444'}`, paddingLeft: 12 }}>
                <p style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>{question.question}</p>
                <p style={{ color: correct ? '#c9a7eb' : '#ef4444', fontSize: 12, marginTop: 2 }}>
                  {correct ? '✓ Correct' : `✗ You selected: "${ans !== null ? question.options[ans] : 'No answer'}" — Correct: "${question.options[question.correctIndex]}"`}
                </p>
                <p style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{question.explanation}</p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={startQuiz} style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.3)', color: '#c9a7eb', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, flex: 1 }} className="flex items-center justify-center gap-2">
            <RefreshCw size={14} /> Retry
          </button>
          <button onClick={() => setQuizState('select')} style={{ background: '#14091f', border: '1px solid #2a1938', color: '#94a3b8', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, flex: 1 }}>
            Change Topic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <span style={{ color: '#94a3b8', fontSize: 13 }}>Question {currentIndex + 1} of {activeQuestions.length}</span>
        <div className="flex items-center gap-2">
          <span style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 600 }}>{answers.filter((a, i) => a !== null && a === activeQuestions[i]?.correctIndex).length} correct</span>
        </div>
      </div>

      <div style={{ background: '#2a1938', borderRadius: 8, height: 6 }}>
        <div style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%`, background: 'linear-gradient(90deg, #c9a7eb, #ff6aa8)', height: '100%', borderRadius: 8, transition: 'width 0.3s' }} />
      </div>

      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span style={{ background: 'rgba(201,167,235,0.1)', color: '#c9a7eb', fontSize: 10, fontWeight: 700, border: '1px solid rgba(201,167,235,0.3)' }} className="px-2 py-0.5 rounded-full uppercase">
            {WEEK_LABELS[q.week]}
          </span>
          <span style={{ background: '#2a1938', color: '#64748b', fontSize: 10, fontWeight: 600 }} className="px-2 py-0.5 rounded-full uppercase">
            {q.type}
          </span>
          {q.examRelevance === 'high' && (
            <span style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">⚡ EXAM LIKELY</span>
          )}
        </div>
        <p style={{ color: '#f1f5f9', fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{q.question}</p>
      </div>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let bg = '#14091f', border = '1px solid #2a1938', color = '#cbd5e1';
          if (selectedOption !== null) {
            if (i === q.correctIndex) { bg = 'rgba(201,167,235,0.1)'; border = '1px solid rgba(201,167,235,0.5)'; color = '#c9a7eb'; }
            else if (i === selectedOption) { bg = 'rgba(239,68,68,0.1)'; border = '1px solid rgba(239,68,68,0.5)'; color = '#fca5a5'; }
          } else {
            if (selectedOption === i) { bg = '#2a1938'; }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selectedOption !== null}
              style={{ background: bg, border, color, borderRadius: 10, padding: '12px 16px', width: '100%', textAlign: 'left', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}
              className="hover:opacity-90 transition-all disabled:cursor-default"
            >
              <span style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid #4c315f', background: '#2a1938', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              {opt}
              {selectedOption !== null && i === q.correctIndex && <CheckCircle size={14} style={{ marginLeft: 'auto', color: '#c9a7eb', flexShrink: 0 }} />}
              {selectedOption !== null && i === selectedOption && i !== q.correctIndex && <XCircle size={14} style={{ marginLeft: 'auto', color: '#ef4444', flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div style={{ background: isCorrect ? 'rgba(201,167,235,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${isCorrect ? 'rgba(201,167,235,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 12 }} className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? <CheckCircle size={14} style={{ color: '#c9a7eb' }} /> : <XCircle size={14} style={{ color: '#ef4444' }} />}
            <span style={{ color: isCorrect ? '#c9a7eb' : '#fca5a5', fontSize: 13, fontWeight: 700 }}>
              {isCorrect ? 'Correct!' : 'Not quite.'}
            </span>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{q.explanation}</p>
          {!isCorrect && selectedOption !== null && q.wrongExplanations[selectedOption] && (
            <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 8, fontStyle: 'italic' }}>
              Why not that option: {q.wrongExplanations[selectedOption]}
            </p>
          )}
        </div>
      )}

      {selectedOption !== null && (
        <button onClick={handleNext} style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.4)', color: '#c9a7eb', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, width: '100%' }} className="flex items-center justify-center gap-2">
          {currentIndex < activeQuestions.length - 1 ? <><ChevronRight size={16} /> Next Question</> : <><Trophy size={16} /> View Results</>}
        </button>
      )}
    </div>
  );
}
