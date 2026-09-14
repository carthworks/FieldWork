import React, { useState } from 'react';
import { AssessmentResult } from '@/types/plan';
import { Button } from '../Common/Button';

interface DashboardActionsProps {
  assessment: AssessmentResult;
  onRestart: () => void;
}

export const DashboardActions: React.FC<DashboardActionsProps> = ({
  assessment,
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
        `### Action Plan:`,
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
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  return (
    <div className="foot no-print">
      <p>
        Nothing here leaves your browser. Your plan is saved locally on this
        device. You can print it as a PDF or start fresh anytime.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="secondary" onClick={handleCopySummary}>
          {copied ? '✓ Copied Summary' : 'Copy Summary'}
        </Button>
        <Button variant="secondary" id="print" onClick={handlePrint}>
          Save as PDF
        </Button>
        <Button variant="quiet" id="restart" onClick={onRestart}>
          Start over
        </Button>
      </div>
    </div>
  );
};
