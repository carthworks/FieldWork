import React from 'react';
import {
  PlanFormState,
  BlockerType,
  LearningStyle,
  PlanningHorizon,
} from '@/types/plan';

interface Step4ObstaclesProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
}

export const Step4Obstacles: React.FC<Step4ObstaclesProps> = ({
  state,
  onChange,
}) => {
  return (
    <section className="step">
      <h2>What&apos;s in the way</h2>
      <p className="sub">
        The honest answer here changes the plan more than anything else
        you&apos;ve told us.
      </p>
      <hr className="dotrule" />

      <div className="field">
        <label htmlFor="blocker">What usually stops you?</label>
        <select
          id="blocker"
          value={state.blocker}
          onChange={(e) =>
            onChange({ blocker: e.target.value as BlockerType })
          }
        >
          <option value="time">There isn&apos;t enough time</option>
          <option value="focus">I start well and drift</option>
          <option value="judged">I hold back in case it&apos;s judged</option>
          <option value="plan">I don&apos;t know what the next step is</option>
          <option value="energy">
            I run out of energy before I get to it
          </option>
          <option value="finish">
            I start things and don&apos;t finish them
          </option>
        </select>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="learn">How does new material stick best for you?</label>
          <select
            id="learn"
            value={state.learn}
            onChange={(e) =>
              onChange({ learn: e.target.value as LearningStyle })
            }
          >
            <option value="doing">By building something with it</option>
            <option value="reading">By reading and taking notes</option>
            <option value="teaching">By explaining it to someone</option>
            <option value="watching">By watching someone do it first</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="horizon">How far out should the plan run?</label>
          <select
            id="horizon"
            value={state.horizon}
            onChange={(e) =>
              onChange({ horizon: Number(e.target.value) as PlanningHorizon })
            }
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">
          Anything the sliders missed?{' '}
          <span style={{ fontWeight: 400, color: 'var(--muted)' }}>
            (optional)
          </span>
        </label>
        <textarea
          id="notes"
          placeholder="One or two lines is plenty."
          value={state.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </div>
    </section>
  );
};
