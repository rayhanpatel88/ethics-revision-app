import { useState } from 'react';
import { CheckCircle, ChevronRight, AlertTriangle, Star } from 'lucide-react';
import { topics } from '../data/topics';
import type { UserProgress, Week } from '../data/types';

interface Props {
  progress: UserProgress;
  onComplete: (id: string) => void;
}

const WEEK_LABELS: Record<Week, string> = {
  week1: 'Week 1', week2: 'Week 2', week3: 'Week 3',
  week5: 'Week 5', week6: 'Week 6', week9: 'Week 9',
};

const WEEK_COLORS: Record<Week, string> = {
  week1: '#c9a7eb', week2: '#3b82f6', week3: '#f59e0b',
  week5: '#8b5cf6', week6: '#ef4444', week9: '#ff6aa8',
};

const TABS = ['overview', 'definitions', 'frameworks', 'exam', 'grades', 'traps'] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  overview: 'Overview', definitions: 'Definitions', frameworks: 'Frameworks & Laws',
  exam: 'Exam Angles', grades: 'Grade Ladder', traps: 'Common Traps',
};

export default function TopicHubs({ progress, onComplete }: Props) {
  const [selectedWeek, setSelectedWeek] = useState<Week | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const filtered = selectedWeek === 'all' ? topics : topics.filter(t => t.week === selectedWeek);
  const topic = topics.find(t => t.id === selectedTopic);

  const weeks = ['all', 'week1', 'week2', 'week3', 'week5', 'week6', 'week9'] as const;

  if (selectedTopic && topic) {
    const isDone = progress.topicsCompleted.includes(topic.id);
    const color = WEEK_COLORS[topic.week];

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setSelectedTopic(null)} style={{ color: '#64748b', fontSize: 13 }} className="flex items-center gap-1 hover:text-slate-400">
            ← Back
          </button>
          <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 11, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
            {WEEK_LABELS[topic.week]}
          </span>
          <span style={{ background: topic.examWeight === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(100,116,139,0.1)', color: topic.examWeight === 'high' ? '#fca5a5' : '#94a3b8', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full uppercase">
            {topic.examWeight} exam weight
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>{topic.title}</h1>
            <p style={{ color: '#64748b', fontSize: 13 }}>{topic.subtitle}</p>
          </div>
          <button
            onClick={() => onComplete(topic.id)}
            style={{ background: isDone ? 'rgba(201,167,235,0.15)' : '#14091f', border: `1px solid ${isDone ? 'rgba(201,167,235,0.4)' : '#2a1938'}`, color: isDone ? '#c9a7eb' : '#64748b', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, flexShrink: 0 }}
            className="flex items-center gap-1.5"
          >
            <CheckCircle size={14} /> {isDone ? 'Done' : 'Mark Done'}
          </button>
        </div>

        {/* Memory hook */}
        <div style={{ background: 'rgba(201,167,235,0.08)', border: '1px solid rgba(201,167,235,0.25)', borderRadius: 10 }} className="p-3 flex items-start gap-2">
          <Star size={14} style={{ color: '#c9a7eb', flexShrink: 0, marginTop: 1 }} />
          <div>
            <span style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Memory Hook: </span>
            <span style={{ color: '#d8b4fe', fontSize: 12 }}>{topic.memoryHook}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #2a1938' }} className="flex overflow-x-auto gap-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                borderBottom: activeTab === tab ? '2px solid #c9a7eb' : '2px solid transparent',
                color: activeTab === tab ? '#c9a7eb' : '#64748b',
                fontSize: 12,
                fontWeight: 600,
                padding: '8px 14px',
                flexShrink: 0,
              }}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-5 space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{topic.summary}</p>
              <div>
                <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>⚡ Must Know</div>
                <ul className="space-y-1.5">
                  {topic.mustKnow.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight size={12} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: '#e2e8f0', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>High-Mark Phrases</div>
                <div className="space-y-2">
                  {topic.highMarkPhrases.map((phrase, i) => (
                    <div key={i} style={{ background: 'rgba(201,167,235,0.05)', border: '1px solid rgba(201,167,235,0.15)', borderRadius: 8, padding: '8px 12px' }}>
                      <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.5, fontStyle: 'italic' }}>{phrase}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'definitions' && (
            <div className="space-y-3">
              {topic.definitions.map((def, i) => (
                <div key={i} style={{ borderLeft: '3px solid #3b82f6', paddingLeft: 14 }}>
                  <div style={{ color: '#60a5fa', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{def.term}</div>
                  <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{def.definition}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'frameworks' && (
            <div className="space-y-4">
              {topic.frameworks.length > 0 && (
                <div>
                  <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Frameworks & Principles</div>
                  <div className="space-y-3">
                    {topic.frameworks.map((fw, i) => (
                      <div key={i} style={{ background: '#0a1929', borderRadius: 10, padding: '12px 14px', border: '1px solid #1e3a5f' }}>
                        <div style={{ color: '#38bdf8', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{fw.name}</div>
                        <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{fw.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {topic.laws.length > 0 && (
                <div>
                  <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Laws & Regulations</div>
                  <div className="space-y-3">
                    {topic.laws.map((law, i) => (
                      <div key={i} style={{ background: '#1c1000', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(245,158,11,0.2)' }}>
                        <div style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{law.name}</div>
                        <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{law.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'exam' && (
            <div className="space-y-4">
              <div>
                <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Likely Exam Angles</div>
                <div className="space-y-2">
                  {topic.examAngles.map((angle, i) => (
                    <div key={i} style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 8, padding: '8px 12px' }}>
                      <p style={{ color: '#c4b5fd', fontSize: 13, lineHeight: 1.5 }}>{angle}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Relevant Case Studies</div>
                <div className="flex flex-wrap gap-2">
                  {topic.caseStudies.map((cs, i) => (
                    <span key={i} style={{ background: '#2a1938', color: '#94a3b8', border: '1px solid #4c315f', fontSize: 11, fontWeight: 600 }} className="px-2 py-1 rounded-lg">
                      {cs}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="space-y-3">
              {[
                { label: 'Pass (40-49%)', color: '#ef4444', items: topic.passAnswer },
                { label: '2:1 (60-69%)', color: '#f59e0b', items: topic.twoOneAnswer },
                { label: 'First (70-79%)', color: '#c9a7eb', items: topic.firstAnswer },
                { label: '90%+ Distinction', color: '#ff6aa8', items: topic.ninetyPlusAnswer },
              ].map(grade => (
                <div key={grade.label} style={{ borderLeft: `3px solid ${grade.color}`, paddingLeft: 14 }}>
                  <div style={{ color: grade.color, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{grade.label}</div>
                  <ul className="space-y-1">
                    {grade.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight size={10} style={{ color: grade.color, flexShrink: 0, marginTop: 3 }} />
                        <span style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'traps' && (
            <div className="space-y-2">
              <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Common Exam Mistakes</div>
              {topic.commonTraps.map((trap, i) => (
                <div key={i} className="flex items-start gap-2" style={{ background: 'rgba(239,68,68,0.06)', borderRadius: 8, padding: '8px 10px' }}>
                  <AlertTriangle size={12} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{trap}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <div>
        <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Weekly Topic Hubs</h1>
        <p style={{ color: '#64748b', fontSize: 13 }}>Deep-dive revision for every assessable topic</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {weeks.map(w => (
          <button
            key={w}
            onClick={() => setSelectedWeek(w)}
            style={{
              background: selectedWeek === w ? (w === 'all' ? 'rgba(201,167,235,0.15)' : `${WEEK_COLORS[w as Week]}20`) : '#14091f',
              border: `1px solid ${selectedWeek === w ? (w === 'all' ? 'rgba(201,167,235,0.4)' : `${WEEK_COLORS[w as Week]}40`) : '#2a1938'}`,
              color: selectedWeek === w ? (w === 'all' ? '#c9a7eb' : WEEK_COLORS[w as Week]) : '#64748b',
              borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600,
            }}
          >
            {w === 'all' ? 'All Weeks' : WEEK_LABELS[w as Week]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(t => {
          const isDone = progress.topicsCompleted.includes(t.id);
          const color = WEEK_COLORS[t.week];
          return (
            <button
              key={t.id}
              onClick={() => { setSelectedTopic(t.id); setActiveTab('overview'); }}
              style={{
                background: '#14091f',
                border: `1px solid ${isDone ? 'rgba(201,167,235,0.3)' : '#2a1938'}`,
                borderRadius: 12,
                padding: '16px',
                textAlign: 'left',
              }}
              className="hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex gap-2 flex-wrap">
                  <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">
                    {WEEK_LABELS[t.week]}
                  </span>
                  {t.examWeight === 'high' && (
                    <span style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">⚡ HIGH</span>
                  )}
                </div>
                {isDone && <CheckCircle size={14} style={{ color: '#c9a7eb', flexShrink: 0 }} />}
              </div>
              <h3 style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{t.title}</h3>
              <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.4 }}>{t.subtitle}</p>
              <div className="flex items-center gap-3 mt-3">
                <span style={{ color: '#475569', fontSize: 11 }}>{t.definitions.length} definitions</span>
                <span style={{ color: '#475569', fontSize: 11 }}>{t.frameworks.length} frameworks</span>
                <span style={{ color: '#475569', fontSize: 11 }}>{t.examAngles.length} exam angles</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
