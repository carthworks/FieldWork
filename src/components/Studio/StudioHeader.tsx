import React, { useState } from 'react';
import Link from 'next/link';
import { Wordmark } from '../Common/Wordmark';
import { AssessmentResult } from '@/types/plan';

export type StudioViewMode = 'studio' | 'plan' | 'inputs';

interface StudioHeaderProps {
  assessment: AssessmentResult;
  viewMode: StudioViewMode;
  onViewModeChange: (mode: StudioViewMode) => void;
  onRestart: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  assessment,
  viewMode,
  onViewModeChange,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopySummary = async () => {
    try {
      const summaryLines = [
        `# Fieldwork Development Plan for ${assessment.userName}`,
        `**Archetype**: ${assessment.archetypeName}`,
        `*${assessment.archetypeTagline}*`,
        ``,
        `### Horizon: ${assessment.horizon} days | Pace: ${assessment.paceDescription}`,
        `**Goal**: ${assessment.goalLabel} | **Peak Energy**: ${assessment.energyLabel}`,
        ``,
        `### Key Strengths to Lean On:`,
        ...assessment.strengths.map((s) => `- **${s.title}**: ${s.advice}`),
        ``,
        `### Where to Put the Work:`,
        ...assessment.focusItems.map((f) => `- **${f.title}**: ${f.why}`),
        ``,
        `### Generational Alignment (${assessment.playbook.generation}):`,
        `- **Stereotype Myth**: ${assessment.playbook.stereotype}`,
        `- **Plain Truth**: ${assessment.playbook.plainTruth}`,
        `- **Thrive Factors**: ${assessment.playbook.thriveFactors.join(', ')}`,
        `- **Leadership Needs**: ${assessment.playbook.leadershipNeeds.join('; ')}`,
        `- **How to Work With Me Script**: ${assessment.playbook.simpleScript}`,
        ``,
        `### Action Roadmap:`,
        ...assessment.phases.flatMap((phase) => [
          `#### ${phase.label} — ${phase.title}`,
          ...phase.tasks.map((t) => `- [ ] ${t.text}`),
        ]),
        ``,
        `### Weekly Habits:`,
        ...assessment.habits.map((h) => `- ${h}`),
      ];

      await navigator.clipboard.writeText(summaryLines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  return (
    <header className="studio-header no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Wordmark />
        <span className="badge badge-lime" title="Live Calculated Archetype">
          {assessment.archetypeName}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Layout Mode Switcher */}
        <div className="view-switcher" role="tablist" aria-label="Layout View">
          <button
            type="button"
            className={`view-btn ${viewMode === 'studio' ? 'active' : ''}`}
            onClick={() => onViewModeChange('studio')}
            title="Side-by-side Inputs & Live Plan"
          >
            Studio
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'plan' ? 'active' : ''}`}
            onClick={() => onViewModeChange('plan')}
            title="Focus on Full Plan & Roadmap"
          >
            Plan View
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'inputs' ? 'active' : ''}`}
            onClick={() => onViewModeChange('inputs')}
            title="Focus on Signals & Inputs"
          >
            Signals
          </button>
        </div>

        {/* Action Buttons */}
        <button
          type="button"
          className="btn secondary"
          onClick={handleCopySummary}
          style={{ padding: '6px 12px', fontSize: '12.5px' }}
        >
          {copied ? '✓ Copied' : 'Copy Plan'}
        </button>

        <button
          type="button"
          className="btn secondary"
          onClick={handlePrint}
          style={{ padding: '6px 12px', fontSize: '12.5px' }}
        >
          Export PDF
        </button>

        <Link
          href="/how-to"
          className="btn quiet"
          style={{ padding: '6px 10px', fontSize: '12.5px' }}
          title="Learn how to use Fieldwork and explore deliverables"
        >
          Guide &amp; Deliverables
        </Link>

        <button
          type="button"
          className="btn quiet"
          onClick={onRestart}
          style={{ padding: '6px 10px', fontSize: '12.5px' }}
          title="Reset answers to default"
        >
          Reset
        </button>
      </div>
    </header>
  );
};
