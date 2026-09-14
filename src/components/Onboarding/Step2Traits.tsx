import React from 'react';
import { PlanFormState, TraitId } from '@/types/plan';
import { TRAITS } from '@/lib/constants';

interface Step2TraitsProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
}

export const Step2Traits: React.FC<Step2TraitsProps> = ({ state, onChange }) => {
  const handleTraitChange = (id: TraitId, value: number) => {
    onChange({
      traits: {
        ...state.traits,
        [id]: value,
      },
    });
  };

  return (
    <section className="step">
      <h2>How you operate</h2>
      <p className="sub">
        Answer for how you actually behave in a normal week, not how you&apos;d like to.
      </p>
      <hr className="dotrule" />

      <div id="sliders">
        {TRAITS.map((t) => {
          const currentVal = state.traits[t.id] ?? 5;
          return (
            <div className="slider" key={t.id}>
              <div className="top">
                <span className="name" id={`lbl-${t.id}`}>
                  {t.name}
                </span>
                <span className="val" id={`val-${t.id}`}>
                  {currentVal} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={currentVal}
                id={`sl-${t.id}`}
                aria-labelledby={`lbl-${t.id}`}
                onChange={(e) => handleTraitChange(t.id, Number(e.target.value))}
              />
              <div className="ends">
                <span>{t.lo}</span>
                <span>{t.hi}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
