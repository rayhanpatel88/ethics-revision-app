import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Shuffle, Filter, Star } from 'lucide-react';
import { flashcards as baseFlashcards } from '../data/flashcards';
import { expandedFlashcards } from '../data/expandedFlashcards';

const flashcards = [...baseFlashcards, ...expandedFlashcards];
import type { UserProgress, Week, Difficulty } from '../data/types';

interface Props {
  progress: UserProgress;
  onMaster: (id: string) => void;
  onHard: (id: string) => void;
}

const WEEK_LABELS: Record<Week, string> = {
  week1: 'Week 1: Ethics', week2: 'Week 2: Privacy', week3: 'Week 3: IP',
  week5: 'Week 5: IG & Red Team', week6: 'Week 6: Cyber', week9: 'Week 9: Workplace',
};

const TYPE_LABELS: Record<string, string> = {
  definition: 'Definition', framework: 'Framework', law: 'Law/Regulation',
  casestudy: 'Case Study', application: 'Application', mistake: 'Common Mistake',
};

const TYPE_COLOURS: Record<string, string> = {
  definition: '#3b82f6', framework: '#c9a7eb', law: '#f59e0b',
  casestudy: '#8b5cf6', application: '#ff6aa8', mistake: '#ef4444',
};

export default function Flashcards({ progress, onMaster, onHard }: Props) {
  const [filterWeek, setFilterWeek] = useState<Week | 'all'>('all');
  const [filterDiff, setFilterDiff] = useState<Difficulty | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showOnlyHard, setShowOnlyHard] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let cards = flashcards.filter(c => {
      if (filterWeek !== 'all' && c.week !== filterWeek) return false;
      if (filterDiff !== 'all' && c.difficulty !== filterDiff) return false;
      if (filterType !== 'all' && c.type !== filterType) return false;
      if (showOnlyHard && !progress.flashcardsHard.includes(c.id)) return false;
      return true;
    });
    if (shuffled) {
      cards = [...cards].sort(() => Math.random() - 0.5);
    }
    return cards;
  }, [filterWeek, filterDiff, filterType, showOnlyHard, shuffled]);

  const card = filtered[currentIndex];
  const total = filtered.length;

  const next = () => { setFlipped(false); setTimeout(() => setCurrentIndex(i => Math.min(i + 1, total - 1)), 0); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrentIndex(i => Math.max(i - 1, 0)), 0); };

  const handleShuffle = () => {
    setShuffled(s => !s);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const isMastered = card ? progress.flashcardsMastered.includes(card.id) : false;
  const isHard = card ? progress.flashcardsHard.includes(card.id) : false;

  if (total === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p style={{ color: '#64748b' }}>No flashcards match your filters.</p>
        <button onClick={() => { setFilterWeek('all'); setFilterDiff('all'); setFilterType('all'); setShowOnlyHard(false); }} style={{ color: '#c9a7eb', marginTop: 8 }} className="text-sm">Clear filters</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Flashcard Engine</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>{total} cards · {progress.flashcardsMastered.length} mastered · {progress.flashcardsHard.length} hard</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShuffle} style={{ background: shuffled ? 'rgba(201,167,235,0.15)' : '#14091f', border: `1px solid ${shuffled ? 'rgba(201,167,235,0.4)' : '#2a1938'}`, color: shuffled ? '#c9a7eb' : '#94a3b8', borderRadius: 8, padding: '6px 10px', fontSize: 12 }} className="flex items-center gap-1">
            <Shuffle size={12} /> Shuffle
          </button>
          <button onClick={() => setShowFilters(f => !f)} style={{ background: showFilters ? 'rgba(255,106,168,0.15)' : '#14091f', border: `1px solid ${showFilters ? 'rgba(255,106,168,0.4)' : '#2a1938'}`, color: showFilters ? '#ff6aa8' : '#94a3b8', borderRadius: 8, padding: '6px 10px', fontSize: 12 }} className="flex items-center gap-1">
            <Filter size={12} /> Filter
          </button>
          <button onClick={() => setShowOnlyHard(h => !h)} style={{ background: showOnlyHard ? 'rgba(239,68,68,0.15)' : '#14091f', border: `1px solid ${showOnlyHard ? 'rgba(239,68,68,0.4)' : '#2a1938'}`, color: showOnlyHard ? '#ef4444' : '#94a3b8', borderRadius: 8, padding: '6px 10px', fontSize: 12 }} className="flex items-center gap-1">
            <Star size={12} /> Hard only
          </button>
        </div>
      </div>

      {showFilters && (
        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 12 }} className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label style={{ color: '#64748b', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Week</label>
              <select value={filterWeek} onChange={e => { setFilterWeek(e.target.value as Week | 'all'); setCurrentIndex(0); setFlipped(false); }} style={{ background: '#2a1938', color: '#f1f5f9', border: '1px solid #4c315f', borderRadius: 8, padding: '6px 8px', fontSize: 12, width: '100%' }}>
                <option value="all">All Weeks</option>
                {Object.entries(WEEK_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Difficulty</label>
              <select value={filterDiff} onChange={e => { setFilterDiff(e.target.value as Difficulty | 'all'); setCurrentIndex(0); setFlipped(false); }} style={{ background: '#2a1938', color: '#f1f5f9', border: '1px solid #4c315f', borderRadius: 8, padding: '6px 8px', fontSize: 12, width: '100%' }}>
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</label>
              <select value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentIndex(0); setFlipped(false); }} style={{ background: '#2a1938', color: '#f1f5f9', border: '1px solid #4c315f', borderRadius: 8, padding: '6px 8px', fontSize: 12, width: '100%' }}>
                <option value="all">All Types</option>
                {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ background: '#2a1938', borderRadius: 8, height: 6 }}>
        <div style={{ width: `${((currentIndex + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #c9a7eb, #ff6aa8)', height: '100%', borderRadius: 8, transition: 'width 0.3s' }} />
      </div>
      <div className="flex justify-between" style={{ color: '#475569', fontSize: 11 }}>
        <span>Card {currentIndex + 1} of {total}</span>
        <span>{Math.round(((currentIndex + 1) / total) * 100)}% through deck</span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          background: flipped ? '#0f1f2e' : '#14091f',
          border: `1px solid ${flipped ? '#1e3a5f' : '#2a1938'}`,
          borderRadius: 16,
          minHeight: 280,
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          padding: 24,
        }}
        className="flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex gap-2 flex-wrap">
            <span style={{ background: `rgba(${TYPE_COLOURS[card.type] === '#3b82f6' ? '59,130,246' : TYPE_COLOURS[card.type] === '#c9a7eb' ? '16,185,129' : TYPE_COLOURS[card.type] === '#f59e0b' ? '245,158,11' : TYPE_COLOURS[card.type] === '#8b5cf6' ? '139,92,246' : TYPE_COLOURS[card.type] === '#ff6aa8' ? '8,145,178' : '239,68,68'},0.15)`, color: TYPE_COLOURS[card.type], border: `1px solid ${TYPE_COLOURS[card.type]}40`, fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full uppercase tracking-wide">
              {TYPE_LABELS[card.type]}
            </span>
            <span style={{ background: '#2a1938', color: '#64748b', fontSize: 10, fontWeight: 600 }} className="px-2 py-0.5 rounded-full">
              {WEEK_LABELS[card.week]}
            </span>
            {card.examRelevance === 'high' && (
              <span style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', fontSize: 10, fontWeight: 700 }} className="px-2 py-0.5 rounded-full">⚡ HIGH EXAM RELEVANCE</span>
            )}
          </div>
          <div style={{ color: '#64748b', fontSize: 11, flexShrink: 0 }}>
            {flipped ? '↑ Front' : '↓ Flip'}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {!flipped ? (
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>QUESTION</div>
              <p style={{ color: '#f1f5f9', fontSize: 16, lineHeight: 1.6, fontWeight: 500 }}>{card.front}</p>
            </div>
          ) : (
            <div>
              <div style={{ color: '#c9a7eb', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>ANSWER</div>
              <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{card.back}</p>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          {flipped ? 'Tap to see question' : 'Tap to reveal answer'}
        </div>

        {(isMastered || isHard) && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            {isMastered && <span style={{ color: '#c9a7eb', fontSize: 10, fontWeight: 700 }}>✓ MASTERED</span>}
            {isHard && <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 700 }}>★ HARD</span>}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => { onHard(card.id); next(); }} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 10, padding: '10px', fontSize: 12, fontWeight: 700 }} className="flex flex-col items-center gap-1 hover:opacity-90">
            <XCircle size={16} />Hard
          </button>
          <button onClick={() => { next(); }} style={{ background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.3)', color: '#94a3b8', borderRadius: 10, padding: '10px', fontSize: 12, fontWeight: 700 }} className="flex flex-col items-center gap-1 hover:opacity-90">
            <RotateCcw size={16} />Again
          </button>
          <button onClick={() => { onMaster(card.id); next(); }} style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.3)', color: '#c9a7eb', borderRadius: 10, padding: '10px', fontSize: 12, fontWeight: 700 }} className="flex flex-col items-center gap-1 hover:opacity-90">
            <CheckCircle size={16} />Easy
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={prev} disabled={currentIndex === 0} style={{ background: '#14091f', border: '1px solid #2a1938', color: currentIndex === 0 ? '#4c315f' : '#94a3b8', borderRadius: 10, padding: '8px 16px', fontSize: 13 }} className="flex items-center gap-2">
          <ChevronLeft size={14} /> Prev
        </button>
        <div className="flex gap-1 flex-wrap justify-center">
          {filtered.slice(Math.max(0, currentIndex - 3), Math.min(total, currentIndex + 4)).map((_, i) => {
            const idx = Math.max(0, currentIndex - 3) + i;
            return (
              <button key={idx} onClick={() => { setCurrentIndex(idx); setFlipped(false); }} style={{ width: 8, height: 8, borderRadius: '50%', background: idx === currentIndex ? '#c9a7eb' : '#4c315f', transition: 'background 0.2s' }} />
            );
          })}
        </div>
        <button onClick={next} disabled={currentIndex === total - 1} style={{ background: '#14091f', border: '1px solid #2a1938', color: currentIndex === total - 1 ? '#4c315f' : '#94a3b8', borderRadius: 10, padding: '8px 16px', fontSize: 13 }} className="flex items-center gap-2">
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
