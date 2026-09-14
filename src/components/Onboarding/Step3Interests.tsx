import React from 'react';
import { PlanFormState, GoalType } from '@/types/plan';
import { INTERESTS } from '@/lib/constants';

interface Step3InterestsProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
}

export const Step3Interests: React.FC<Step3InterestsProps> = ({
  state,
  onChange,
}) => {
  const currentInterests = state.interests || [];
  const count = currentInterests.length;

  const handleToggleInterest = (id: string) => {
    let next: string[];
    if (currentInterests.includes(id)) {
      next = currentInterests.filter((i) => i !== id);
    } else {
      if (count >= 5) return;
      next = [...currentInterests, id];
    }
    onChange({ interests: next });
  };

  return (
    <section className="step">
      <h2>What you care about</h2>
      <p className="sub">
        Pick three to five. These decide what your actions are made of.
      </p>
      <hr className="dotrule" />

      <div className="field">
        <p className="qlabel">Areas of interest</p>
        <p className="hint" id="interestHint">
          {count} of 5 picked
        </p>
        <div className="chips" id="interests">
          {INTERESTS.map((interest) => {
            const isChecked = currentInterests.includes(interest.id);
            const isDisabled = count >= 5 && !isChecked;

            return (
              <label className="chip" key={interest.id}>
                <input
                  type="checkbox"
                  value={interest.id}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleToggleInterest(interest.id)}
                />
                <span>{interest.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="field">
        <label htmlFor="goal">
          If one thing changed in the next few months, what would it be?
        </label>
        <select
          id="goal"
          value={state.goal}
          onChange={(e) => onChange({ goal: e.target.value as GoalType })}
        >
          <option value="promo">Get promoted or take on more scope</option>
          <option value="switch">Move into different work</option>
          <option value="build">Build something of my own</option>
          <option value="lead">Lead people better</option>
          <option value="skill">Get properly good at a hard skill</option>
          <option value="health">Feel healthier and steadier</option>
          <option value="consistent">Just be consistent for once</option>
        </select>
      </div>
    </section>
  );
};
