import React from 'react';
import { StrengthItem } from '@/types/plan';

interface StrengthsPanelProps {
  strengths: StrengthItem[];
  synergyText: string;
}

export const StrengthsPanel: React.FC<StrengthsPanelProps> = ({
  strengths,
  synergyText,
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
          Strengths to Lean On
        </h3>
        <p>Built from your 3 highest traits.</p>
      </div>

      <ul className="bullet-list">
        {strengths.map((s) => (
          <li key={s.traitId}>
            <b>{s.title}</b>
            <span>{s.advice}</span>
          </li>
        ))}
      </ul>

      {synergyText && (
        <div
          className="hf-card-subtle"
          style={{ marginTop: 'auto', paddingTop: '12px' }}
        >
          <h4
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--lime-100)',
              marginBottom: '4px',
            }}
          >
            Where It Pays Off
          </h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--white-a80)' }}>
            {synergyText}
          </p>
        </div>
      )}
    </div>
  );
};
