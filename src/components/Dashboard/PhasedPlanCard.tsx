import React from 'react';
import { PhasePlan, PlanningHorizon } from '@/types/plan';

interface PhasedPlanCardProps {
  horizon: PlanningHorizon;
  paceDescription: string;
  phases: PhasePlan[];
  habits: string[];
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
}

export const PhasedPlanCard: React.FC<PhasedPlanCardProps> = ({
  horizon,
  paceDescription,
  phases,
  habits,
  completedTasks,
  onToggleTask,
}) => {
  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / (totalTasks || 1)) * 100);

  return (
    <div className="roadmap-card">
      <div className="roadmap-header">
        <div>
          <h3>Your {horizon}-Day Action Roadmap</h3>
          <p>
            Nine high-leverage steps paced for {paceDescription}. Track your
            progress live.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-lime">
            {doneCount} of {totalTasks} Completed ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="roadmap-phases">
        {phases.map((phase, phaseIdx) => (
          <div className="roadmap-phase-col" key={phaseIdx}>
            <div className="phase-when">{phase.label}</div>
            <h4 className="phase-title">{phase.title}</h4>
            <div>
              {phase.tasks.map((task) => {
                const isChecked = !!completedTasks[task.id];
                return (
                  <label className="task-item" key={task.id}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleTask(task.id)}
                    />
                    <span>{task.text}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
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
