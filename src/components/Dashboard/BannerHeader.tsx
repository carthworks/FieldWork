import React from 'react';
import { AssessmentResult } from '@/types/plan';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BannerHeaderProps {
  assessment: AssessmentResult;
}

export const BannerHeader: React.FC<BannerHeaderProps> = ({ assessment }) => {
  const { t } = useLanguage();

  return (
    <div className="dashboard-banner animate-fade-in">
      <div className="banner-sub">
        <span>{assessment.userName}</span>
        <span>·</span>
        <span>{t('plan_years_old', { age: assessment.age })}</span>
        <span>·</span>
        <span className="badge badge-lime" style={{ fontSize: '11px', padding: '2px 8px' }}>
          {assessment.cohort.band} ({assessment.cohort.years})
        </span>
      </div>

      <h1>{assessment.archetypeName}</h1>
      <p className="tagline">{assessment.archetypeTagline}</p>

      <div className="banner-pills">
        <span className="badge badge-neutral">{t('plan_goal_prefix')}: {assessment.goalLabel}</span>
        <span className="badge badge-lime">{t('plan_roadmap_badge', { days: assessment.horizon })}</span>
        <span className="badge badge-neutral">{assessment.paceDescription}</span>
        <span className="badge badge-neutral">{t('plan_peak_clarity', { time: assessment.energyLabel })}</span>
      </div>
    </div>
  );
};
