import { Map, CheckCircle, Brain, Zap, TrendingUp } from 'lucide-react';
import { topics } from '../data/topics';
import { flashcards as baseFlashcards } from '../data/flashcards';
import { expandedFlashcards } from '../data/expandedFlashcards';
import { examQuestions } from '../data/examQuestions';
import { caseStudies } from '../data/caseStudies';

const flashcards = [...baseFlashcards, ...expandedFlashcards];
import type { UserProgress, Week } from '../data/types';

interface Props {
  progress: UserProgress;
}

const WEEK_META: Record<Week, { label: string; color: string; shortTitle: string }> = {
  week1: { label: 'Week 1', color: '#c9a7eb', shortTitle: 'Ethics & Codes' },
  week2: { label: 'Week 2', color: '#3b82f6', shortTitle: 'Privacy & GDPR' },
  week3: { label: 'Week 3', color: '#f59e0b', shortTitle: 'IP Law' },
  week5: { label: 'Week 5', color: '#8b5cf6', shortTitle: 'IG & Red Team' },
  week6: { label: 'Week 6', color: '#ef4444', shortTitle: 'Cyber & CMA' },
  week9: { label: 'Week 9', color: '#ff6aa8', shortTitle: 'Workplace Ethics' },
};

const WEEKS: Week[] = ['week1', 'week2', 'week3', 'week5', 'week6', 'week9'];

function MasteryBar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
        <span style={{ color, fontSize: 11, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 5, background: '#2a1938', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

export default function MasteryMap({ progress }: Props) {
  const totalFlashcards = flashcards.length;
  const totalTopics = topics.length;
  const sampleExamQuestionIds = new Set(examQuestions.map(q => q.id));
  const totalExamQuestions = examQuestions.length;
  const attemptedSampleQuestions = progress.examQuestionsAttempted.filter(id => sampleExamQuestionIds.has(id)).length;
  const flashcardTarget = Math.ceil(totalFlashcards * 0.75);

  const overallFlashcardMastery = Math.round((progress.flashcardsMastered.length / totalFlashcards) * 100);
  const overallTopicMastery = Math.round((progress.topicsCompleted.length / totalTopics) * 100);
  const quizScoreValues = Object.values(progress.quizScores);
  const avgQuizScore = quizScoreValues.length > 0 ? Math.round(quizScoreValues.reduce((a, b) => a + b, 0) / quizScoreValues.length) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Map size={18} style={{ color: '#8b5cf6' }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Content Mastery Map</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Visual snapshot of your coverage across all examinable weeks — see exactly where to focus</p>
      </div>

      {/* Global overview */}
      <div className="grid grid-cols-3 gap-3">
        <div style={{ background: '#14091f', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 14 }} className="p-4 text-center">
          <CheckCircle size={20} style={{ color: '#c9a7eb', margin: '0 auto 6px' }} />
          <div style={{ color: '#c9a7eb', fontSize: 24, fontWeight: 800 }}>{overallTopicMastery}%</div>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>Topics Done</div>
          <div style={{ color: '#475569', fontSize: 10 }}>{progress.topicsCompleted.length}/{totalTopics}</div>
        </div>
        <div style={{ background: '#14091f', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 14 }} className="p-4 text-center">
          <Brain size={20} style={{ color: '#8b5cf6', margin: '0 auto 6px' }} />
          <div style={{ color: '#8b5cf6', fontSize: 24, fontWeight: 800 }}>{overallFlashcardMastery}%</div>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>Cards Mastered</div>
          <div style={{ color: '#475569', fontSize: 10 }}>{progress.flashcardsMastered.length}/{totalFlashcards}</div>
        </div>
        <div style={{ background: '#14091f', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14 }} className="p-4 text-center">
          <Zap size={20} style={{ color: '#f59e0b', margin: '0 auto 6px' }} />
          <div style={{ color: '#f59e0b', fontSize: 24, fontWeight: 800 }}>{avgQuizScore}%</div>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>Avg Quiz Score</div>
          <div style={{ color: '#475569', fontSize: 10 }}>{quizScoreValues.length} attempt{quizScoreValues.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* Week-by-week mastery grid */}
      <div>
        <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Week-by-Week Mastery</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WEEKS.map(week => {
            const meta = WEEK_META[week];
            const weekTopics = topics.filter(t => t.week === week);
            const weekCards = flashcards.filter(c => c.week === week);

            const topicsDone = weekTopics.filter(t => progress.topicsCompleted.includes(t.id)).length;
            const cardsMastered = weekCards.filter(c => progress.flashcardsMastered.includes(c.id)).length;
            const cardsHard = weekCards.filter(c => progress.flashcardsHard.includes(c.id)).length;
            const topicPct = weekTopics.length ? Math.round((topicsDone / weekTopics.length) * 100) : 0;
            const cardPct = weekCards.length ? Math.round((cardsMastered / weekCards.length) * 100) : 0;

            const weekQuizScore = progress.quizScores[week] ?? 0;
            const hasQuizScore = week in progress.quizScores;

            const overallPct = Math.round((topicPct + cardPct + (hasQuizScore ? weekQuizScore : 0)) / (hasQuizScore ? 3 : 2));

            return (
              <div key={week} style={{ background: '#14091f', border: `1px solid ${meta.color}25`, borderRadius: 14 }} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div style={{ color: meta.color, fontSize: 11, fontWeight: 700 }}>{meta.label}</div>
                    <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700 }}>{meta.shortTitle}</div>
                  </div>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `conic-gradient(${meta.color} ${overallPct * 3.6}deg, #2a1938 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#14091f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: meta.color, fontSize: 11, fontWeight: 800 }}>{overallPct}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <MasteryBar value={topicPct} color={meta.color} label={`Topics ${topicsDone}/${weekTopics.length}`} />
                  <MasteryBar value={cardPct} color={meta.color} label={`Cards ${cardsMastered}/${weekCards.length}`} />
                  <MasteryBar value={hasQuizScore ? weekQuizScore : 0} color={meta.color} label={hasQuizScore ? `Quiz ${weekQuizScore}%` : 'Quiz (not taken)'} />
                </div>

                {cardsHard > 0 && (
                  <div style={{ marginTop: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '6px 8px' }}>
                    <span style={{ color: '#fca5a5', fontSize: 10, fontWeight: 600 }}>⚠ {cardsHard} hard flashcard{cardsHard !== 1 ? 's' : ''} — needs review</span>
                  </div>
                )}

                <div className="mt-3 space-y-1">
                  {weekTopics.map(t => {
                    const done = progress.topicsCompleted.includes(t.id);
                    return (
                      <div key={t.id} className="flex items-center gap-2">
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: done ? meta.color : '#2a1938', border: `1px solid ${done ? meta.color : '#4c315f'}`, flexShrink: 0 }} />
                        <span style={{ color: done ? '#cbd5e1' : '#475569', fontSize: 11 }}>{t.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flashcard heat map */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Flashcard Mastery by Week</div>
        <div className="space-y-3">
          {WEEKS.map(week => {
            const meta = WEEK_META[week];
            const weekCards = flashcards.filter(c => c.week === week);
            const mastered = weekCards.filter(c => progress.flashcardsMastered.includes(c.id)).length;
            const hard = weekCards.filter(c => progress.flashcardsHard.includes(c.id)).length;
            const unseen = weekCards.length - mastered - hard;
            return (
              <div key={week} className="flex items-center gap-3">
                <span style={{ color: meta.color, fontSize: 11, fontWeight: 700, minWidth: 60 }}>{meta.label}</span>
                <div className="flex-1 flex gap-0.5" style={{ height: 14 }}>
                  {weekCards.map((c) => {
                    const isMastered = progress.flashcardsMastered.includes(c.id);
                    const isHard = progress.flashcardsHard.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        title={c.front.slice(0, 50)}
                        style={{
                          flex: 1,
                          height: '100%',
                          background: isMastered ? meta.color : isHard ? '#ef4444' : '#2a1938',
                          borderRadius: 2,
                          opacity: isMastered ? 1 : isHard ? 0.8 : 0.4,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <span style={{ color: meta.color, fontSize: 10, fontWeight: 700 }}>✓{mastered}</span>
                  {hard > 0 && <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 700 }}>⚠{hard}</span>}
                  <span style={{ color: '#475569', fontSize: 10 }}>·{unseen}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <span style={{ color: '#64748b', fontSize: 10 }}>Legend:</span>
          <div className="flex items-center gap-1.5"><div style={{ width: 10, height: 10, background: '#c9a7eb', borderRadius: 2 }} /><span style={{ color: '#64748b', fontSize: 10 }}>Mastered</span></div>
          <div className="flex items-center gap-1.5"><div style={{ width: 10, height: 10, background: '#ef4444', borderRadius: 2 }} /><span style={{ color: '#64748b', fontSize: 10 }}>Hard</span></div>
          <div className="flex items-center gap-1.5"><div style={{ width: 10, height: 10, background: '#2a1938', borderRadius: 2, opacity: 0.4 }} /><span style={{ color: '#64748b', fontSize: 10 }}>Unseen</span></div>
        </div>
      </div>

      {/* Exam readiness radar (textual) */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          <TrendingUp size={12} style={{ display: 'inline', marginRight: 6 }} />
          Exam Readiness by Skill
        </div>
        <div className="space-y-3">
          {[
            { label: 'Ethical Theory Application', value: Math.min(100, (progress.flashcardsMastered.filter(id => id.includes('fc-00') || id.includes('fc-01')).length / 10) * 100), desc: 'Utilitarianism, deontology, virtue ethics — can you apply them to scenarios?' },
            { label: 'Legal Framework Knowledge', value: Math.min(100, (progress.flashcardsMastered.filter(id => ['fc-017','fc-018','fc-019','fc-020','fc-021','fc-030','fc-031','fc-032'].some(x => id.includes(x.replace('fc-0','fc-0')))).length / 8) * 100), desc: 'GDPR, CMA 1990, CDPA 1988, RIPA — statutes and their elements' },
            { label: 'Case Study Analysis', value: Math.min(100, (progress.caseStudiesReviewed.length / caseStudies.length) * 100), desc: 'Haugen, Cambridge Analytica, Infopaq, Aerotel, Horizon, Bybit, Sam' },
            { label: 'Sample Exam Technique', value: Math.min(100, (attemptedSampleQuestions / totalExamQuestions) * 100), desc: 'Command words, mark allocation, answer architecture' },
            { label: 'Quiz Performance', value: avgQuizScore, desc: 'Application of concepts under timed conditions' },
          ].map(skill => (
            <div key={skill.label}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 600 }}>{skill.label}</span>
                <span style={{ color: skill.value >= 80 ? '#c9a7eb' : skill.value >= 50 ? '#f59e0b' : '#ef4444', fontSize: 12, fontWeight: 700 }}>{Math.round(skill.value)}%</span>
              </div>
              <div style={{ height: 6, background: '#2a1938', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${skill.value}%`, height: '100%', background: skill.value >= 80 ? '#c9a7eb' : skill.value >= 50 ? '#f59e0b' : '#ef4444', borderRadius: 3, transition: 'width 0.5s ease' }} />
              </div>
              <p style={{ color: '#475569', fontSize: 10, marginTop: 2 }}>{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What to do next */}
      <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Recommended Next Actions</div>
        <div className="space-y-2">
          {progress.topicsCompleted.length < topics.length && (
            <div className="flex items-start gap-2">
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff6aa8', marginTop: 6, flexShrink: 0 }} />
              <p style={{ color: '#7dd3fc', fontSize: 12 }}>Complete {topics.length - progress.topicsCompleted.length} remaining topic{topics.length - progress.topicsCompleted.length !== 1 ? 's' : ''} in Topic Hubs — mark them done when reviewed</p>
            </div>
          )}
          {progress.flashcardsMastered.length < flashcardTarget && (
            <div className="flex items-start gap-2">
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff6aa8', marginTop: 6, flexShrink: 0 }} />
              <p style={{ color: '#7dd3fc', fontSize: 12 }}>Master at least {flashcardTarget}/{totalFlashcards} flashcards — you're at {progress.flashcardsMastered.length}. Aim for 75%+</p>
            </div>
          )}
          {avgQuizScore < 80 && (
            <div className="flex items-start gap-2">
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff6aa8', marginTop: 6, flexShrink: 0 }} />
              <p style={{ color: '#7dd3fc', fontSize: 12 }}>Bring quiz average above 80% — currently {avgQuizScore}%. Retry failed weeks in the Quiz Engine</p>
            </div>
          )}
          {progress.caseStudiesReviewed.length < caseStudies.length && (
            <div className="flex items-start gap-2">
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff6aa8', marginTop: 6, flexShrink: 0 }} />
              <p style={{ color: '#7dd3fc', fontSize: 12 }}>Review all {caseStudies.length} case studies — examiners expect real-world examples in distinction answers</p>
            </div>
          )}
          {attemptedSampleQuestions < totalExamQuestions && (
            <div className="flex items-start gap-2">
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff6aa8', marginTop: 6, flexShrink: 0 }} />
              <p style={{ color: '#7dd3fc', fontSize: 12 }}>Attempt all {totalExamQuestions} sample exam questions — read the model answers critically, then move to Mock Exams for full papers</p>
            </div>
          )}
          {progress.topicsCompleted.length === topics.length && avgQuizScore >= 80 && attemptedSampleQuestions >= totalExamQuestions && (
            <p style={{ color: '#c9a7eb', fontSize: 13, fontWeight: 700 }}>Excellent coverage achieved. Focus on timed practice and essay structure refinement.</p>
          )}
        </div>
      </div>
    </div>
  );
}
