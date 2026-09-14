import React from 'react';
import { ScoredTrait } from '@/types/plan';

interface TraitScoresPanelProps {
  scoredTraits: ScoredTrait[];
}

export const TraitScoresPanel: React.FC<TraitScoresPanelProps> = ({
  scoredTraits,
}) => {
  return (
    <div className="insight-panel">
      <div className="insight-panel-header">
        <h3>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--lime-100)',
              display: 'inline-block',
            }}
          />
          Key Character Traits
        </h3>
        <p>Ranked from strongest baseline to lowest.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {scoredTraits.map((t) => (
          <div className="trait-row" key={t.id}>
            <div className="trait-info">
              <b>{t.name}</b>
              <i>{t.score} / 10</i>
            </div>
            <div className="trait-meter">
              <div
                className="trait-meter-fill"
                style={{ width: `${t.score * 10}%` }}
              />
            </div>
            <span className="trait-desc">{t.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
