import { useMemo, useState } from 'react';
import { Download, ExternalLink, Image as ImageIcon, Search, X } from 'lucide-react';
import { infographics } from '../data/infographics';
import type { Infographic } from '../data/infographics';
import type { Week } from '../data/types';

const WEEK_LABELS: Record<Week, string> = {
  week1: 'Week 1: Ethics',
  week2: 'Week 2: Privacy',
  week3: 'Week 3: IP',
  week5: 'Week 5: IG + Red Team',
  week6: 'Week 6: Cyber + AI',
  week9: 'Week 9: Workplace',
};

const WEEK_COLORS: Record<Week, string> = {
  week1: '#c9a7eb',
  week2: '#38bdf8',
  week3: '#f59e0b',
  week5: '#8b5cf6',
  week6: '#ef4444',
  week9: '#ff6aa8',
};

function safeHref(src: string) {
  return encodeURI(src);
}

function InfographicCard({ item, onOpen }: { item: Infographic; onOpen: (item: Infographic) => void }) {
  const color = WEEK_COLORS[item.week];

  return (
    <article style={{ background: '#14091f', border: `1px solid ${color}28`, borderRadius: 12, overflow: 'hidden' }}>
      <button onClick={() => onOpen(item)} style={{ width: '100%', textAlign: 'left' }}>
        <div style={{ background: '#09040f', aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <img src={item.src} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </button>
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span style={{ background: `${color}18`, border: `1px solid ${color}35`, color, borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 800 }}>
              {WEEK_LABELS[item.week]}
            </span>
            <span style={{ color: '#64748b', fontSize: 11 }}>{item.topic}</span>
          </div>
          <h2 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 850, lineHeight: 1.25 }}>{item.title}</h2>
        </div>

        <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.55 }}>{item.examUse}</p>

        <div className="flex flex-wrap gap-1.5">
          {item.focus.map(tag => (
            <span key={tag} style={{ background: `${color}10`, border: `1px solid ${color}20`, color: '#cbd5e1', borderRadius: 6, padding: '3px 6px', fontSize: 10, fontWeight: 700 }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onOpen(item)}
            style={{ background: `${color}14`, border: `1px solid ${color}35`, color, borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 800 }}
            className="flex items-center gap-1.5"
          >
            <ImageIcon size={13} /> View
          </button>
          <a
            href={safeHref(item.src)}
            download
            style={{ background: '#0f0a19', border: '1px solid #2a1938', color: '#94a3b8', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 700 }}
            className="flex items-center gap-1.5"
          >
            <Download size={13} /> Save
          </a>
          <a
            href={safeHref(item.src)}
            target="_blank"
            rel="noreferrer"
            style={{ background: '#0f0a19', border: '1px solid #2a1938', color: '#94a3b8', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 700 }}
            className="flex items-center gap-1.5"
          >
            <ExternalLink size={13} /> Open
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Infographics() {
  const [activeWeek, setActiveWeek] = useState<Week | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Infographic | null>(infographics[0]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return infographics.filter(item => {
      if (activeWeek !== 'all' && item.week !== activeWeek) return false;
      if (!q) return true;
      return [
        item.title,
        item.topic,
        item.examUse,
        WEEK_LABELS[item.week],
        ...item.focus,
      ].some(value => value.toLowerCase().includes(q));
    });
  }, [activeWeek, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon size={20} style={{ color: '#38bdf8' }} />
            <h1 style={{ color: '#f1f5f9', fontWeight: 850, fontSize: 22, letterSpacing: '-0.02em' }}>Infographic Library</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13 }}>{infographics.length} visual revision sheets for fast recap, essay examples, and last-minute memory hooks.</p>
        </div>
        <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: 12, padding: '10px 14px' }}>
          <span style={{ color: '#7dd3fc', fontSize: 12, fontWeight: 800 }}>Visual revision pack</span>
        </div>
      </div>

      <section style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2" style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '8px 11px' }}>
            <Search size={14} style={{ color: '#64748b' }} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search images, topics, laws"
              style={{ background: 'transparent', color: '#f1f5f9', border: 0, outline: 'none', width: 220, fontSize: 12 }}
            />
          </div>
          {(['all', 'week1', 'week2', 'week3', 'week5', 'week6', 'week9'] as const).map(week => {
            const active = activeWeek === week;
            const color = week === 'all' ? '#c9a7eb' : WEEK_COLORS[week];
            return (
              <button
                key={week}
                onClick={() => setActiveWeek(week)}
                style={{
                  background: active ? `${color}18` : '#0f0a19',
                  border: `1px solid ${active ? `${color}40` : '#2a1938'}`,
                  color: active ? color : '#94a3b8',
                  borderRadius: 8,
                  padding: '7px 10px',
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {week === 'all' ? 'All' : WEEK_LABELS[week]}
              </button>
            );
          })}
        </div>
        <p style={{ color: '#475569', fontSize: 12 }}>Showing {visible.length} of {infographics.length}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visible.map(item => (
            <InfographicCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </section>

        <aside style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 72, alignSelf: 'start' }}>
          {selected ? (
            <>
              <div className="flex items-center justify-between gap-3 p-4" style={{ borderBottom: '1px solid #2a1938' }}>
                <div>
                  <div style={{ color: WEEK_COLORS[selected.week], fontSize: 11, fontWeight: 800 }}>{WEEK_LABELS[selected.week]}</div>
                  <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 850 }}>{selected.title}</h2>
                </div>
                <button onClick={() => setSelected(null)} style={{ color: '#64748b' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ background: '#09040f', maxHeight: '72vh', overflow: 'auto' }}>
                <img src={selected.src} alt={selected.title} style={{ width: '100%', display: 'block' }} />
              </div>
              <div className="p-4 flex gap-2 flex-wrap">
                <a href={safeHref(selected.src)} download style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.32)', color: '#7dd3fc', borderRadius: 8, padding: '8px 11px', fontSize: 12, fontWeight: 800 }} className="flex items-center gap-1.5">
                  <Download size={13} /> Save image
                </a>
                <a href={safeHref(selected.src)} target="_blank" rel="noreferrer" style={{ background: '#0f0a19', border: '1px solid #2a1938', color: '#94a3b8', borderRadius: 8, padding: '8px 11px', fontSize: 12, fontWeight: 700 }} className="flex items-center gap-1.5">
                  <ExternalLink size={13} /> Open full size
                </a>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <ImageIcon size={36} style={{ color: '#475569', margin: '0 auto 10px' }} />
              <p style={{ color: '#64748b', fontSize: 13 }}>Select an infographic to preview it here.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
