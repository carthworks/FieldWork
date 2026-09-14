import React from 'react';
import { CohortInfo } from '@/types/plan';

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
          Your Nature, Read Plainly
        </h3>
        <p>How you operate, unfiltered by cliches.</p>
      </div>

      <div className="nature-comparison">
        <div className="nature-box">
          <h4>Stereotype for your age group</h4>
          <p>{cohort.myth}</p>
        </div>

        <div className="nature-box reality">
          <h4>What your signals actually show</h4>
          <p>{paragraph1}</p>
          <p style={{ marginTop: '8px' }}>{paragraph2}</p>
        </div>
      </div>
    </div>
  );
};
