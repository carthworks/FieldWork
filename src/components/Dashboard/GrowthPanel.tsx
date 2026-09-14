import React from 'react';
import { FocusItem } from '@/types/plan';

interface GrowthPanelProps {
  focusItems: FocusItem[];
}

export const GrowthPanel: React.FC<GrowthPanelProps> = ({ focusItems }) => {
  return (
    <div className="insight-panel">
      <div className="insight-panel-header">
        <h3>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--rose-500)',
              display: 'inline-block',
            }}
          />
          Where to Put the Work
        </h3>
        <p>Your two lowest traits + the blocker you identified.</p>
      </div>

      <ul className="bullet-list growth-list">
        {focusItems.map((item, idx) => (
          <li key={idx}>
            <b>{item.title}</b>
            <span>{item.why}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
