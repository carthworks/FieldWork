import React from 'react';
import { PlanFormState, RoleType, EnergyTime } from '@/types/plan';

interface Step1AboutProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
}

export const Step1About: React.FC<Step1AboutProps> = ({ state, onChange }) => {
  return (
    <section className="step">
      <h2>About you</h2>
      <p className="sub">
        Age sets the life-stage lens. Everything else is read against it.
      </p>
      <hr className="dotrule" />

      <div className="row">
        <div className="field">
          <label htmlFor="name">What should we call you?</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={state.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="age">Your age</label>
          <input
            id="age"
            type="number"
            min="13"
            max="99"
            inputMode="numeric"
            placeholder="e.g. 34"
            value={state.age ?? ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value, 10) : null;
              onChange({ age: val });
            }}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="role">What takes up most of your week?</label>
        <select
          id="role"
          value={state.role}
          onChange={(e) => onChange({ role: e.target.value as RoleType })}
        >
          <option value="studying">Studying</option>
          <option value="early">An early-career job</option>
          <option value="ic">Individual contributor work</option>
          <option value="lead">Leading a team</option>
          <option value="founder">Running my own thing</option>
          <option value="between">Between roles right now</option>
          <option value="care">Caring for family</option>
        </select>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="hours">Hours a week you can protect for this</label>
          <select
            id="hours"
            value={state.hours}
            onChange={(e) => onChange({ hours: Number(e.target.value) })}
          >
            <option value="2">Under 3</option>
            <option value="5">3 to 6</option>
            <option value="9">7 to 12</option>
            <option value="15">More than 12</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="energy">When is your head clearest?</label>
          <select
            id="energy"
            value={state.energy}
            onChange={(e) => onChange({ energy: e.target.value as EnergyTime })}
          >
            <option value="morning">Early morning</option>
            <option value="midday">Late morning to midday</option>
            <option value="evening">Evening</option>
            <option value="night">Late night</option>
          </select>
        </div>
      </div>
    </section>
  );
};
