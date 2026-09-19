import React from 'react';
import { CohortInfo } from '@/types/plan';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface NaturePlainlyPanelProps {
  cohort: CohortInfo;
  paragraph1: string;
  paragraph2: string;
}

export const NaturePlainlyPanel: React.FC<NaturePlainlyPanelProps> = ({
  cohort,
  paragraph1,
  paragraph2,
}) => {
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
              background: 'var(--lime-100)',
              display: 'inline-block',
            }}
          />
          {t('nature_title')}
        </h3>
        <p>{t('nature_desc')}</p>
      </div>

      <div className="nature-comparison">
        <div className="nature-box">
          <h4>{t('nature_stereotype')}</h4>
          <p>{cohort.myth}</p>
        </div>

        <div className="nature-box reality">
          <h4>{t('nature_reality')}</h4>
          <p>{paragraph1}</p>
          <p style={{ marginTop: '8px' }}>{paragraph2}</p>
        </div>
      </div>
    </div>
  );
};
