import { useState } from 'react';
import { CheckCircle, AlertTriangle, Users, Scale, BookOpen, Target } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import type { UserProgress } from '../data/types';

interface Props {
  progress: UserProgress;
  onReview: (id: string) => void;
}

const WEEK_COLORS: Record<string, string> = {
  week1: '#c9a7eb', week2: '#3b82f6', week3: '#f59e0b',
  week5: '#8b5cf6', week6: '#ef4444', week9: '#ff6aa8',
};

const TABS = ['overview', 'analysis', 'examangle', 'weakvstrong'] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  overview: 'Overview', analysis: 'Full Analysis',
  examangle: '90%+ Angle', weakvstrong: 'Weak vs Strong',
};

export default function CaseStudies({ progress, onReview }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('overview');

  const cs = caseStudies.find(c => c.id === selected);

  if (selected && cs) {
    const reviewed = progress.caseStudiesReviewed.includes(cs.id);
    const color = WEEK_COLORS[cs.week];
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelected(null)} style={{ color: '#64748b', fontSize: 13 }}>← Back</button>
          <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
            {cs.week.replace('week', 'Week ')}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{cs.title}</h1>
          <button onClick={() => onReview(cs.id)} style={{ background: reviewed ? 'rgba(201,167,235,0.15)' : '#14091f', border: `1px solid ${reviewed ? 'rgba(201,167,235,0.4)' : '#2a1938'}`, color: reviewed ? '#c9a7eb' : '#64748b', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, flexShrink: 0 }} className="flex items-center gap-1.5">
            <CheckCircle size={14} /> {reviewed ? 'Reviewed' : 'Mark Reviewed'}
          </button>
        </div>

        <div style={{ borderBottom: '1px solid #2a1938' }} className="flex overflow-x-auto gap-0">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ borderBottom: tab === t ? '2px solid #c9a7eb' : '2px solid transparent', color: tab === t ? '#c9a7eb' : '#64748b', fontSize: 12, fontWeight: 600, padding: '8px 14px', flexShrink: 0 }}>
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-5 space-y-5">
          {tab === 'overview' && (
            <>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Context</div>
                <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>{cs.context}</p>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Scenario</div>
                <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>{cs.scenario}</p>
              </div>
              <div>
                <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Ethical Issues</div>
                <ul className="space-y-1.5">
                  {cs.ethicalIssues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle size={11} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {tab === 'analysis' && (
            <>
              <Section title="Stakeholders" icon={<Users size={13} />} color="#3b82f6" items={cs.stakeholders} />
              <Section title="Professional Obligations" icon={<BookOpen size={13} />} color="#c9a7eb" items={cs.professionalObligations} />
              <Section title="Relevant Laws & Frameworks" icon={<Scale size={13} />} color="#f59e0b" items={cs.relevantLaws} />
              <Section title="Risks" icon={<AlertTriangle size={13} />} color="#ef4444" items={cs.risks} />
              <div>
                <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Best Response</div>
                <div style={{ background: 'rgba(255,106,168,0.08)', border: '1px solid rgba(255,106,168,0.25)', borderRadius: 10, padding: '12px 14px' }}>
                  <p style={{ color: '#7dd3fc', fontSize: 13, lineHeight: 1.6 }}>{cs.bestResponse}</p>
                </div>
              </div>
            </>
          )}

          {tab === 'examangle' && (
            <>
              <div>
                <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>What Examiners Expect</div>
                <ul className="space-y-1.5">
                  {cs.examinerExpectations.map((e, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Target size={11} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: '#c4b5fd', fontSize: 12, lineHeight: 1.5 }}>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>90%+ Distinction Angle</div>
                <div className="space-y-2">
                  {cs.ninetyPlusAngle.map((a, i) => (
                    <div key={i} style={{ background: 'rgba(255,106,168,0.08)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 8, padding: '8px 12px' }}>
                      <p style={{ color: '#7dd3fc', fontSize: 12, lineHeight: 1.6 }}>{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === 'weakvstrong' && (
            <>
              <div>
                <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Weak Answer Mistakes</div>
                {cs.weakAnswerMistakes.map((m, i) => (
                  <div key={i} style={{ background: 'rgba(239,68,68,0.06)', borderRadius: 8, padding: '8px 10px', marginBottom: 6 }} className="flex items-start gap-2">
                    <AlertTriangle size={11} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{m}</p>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Possible Actions</div>
                {cs.possibleActions.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1.5">
                    <CheckCircle size={11} style={{ color: '#c9a7eb', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{a}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <div>
        <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Case Study Breakdown</h1>
        <p style={{ color: '#64748b', fontSize: 13 }}>{caseStudies.length} case studies · deep analysis · exam angles</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {caseStudies.map(cs => {
          const reviewed = progress.caseStudiesReviewed.includes(cs.id);
          const color = WEEK_COLORS[cs.week];
          return (
            <button key={cs.id} onClick={() => { setSelected(cs.id); setTab('overview'); }} style={{ background: '#14091f', border: `1px solid ${reviewed ? 'rgba(201,167,235,0.3)' : '#2a1938'}`, borderRadius: 12, padding: '16px', textAlign: 'left' }} className="hover:border-slate-600 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
                  {cs.week.replace('week', 'Week ')}
                </span>
                {reviewed && <CheckCircle size={13} style={{ color: '#c9a7eb' }} />}
              </div>
              <h3 style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{cs.title}</h3>
              <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.4 }}>{cs.context.slice(0, 100)}...</p>
              <div className="flex items-center gap-3 mt-3">
                <span style={{ color: '#475569', fontSize: 11 }}>{cs.ethicalIssues.length} issues</span>
                <span style={{ color: '#475569', fontSize: 11 }}>{cs.stakeholders.length} stakeholders</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, icon, color, items }: { title: string; icon: React.ReactNode; color: string; items: string[] }) {
  return (
    <div>
      <div style={{ color, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }} className="flex items-center gap-1.5">
        {icon} {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 5 }} />
            <span style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
