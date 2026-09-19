import React from 'react';
import { FocusItem } from '@/types/plan';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface GrowthPanelProps {
  focusItems: FocusItem[];
}

export const GrowthPanel: React.FC<GrowthPanelProps> = ({ focusItems }) => {
  const { t } = useLanguage();

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
          {t('dash_growth_title')}
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
