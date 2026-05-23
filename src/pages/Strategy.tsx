import { useState } from 'react';
import { Trophy, CheckCircle, AlertTriangle, ClipboardCheck, Search, Timer, Layers, Target } from 'lucide-react';
import { examStrategy } from '../data/examStrategy';
import { examStrategyItems } from '../data/revisionPlan';

export default function Strategy() {
  const [checkedRubric, setCheckedRubric] = useState<string[]>([]);
  const rubricScore = examStrategy.selfGradingRubric
    .filter(item => checkedRubric.includes(item.item))
    .reduce((sum, item) => sum + item.weight, 0);

  const toggleRubric = (item: string) => {
    setCheckedRubric(current =>
      current.includes(item) ? current.filter(i => i !== item) : [...current, item]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={20} style={{ color: '#f59e0b' }} />
          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>90%+ Exam Strategy</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>The architecture of a distinction-level answer — what examiners really want</p>
      </div>

      {/* Grade comparison */}
      <div>
        <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Grade Ladder — What Each Level Looks Like</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.values(examStrategy.gradeDescriptors).map(grade => {
            const colors: Record<string, string> = { rose: '#ef4444', amber: '#f59e0b', emerald: '#c9a7eb', cyan: '#ff6aa8' };
            const c = colors[grade.colour];
            return (
              <div key={grade.label} style={{ background: '#14091f', border: `1px solid ${c}30`, borderRadius: 12 }} className="p-4">
                <div style={{ color: c, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>{grade.label}</div>
                <ul className="space-y-1.5">
                  {grade.characteristics.map((ch, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: c, flexShrink: 0, marginTop: 5 }} />
                      <span style={{ color: '#94a3b8', fontSize: 11, lineHeight: 1.5 }}>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer architecture */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>The Distinction-Level Answer Architecture</div>
        <div className="space-y-3">
          {examStrategy.answerArchitecture.map(step => (
            <div key={step.step} className="flex gap-3">
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,106,168,0.15)', border: '1px solid rgba(255,106,168,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 800 }}>{step.step}</span>
              </div>
              <div>
                <div style={{ color: '#38bdf8', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{step.label}</div>
                <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High mark phrases */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>High-Mark Phrases — Use These in Your Answers</div>
        <div className="space-y-2">
          {examStrategy.highMarkPhrases.map((phrase, i) => (
            <div key={i} style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.15)', borderRadius: 8, padding: '10px 12px' }}>
              <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.6, fontStyle: 'italic' }}>{phrase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect answer templates */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div className="flex items-center gap-2" style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          <Layers size={13} /> Perfect-Answer Templates
        </div>
        <div className="space-y-3">
          {examStrategy.answerTemplates.map(template => (
            <div key={template.marks} style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '12px 14px' }}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div style={{ color: '#38bdf8', fontSize: 13, fontWeight: 800 }}>{template.marks}</div>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>{template.purpose}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <div style={{ color: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Structure</div>
                  <ol className="space-y-1" style={{ paddingLeft: 18, margin: 0 }}>
                    {template.structure.map(step => (
                      <li key={step} style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.45 }}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Examiner Signal</div>
                  <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.5 }}>{template.examinerSignal}</p>
                  <p style={{ color: '#475569', fontSize: 11, lineHeight: 1.5, marginTop: 8 }}>{template.exampleStem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Command words */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#8b5cf6', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Command Word Decoder</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {examStrategyItems.commandWords.map(cw => (
            <div key={cw.word} style={{ background: '#0a1929', borderRadius: 10, padding: '10px 12px', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#818cf8', fontSize: 13, fontWeight: 800, marginBottom: 4 }}>{cw.word}</div>
              <p style={{ color: '#94a3b8', fontSize: 11, lineHeight: 1.5, marginBottom: 4 }}>{cw.meaning}</p>
              <p style={{ color: '#475569', fontSize: 11, fontStyle: 'italic' }}>{cw.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Command-word drills */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div className="flex items-center gap-2" style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          <Target size={13} /> Command-Word Drills
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examStrategy.commandWordDrills.map(drill => (
            <div key={drill.word} style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ color: '#ff6aa8', fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{drill.word}</div>
              <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>{drill.task}</p>
              <p style={{ color: '#d8b4fe', fontSize: 12, lineHeight: 1.5 }}>{drill.perfectShape}</p>
              <p style={{ color: '#fca5a5', fontSize: 11, lineHeight: 1.45, marginTop: 8 }}>{drill.avoid}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mark allocation guide */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Mark Allocation Guide</div>
        <div className="space-y-2">
          {examStrategyItems.markAllocationGuide.map(row => (
            <div key={row.marks} className="flex gap-3 items-start">
              <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 8, flexShrink: 0 }}>
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

      {/* Issue spotting */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div className="flex items-center gap-2" style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          <Search size={13} /> Issue-Spotting Scenarios
        </div>
        <div className="space-y-3">
          {examStrategy.issueSpottingScenarios.map(scenario => (
            <details key={scenario.title} style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '12px 14px' }}>
              <summary style={{ cursor: 'pointer', color: '#d8b4fe', fontSize: 13, fontWeight: 800 }}>
                {scenario.title}
              </summary>
              <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.6, marginTop: 10 }}>{scenario.scenario}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {scenario.issues.map(issue => (
                  <div key={issue} className="flex items-start gap-2" style={{ background: 'rgba(201,167,235,0.05)', border: '1px solid rgba(201,167,235,0.12)', borderRadius: 8, padding: '8px 10px' }}>
                    <CheckCircle size={11} style={{ color: '#c9a7eb', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: '#94a3b8', fontSize: 11, lineHeight: 1.45 }}>{issue}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: '#ffb4cf', fontSize: 12, lineHeight: 1.5, marginTop: 10 }}>{scenario.ninetyPlusAngle}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Timed marking checklist */}
      <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 14 }} className="p-5">
        <div className="flex items-center gap-2" style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          <Timer size={13} /> Timed Answer Marking Checklist
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examStrategy.timedMarkingChecklist.map(section => (
            <div key={section.phase} style={{ background: '#0f0a19', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 14px' }}>
              <div className="flex items-center justify-between gap-3 flex-wrap" style={{ marginBottom: 8 }}>
                <div style={{ color: '#7dd3fc', fontSize: 13, fontWeight: 800 }}>{section.phase}</div>
                <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700 }}>{section.time}</div>
              </div>
              <div className="space-y-2">
                {section.checks.map(check => (
                  <div key={check} className="flex items-start gap-2">
                    <CheckCircle size={11} style={{ color: '#38bdf8', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ color: '#cbd5e1', fontSize: 11, lineHeight: 1.45 }}>{check}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Self-grading */}
      <div style={{ background: 'rgba(255,106,168,0.06)', border: '1px solid rgba(255,106,168,0.2)', borderRadius: 14 }} className="p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap" style={{ marginBottom: 12 }}>
          <div className="flex items-center gap-2" style={{ color: '#ff6aa8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <ClipboardCheck size={13} /> Mark-Scheme Self-Grading
          </div>
          <div style={{ color: rubricScore >= 80 ? '#c9a7eb' : rubricScore >= 60 ? '#f59e0b' : '#ef4444', fontSize: 20, fontWeight: 900 }}>{rubricScore}%</div>
        </div>
        <div style={{ background: '#2a1938', height: 8, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ width: `${rubricScore}%`, height: '100%', background: rubricScore >= 80 ? '#c9a7eb' : rubricScore >= 60 ? '#f59e0b' : '#ef4444', borderRadius: 8, transition: 'width 0.2s ease' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {examStrategy.selfGradingRubric.map(item => {
            const checked = checkedRubric.includes(item.item);
            return (
              <label key={item.item} className="flex items-start gap-2" style={{ background: checked ? 'rgba(201,167,235,0.1)' : '#0f0a19', border: `1px solid ${checked ? 'rgba(201,167,235,0.25)' : '#2a1938'}`, borderRadius: 8, padding: '9px 10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleRubric(item.item)}
                  style={{ marginTop: 2, accentColor: '#c9a7eb' }}
                />
                <span style={{ color: checked ? '#d8b4fe' : '#94a3b8', fontSize: 12, lineHeight: 1.45, flex: 1 }}>{item.item}</span>
                <span style={{ color: '#64748b', fontSize: 11, fontWeight: 700 }}>{item.weight}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Final cram mode */}
      <div style={{ background: '#14091f', border: '1px solid #2a1938', borderRadius: 14 }} className="p-5">
        <div className="flex items-center gap-2" style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          <Timer size={13} /> Final 24-Hour Cram Mode
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {examStrategy.finalCram.map(section => (
            <div key={section.heading} style={{ background: '#0f0a19', border: '1px solid #2a1938', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ color: '#fbbf24', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>{section.heading}</div>
              <div className="space-y-2">
                {section.items.map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b', flexShrink: 0, marginTop: 6 }} />
                    <p style={{ color: '#cbd5e1', fontSize: 11, lineHeight: 1.45 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examiner criticisms */}
      <div style={{ background: '#14091f', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Common Examiner Criticisms — Avoid These</div>
        <div className="space-y-2">
          {examStrategy.commonExaminerCriticisms.map((c, i) => (
            <div key={i} className="flex items-start gap-2" style={{ background: 'rgba(239,68,68,0.05)', borderRadius: 8, padding: '8px 10px' }}>
              <AlertTriangle size={11} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
              <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-submit checklist */}
      <div style={{ background: 'rgba(201,167,235,0.06)', border: '1px solid rgba(201,167,235,0.2)', borderRadius: 14 }} className="p-5">
        <div style={{ color: '#c9a7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Pre-Submission Checklist</div>
        <div className="space-y-1.5">
          {examStrategy.preSubmitChecklist.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={12} style={{ color: '#c9a7eb', flexShrink: 0 }} />
              <span style={{ color: '#d8b4fe', fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
