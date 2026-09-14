import React from 'react';
import {
  PlanFormState,
  TraitId,
  RoleType,
  EnergyTime,
  GoalType,
  BlockerType,
  LearningStyle,
  PlanningHorizon,
} from '@/types/plan';
import { TRAITS, INTERESTS, GENERATION_GUIDES } from '@/lib/constants';
import { calculateAgeFromDob, getGenerationGuide } from '@/lib/engine';

interface SignalsPanelProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
}

export const SignalsPanel: React.FC<SignalsPanelProps> = ({
  state,
  onChange,
}) => {
  const { age, birthYear } = calculateAgeFromDob(state.dob, state.age);
  const genGuide = getGenerationGuide(birthYear);
  const pickedInterests = state.interests || [];
  const interestCount = pickedInterests.length;

  const currentThrive = state.thriveFactors && state.thriveFactors.length > 0
    ? state.thriveFactors
    : genGuide.defaultThrive;

  const currentNeeds = state.leadershipNeeds && state.leadershipNeeds.length > 0
    ? state.leadershipNeeds
    : genGuide.defaultNeeds;

  const handleDobChange = (newDob: string) => {
    const { age: newAge } = calculateAgeFromDob(newDob, null);
    const guide = getGenerationGuide(new Date(newDob).getFullYear());
    onChange({
      dob: newDob,
      age: newAge,
      thriveFactors: guide.defaultThrive,
      leadershipNeeds: guide.defaultNeeds,
    });
  };

  const handleAgeDirectChange = (val: number | null) => {
    if (val) {
      const bYear = 2026 - val;
      const guide = getGenerationGuide(bYear);
      onChange({
        age: val,
        dob: `${bYear}-01-01`,
        thriveFactors: guide.defaultThrive,
        leadershipNeeds: guide.defaultNeeds,
      });
    } else {
      onChange({ age: null });
    }
  };

  const handleTraitChange = (id: TraitId, value: number) => {
    onChange({
      traits: {
        ...state.traits,
        [id]: value,
      },
    });
  };

  const handleToggleInterest = (id: string) => {
    let next: string[];
    if (pickedInterests.includes(id)) {
      next = pickedInterests.filter((i) => i !== id);
    } else {
      if (interestCount >= 5) return;
      next = [...pickedInterests, id];
    }
    onChange({ interests: next });
  };

  const handleToggleThrive = (factor: string) => {
    const next = currentThrive.includes(factor)
      ? currentThrive.filter((f) => f !== factor)
      : [...currentThrive, factor];
    onChange({ thriveFactors: next });
  };

  const handleToggleNeed = (need: string) => {
    const next = currentNeeds.includes(need)
      ? currentNeeds.filter((n) => n !== need)
      : [...currentNeeds, need];
    onChange({ leadershipNeeds: next });
  };

  // Combine unique available thrive options across generations for user selection
  const allThriveOptions = Array.from(
    new Set(GENERATION_GUIDES.flatMap((g) => g.defaultThrive))
  );

  const allNeedsOptions = Array.from(
    new Set(GENERATION_GUIDES.flatMap((g) => g.defaultNeeds))
  );

  return (
    <aside className="signals-panel-wrapper">
      {/* 01. Profile & Life-Stage Card */}
      <div className="hf-card">
        <div className="hf-card-header">
          <div className="title-group">
            <h3>01. Identity &amp; Generation</h3>
            <span className="desc">
              DOB pinpoints your generational playbook without the stereotypes.
            </span>
          </div>
          <span className="badge badge-lime">
            {genGuide.name} ({genGuide.years})
          </span>
        </div>

        <div className="field">
          <label htmlFor="user-name">Your Name</label>
          <input
            id="user-name"
            type="text"
            placeholder="First name"
            value={state.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="user-dob">Date of Birth (DOB)</label>
            <input
              id="user-dob"
              type="date"
              value={state.dob || ''}
              onChange={(e) => handleDobChange(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="user-age">Age (Auto-calculated)</label>
            <input
              id="user-age"
              type="number"
              min="13"
              max="99"
              placeholder="e.g. 32"
              value={age || ''}
              onChange={(e) => {
                const val = e.target.value ? parseInt(e.target.value, 10) : null;
                handleAgeDirectChange(val);
              }}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="user-role">What takes up most of your week?</label>
          <select
            id="user-role"
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
            <label htmlFor="user-hours">Protected Hours / Week</label>
            <select
              id="user-hours"
              value={state.hours}
              onChange={(e) => onChange({ hours: Number(e.target.value) })}
            >
              <option value="2">Under 3 hours</option>
              <option value="5">3 to 6 hours</option>
              <option value="9">7 to 12 hours</option>
              <option value="15">More than 12 hours</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="user-energy">Peak Clarity Window</label>
            <select
              id="user-energy"
              value={state.energy}
              onChange={(e) =>
                onChange({ energy: e.target.value as EnergyTime })
              }
            >
              <option value="morning">Early morning</option>
              <option value="midday">Late morning / midday</option>
              <option value="evening">Evening</option>
              <option value="night">Late night</option>
            </select>
          </div>
        </div>
      </div>

      {/* 02. Generational Alignment Preferences */}
      <div className="hf-card">
        <div className="hf-card-header">
          <div className="title-group">
            <h3>02. Work Culture &amp; Leadership Fit</h3>
            <span className="desc">
              Select what helps you do your best work and what you need from leaders.
            </span>
          </div>
        </div>

        <div className="field">
          <span className="qlabel" style={{ fontSize: '12.5px', color: 'var(--lime-100)' }}>
            What Helps You Thrive:
          </span>
          <div className="chips-deck" style={{ marginTop: '6px' }}>
            {allThriveOptions.map((factor) => {
              const isChecked = currentThrive.includes(factor);
              return (
                <label className="chip-toggle" key={factor}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleThrive(factor)}
                  />
                  <span>{factor}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="field" style={{ marginTop: '14px' }}>
          <span className="qlabel" style={{ fontSize: '12.5px', color: 'var(--white-a80)' }}>
            What You Need From Leaders / Peers:
          </span>
          <div className="chips-deck" style={{ marginTop: '6px' }}>
            {allNeedsOptions.map((need) => {
              const isChecked = currentNeeds.includes(need);
              return (
                <label className="chip-toggle" key={need}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleNeed(need)}
                  />
                  <span>{need}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* 03. Operating Traits (6 Sliders) */}
      <div className="hf-card">
        <div className="hf-card-header">
          <div className="title-group">
            <h3>03. Operating Traits</h3>
            <span className="desc">
              Rate your actual baseline behaviors on 6 core dimensions.
            </span>
          </div>
          <span className="badge badge-neutral">6 Signals</span>
        </div>

        <div className="sliders-container">
          {TRAITS.map((t) => {
            const currentVal = state.traits[t.id] ?? 5;
            return (
              <div className="slider-item" key={t.id}>
                <div className="slider-top">
                  <span className="slider-name">{t.name}</span>
                  <span className="slider-score">{currentVal} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentVal}
                  aria-label={t.name}
                  onChange={(e) =>
                    handleTraitChange(t.id, Number(e.target.value))
                  }
                />
                <div className="slider-ends">
                  <span>{t.lo}</span>
                  <span>{t.hi}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 04. Focus & Ambition */}
      <div className="hf-card">
        <div className="hf-card-header">
          <div className="title-group">
            <h3>04. Focus &amp; Ambition</h3>
            <span className="desc">
              Select 3 to 5 domains to channel your development work into.
            </span>
          </div>
          <span
            className={`badge ${
              interestCount >= 3 ? 'badge-lime' : 'badge-rose'
            }`}
          >
            {interestCount} / 5 Picked
          </span>
        </div>

        <div className="field">
          <div className="chips-deck">
            {INTERESTS.map((interest) => {
              const isChecked = pickedInterests.includes(interest.id);
              const isDisabled = interestCount >= 5 && !isChecked;

              return (
                <label className="chip-toggle" key={interest.id}>
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

        <div className="field" style={{ marginTop: '14px' }}>
          <label htmlFor="user-goal">Target Goal for this Horizon</label>
          <select
            id="user-goal"
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
      </div>

      {/* 05. Friction & Delivery */}
      <div className="hf-card">
        <div className="hf-card-header">
          <div className="title-group">
            <h3>05. Friction &amp; Delivery</h3>
            <span className="desc">
              Address the exact blocker and pick your execution horizon.
            </span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="user-blocker">Primary Blocker (Honest Read)</label>
          <select
            id="user-blocker"
            value={state.blocker}
            onChange={(e) =>
              onChange({ blocker: e.target.value as BlockerType })
            }
          >
            <option value="time">There isn&apos;t enough time</option>
            <option value="focus">I start well and drift</option>
            <option value="judged">I hold back in case it&apos;s judged</option>
            <option value="plan">I don&apos;t know what the next step is</option>
            <option value="energy">I run out of energy before I get to it</option>
            <option value="finish">I start things and don&apos;t finish them</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="user-learn">How Material Sticks Best</label>
          <select
            id="user-learn"
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
          <label>Plan Horizon</label>
          <div className="segmented-control">
            {([30, 60, 90] as PlanningHorizon[]).map((hz) => (
              <button
                key={hz}
                type="button"
                className={`segment-btn ${state.horizon === hz ? 'active' : ''}`}
                onClick={() => onChange({ horizon: hz })}
              >
                {hz} Days
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="user-notes">
            Additional Context{' '}
            <span style={{ fontWeight: 400, color: 'var(--neutral-500)' }}>
              (optional)
            </span>
          </label>
          <textarea
            id="user-notes"
            placeholder="Key notes, specific targets, or caveats..."
            value={state.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
          />
        </div>
      </div>
    </aside>
  );
};
