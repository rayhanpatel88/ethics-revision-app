import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { flashcards as baseFlashcards } from '../data/flashcards';
import { expandedFlashcards } from '../data/expandedFlashcards';

const flashcards = [...baseFlashcards, ...expandedFlashcards];
import { topics } from '../data/topics';
import type { UserProgress } from '../data/types';
import type { Page } from '../components/Nav';

interface Props {
  progress: UserProgress;
  onNavigate: (p: Page) => void;
}

export default function WeaknessCenter({ progress, onNavigate }: Props) {
  const hardCards = flashcards.filter(c => progress.flashcardsHard.includes(c.id));
  const uncompletedTopics = topics.filter(t => !progress.topicsCompleted.includes(t.id));
  const lowScoreTopics = Object.entries(progress.quizScores)
    .filter(([, score]) => score < 70)
    .sort(([, a], [, b]) => a - b);

  const hasWeaknesses = hardCards.length > 0 || uncompletedTopics.length > 0 || lowScoreTopics.length > 0;

  const priorityOrder = [
    ...lowScoreTopics.map(([topic, score]) => ({ type: 'quiz' as const, label: topic, score, urgency: 'high' as const })),
    ...hardCards.slice(0, 8).map(c => ({ type: 'flashcard' as const, label: c.front.slice(0, 60) + '...', week: c.week, urgency: 'medium' as const })),
    ...uncompletedTopics.slice(0, 5).map(t => ({ type: 'topic' as const, label: t.title, id: t.id, urgency: 'low' as const })),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Weakness Review Centre</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Your personalised weak-area analysis based on quiz scores and flashcard difficulty ratings</p>
      </div>

      {!hasWeaknesses && (
        <div style={{ background: 'rgba(201,167,235,0.08)', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 14 }} className="p-8 text-center">
          <CheckCircle size={40} style={{ color: '#c9a7eb', margin: '0 auto 12px' }} />
          <h2 style={{ color: '#c9a7eb', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>No Weaknesses Detected</h2>
          <p style={{ color: '#d8b4fe', fontSize: 13 }}>Complete quizzes and rate flashcards to identify weak areas.</p>
        </div>
      )}

      {/* Priority revision order */}
      {priorityOrder.length > 0 && (
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
          <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Recommended Revision Order</div>
          <div className="space-y-2">
            {priorityOrder.map((item, i) => (
              <div key={i} className="flex items-center gap-3" style={{ background: '#0a1118', borderRadius: 10, padding: '10px 12px' }}>
                <span style={{ background: '#2a1938', color: '#64748b', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{
                      background: item.urgency === 'high' ? 'rgba(239,68,68,0.15)' : item.urgency === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(100,116,139,0.15)',
                      color: item.urgency === 'high' ? '#fca5a5' : item.urgency === 'medium' ? '#fcd34d' : '#94a3b8',
                      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                    }} className="px-1.5 py-0.5 rounded">
                      {item.type === 'quiz' ? `Quiz: ${(item as any).score}%` : item.type === 'flashcard' ? 'Hard Card' : 'Uncompleted'}
                    </span>
                    <span style={{ color: '#cbd5e1', fontSize: 12 }}>{item.label}</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(item.type === 'quiz' ? 'quiz' : item.type === 'flashcard' ? 'flashcards' : 'topics')}
                  style={{ color: '#475569', fontSize: 11 }}
                  className="flex items-center gap-1 hover:text-slate-300"
                >
                  Fix <ArrowRight size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hard flashcards */}
        <div style={{ background: '#14091f', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 14 }} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 700 }}>Hard Flashcards</div>
            <span style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
              {hardCards.length}
            </span>
          </div>
          {hardCards.length === 0 ? (
            <p style={{ color: '#475569', fontSize: 12 }}>No hard cards yet.</p>
          ) : (
            <div className="space-y-1.5">
              {hardCards.slice(0, 6).map(c => (
                <div key={c.id} style={{ background: '#1a0808', borderRadius: 8, padding: '6px 8px' }}>
                  <p style={{ color: '#fca5a5', fontSize: 11, lineHeight: 1.4 }}>{c.front.slice(0, 60)}...</p>
                </div>
              ))}
              {hardCards.length > 6 && <p style={{ color: '#475569', fontSize: 11 }}>+{hardCards.length - 6} more</p>}
            </div>
          )}
          <button onClick={() => onNavigate('flashcards')} style={{ marginTop: 12, color: '#ef4444', fontSize: 12, fontWeight: 600 }} className="flex items-center gap-1">
            Review hard cards <ArrowRight size={11} />
          </button>
        </div>

        {/* Low quiz scores */}
        <div style={{ background: '#14091f', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14 }} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div style={{ color: '#fcd34d', fontSize: 12, fontWeight: 700 }}>Low Quiz Scores</div>
            <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
              {lowScoreTopics.length}
            </span>
          </div>
          {lowScoreTopics.length === 0 ? (
            <p style={{ color: '#475569', fontSize: 12 }}>No quiz results yet.</p>
          ) : (
            <div className="space-y-1.5">
              {lowScoreTopics.map(([topic, score]) => (
                <div key={topic} className="flex justify-between items-center" style={{ background: '#1a1000', borderRadius: 8, padding: '6px 8px' }}>
                  <p style={{ color: '#fcd34d', fontSize: 11 }}>Quiz attempt</p>
                  <span style={{ color: score < 50 ? '#ef4444' : '#f59e0b', fontSize: 12, fontWeight: 700 }}>{score}%</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onNavigate('quiz')} style={{ marginTop: 12, color: '#f59e0b', fontSize: 12, fontWeight: 600 }} className="flex items-center gap-1">
            Retry quiz <ArrowRight size={11} />
          </button>
        </div>

        {/* Uncompleted topics */}
        <div style={{ background: '#14091f', border: '1px solid rgba(100,116,139,0.3)', borderRadius: 14 }} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700 }}>Uncompleted Topics</div>
            <span style={{ background: '#2a1938', color: '#94a3b8', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
              {uncompletedTopics.length}
            </span>
          </div>
          {uncompletedTopics.length === 0 ? (
            <p style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 600 }}>All topics completed! ✓</p>
          ) : (
            <div className="space-y-1.5">
              {uncompletedTopics.slice(0, 6).map(t => (
                <div key={t.id} style={{ background: '#0a1118', borderRadius: 8, padding: '6px 8px' }}>
                  <p style={{ color: '#94a3b8', fontSize: 11, lineHeight: 1.4 }}>{t.title}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onNavigate('topics')} style={{ marginTop: 12, color: '#64748b', fontSize: 12, fontWeight: 600 }} className="flex items-center gap-1">
            Go to topics <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* Study minutes */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Study Session</div>
            <div style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800, lineHeight: 1.2, marginTop: 2 }}>
              {Math.floor(progress.totalStudyMinutes / 60)}h {progress.totalStudyMinutes % 60}m
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Last Studied</div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>
              {progress.lastStudied ? new Date(progress.lastStudied).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Not yet'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
