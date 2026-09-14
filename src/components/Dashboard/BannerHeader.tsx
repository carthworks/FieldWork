import React from 'react';
import { AssessmentResult } from '@/types/plan';

interface BannerHeaderProps {
  assessment: AssessmentResult;
}

export const BannerHeader: React.FC<BannerHeaderProps> = ({ assessment }) => {
  return (
    <div className="dashboard-banner animate-fade-in">
      <div className="banner-sub">
        <span>{assessment.userName}</span>
        <span>·</span>
        <span>{assessment.age} yrs</span>
        <span>·</span>
        <span className="badge badge-lime" style={{ fontSize: '11px', padding: '2px 8px' }}>
          {assessment.cohort.band} ({assessment.cohort.years})
        </span>
      </div>

      <h1>{assessment.archetypeName}</h1>
      <p className="tagline">{assessment.archetypeTagline}</p>

      <div className="banner-pills">
        <span className="badge badge-neutral">Goal: {assessment.goalLabel}</span>
        <span className="badge badge-lime">{assessment.horizon}-Day Roadmap</span>
        <span className="badge badge-neutral">{assessment.paceDescription}</span>
        <span className="badge badge-neutral">Peak clarity {assessment.energyLabel}</span>
      </div>
    </div>
  );
};
