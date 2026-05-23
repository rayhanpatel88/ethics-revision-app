import { useState } from 'react';
import { Clock, Target, CheckCircle, AlertTriangle, ChevronRight, FileText, Star } from 'lucide-react';
import { examQuestions } from '../data/examQuestions';
import type { UserProgress } from '../data/types';

interface Props {
  progress: UserProgress;
  onAttempt: (id: string) => void;
}

const WEEK_COLORS: Record<string, string> = {
  week1: '#c9a7eb', week2: '#3b82f6', week3: '#f59e0b',
  week5: '#8b5cf6', week6: '#ef4444', week9: '#ff6aa8',
};

export default function ExamPractice({ progress, onAttempt }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showModel, setShowModel] = useState(false);

  const q = examQuestions.find(e => e.id === selected);

  if (selected && q) {
    const attempted = progress.examQuestionsAttempted.includes(q.id);
    const color = WEEK_COLORS[q.week];

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => { setSelected(null); setShowModel(false); }} style={{ color: '#64748b', fontSize: 13 }}>← Back</button>
          <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
            {q.week.replace('week', 'Week ')}
          </span>
          <span style={{ background: '#2a1938', color: '#94a3b8', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full uppercase">
            {q.commandWord}
          </span>
        </div>

        {/* Question header */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5" style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 8, padding: '6px 10px' }}>
              <Target size={12} style={{ color: '#c9a7eb' }} />
              <span style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 700 }}>{q.marks} marks</span>
            </div>
            <div className="flex items-center gap-1.5" style={{ background: 'rgba(255,106,168,0.1)', border: '1px solid rgba(255,106,168,0.25)', borderRadius: 8, padding: '6px 10px' }}>
              <Clock size={12} style={{ color: '#ff6aa8' }} />
              <span style={{ color: '#ff6aa8', fontSize: 12, fontWeight: 700 }}>{q.timeMinutes} min recommended</span>
            </div>
            {attempted && (
              <span className="flex items-center gap-1" style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 700 }}>
                <CheckCircle size={12} /> Attempted
              </span>
            )}
          </div>
          <p style={{ color: '#f1f5f9', fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>{q.question}</p>
        </div>

        {/* Planning prompts */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Planning Prompts</div>
          <div className="space-y-1.5">
            {q.planningPrompts.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight size={12} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: 2 }} />
                <p style={{ color: '#c4b5fd', fontSize: 13, lineHeight: 1.5 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key points */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Key Points Required</div>
          <ul className="space-y-1.5">
            {q.keyPoints.map((kp, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={11} style={{ color: '#c9a7eb', flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{kp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common mistakes */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Common Mistakes</div>
          {q.commonMistakes.map((m, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <AlertTriangle size={11} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
              <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{m}</p>
            </div>
          ))}
        </div>

        {/* High mark extras */}
        <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 12 }} className="p-4">
          <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>High-Mark Extras (90%+)</div>
          <ul className="space-y-1.5">
            {q.highMarkExtras.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <Star size={11} style={{ color: '#ff6aa8', flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: '#7dd3fc', fontSize: 12, lineHeight: 1.5 }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Model answer */}
        <button
          onClick={() => { setShowModel(m => !m); if (!showModel) onAttempt(q.id); }}
          style={{ background: showModel ? 'rgba(201,167,235,0.1)' : '#14091f', border: `1px solid ${showModel ? 'rgba(201,167,235,0.4)' : '#2a1938'}`, color: showModel ? '#c9a7eb' : '#94a3b8', borderRadius: 12, padding: '12px 20px', fontSize: 13, fontWeight: 700, width: '100%' }}
          className="flex items-center justify-center gap-2"
        >
          <FileText size={14} /> {showModel ? 'Hide Model Answer' : 'Reveal Model Answer'}
        </button>

        {showModel && (
          <div style={{ background: '#14091f', border: '1px solid rgba(201,167,235,0.3)', borderRadius: 12 }} className="p-5 space-y-3">
            <div style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Model Answer Outline</div>
            {q.modelAnswerOutline.map((point, i) => (
              <div key={i} style={{ borderLeft: '3px solid #c9a7eb', paddingLeft: 12 }}>
                <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>{point}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <div>
        <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Sample Exam Practice</h1>
        <p style={{ color: '#64748b', fontSize: 13 }}>Based on the actual sample exam paper — exact question style and mark allocations</p>
      </div>

      <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 12 }} className="p-4">
        <div style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>About the Sample Exam</div>
        <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.6 }}>
          The actual exam is 100 marks. These questions are drawn directly from the sample paper style. Questions range from 4–10 marks with mix of Outline, Explain, Identify, Describe, and scenario-based formats. Use the planning prompts and mark schemes to structure your answers.
        </p>
      </div>

      <div className="space-y-3">
        {examQuestions.map((eq, index) => {
          const attempted = progress.examQuestionsAttempted.includes(eq.id);
          const color = WEEK_COLORS[eq.week];
          return (
            <button
              key={eq.id}
              onClick={() => { setSelected(eq.id); setShowModel(false); }}
              style={{ background: '#14091f', border: `1px solid ${attempted ? 'rgba(201,167,235,0.3)' : '#2a1938'}`, borderRadius: 12, padding: '14px 16px', textAlign: 'left', width: '100%' }}
              className="hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div style={{ background: '#2a1938', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#64748b', fontSize: 12, fontWeight: 700 }}>Q{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-1.5 py-0.5 rounded">
                      {eq.week.replace('week', 'Wk ')}
                    </span>
                    <span style={{ background: '#2a1938', color: '#64748b', fontSize: 10, fontWeight: 700 }} className="px-1.5 py-0.5 rounded uppercase">
                      {eq.commandWord}
                    </span>
                    <span style={{ background: 'rgba(201,167,235,0.1)', color: '#c9a7eb', fontSize: 10, fontWeight: 700 }} className="px-1.5 py-0.5 rounded">
                      {eq.marks}M
                    </span>
                    <span style={{ background: 'rgba(255,106,168,0.1)', color: '#ff6aa8', fontSize: 10, fontWeight: 700 }} className="px-1.5 py-0.5 rounded">
                      ~{eq.timeMinutes}min
                    </span>
                    {attempted && <CheckCircle size={11} style={{ color: '#c9a7eb' }} />}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>{eq.question}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
