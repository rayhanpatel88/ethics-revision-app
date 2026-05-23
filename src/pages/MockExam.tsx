import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckSquare, Eye, EyeOff, AlertTriangle, Trophy, RotateCcw } from 'lucide-react';
import { mockExams } from '../data/mockExams';
import type { MockExam as MockExamType, MockExamQuestion } from '../data/mockExams';

interface Props {
  onAttempt: (id: string) => void;
}

type Phase = 'select' | 'briefing' | 'exam' | 'review';

const DIFF_COLORS: Record<string, string> = {
  standard: '#c9a7eb',
  hard: '#f59e0b',
  nightmare: '#ef4444',
};

const DIFF_LABELS: Record<string, string> = {
  standard: 'Standard',
  hard: 'Hard',
  nightmare: 'Nightmare',
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function QuestionView({
  question,
  qIndex,
  total,
  onPrev,
  onNext,
  onAttempt,
  attempted,
}: {
  question: MockExamQuestion;
  qIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onAttempt: (id: string) => void;
  attempted: Set<string>;
}) {
  const [showPrompts, setShowPrompts] = useState(false);
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const isAttempted = attempted.has(question.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span style={{ background: question.section === 'A' ? 'rgba(255,106,168,0.15)' : 'rgba(139,92,246,0.15)', color: question.section === 'A' ? '#38bdf8' : '#c4b5fd', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, border: `1px solid ${question.section === 'A' ? 'rgba(255,106,168,0.4)' : 'rgba(139,92,246,0.4)'}` }}>
            Section {question.section}
          </span>
          <span style={{ background: '#2a1938', color: '#94a3b8', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
            Q{question.questionNumber}
          </span>
          <span style={{ background: 'rgba(201,167,235,0.1)', color: '#d8b4fe', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
            {question.marks} marks
          </span>
          <span style={{ color: '#64748b', fontSize: 11 }}>~{question.timeMinutes} min</span>
        </div>
        <div className="flex items-center gap-1" style={{ color: '#64748b', fontSize: 11 }}>
          <span style={{ color: '#f59e0b', fontWeight: 700 }}>{question.commandWord}</span>
          &nbsp;·&nbsp;{question.topic}
        </div>
      </div>

      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14, padding: 20 }}>
        <p style={{ color: '#f1f5f9', fontSize: 15, lineHeight: 1.7, fontWeight: 500 }}>{question.question}</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setShowPrompts(p => !p)}
          style={{ background: showPrompts ? 'rgba(245,158,11,0.15)' : '#14091f', border: `1px solid ${showPrompts ? 'rgba(245,158,11,0.4)' : '#2a1938'}`, color: showPrompts ? '#fcd34d' : '#94a3b8', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}
          className="flex items-center gap-1.5"
        >
          {showPrompts ? <EyeOff size={12} /> : <Eye size={12} />}
          Planning Prompts
        </button>
        <button
          onClick={() => { setShowMarkScheme(m => !m); if (!isAttempted) onAttempt(question.id); }}
          style={{ background: showMarkScheme ? 'rgba(201,167,235,0.15)' : '#14091f', border: `1px solid ${showMarkScheme ? 'rgba(201,167,235,0.4)' : '#2a1938'}`, color: showMarkScheme ? '#d8b4fe' : '#94a3b8', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}
          className="flex items-center gap-1.5"
        >
          {showMarkScheme ? <EyeOff size={12} /> : <Eye size={12} />}
          Reveal Mark Scheme
        </button>
        {!isAttempted && (
          <button
            onClick={() => onAttempt(question.id)}
            style={{ background: 'rgba(255,106,168,0.1)', border: '1px solid rgba(255,106,168,0.3)', color: '#38bdf8', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}
            className="flex items-center gap-1.5"
          >
            <CheckSquare size={12} /> Mark Attempted
          </button>
        )}
        {isAttempted && (
          <span style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 700, padding: '6px 12px' }}>✓ Attempted</span>
        )}
      </div>

      {showPrompts && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: 16 }}>
          <div style={{ color: '#fcd34d', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Planning Prompts</div>
          <div className="space-y-1.5">
            {question.planningPrompts.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: '#f59e0b', fontSize: 11, marginTop: 2, flexShrink: 0 }}>→</span>
                <p style={{ color: '#fde68a', fontSize: 12, lineHeight: 1.5 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showMarkScheme && (
        <div className="space-y-3">
          <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 12, padding: 16 }}>
            <div style={{ color: '#d8b4fe', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Mark Scheme</div>
            <div className="space-y-1.5">
              {question.markScheme.map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: '#c9a7eb', fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                  <p style={{ color: '#a7f3d0', fontSize: 12, lineHeight: 1.5 }}>{m}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12, padding: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Model Answer Outline</div>
            <div className="space-y-1">
              {question.modelAnswerOutline.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: '#475569', fontSize: 11, marginTop: 2, flexShrink: 0 }}>{i + 1}.</span>
                  <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#fca5a5', fontSize: 10, fontWeight: 700, marginBottom: 6 }}>WEAK ANSWER WOULD SAY</div>
              <p style={{ color: '#fda4af', fontSize: 11, lineHeight: 1.5 }}>{question.weakAnswerWouldSay}</p>
            </div>
            <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#d8b4fe', fontSize: 10, fontWeight: 700, marginBottom: 6 }}>STRONG ANSWER ADDS</div>
              <p style={{ color: '#a7f3d0', fontSize: 11, lineHeight: 1.5 }}>{question.strongAnswerWouldAdd}</p>
            </div>
            <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#fcd34d', fontSize: 10, fontWeight: 700, marginBottom: 6 }}>90%+ TARGET</div>
              <p style={{ color: '#fde68a', fontSize: 11, lineHeight: 1.5 }}>{question.ninetyPlusTarget}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onPrev}
          disabled={qIndex === 0}
          style={{ background: '#14091f', border: '1px solid #2a1938', color: qIndex === 0 ? '#4c315f' : '#94a3b8', borderRadius: 8, padding: '8px 16px', fontSize: 13 }}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <span style={{ color: '#475569', fontSize: 12 }}>Question {qIndex + 1} of {total}</span>
        <button
          onClick={onNext}
          disabled={qIndex === total - 1}
          style={{ background: '#14091f', border: '1px solid #2a1938', color: qIndex === total - 1 ? '#4c315f' : '#94a3b8', borderRadius: 8, padding: '8px 16px', fontSize: 13 }}
          className="flex items-center gap-2"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function MockExam({ onAttempt }: Props) {
  const [phase, setPhase] = useState<Phase>('select');
  const [selectedExam, setSelectedExam] = useState<MockExamType | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [attempted, setAttempted] = useState<Set<string>>(new Set());
  const [section, setSection] = useState<'A' | 'B' | 'all'>('all');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timeLeft]);

  const startExam = (exam: MockExamType) => {
    setSelectedExam(exam);
    setTimeLeft(exam.totalMinutes * 60);
    setCurrentQ(0);
    setAttempted(new Set());
    setSection('all');
    setPhase('briefing');
  };

  const beginTimed = () => {
    setTimerActive(true);
    setPhase('exam');
  };

  const markAttempted = (id: string) => {
    setAttempted(prev => { const n = new Set(prev); n.add(id); onAttempt(id); return n; });
  };

  const filteredQs = selectedExam
    ? section === 'all' ? selectedExam.questions : selectedExam.questions.filter(q => q.section === section)
    : [];

  const isLowTime = timeLeft < 600;
  const isVeryLowTime = timeLeft < 180;

  if (phase === 'select') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div>
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Mock Exam Simulator</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{mockExams.length} mock papers — standard, hard, nightmare, source coverage, scenario synthesis, and command-word mastery. Full timer, mark scheme, and model answers.</p>
        </div>

        <div className="space-y-4">
          {mockExams.map(exam => {
            const color = DIFF_COLORS[exam.difficulty];
            const secA = exam.questions.filter(q => q.section === 'A').length;
            const secB = exam.questions.filter(q => q.section === 'B').length;
            return (
              <div key={exam.id} style={{ background: '#14091f', border: `1px solid ${color}30`, borderRadius: 16 }} className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ background: `${color}20`, color, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {DIFF_LABELS[exam.difficulty]}
                      </span>
                      <span style={{ color: '#475569', fontSize: 11 }}>{exam.totalMinutes} min · {exam.totalMarks} marks</span>
                    </div>
                    <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>{exam.title}</h2>
                    <p style={{ color: '#64748b', fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{exam.description}</p>
                  </div>
                  <button
                    onClick={() => startExam(exam)}
                    style={{ background: `${color}15`, border: `1px solid ${color}40`, color, borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, flexShrink: 0 }}
                  >
                    Start Paper
                  </button>
                </div>
                <div className="flex gap-4 mt-3 flex-wrap">
                  <span style={{ color: '#38bdf8', fontSize: 11 }}>Section A: {secA} questions</span>
                  <span style={{ color: '#c4b5fd', fontSize: 11 }}>Section B: {secB} questions</span>
                  <span style={{ color: '#d8b4fe', fontSize: 11 }}>Total: {exam.questions.length} questions</span>
                </div>
                <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 8, padding: '8px 12px', marginTop: 12 }}>
                  <span style={{ color, fontSize: 11, fontWeight: 600 }}>Exam Tip: </span>
                  <span style={{ color: '#94a3b8', fontSize: 11 }}>{exam.examTip}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (phase === 'briefing' && selectedExam) {
    const color = DIFF_COLORS[selectedExam.difficulty];
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        <div style={{ background: '#14091f', border: `1px solid ${color}30`, borderRadius: 16, padding: 24 }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ background: `${color}20`, color, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>
              {DIFF_LABELS[selectedExam.difficulty].toUpperCase()}
            </span>
            <h1 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18 }}>{selectedExam.title}</h1>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color, fontSize: 22, fontWeight: 800 }}>{selectedExam.totalMinutes}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>minutes</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>{selectedExam.totalMarks}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>total marks</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>{selectedExam.questions.length}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>questions</div>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div style={{ background: 'rgba(255,106,168,0.08)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SECTION A INSTRUCTIONS</div>
              <p style={{ color: '#7dd3fc', fontSize: 12, lineHeight: 1.5 }}>{selectedExam.sectionAInstructions}</p>
            </div>
            <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10, padding: 12 }}>
              <div style={{ color: '#c4b5fd', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SECTION B INSTRUCTIONS</div>
              <p style={{ color: '#ddd6fe', fontSize: 12, lineHeight: 1.5 }}>{selectedExam.sectionBInstructions}</p>
            </div>
          </div>

          <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 10, padding: 12, marginBottom: 20 }}>
            <AlertTriangle size={12} style={{ color, display: 'inline', marginRight: 6 }} />
            <span style={{ color: '#94a3b8', fontSize: 12 }}>{selectedExam.examTip}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={beginTimed}
              style={{ flex: 1, background: `${color}15`, border: `1px solid ${color}40`, color, borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 700 }}
              className="flex items-center justify-center gap-2"
            >
              <Clock size={16} /> Start Timed Exam
            </button>
            <button
              onClick={() => { setPhase('exam'); setTimerActive(false); }}
              style={{ background: '#2a1938', border: '1px solid #4c315f', color: '#94a3b8', borderRadius: 12, padding: '12px 16px', fontSize: 13 }}
            >
              No Timer
            </button>
            <button
              onClick={() => setPhase('select')}
              style={{ background: '#14091f', border: '1px solid #2a1938', color: '#64748b', borderRadius: 12, padding: '12px 16px', fontSize: 13 }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'exam' && selectedExam) {
    const current = filteredQs[currentQ];
    return (
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {/* Timer bar */}
        <div style={{ background: '#14091f', border: `1px solid ${isVeryLowTime ? 'rgba(239,68,68,0.5)' : isLowTime ? 'rgba(245,158,11,0.3)' : '#2a1938'}`, borderRadius: 12, padding: '10px 16px' }} className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Clock size={14} style={{ color: isVeryLowTime ? '#ef4444' : isLowTime ? '#f59e0b' : '#64748b' }} />
            <span style={{ color: isVeryLowTime ? '#ef4444' : isLowTime ? '#fcd34d' : '#f1f5f9', fontSize: 18, fontWeight: 800, fontFamily: 'monospace' }}>
              {timerActive ? formatTime(timeLeft) : 'No Timer'}
            </span>
            {isVeryLowTime && timerActive && (
              <span style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, animation: 'pulse 1s infinite' }}>TIME RUNNING OUT</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ color: '#475569', fontSize: 11 }}>{selectedExam.title}</span>
            <div className="flex gap-1">
              {(['all', 'A', 'B'] as const).map(s => (
                <button key={s} onClick={() => { setSection(s); setCurrentQ(0); }} style={{ background: section === s ? 'rgba(201,167,235,0.15)' : '#2a1938', border: `1px solid ${section === s ? 'rgba(201,167,235,0.4)' : '#4c315f'}`, color: section === s ? '#c9a7eb' : '#64748b', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 700 }}>
                  {s === 'all' ? 'All' : `Sec ${s}`}
                </button>
              ))}
            </div>
            <button onClick={() => setPhase('review')} style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.3)', color: '#c9a7eb', borderRadius: 8, padding: '4px 10px', fontSize: 11 }} className="flex items-center gap-1">
              <Trophy size={11} /> End Exam
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <div style={{ flex: 1, background: '#2a1938', borderRadius: 6, height: 4 }}>
            <div style={{ width: `${(attempted.size / selectedExam.questions.length) * 100}%`, height: '100%', background: '#c9a7eb', borderRadius: 6, transition: 'width 0.3s' }} />
          </div>
          <span style={{ color: '#475569', fontSize: 11, flexShrink: 0 }}>{attempted.size}/{selectedExam.questions.length} attempted</span>
        </div>

        {/* Question nav dots */}
        <div className="flex gap-1 flex-wrap">
          {filteredQs.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              style={{
                width: 24, height: 24, borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: i === currentQ ? '#c9a7eb' : attempted.has(q.id) ? 'rgba(201,167,235,0.2)' : '#2a1938',
                color: i === currentQ ? '#fff' : attempted.has(q.id) ? '#c9a7eb' : '#475569',
                border: `1px solid ${i === currentQ ? '#c9a7eb' : attempted.has(q.id) ? 'rgba(201,167,235,0.4)' : '#4c315f'}`,
              }}
            >
              {q.questionNumber}
            </button>
          ))}
        </div>

        {current && (
          <QuestionView
            question={current}
            qIndex={currentQ}
            total={filteredQs.length}
            onPrev={() => setCurrentQ(i => Math.max(0, i - 1))}
            onNext={() => setCurrentQ(i => Math.min(filteredQs.length - 1, i + 1))}
            onAttempt={markAttempted}
            attempted={attempted}
          />
        )}
      </div>
    );
  }

  if (phase === 'review' && selectedExam) {
    const secAQs = selectedExam.questions.filter(q => q.section === 'A');
    const secBQs = selectedExam.questions.filter(q => q.section === 'B');
    const totalAttempted = attempted.size;
    const totalQs = selectedExam.questions.length;
    const color = DIFF_COLORS[selectedExam.difficulty];
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div style={{ background: '#14091f', border: `1px solid ${color}30`, borderRadius: 16, padding: 24 }}>
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={20} style={{ color }} />
            <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20 }}>Exam Complete</h2>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>{selectedExam.title}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color, fontSize: 24, fontWeight: 800 }}>{totalAttempted}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>attempted</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>{totalQs - totalAttempted}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>skipped</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#c9a7eb', fontSize: 24, fontWeight: 800 }}>{secAQs.filter(q => attempted.has(q.id)).length}/{secAQs.length}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Section A</div>
            </div>
            <div style={{ background: '#2a1938', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ color: '#8b5cf6', fontSize: 24, fontWeight: 800 }}>{secBQs.filter(q => attempted.has(q.id)).length}/{secBQs.length}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Section B</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Review All Questions</div>
          {selectedExam.questions.map((q, i) => (
            <div key={q.id} style={{ background: '#14091f', border: `1px solid ${attempted.has(q.id) ? 'rgba(201,167,235,0.2)' : '#2a1938'}`, borderRadius: 10, padding: '10px 14px' }} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span style={{ color: attempted.has(q.id) ? '#c9a7eb' : '#475569', fontSize: 12 }}>{attempted.has(q.id) ? '✓' : '○'}</span>
                <span style={{ color: '#64748b', fontSize: 11 }}>Q{q.questionNumber}</span>
                <span style={{ color: '#cbd5e1', fontSize: 12 }}>{q.topic}</span>
                <span style={{ color: '#64748b', fontSize: 11 }}>({q.marks}m)</span>
              </div>
              <button onClick={() => { setCurrentQ(i); setSection('all'); setPhase('exam'); }} style={{ color: '#ff6aa8', fontSize: 11 }}>
                Review →
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => startExam(selectedExam)} style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.3)', color: '#c9a7eb', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700 }} className="flex items-center gap-2">
            <RotateCcw size={14} /> Restart Exam
          </button>
          <button onClick={() => setPhase('select')} style={{ background: '#14091f', border: '1px solid #2a1938', color: '#94a3b8', borderRadius: 10, padding: '10px 18px', fontSize: 13 }}>
            Choose Different Paper
          </button>
        </div>
      </div>
    );
  }

  return null;
}
