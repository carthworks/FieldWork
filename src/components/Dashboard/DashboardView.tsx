import React from 'react';
import { AssessmentResult } from '@/types/plan';
import { BannerHeader } from './BannerHeader';
import { GenerationalPlaybookCard } from './GenerationalPlaybookCard';
import { TraitScoresPanel } from './TraitScoresPanel';
import { StrengthsPanel } from './StrengthsPanel';
import { GrowthPanel } from './GrowthPanel';
import { NaturePlainlyPanel } from './NaturePlainlyPanel';
import { PhasedPlanCard } from './PhasedPlanCard';
import { NotesReviewPanel } from './NotesReviewPanel';

interface DashboardViewProps {
  assessment: AssessmentResult;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  onRequestPeerReview?: () => void;
  onSimulatePeer?: () => void;
  onClearPeer?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  assessment,
  completedTasks,
  onToggleTask,
  onRequestPeerReview,
  onSimulatePeer,
  onClearPeer,
}) => {
  return (
    <section className="dashboard-content animate-fade-in" style={{ width: '100%' }}>
      <BannerHeader assessment={assessment} />

      <GenerationalPlaybookCard playbook={assessment.playbook} />

      <div className="insights-quad">
        <TraitScoresPanel
          scoredTraits={assessment.scoredTraits}
          traits={assessment.traits}
          signalQuality={assessment.signalQuality}
          peerReview={assessment.peerReview}
          perceptionGaps={assessment.perceptionGaps}
          onRequestPeerReview={onRequestPeerReview}
          onSimulatePeer={onSimulatePeer}
          onClearPeer={onClearPeer}
        />
        <StrengthsPanel
          strengths={assessment.strengths}
          synergyText={assessment.interestSynergyText}
        />
        <GrowthPanel focusItems={assessment.focusItems} />
        <NaturePlainlyPanel
          cohort={assessment.cohort}
          paragraph1={assessment.natureParagraph1}
          paragraph2={assessment.natureParagraph2}
        />
      </div>

      <PhasedPlanCard
        horizon={assessment.horizon}
        paceDescription={assessment.paceDescription}
        phases={assessment.phases}
        habits={assessment.habits}
        completedTasks={completedTasks}
        onToggleTask={onToggleTask}
      />

      <NotesReviewPanel notes={assessment.notes} />
    </section>
  );
};
