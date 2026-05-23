import { useState } from 'react';
import Nav from './components/Nav';
import type { Page } from './components/Nav';
import { useProgress } from './hooks/useProgress';

import Dashboard from './pages/Dashboard';
import MasteryMap from './pages/MasteryMap';
import MindmapPodcasts from './pages/MindmapPodcasts';
import TopicHubs from './pages/TopicHubs';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Scenarios from './pages/Scenarios';
import ExamPractice from './pages/ExamPractice';
import EssayBuilder from './pages/EssayBuilder';
import CaseStudies from './pages/CaseStudies';
import WeaknessCenter from './pages/WeaknessCenter';
import Strategy from './pages/Strategy';
import Glossary from './pages/Glossary';
import RevisionPlanner from './pages/RevisionPlanner';
import MockExam from './pages/MockExam';
import HardMode from './pages/HardMode';
import ExaminerTraps from './pages/ExaminerTraps';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const {
    progress,
    completeTopic,
    masterFlashcard,
    markFlashcardHard,
    recordQuizScore,
    attemptExamQuestion,
    completeScenario,
    reviewCaseStudy,
    getReadinessScore,
  } = useProgress();

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            progress={progress}
            readiness={getReadinessScore()}
            onNavigate={setPage}
          />
        );
      case 'mastery':
        return <MasteryMap progress={progress} />;
      case 'mindmap':
        return <MindmapPodcasts />;
      case 'topics':
        return (
          <TopicHubs
            progress={progress}
            onComplete={completeTopic}
          />
        );
      case 'flashcards':
        return (
          <Flashcards
            progress={progress}
            onMaster={masterFlashcard}
            onHard={markFlashcardHard}
          />
        );
      case 'quiz':
        return (
          <Quiz
            progress={progress}
            onScore={recordQuizScore}
          />
        );
      case 'scenarios':
        return (
          <Scenarios
            progress={progress}
            onComplete={completeScenario}
          />
        );
      case 'exam':
        return (
          <ExamPractice
            progress={progress}
            onAttempt={attemptExamQuestion}
          />
        );
      case 'essays':
        return <EssayBuilder />;
      case 'cases':
        return (
          <CaseStudies
            progress={progress}
            onReview={reviewCaseStudy}
          />
        );
      case 'weakness':
        return (
          <WeaknessCenter
            progress={progress}
            onNavigate={setPage}
          />
        );
      case 'strategy':
        return <Strategy />;
      case 'glossary':
        return <Glossary />;
      case 'planner':
        return <RevisionPlanner />;
      case 'mockexam':
        return <MockExam onAttempt={attemptExamQuestion} />;
      case 'hardmode':
        return <HardMode />;
      case 'traps':
        return <ExaminerTraps />;
      default:
        return (
          <Dashboard
            progress={progress}
            readiness={getReadinessScore()}
            onNavigate={setPage}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#09040f' }}>
      <Nav current={page} onChange={setPage} />
      <main style={{ paddingBottom: 40 }}>
        {renderPage()}
      </main>
    </div>
  );
}
