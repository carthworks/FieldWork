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
import {
  TRAITS,
  INTERESTS,
  GENERATION_GUIDES,
  FORCED_CHOICE_PAIRS,
  REVERSE_PROBES,
  PERSONA_PRESETS,
} from '@/lib/constants';
import {
  calculateAgeFromDob,
  getGenerationGuide,
  calculateSignalQuality,
} from '@/lib/engine';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface SignalsPanelProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
}

export const SignalsPanel: React.FC<SignalsPanelProps> = ({
  state,
  onChange,
}) => {
  const { t: translate } = useLanguage();
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
      {/* 00. Fast-Start Persona Presets */}
      <div
        className="hf-card"
        style={{
          background: 'linear-gradient(135deg, rgba(209, 254, 23, 0.08) 0%, rgba(26, 29, 32, 0.7) 100%)',
          border: '1px solid rgba(209, 254, 23, 0.3)',
          padding: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>⚡</span>
            <span
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontWeight: 700,
                fontSize: '12.5px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--lime-100)',
              }}
            >
              Fast-Start Archetype Presets
            </span>
          </div>
          <span className="badge badge-neutral" style={{ fontSize: '11px', padding: '2px 7px' }}>1-Click Load</span>
        </div>

        <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--white-a70)', lineHeight: 1.4 }}>
          Jump straight into a calibrated roadmap or use them as a starting baseline:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PERSONA_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.state)}
              className="hover-lime-border"
              title={preset.tagline}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--r-md)',
                padding: '5px 10px',
                fontSize: '12px',
                color: 'var(--white-a90)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{preset.icon}</span>
              <span style={{ fontWeight: 500 }}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

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
          <label htmlFor="user-name">{translate('field_full_name')}</label>
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
            <label htmlFor="user-dob">{translate('field_dob')}</label>
            <input
              id="user-dob"
              type="date"
              value={state.dob || ''}
              onChange={(e) => handleDobChange(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="user-age">{translate('field_age')}</label>
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
          <label htmlFor="user-role">{translate('field_role')}</label>
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
            <label htmlFor="user-hours">{translate('field_target_hours')}</label>
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
            <label htmlFor="user-energy">{translate('field_peak_energy')}</label>
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

      {/* 03. Operating Traits & Forced Choices */}
      <div className="hf-card">
        <div className="hf-card-header">
          <div className="title-group">
            <h3>03. Operating Traits</h3>
            <span className="desc">
              Grounded behavioral pairs &amp; calibrated sliders.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {calculateSignalQuality(state.traits, state.reverseProbes).straightLined ? (
              <span className="badge badge-rose" title="Variance too low: push your extremes">
                Straight-Lined
              </span>
            ) : calculateSignalQuality(state.traits, state.reverseProbes).status === 'high_contrast' ? (
              <span className="badge badge-lime">High Contrast</span>
            ) : (
              <span className="badge badge-neutral">Calibrated</span>
            )}
          </div>
        </div>

        <div className="sliders-container">
          {TRAITS.map((t) => {
            const currentVal = state.traits[t.id] ?? 5;

            // Forced-Choice Pair: Follow-through
            if (t.id === 'follow') {
              const fc = FORCED_CHOICE_PAIRS.follow;
              const isRestart = currentVal <= 5;
              const isFinishBadly = currentVal > 5;

              return (
                <div
                  key="fc-follow"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid rgba(209, 254, 23, 0.25)',
                    borderRadius: 'var(--r-md)',
                    padding: '12px 14px',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-lime" style={{ fontSize: '10.5px' }}>Forced-Choice</span>
                      <strong style={{ fontSize: '13px', color: 'var(--white)' }}>{fc.title}</strong>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--lime-100)', fontFamily: 'var(--font-grotesk)', fontWeight: 700 }}>
                      Score: {currentVal} / 10
                    </span>
                  </div>

                  <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: 'var(--white-a80)', lineHeight: 1.4 }}>
                    {fc.scenario}
                  </p>

                  <div className="forced-choice-grid">
                    <button
                      type="button"
                      onClick={() => handleTraitChange('follow', 3)}
                      style={{
                        textAlign: 'left',
                        padding: '10px 12px',
                        minHeight: '48px',
                        borderRadius: 'var(--r-default)',
                        background: isRestart ? 'var(--lime-50-a20)' : 'var(--white-a5)',
                        border: `1px solid ${isRestart ? 'var(--lime-100)' : 'var(--white-a10)'}`,
                        color: isRestart ? 'var(--lime-100)' : 'var(--white-a80)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: '3px', color: isRestart ? 'var(--white)' : 'var(--white-a90)' }}>
                        Scrap &amp; Restart Fresh
                      </strong>
                      <span style={{ fontSize: '11.5px', color: isRestart ? 'var(--white-a80)' : 'var(--white-a60)' }}>
                        I&rsquo;d rather abandon stalled work and chase a fresh idea.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTraitChange('follow', 9)}
                      style={{
                        textAlign: 'left',
                        padding: '10px 12px',
                        minHeight: '48px',
                        borderRadius: 'var(--r-default)',
                        background: isFinishBadly ? 'var(--lime-50-a20)' : 'var(--white-a5)',
                        border: `1px solid ${isFinishBadly ? 'var(--lime-100)' : 'var(--white-a10)'}`,
                        color: isFinishBadly ? 'var(--lime-100)' : 'var(--white-a80)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: '3px', color: isFinishBadly ? 'var(--white)' : 'var(--white-a90)' }}>
                        Finish It Badly
                      </strong>
                      <span style={{ fontSize: '11.5px', color: isFinishBadly ? 'var(--white-a80)' : 'var(--white-a60)' }}>
                        I&rsquo;d rather finish it badly than leave it half-done.
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            // Forced-Choice Pair: Appetite for Challenge / Drive
            if (t.id === 'drive') {
              const fc = FORCED_CHOICE_PAIRS.drive;
              const isFortify = currentVal <= 5;
              const isStretch = currentVal > 5;

              return (
                <div
                  key="fc-drive"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid rgba(209, 254, 23, 0.25)',
                    borderRadius: 'var(--r-md)',
                    padding: '12px 14px',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-lime" style={{ fontSize: '10.5px' }}>Forced-Choice</span>
                      <strong style={{ fontSize: '13px', color: 'var(--white)' }}>{fc.title}</strong>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--lime-100)', fontFamily: 'var(--font-grotesk)', fontWeight: 700 }}>
                      Score: {currentVal} / 10
                    </span>
                  </div>

                  <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: 'var(--white-a80)', lineHeight: 1.4 }}>
                    {fc.scenario}
                  </p>

                  <div className="forced-choice-grid">
                    <button
                      type="button"
                      onClick={() => handleTraitChange('drive', 3)}
                      style={{
                        textAlign: 'left',
                        padding: '10px 12px',
                        minHeight: '48px',
                        borderRadius: 'var(--r-default)',
                        background: isFortify ? 'var(--lime-50-a20)' : 'var(--white-a5)',
                        border: `1px solid ${isFortify ? 'var(--lime-100)' : 'var(--white-a10)'}`,
                        color: isFortify ? 'var(--lime-100)' : 'var(--white-a80)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: '3px', color: isFortify ? 'var(--white)' : 'var(--white-a90)' }}>
                        Fortify What Works
                      </strong>
                      <span style={{ fontSize: '11.5px', color: isFortify ? 'var(--white-a80)' : 'var(--white-a60)' }}>
                        Master and optimize a proven domain without risking public failure.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTraitChange('drive', 9)}
                      style={{
                        textAlign: 'left',
                        padding: '10px 12px',
                        minHeight: '48px',
                        borderRadius: 'var(--r-default)',
                        background: isStretch ? 'var(--lime-50-a20)' : 'var(--white-a5)',
                        border: `1px solid ${isStretch ? 'var(--lime-100)' : 'var(--white-a10)'}`,
                        color: isStretch ? 'var(--lime-100)' : 'var(--white-a80)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: 1.35,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: '3px', color: isStretch ? 'var(--white)' : 'var(--white-a90)' }}>
                        Push Into the Deep End
                      </strong>
                      <span style={{ fontSize: '11.5px', color: isStretch ? 'var(--white-a80)' : 'var(--white-a60)' }}>
                        Chase an ambiguous, high-stakes stretch even if it might fail.
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            // Regular Sliders for Curiosity, Social, Read, Steady
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

        {/* Reverse-Worded Verification Probes */}
        <div
          style={{
            marginTop: '18px',
            borderTop: '1px solid var(--white-a10)',
            paddingTop: '14px',
          }}
        >
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lime-100)', display: 'block' }}>
              ✦ Reverse-Worded Calibration Probes
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--neutral-500)' }}>
              Tests whether self-rated traits hold under real delivery pressure.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {REVERSE_PROBES.map((probe) => {
              const currentScore = state.reverseProbes?.[probe.id] ?? 3;

              return (
                <div
                  key={probe.id}
                  style={{
                    background: 'var(--white-a5)',
                    border: '1px solid var(--white-a10)',
                    borderRadius: 'var(--r-default)',
                    padding: '8px 10px',
                  }}
                >
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: 'var(--white-a90)', lineHeight: 1.4 }}>
                    &ldquo;{probe.statement}&rdquo;
                  </p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--white-a50)', whiteSpace: 'nowrap' }}>Disagree</span>
                    <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className="probe-btn"
                          onClick={() => {
                            const next = { ...state.reverseProbes, [probe.id]: val };
                            onChange({ reverseProbes: next });
                          }}
                          style={{
                            border: `1px solid ${
                              currentScore === val ? 'var(--lime-100)' : 'var(--white-a10)'
                            }`,
                            background:
                              currentScore === val ? 'var(--lime-50-a20)' : 'transparent',
                            color: currentScore === val ? 'var(--lime-100)' : 'var(--white-a70)',
                          }}
                          title={`Score ${val} of 5`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--white-a50)', whiteSpace: 'nowrap' }}>Agree</span>
                  </div>
                </div>
              );
            })}
          </div>
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
          <label htmlFor="user-goal">{translate('field_goal')}</label>
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
          <label htmlFor="user-blocker">{translate('field_blocker')}</label>
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
          <label htmlFor="user-learn">{translate('field_learning')}</label>
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
          <label>{translate('field_horizon')}</label>
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
            {translate('field_notes')}{' '}
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
