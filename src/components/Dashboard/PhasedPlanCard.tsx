import React, { useState } from 'react';
import { AssessmentResult, PhasePlan, PlanningHorizon, TaskItem } from '@/types/plan';
import { generateIcsCalendar, downloadIcsFile } from '@/lib/calendar';

interface PhasedPlanCardProps {
  horizon: PlanningHorizon;
  paceDescription: string;
  phases: PhasePlan[];
  habits: string[];
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  assessment: AssessmentResult;
  onUpdatePhaseTasks?: (phaseIdx: number, newTasks: TaskItem[]) => void;
  onResetPhaseTasks?: (phaseIdx: number) => void;
  hasCustomTasks?: boolean;
}

export const PhasedPlanCard: React.FC<PhasedPlanCardProps> = ({
  horizon,
  paceDescription,
  phases,
  habits,
  completedTasks,
  onToggleTask,
  assessment,
  onUpdatePhaseTasks,
  onResetPhaseTasks,
}) => {
  const [copiedIcs, setCopiedIcs] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [addingPhaseIdx, setAddingPhaseIdx] = useState<number | null>(null);
  const [newActionText, setNewActionText] = useState('');

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / (totalTasks || 1)) * 100);

  const handleExportCalendar = () => {
    try {
      const ics = generateIcsCalendar(assessment);
      const filename = `fieldwork-plan-${horizon}d-${(assessment.userName || 'plan').toLowerCase().replace(/[^a-z0-9]/g, '-')}.ics`;
      downloadIcsFile(filename, ics);
      setCopiedIcs(true);
      setTimeout(() => setCopiedIcs(false), 2400);
    } catch (err) {
      console.error('Failed to generate calendar file', err);
    }
  };

  const handleStartEdit = (task: TaskItem) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleSaveEdit = (phaseIdx: number, taskId: string) => {
    if (!onUpdatePhaseTasks) return;
    const trimmed = editingText.trim();
    if (!trimmed) {
      setEditingTaskId(null);
      return;
    }
    const currentPhase = phases[phaseIdx];
    if (!currentPhase) return;
    const updated = currentPhase.tasks.map((t) =>
      t.id === taskId ? { ...t, text: trimmed } : t
    );
    onUpdatePhaseTasks(phaseIdx, updated);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (phaseIdx: number, taskId: string) => {
    if (!onUpdatePhaseTasks) return;
    const currentPhase = phases[phaseIdx];
    if (!currentPhase || currentPhase.tasks.length <= 1) return;
    const updated = currentPhase.tasks.filter((t) => t.id !== taskId);
    onUpdatePhaseTasks(phaseIdx, updated);
  };

  const handleAddCustomTask = (phaseIdx: number) => {
    if (!onUpdatePhaseTasks) return;
    const trimmed = newActionText.trim();
    if (!trimmed) {
      setAddingPhaseIdx(null);
      return;
    }
    const currentPhase = phases[phaseIdx];
    if (!currentPhase) return;
    const newTask: TaskItem = {
      id: `custom_${phaseIdx}_${Date.now()}`,
      text: trimmed,
    };
    onUpdatePhaseTasks(phaseIdx, [...currentPhase.tasks, newTask]);
    setNewActionText('');
    setAddingPhaseIdx(null);
  };

  return (
    <div className="roadmap-card">
      <div className="roadmap-header" style={{ flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3>Your {horizon}-Day Action Roadmap</h3>
          <p>
            High-leverage steps paced for {paceDescription}. Track live, edit actions, or export directly to your calendar.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="badge badge-lime">
            {doneCount} of {totalTasks} Completed ({progressPercent}%)
          </span>

          <button
            type="button"
            className="btn secondary"
            onClick={handleExportCalendar}
            title="Download .ics file to import into Google Calendar, Apple Calendar, or Outlook"
            style={{
              padding: '6px 12px',
              fontSize: '12.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {copiedIcs ? '✓ Calendar Exported!' : '📅 Export Calendar (.ics)'}
          </button>
        </div>
      </div>

      <div className="roadmap-phases">
        {phases.map((phase, phaseIdx) => {
          return (
            <div className="roadmap-phase-col" key={phaseIdx}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '2px',
                }}
              >
                <div className="phase-when">{phase.label}</div>
                {onResetPhaseTasks && (
                  <button
                    type="button"
                    onClick={() => onResetPhaseTasks(phaseIdx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--white-a40)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    className="hover-underline"
                    title="Reset this phase back to recommended defaults"
                  >
                    Reset defaults
                  </button>
                )}
              </div>

              <h4 className="phase-title">{phase.title}</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {phase.tasks.map((task) => {
                  const isChecked = !!completedTasks[task.id];
                  const isEditing = editingTaskId === task.id;

                  if (isEditing) {
                    return (
                      <div
                        key={task.id}
                        style={{
                          background: 'var(--neutral-900)',
                          border: '1px solid var(--lime-100)',
                          borderRadius: 'var(--r-md)',
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        <textarea
                          rows={2}
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSaveEdit(phaseIdx, task.id);
                            } else if (e.key === 'Escape') {
                              setEditingTaskId(null);
                            }
                          }}
                          autoFocus
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--white)',
                            fontSize: '13px',
                            resize: 'none',
                            outline: 'none',
                            fontFamily: 'inherit',
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            type="button"
                            className="btn quiet"
                            onClick={() => setEditingTaskId(null)}
                            style={{ padding: '3px 8px', fontSize: '11.5px' }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn primary"
                            onClick={() => handleSaveEdit(phaseIdx, task.id)}
                            style={{ padding: '3px 10px', fontSize: '11.5px' }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      className="task-row"
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '6px',
                        borderRadius: 'var(--r-md)',
                        padding: '4px 6px',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <label
                        className="task-item"
                        style={{ flex: 1, margin: 0, cursor: 'pointer' }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleTask(task.id)}
                        />
                        <span
                          style={{
                            textDecoration: isChecked ? 'line-through' : 'none',
                            color: isChecked ? 'var(--white-a40)' : 'var(--white-a90)',
                          }}
                        >
                          {task.text}
                        </span>
                      </label>

                      {onUpdatePhaseTasks && (
                        <div
                          className="task-actions no-print"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            opacity: 0.7,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleStartEdit(task)}
                            title="Edit action text"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--white-a60)',
                              fontSize: '12px',
                              cursor: 'pointer',
                              padding: '2px 4px',
                            }}
                          >
                            ✎
                          </button>
                          {phase.tasks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(phaseIdx, task.id)}
                              title="Delete action"
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--white-a40)',
                                fontSize: '12px',
                                cursor: 'pointer',
                                padding: '2px 4px',
                              }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add Custom Task Row */}
                {onUpdatePhaseTasks && (
                  <div style={{ marginTop: '6px' }} className="no-print">
                    {addingPhaseIdx === phaseIdx ? (
                      <div
                        style={{
                          background: 'var(--neutral-900)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: 'var(--r-md)',
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        <input
                          type="text"
                          placeholder="e.g. Write RFC on caching layer..."
                          value={newActionText}
                          onChange={(e) => setNewActionText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddCustomTask(phaseIdx);
                            } else if (e.key === 'Escape') {
                              setAddingPhaseIdx(null);
                            }
                          }}
                          autoFocus
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--white)',
                            fontSize: '13px',
                            outline: 'none',
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            type="button"
                            className="btn quiet"
                            onClick={() => setAddingPhaseIdx(null)}
                            style={{ padding: '3px 8px', fontSize: '11.5px' }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn primary"
                            onClick={() => handleAddCustomTask(phaseIdx)}
                            style={{ padding: '3px 10px', fontSize: '11.5px' }}
                          >
                            Add Action
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAddingPhaseIdx(phaseIdx);
                          setNewActionText('');
                        }}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: '1px dashed var(--white-a15)',
                          borderRadius: 'var(--r-md)',
                          padding: '6px 8px',
                          color: 'var(--white-a60)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'border-color 0.15s, color 0.15s',
                        }}
                        className="hover-lime-border"
                      >
                        <span>+ Add custom action</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="roadmap-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-grotesk), sans-serif',
              fontWeight: 600,
              fontSize: '12.5px',
              color: 'var(--white-a70)',
            }}
          >
            Weekly Habits:
          </span>
          <div className="habits-wrap">
            {habits.map((habit, idx) => (
              <span className="habit-tag" key={idx}>
                {habit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
