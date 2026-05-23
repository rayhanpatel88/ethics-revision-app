import { BookOpen, Brain, Zap, Target, FileText, Layers, AlertTriangle, BookMarked, Calendar, Map, Trophy, FlaskConical, Gauge, Swords, Clock, ShieldAlert, Network } from 'lucide-react';
import loughboroughLogo from '../assets/loughborough-university-logo-transparent.png';

export type Page = 'dashboard' | 'mastery' | 'mindmap' | 'topics' | 'flashcards' | 'quiz' | 'scenarios' | 'exam' | 'essays' | 'cases' | 'weakness' | 'strategy' | 'glossary' | 'planner' | 'mockexam' | 'hardmode' | 'traps';

interface NavProps {
  current: Page;
  onChange: (p: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ComponentType<{size?: number; className?: string}>; shortLabel: string }[] = [
  { id: 'dashboard', label: 'Command Centre', shortLabel: 'Dashboard', icon: Gauge },
  { id: 'mastery', label: 'Mastery Map', shortLabel: 'Mastery', icon: Map },
  { id: 'mindmap', label: 'Mindmap + Podcasts', shortLabel: 'Mindmap', icon: Network },
  { id: 'topics', label: 'Topic Hubs', shortLabel: 'Topics', icon: BookOpen },
  { id: 'flashcards', label: 'Flashcards', shortLabel: 'Cards', icon: Brain },
  { id: 'quiz', label: 'Quiz Engine', shortLabel: 'Quiz', icon: Zap },
  { id: 'scenarios', label: 'Scenarios', shortLabel: 'Scenarios', icon: FlaskConical },
  { id: 'exam', label: 'Exam Practice', shortLabel: 'Exam', icon: Target },
  { id: 'essays', label: 'Essay Builder', shortLabel: 'Essays', icon: FileText },
  { id: 'cases', label: 'Case Studies', shortLabel: 'Cases', icon: Layers },
  { id: 'weakness', label: 'Weak Areas', shortLabel: 'Weak', icon: AlertTriangle },
  { id: 'strategy', label: '90%+ Strategy', shortLabel: 'Strategy', icon: Trophy },
  { id: 'glossary', label: 'Glossary', shortLabel: 'Glossary', icon: BookMarked },
  { id: 'planner', label: '48hr Planner', shortLabel: 'Planner', icon: Calendar },
  { id: 'mockexam', label: 'Mock Exams', shortLabel: 'Mock', icon: Clock },
  { id: 'hardmode', label: 'Hard Mode', shortLabel: 'Hard', icon: Swords },
  { id: 'traps', label: 'Examiner Traps', shortLabel: 'Traps', icon: ShieldAlert },
];

export default function Nav({ current, onChange }: NavProps) {
  return (
    <nav style={{ background: '#ffffff', borderBottom: '1px solid rgba(59,22,92,0.14)', boxShadow: '0 1px 0 rgba(59,22,92,0.04)' }} className="sticky top-0 z-50">
      <div className="flex items-center gap-1 px-3 py-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex items-center gap-2 mr-4 flex-shrink-0" style={{ minWidth: 150 }}>
          <img
            src={loughboroughLogo}
            alt="Loughborough University"
            style={{ height: 34, width: 'auto', maxWidth: 210, objectFit: 'contain' }}
          />
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex-shrink-0 whitespace-nowrap"
              style={{
                background: isActive ? 'rgba(59,22,92,0.1)' : 'transparent',
                color: isActive ? '#3B165C' : '#6b5a78',
                border: isActive ? '1px solid rgba(59,22,92,0.24)' : '1px solid transparent',
              }}
            >
              <Icon size={13} />
              <span className="hidden lg:block">{item.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
