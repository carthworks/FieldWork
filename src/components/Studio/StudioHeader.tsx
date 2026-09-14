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
  onRequestPeerReview?: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  assessment,
  viewMode,
  onViewModeChange,
  onRestart,
  onRequestPeerReview,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopySummary = async () => {
    setIsMobileMenuOpen(false);
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

  const handleMobilePeerReview = () => {
    setIsMobileMenuOpen(false);
    if (onRequestPeerReview) onRequestPeerReview();
  };

  const handleMobileRestart = () => {
    setIsMobileMenuOpen(false);
    onRestart();
  };

  return (
    <header className="studio-header no-print">
      {/* Top Bar: Wordmark + Archetype Badge + Mobile Toggle */}
      <div className="studio-header-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wordmark />
          <span className="badge badge-lime" title="Live Calculated Archetype">
            {assessment.archetypeName}
          </span>
        </div>

        {/* Mobile Quick Action & Menu Button (hidden on desktop via CSS) */}
        <div className="studio-mobile-toggle">
          {onRequestPeerReview && (
            <button
              type="button"
              className="btn secondary"
              onClick={onRequestPeerReview}
              style={{
                padding: '5px 9px',
                fontSize: '11.5px',
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.4)',
              }}
              title="Request Colleague 360° Review"
            >
              360°
            </button>
          )}

          <button
            type="button"
            className="btn secondary"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle actions menu"
            style={{ padding: '5px 10px', fontSize: '12px' }}
          >
            {isMobileMenuOpen ? '✕ Close' : '⋯ Menu'}
          </button>
        </div>
      </div>

      {/* Desktop Inline Actions */}
      <div className="studio-header-actions">
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

        {onRequestPeerReview && (
          <button
            type="button"
            className="btn secondary"
            onClick={onRequestPeerReview}
            style={{
              padding: '6px 12px',
              fontSize: '12.5px',
              color: '#38bdf8',
              borderColor: 'rgba(56, 189, 248, 0.4)',
            }}
            title="Request a colleague rating to view a 360 dual-polygon overlay"
          >
            360° Review
          </button>
        )}

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

      {/* Mobile Full-Width View Switcher Bar */}
      <div className="view-switcher mobile-only-switcher" role="tablist" aria-label="Mobile Layout View">
        <button
          type="button"
          className={`view-btn ${viewMode === 'studio' ? 'active' : ''}`}
          onClick={() => onViewModeChange('studio')}
        >
          Studio
        </button>
        <button
          type="button"
          className={`view-btn ${viewMode === 'plan' ? 'active' : ''}`}
          onClick={() => onViewModeChange('plan')}
        >
          Plan View
        </button>
        <button
          type="button"
          className={`view-btn ${viewMode === 'inputs' ? 'active' : ''}`}
          onClick={() => onViewModeChange('inputs')}
        >
          Signals
        </button>
      </div>

      {/* Mobile Drawer / Actions Dropdown */}
      {isMobileMenuOpen && (
        <div className="studio-mobile-menu">
          {onRequestPeerReview && (
            <button
              type="button"
              className="btn secondary"
              onClick={handleMobilePeerReview}
              style={{
                justifyContent: 'flex-start',
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.4)',
                padding: '10px 14px',
              }}
            >
              🔗 Request 360° Colleague Review
            </button>
          )}

          <button
            type="button"
            className="btn secondary"
            onClick={handleCopySummary}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            📋 {copied ? '✓ Plan Copied to Clipboard' : 'Copy Plan Summary'}
          </button>

          <button
            type="button"
            className="btn secondary"
            onClick={handlePrint}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            📄 Export PDF / Print Plan
          </button>

          <Link
            href="/how-to"
            className="btn secondary"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            📖 User Guide &amp; Deliverables
          </Link>

          <button
            type="button"
            className="btn quiet"
            onClick={handleMobileRestart}
            style={{ justifyContent: 'flex-start', padding: '8px 14px', color: 'var(--rose-500)' }}
          >
            🔄 Reset All Inputs to Defaults
          </button>
        </div>
      )}
    </header>
  );
};
