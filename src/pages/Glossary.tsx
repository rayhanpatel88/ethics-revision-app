import { useState, useMemo } from 'react';
import { Search, BookMarked } from 'lucide-react';
import { glossaryEntries } from '../data/glossary';
import type { Week } from '../data/types';

const WEEK_LABELS: Record<Week, string> = {
  week1: 'Wk 1: Ethics', week2: 'Wk 2: Privacy', week3: 'Wk 3: IP',
  week5: 'Wk 5: IG & Red Team', week6: 'Wk 6: Cyber', week9: 'Wk 9: Workplace',
};

const WEEK_COLORS: Record<Week, string> = {
  week1: '#c9a7eb', week2: '#3b82f6', week3: '#f59e0b',
  week5: '#8b5cf6', week6: '#ef4444', week9: '#ff6aa8',
};

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [filterWeek, setFilterWeek] = useState<Week | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() =>
    glossaryEntries.filter(e => {
      const matchSearch = !search || e.term.toLowerCase().includes(search.toLowerCase()) || e.definition.toLowerCase().includes(search.toLowerCase());
      const matchWeek = filterWeek === 'all' || e.week === filterWeek;
      return matchSearch && matchWeek;
    }),
    [search, filterWeek]
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookMarked size={18} style={{ color: '#f59e0b' }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Glossary & Definitions Bank</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>{glossaryEntries.length} terms · searchable · with exam applications</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 flex items-center gap-2" style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 10, padding: '8px 12px', minWidth: 200 }}>
          <Search size={14} style={{ color: '#475569', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms, definitions..."
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: 13, width: '100%' }}
          />
        </div>
        <select value={filterWeek} onChange={e => setFilterWeek(e.target.value as Week | 'all')} style={{ background: '#14091f', color: '#f1f5f9', border: '1px solid #2a1938', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
          <option value="all">All Weeks</option>
          {Object.entries(WEEK_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <p style={{ color: '#475569', fontSize: 12 }}>{filtered.length} entries</p>

      <div className="space-y-2">
        {filtered.map(entry => {
          const isExpanded = expanded === entry.id;
          const color = WEEK_COLORS[entry.week];
          return (
            <div key={entry.id} style={{ background: '#14091f', border: `1px solid ${isExpanded ? '#4c315f' : '#2a1938'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button
                onClick={() => setExpanded(isExpanded ? null : entry.id)}
                className="w-full flex items-center justify-between gap-3 p-4"
                style={{ textAlign: 'left' }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 700 }} className="px-1.5 py-0.5 rounded flex-shrink-0">
                    {WEEK_LABELS[entry.week].split(':')[0]}
                  </span>
                  <span style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700 }}>{entry.term}</span>
                </div>
                <span style={{ color: '#475569', fontSize: 11, flexShrink: 0 }}>{isExpanded ? '▲' : '▼'}</span>
              </button>

              {!isExpanded && (
                <div className="px-4 pb-3">
                  <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>
                    {entry.definition.slice(0, 120)}{entry.definition.length > 120 ? '...' : ''}
                  </p>
                </div>
              )}

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  <div>
                    <div style={{ color: '#64748b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Definition</div>
                    <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{entry.definition}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <div style={{ color: '#c9a7eb', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Why It Matters</div>
                      <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{entry.whyItMatters}</p>
                    </div>
                    <div>
                      <div style={{ color: '#8b5cf6', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Exam Application</div>
                      <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{entry.examApplication}</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#f59e0b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Example Usage in Answer</div>
                    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: '8px 10px' }}>
                      <p style={{ color: '#fcd34d', fontSize: 12, lineHeight: 1.6, fontStyle: 'italic' }}>{entry.exampleUsage}</p>
                    </div>
                  </div>
                  {entry.relatedTerms.length > 0 && (
                    <div>
                      <div style={{ color: '#64748b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Related Terms</div>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.relatedTerms.map(t => (
                          <button key={t} onClick={() => setSearch(t)} style={{ background: '#2a1938', color: '#94a3b8', border: '1px solid #4c315f', fontSize: 11, fontWeight: 600 }} className="px-2 py-0.5 rounded-full hover:text-slate-200 transition-colors">
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
