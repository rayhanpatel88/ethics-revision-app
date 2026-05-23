import { Calendar, Clock, Zap, BookOpen, FileText, CheckCircle } from 'lucide-react';
import { finalRevisionPlan, examStrategyItems } from '../data/revisionPlan';

const TYPE_ICONS: Record<string, React.ComponentType<{size?: number; style?: React.CSSProperties}>> = {
  flashcard: Zap, quiz: Zap, essay: FileText, scenario: Zap, read: BookOpen, plan: FileText,
};

const TYPE_COLORS: Record<string, string> = {
  flashcard: '#c9a7eb', quiz: '#f59e0b', essay: '#8b5cf6', scenario: '#ff6aa8', read: '#64748b', plan: '#3b82f6',
};


export default function RevisionPlanner() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Calendar size={18} style={{ color: '#ff6aa8' }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Final 48-Hour Revision Planner</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Structured plan for the day before and morning of your exam — built around highest-yield content</p>
      </div>

      {/* Priority topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={{ background: '#14091f', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 14 }} className="p-4">
          <div style={{ color: '#fca5a5', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            🔥 Critical Priority — Know These Cold
          </div>
          <div className="space-y-1.5">
            {finalRevisionPlan.priorityTopics.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                <span style={{ color: '#fca5a5', fontSize: 12 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#14091f', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14 }} className="p-4">
          <div style={{ color: '#fcd34d', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            ⚡ High Yield — Strong Exam Performance
          </div>
          <div className="space-y-1.5">
            {finalRevisionPlan.highYieldTopics.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                <span style={{ color: '#fcd34d', fontSize: 12 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day before */}
      <div>
        <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={16} style={{ color: '#ff6aa8' }} /> Day Before Exam
        </div>
        <div className="space-y-2">
          {finalRevisionPlan.dayBefore.map(task => {
            const Icon = TYPE_ICONS[task.type] || BookOpen;
            const typeColor = TYPE_COLORS[task.type];
            return (
              <div key={task.id} style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 10 }} className="p-3 flex items-center gap-3">
                <span style={{ color: '#475569', fontSize: 12, fontWeight: 600, minWidth: 44, flexShrink: 0 }}>{task.time}</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${typeColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={13} style={{ color: typeColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.4 }}>{task.task}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {task.duration > 0 && (
                    <span style={{ color: '#475569', fontSize: 11 }}>{task.duration}m</span>
                  )}
                  {task.priority === 'critical' && (
                    <span style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }} className="px-1.5 py-0.5 rounded">CRITICAL</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Morning of exam */}
      <div>
        <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={16} style={{ color: '#c9a7eb' }} /> Morning of Exam
        </div>
        <div className="space-y-2">
          {finalRevisionPlan.morningOf.map(task => {
            const Icon = TYPE_ICONS[task.type] || BookOpen;
            const typeColor = TYPE_COLORS[task.type];
            return (
              <div key={task.id} style={{ background: 'rgba(201,167,235,0.04)', border: '1px solid rgba(201,167,235,0.15)', borderRadius: 10 }} className="p-3 flex items-center gap-3">
                <span style={{ color: '#475569', fontSize: 12, fontWeight: 600, minWidth: 44, flexShrink: 0 }}>{task.time}</span>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${typeColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={13} style={{ color: typeColor }} />
                </div>
                <div className="flex-1">
                  <span style={{ color: '#e2e8f0', fontSize: 12, lineHeight: 1.4 }}>{task.task}</span>
                </div>
                {task.duration > 0 && <span style={{ color: '#475569', fontSize: 11, flexShrink: 0 }}>{task.duration}m</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Time guidance */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>In-Exam Time Management</div>
        <div className="space-y-2">
          {examStrategyItems.markAllocationGuide.map(row => (
            <div key={row.marks} className="flex gap-3 items-start">
              <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 8, flexShrink: 0, minWidth: 40, textAlign: 'center' }}>
                {row.marks}M
              </span>
              <div>
                <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{row.depth}</p>
                <p style={{ color: '#475569', fontSize: 11 }}>{row.timeGuide}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final tip */}
      <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 14 }} className="p-5 text-center">
        <CheckCircle size={32} style={{ color: '#c9a7eb', margin: '0 auto 8px' }} />
        <h3 style={{ color: '#c9a7eb', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>You are prepared.</h3>
        <p style={{ color: '#d8b4fe', fontSize: 13, lineHeight: 1.6 }}>
          The examiner is not looking for a statute recitation. They want to see whether you can synthesise ethical theory, legal framework, and real-world application into a coherent professional judgement. That is what this whole app has been training you to do.
        </p>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 8 }}>
          "The most dangerous technologist is not the most skilled hacker — it is the competent professional who has never been taught to question the ethics of their work." — Module Philosophy
        </p>
      </div>
    </div>
  );
}
