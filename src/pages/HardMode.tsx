import { useState, useEffect, useRef, useCallback } from 'react';
import { Zap, Clock, SkipForward, CheckCircle, XCircle, RotateCcw, Trophy, Brain, AlertTriangle } from 'lucide-react';
import { flashcards } from '../data/flashcards';
import { expandedFlashcards } from '../data/expandedFlashcards';
import { adversarialQuestions } from '../data/adversarialQuestions';
import type { Flashcard } from '../data/types';

type CardMode = 'flashcard' | 'adversarial';

interface HardCard {
  id: string;
  mode: CardMode;
  front: string;
  back: string;
  topic: string;
  difficulty: string;
  timeLimit: number;
}

const ALL_FLASHCARDS: Flashcard[] = [...flashcards, ...expandedFlashcards];

const HARD_CARD_SECONDS = 15;
const MEDIUM_CARD_SECONDS = 20;

function buildDeck(count: number, onlyHard: boolean, hardIds: string[]): HardCard[] {
  const flashPool = onlyHard
    ? ALL_FLASHCARDS.filter(c => hardIds.includes(c.id))
    : ALL_FLASHCARDS.filter(c => c.difficulty === 'hard' || c.examRelevance === 'high');

  const adversarialPool = adversarialQuestions.map(q => ({
    id: q.id,
    mode: 'adversarial' as CardMode,
    front: `[${q.marks}M — ${q.commandWord}] ${q.question}`,
    back: q.modelAnswerOutline.join(' | '),
    topic: q.topicsCovered.join(', '),
    difficulty: q.difficulty,
    timeLimit: q.timeMinutes * 60,
  }));

  const flashCards: HardCard[] = flashPool.slice(0, Math.min(flashPool.length, count)).map(c => ({
    id: c.id,
    mode: 'flashcard' as CardMode,
    front: c.front,
    back: c.back,
    topic: c.topic,
    difficulty: c.difficulty,
    timeLimit: c.difficulty === 'hard' ? HARD_CARD_SECONDS : MEDIUM_CARD_SECONDS,
  }));

  const combined = [...flashCards, ...adversarialPool.slice(0, Math.min(adversarialPool.length, Math.floor(count / 5)))];
  return combined.sort(() => Math.random() - 0.5).slice(0, count);
}

type Phase = 'menu' | 'active' | 'results';
type Verdict = 'got-it' | 'almost' | 'missed' | 'skipped';

interface Result {
  card: HardCard;
  verdict: Verdict;
  timeUsed: number;
}

export default function HardMode() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [deckSize, setDeckSize] = useState(20);
  const [onlyHard, setOnlyHard] = useState(false);
  const [hardIds] = useState<string[]>([]);
  const [deck, setDeck] = useState<HardCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeUsedRef = useRef(0);

  const currentCard = deck[currentIndex];

  const startTimer = useCallback((limit: number) => {
    setTimeLeft(limit);
    timeUsedRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        timeUsedRef.current += 1;
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const startSession = () => {
    const d = buildDeck(deckSize, onlyHard, hardIds);
    setDeck(d);
    setCurrentIndex(0);
    setResults([]);
    setFlipped(false);
    setPhase('active');
    if (d.length > 0) startTimer(d[0].timeLimit);
  };

  const advance = (verdict: Verdict) => {
    stopTimer();
    const result: Result = { card: currentCard, verdict, timeUsed: timeUsedRef.current };
    const newResults = [...results, result];
    setResults(newResults);
    setFlipped(false);
    if (currentIndex + 1 >= deck.length) {
      setPhase('results');
    } else {
      const next = deck[currentIndex + 1];
      setCurrentIndex(i => i + 1);
      startTimer(next.timeLimit);
    }
  };

  const isTimeWarning = timeLeft < 5 && timeLeft > 0;
  const isTimeUp = timeLeft === 0 && phase === 'active';
  const pct = currentCard ? (timeLeft / currentCard.timeLimit) * 100 : 100;

  if (phase === 'menu') {
    const hardCount = ALL_FLASHCARDS.filter(c => c.difficulty === 'hard').length;
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={18} style={{ color: '#ef4444' }} />
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Hard Mode — Active Recall</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13 }}>No hints. Time pressure per card. Mixed topics. Adversarial questions. If this feels comfortable, you're not doing it right.</p>
        </div>

        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 16 }}>
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>What to expect</div>
              <ul style={{ color: '#fda4af', fontSize: 12, lineHeight: 1.7, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                <li>· Flashcards: 15 seconds each (hard difficulty)</li>
                <li>· Adversarial questions: longer, multi-topic, examiner-trap style</li>
                <li>· No hints, no planning prompts</li>
                <li>· Random order — you don't get to choose the topic</li>
                <li>· Verdict honesty required — be strict with yourself</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14, padding: 20 }} className="space-y-4">
          <div>
            <label style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Session Size</label>
            <div className="flex gap-2 flex-wrap">
              {[10, 20, 30, 50].map(n => (
                <button
                  key={n}
                  onClick={() => setDeckSize(n)}
                  style={{ background: deckSize === n ? 'rgba(239,68,68,0.15)' : '#2a1938', border: `1px solid ${deckSize === n ? 'rgba(239,68,68,0.4)' : '#4c315f'}`, color: deckSize === n ? '#fca5a5' : '#64748b', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}
                >
                  {n} cards
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Card Pool</label>
            <div className="flex gap-2">
              <button
                onClick={() => setOnlyHard(false)}
                style={{ background: !onlyHard ? 'rgba(239,68,68,0.15)' : '#2a1938', border: `1px solid ${!onlyHard ? 'rgba(239,68,68,0.4)' : '#4c315f'}`, color: !onlyHard ? '#fca5a5' : '#64748b', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}
              >
                All hard/high-relevance ({ALL_FLASHCARDS.filter(c => c.difficulty === 'hard' || c.examRelevance === 'high').length} cards)
              </button>
              <button
                onClick={() => setOnlyHard(true)}
                style={{ background: onlyHard ? 'rgba(239,68,68,0.15)' : '#2a1938', border: `1px solid ${onlyHard ? 'rgba(239,68,68,0.4)' : '#4c315f'}`, color: onlyHard ? '#fca5a5' : '#64748b', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}
              >
                My hard cards only ({hardCount} marked)
              </button>
            </div>
          </div>

          <div style={{ color: '#64748b', fontSize: 12 }}>
            Session will include {Math.min(deckSize, 50)} flashcards + up to {Math.floor(deckSize / 5)} adversarial questions, randomised.
          </div>

          <button
            onClick={startSession}
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 800, width: '100%' }}
            className="flex items-center justify-center gap-2"
          >
            <Zap size={16} /> Start Hard Mode
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'active' && currentCard) {
    const isAdversarial = currentCard.mode === 'adversarial';
    return (
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap size={14} style={{ color: '#ef4444' }} />
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>Hard Mode</span>
            <span style={{ color: '#64748b', fontSize: 12 }}>{currentIndex + 1}/{deck.length}</span>
          </div>
          <button onClick={() => { stopTimer(); setPhase('results'); }} style={{ color: '#475569', fontSize: 12 }}>End Session</button>
        </div>

        {/* Timer */}
        <div>
          <div style={{ background: '#2a1938', borderRadius: 8, height: 8, overflow: 'hidden' }}>
            <div style={{
              width: `${pct}%`, height: '100%', borderRadius: 8, transition: 'width 1s linear',
              background: pct > 50 ? '#c9a7eb' : pct > 25 ? '#f59e0b' : '#ef4444',
            }} />
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ color: isTimeWarning ? '#ef4444' : '#475569', fontSize: 11, fontWeight: isTimeWarning ? 700 : 400 }}>
              {isTimeUp ? 'TIME UP' : `${timeLeft}s`}
            </span>
            <span style={{ color: '#475569', fontSize: 11 }}>{currentCard.topic}</span>
          </div>
        </div>

        {/* Card */}
        <div
          onClick={() => !flipped && setFlipped(true)}
          style={{
            background: isAdversarial ? '#0f1a2e' : '#14091f',
            border: `1px solid ${isAdversarial ? 'rgba(139,92,246,0.4)' : isTimeWarning ? 'rgba(239,68,68,0.5)' : '#2a1938'}`,
            borderRadius: 16,
            minHeight: isAdversarial ? 200 : 180,
            cursor: flipped ? 'default' : 'pointer',
            padding: 24,
          }}
          className="flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <span style={{ background: isAdversarial ? 'rgba(139,92,246,0.15)' : 'rgba(239,68,68,0.1)', color: isAdversarial ? '#c4b5fd' : '#fca5a5', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
                {isAdversarial ? 'ADVERSARIAL' : currentCard.difficulty.toUpperCase()}
              </span>
            </div>
            <span style={{ color: '#475569', fontSize: 11 }}>{flipped ? '↑ Answer' : '↓ Tap to flip'}</span>
          </div>

          {!flipped ? (
            <div>
              <div style={{ color: isAdversarial ? '#a78bfa' : '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {isAdversarial ? 'EXAM QUESTION' : 'ACTIVE RECALL — NO HINTS'}
              </div>
              <p style={{ color: '#f1f5f9', fontSize: isAdversarial ? 14 : 16, lineHeight: 1.65, fontWeight: 500 }}>{currentCard.front}</p>
            </div>
          ) : (
            <div>
              <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {isAdversarial ? 'MODEL ANSWER OUTLINE' : 'ANSWER'}
              </div>
              <p style={{ color: '#e2e8f0', fontSize: 13, lineHeight: 1.7 }}>{currentCard.back}</p>
            </div>
          )}

          {!flipped && (
            <div style={{ color: '#4c315f', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
              {isTimeUp ? 'Time up — flip to see answer' : 'Think first, then flip'}
            </div>
          )}
        </div>

        {/* Verdict buttons */}
        {flipped && (
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => advance('got-it')} style={{ background: 'rgba(201,167,235,0.1)', border: '1px solid rgba(201,167,235,0.3)', color: '#c9a7eb', borderRadius: 10, padding: '10px 6px', fontSize: 11, fontWeight: 700 }} className="flex flex-col items-center gap-1">
              <CheckCircle size={16} />Got it
            </button>
            <button onClick={() => advance('almost')} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d', borderRadius: 10, padding: '10px 6px', fontSize: 11, fontWeight: 700 }} className="flex flex-col items-center gap-1">
              <Clock size={16} />Almost
            </button>
            <button onClick={() => advance('missed')} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 10, padding: '10px 6px', fontSize: 11, fontWeight: 700 }} className="flex flex-col items-center gap-1">
              <XCircle size={16} />Missed
            </button>
            <button onClick={() => advance('skipped')} style={{ background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.3)', color: '#94a3b8', borderRadius: 10, padding: '10px 6px', fontSize: 11, fontWeight: 700 }} className="flex flex-col items-center gap-1">
              <SkipForward size={16} />Skip
            </button>
          </div>
        )}

        {/* Progress dots */}
        <div className="flex gap-1 flex-wrap">
          {deck.map((_, i) => {
            const r = results[i];
            const color = !r ? (i === currentIndex ? '#94a3b8' : '#2a1938') :
              r.verdict === 'got-it' ? '#c9a7eb' :
              r.verdict === 'almost' ? '#f59e0b' :
              r.verdict === 'missed' ? '#ef4444' : '#4c315f';
            return <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />;
          })}
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const gotIt = results.filter(r => r.verdict === 'got-it').length;
    const almost = results.filter(r => r.verdict === 'almost').length;
    const missed = results.filter(r => r.verdict === 'missed').length;
    const skipped = results.filter(r => r.verdict === 'skipped').length;
    const total = results.length;
    const score = total > 0 ? Math.round(((gotIt + almost * 0.5) / total) * 100) : 0;
    const scoreColor = score >= 80 ? '#c9a7eb' : score >= 60 ? '#f59e0b' : '#ef4444';

    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center gap-2">
          <Trophy size={20} style={{ color: scoreColor }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20 }}>Hard Mode Results</h1>
        </div>

        <div style={{ background: '#14091f', border: `1px solid ${scoreColor}30`, borderRadius: 14, padding: 20 }}>
          <div style={{ color: scoreColor, fontSize: 52, fontWeight: 900, textAlign: 'center', lineHeight: 1 }}>{score}%</div>
          <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', marginTop: 4 }}>{total} cards attempted</div>
          <div className="grid grid-cols-4 gap-3 mt-5">
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#c9a7eb', fontSize: 22, fontWeight: 800 }}>{gotIt}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Got it</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#f59e0b', fontSize: 22, fontWeight: 800 }}>{almost}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Almost</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ef4444', fontSize: 22, fontWeight: 800 }}>{missed}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Missed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#475569', fontSize: 22, fontWeight: 800 }}>{skipped}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>Skipped</div>
            </div>
          </div>
        </div>

        {missed > 0 && (
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: 16 }}>
            <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Review Missed Cards</div>
            <div className="space-y-2">
              {results.filter(r => r.verdict === 'missed').map(r => (
                <div key={r.card.id} style={{ background: '#1a0808', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ color: '#fda4af', fontSize: 12, lineHeight: 1.4, fontWeight: 500 }}>{r.card.front.slice(0, 100)}{r.card.front.length > 100 ? '...' : ''}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>{r.card.topic}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {score >= 80 && (
          <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 12, padding: 16 }}>
            <Brain size={16} style={{ color: '#c9a7eb', display: 'inline', marginRight: 8 }} />
            <span style={{ color: '#d8b4fe', fontSize: 13, fontWeight: 700 }}>Strong performance. Try the Nightmare mock exam paper next.</span>
          </div>
        )}
        {score < 60 && (
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: 16 }}>
            <AlertTriangle size={16} style={{ color: '#ef4444', display: 'inline', marginRight: 8 }} />
            <span style={{ color: '#fca5a5', fontSize: 13, fontWeight: 700 }}>Return to the missed topics in Topic Hubs, then retry Hard Mode.</span>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={startSession} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700 }} className="flex items-center gap-2">
            <RotateCcw size={14} /> New Session
          </button>
          <button onClick={() => setPhase('menu')} style={{ background: '#14091f', border: '1px solid #2a1938', color: '#94a3b8', borderRadius: 10, padding: '10px 18px', fontSize: 13 }}>
            Change Settings
          </button>
        </div>
      </div>
    );
  }

  return null;
}
