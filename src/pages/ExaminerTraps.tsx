import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { examinerTraps } from '../data/examinerTraps';
import type { ExaminerTrap } from '../data/examinerTraps';

const WEEK_FILTER_OPTIONS = ['All Weeks', 'Week 1', 'Week 2', 'Week 3', 'Week 5', 'Week 6', 'Week 9', 'Cross-Cutting'];

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f59e0b',
  medium: '#ff6aa8',
};

const SEVERITY_LABELS: Record<string, string> = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
};

function TrapCard({ trap }: { trap: ExaminerTrap }) {
  const [expanded, setExpanded] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const severityColor = SEVERITY_COLORS[trap.severity];

  return (
    <div style={{ background: '#14091f', border: `1px solid ${severityColor}25`, borderRadius: 14, overflow: 'hidden' }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{ width: '100%', padding: '14px 16px', textAlign: 'left' }}
        className="flex items-start justify-between gap-3"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span style={{ background: `${severityColor}15`, color: severityColor, fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20, letterSpacing: '0.08em' }}>
              {SEVERITY_LABELS[trap.severity]}
            </span>
            <span style={{ background: `${trap.weekColor}15`, color: trap.weekColor, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
              {trap.week}
            </span>
            <span style={{ color: '#64748b', fontSize: 11 }}>{trap.topic}</span>
          </div>
          <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700 }}>{trap.trapTitle}</div>
          {!expanded && (
            <p style={{ color: '#64748b', fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
              {trap.weakStudentPattern.slice(0, 100)}...
            </p>
          )}
        </div>
        <div style={{ color: '#475569', flexShrink: 0, marginTop: 2 }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid #2a1938', padding: 16 }} className="space-y-4">
          {/* Weak pattern */}
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#fca5a5', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              What Weak Students Do
            </div>
            <p style={{ color: '#fda4af', fontSize: 12, lineHeight: 1.6 }}>{trap.weakStudentPattern}</p>
          </div>

          {/* Generic phrases */}
          <div>
            <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Phrases That Lose Marks
            </div>
            <div className="space-y-1">
              {trap.genericPhrasesUsed.map((phrase, i) => (
                <div key={i} style={{ background: '#1a0808', borderRadius: 8, padding: '7px 10px' }}>
                  <p style={{ color: '#fca5a5', fontSize: 12, fontStyle: 'italic' }}>{phrase}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What examiners want */}
          <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#d8b4fe', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              What Examiners REALLY Want
            </div>
            <p style={{ color: '#a7f3d0', fontSize: 12, lineHeight: 1.6 }}>{trap.whatExaminersWantInstead}</p>
          </div>

          {/* Differentiating phrases */}
          <div>
            <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Phrases That Score Highly
            </div>
            <div className="space-y-1.5">
              {trap.differentiatingPhrases.map((phrase, i) => (
                <div key={i} style={{ background: 'rgba(201,167,235,0.05)', border: '1px solid rgba(201,167,235,0.15)', borderRadius: 8, padding: '8px 10px' }}>
                  <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.5 }}>{phrase}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secret criteria */}
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#fcd34d', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Examiner's Secret Criteria
            </div>
            <p style={{ color: '#fde68a', fontSize: 12, lineHeight: 1.6 }}>{trap.examinersSecretCriteria}</p>
          </div>

          {/* Common mistakes */}
          <div>
            <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Top Mistakes to Avoid
            </div>
            <div className="space-y-1">
              {trap.commonMistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: '#ef4444', fontSize: 13, marginTop: -1, flexShrink: 0 }}>✗</span>
                  <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{m}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weak vs strong comparison */}
          <div>
            <button
              onClick={() => setShowComparison(s => !s)}
              style={{ background: 'rgba(255,106,168,0.1)', border: '1px solid rgba(255,106,168,0.3)', color: '#38bdf8', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}
              className="flex items-center gap-1.5"
            >
              <Eye size={12} />
              {showComparison ? 'Hide' : 'Show'} Weak vs Strong Answer Examples
            </button>

            {showComparison && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: 12 }}>
                  <div style={{ color: '#fca5a5', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', marginBottom: 8 }}>WEAK ANSWER (2:2 level)</div>
                  <p style={{ color: '#fda4af', fontSize: 12, lineHeight: 1.6 }}>{trap.weakAnswerExample}</p>
                </div>
                <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 10, padding: 12 }}>
                  <div style={{ color: '#d8b4fe', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', marginBottom: 8 }}>STRONG ANSWER (First/Distinction level)</div>
                  <p style={{ color: '#a7f3d0', fontSize: 12, lineHeight: 1.6 }}>{trap.strongAnswerExample}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExaminerTraps() {
  const [weekFilter, setWeekFilter] = useState('All Weeks');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [expandAll, setExpandAll] = useState(false);

  const filtered = examinerTraps.filter(t => {
    if (weekFilter !== 'All Weeks' && t.week !== weekFilter) return false;
    if (severityFilter !== 'all' && t.severity !== severityFilter) return false;
    return true;
  });

  const criticalCount = examinerTraps.filter(t => t.severity === 'critical').length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={18} style={{ color: '#ef4444' }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Examiner Trap Detector</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>
          {criticalCount} critical traps identified. These are the patterns that separate 2:2 from First Class answers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {(['critical', 'high', 'medium'] as const).map(sev => {
          const count = examinerTraps.filter(t => t.severity === sev).length;
          const color = SEVERITY_COLORS[sev];
          return (
            <button
              key={sev}
              onClick={() => setSeverityFilter(severityFilter === sev ? 'all' : sev)}
              style={{
                background: severityFilter === sev ? `${color}15` : '#14091f',
                border: `1px solid ${severityFilter === sev ? `${color}40` : '#2a1938'}`,
                borderRadius: 12, padding: 12, textAlign: 'center', cursor: 'pointer',
              }}
            >
              <div style={{ color, fontSize: 28, fontWeight: 800 }}>{count}</div>
              <div style={{ color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{sev}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12, padding: 16 }} className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 flex-wrap">
          {WEEK_FILTER_OPTIONS.map(w => (
            <button
              key={w}
              onClick={() => setWeekFilter(w)}
              style={{
                background: weekFilter === w ? 'rgba(201,167,235,0.15)' : '#2a1938',
                border: `1px solid ${weekFilter === w ? 'rgba(201,167,235,0.4)' : '#4c315f'}`,
                color: weekFilter === w ? '#c9a7eb' : '#64748b',
                borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: weekFilter === w ? 700 : 400,
              }}
            >
              {w === 'All Weeks' ? 'All' : w}
            </button>
          ))}
        </div>
        <button
          onClick={() => setExpandAll(e => !e)}
          style={{ marginLeft: 'auto', color: '#ff6aa8', fontSize: 12, fontWeight: 600 }}
        >
          {expandAll ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Results count */}
      <div style={{ color: '#64748b', fontSize: 12 }}>
        Showing {filtered.length} of {examinerTraps.length} traps
      </div>

      {/* Trap cards */}
      <div className="space-y-3">
        {filtered.map(trap => (
          <TrapCard key={trap.id} trap={trap} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <p style={{ color: '#475569', fontSize: 13 }}>No traps match your current filters.</p>
          <button onClick={() => { setWeekFilter('All Weeks'); setSeverityFilter('all'); }} style={{ color: '#ff6aa8', fontSize: 12, marginTop: 8 }}>
            Clear filters
          </button>
        </div>
      )}

      {/* Quick reference */}
      <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 14, padding: 16 }}>
        <div style={{ color: '#38bdf8', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Quick Reference — The 5 Universal Exam Traps</div>
        <div className="space-y-2">
          {[
            { n: '1', t: 'Describe instead of analyse', d: 'Any command word beyond "identify" requires you to argue, not describe.' },
            { n: '2', t: 'Framework dropping', d: 'Naming a theory or law without applying it to the specific scenario earns no marks.' },
            { n: '3', t: 'No conclusion', d: '"It depends" is not a conclusion. Examiners want a reasoned, supported position.' },
            { n: '4', t: 'Missing the second dimension', d: 'Every issue has at least two legal/ethical angles. Single-lens answers score 2:2.' },
            { n: '5', t: 'Ignoring conflicting duties', d: 'The exam is designed around conflicts. Failing to identify and resolve them is a signal failure.' },
          ].map(item => (
            <div key={item.n} className="flex items-start gap-3">
              <span style={{ background: 'rgba(255,106,168,0.2)', color: '#38bdf8', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{item.n}</span>
              <div>
                <span style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 700 }}>{item.t}: </span>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{item.d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
