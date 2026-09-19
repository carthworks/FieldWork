import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Wordmark } from '../Common/Wordmark';
import { LanguageSelector } from '../Common/LanguageSelector';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { AssessmentResult, PlanFormState, PlanSnapshot, TaskItem } from '@/types/plan';
import {
  exportPlanAsJson,
  downloadJsonFile,
  importPlanFromJson,
  loadPlanSnapshots,
  savePlanSnapshot,
  deletePlanSnapshot,
} from '@/lib/storage';

export type StudioViewMode = 'studio' | 'plan' | 'inputs';

interface StudioHeaderProps {
  assessment: AssessmentResult;
  viewMode: StudioViewMode;
  onViewModeChange: (mode: StudioViewMode) => void;
  onRestart: () => void;
  onRequestPeerReview?: () => void;
  formState: PlanFormState;
  completedTasks: Record<string, boolean>;
  onImportPlan: (data: {
    state: PlanFormState;
    completedTasks: Record<string, boolean>;
    customTasks?: Record<number, TaskItem[]>;
  }) => void;
  onRestoreSnapshot: (snapshot: PlanSnapshot) => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  assessment,
  viewMode,
  onViewModeChange,
  onRestart,
  onRequestPeerReview,
  formState,
  completedTasks,
  onImportPlan,
  onRestoreSnapshot,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [snapshots, setSnapshots] = useState<PlanSnapshot[]>([]);
  const [snapshotTitle, setSnapshotTitle] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load snapshots when opening modal
  useEffect(() => {
    if (isBackupModalOpen) {
      setSnapshots(loadPlanSnapshots());
      setSnapshotTitle(`Review ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
      setImportError(null);
      setImportSuccess(false);
    }
  }, [isBackupModalOpen]);

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

  const handleExportJson = () => {
    const jsonStr = exportPlanAsJson(formState, completedTasks, formState.customTasks);
    const filename = `fieldwork-plan-${(formState.name || 'plan').toLowerCase().replace(/[^a-z0-9]/g, '-')}-${assessment.horizon}d.json`;
    downloadJsonFile(filename, jsonStr);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importPlanFromJson(content);
      if (res.success && res.state) {
        onImportPlan({
          state: res.state,
          completedTasks: res.completedTasks || {},
          customTasks: res.customTasks || {},
        });
        setImportSuccess(true);
        setTimeout(() => {
          setIsBackupModalOpen(false);
        }, 1500);
      } else {
        setImportError(res.error || 'Failed to parse plan file.');
      }
    };
    reader.onerror = () => {
      setImportError('Failed to read file from disk.');
    };
    reader.readAsText(file);
  };

  const handleSaveSnapshot = () => {
    const title = snapshotTitle.trim() || `Plan ${new Date().toLocaleDateString()}`;
    const newSnapshot: PlanSnapshot = {
      id: `snap_${Date.now()}`,
      title,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      state: formState,
      completedTasks,
    };
    const updated = savePlanSnapshot(newSnapshot);
    setSnapshots(updated);
    setSnapshotTitle(`Review ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
  };

  const handleDeleteSnapshot = (id: string) => {
    const updated = deletePlanSnapshot(id);
    setSnapshots(updated);
  };

  const handleRestoreSnapshotClick = (snap: PlanSnapshot) => {
    onRestoreSnapshot(snap);
    setIsBackupModalOpen(false);
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

        {/* Mobile Quick Action & Menu Button */}
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
            {isMobileMenuOpen ? t('nav_close') : t('nav_menu')}
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
            {t('nav_studio')}
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'plan' ? 'active' : ''}`}
            onClick={() => onViewModeChange('plan')}
            title="Focus on Full Plan & Roadmap"
          >
            {t('nav_plan_view')}
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'inputs' ? 'active' : ''}`}
            onClick={() => onViewModeChange('inputs')}
            title="Focus on Signals & Inputs"
          >
            {t('nav_signals')}
          </button>
        </div>

        {/* Action Buttons */}
        <button
          type="button"
          className="btn secondary"
          onClick={handleCopySummary}
          style={{ padding: '6px 12px', fontSize: '12.5px' }}
        >
          {copied ? t('nav_copied') : t('nav_copy_plan')}
        </button>

        <button
          type="button"
          className="btn secondary"
          onClick={handlePrint}
          style={{ padding: '6px 12px', fontSize: '12.5px' }}
        >
          {t('nav_export_pdf')}
        </button>

        <button
          type="button"
          className="btn secondary"
          onClick={() => setIsBackupModalOpen(true)}
          style={{ padding: '6px 12px', fontSize: '12.5px' }}
          title="Export/Import JSON backup or manage saved plan snapshots"
        >
          {t('nav_data_snapshots')}
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
            {t('nav_review_360')}
          </button>
        )}

        {/* Language Selector Dropdown */}
        <LanguageSelector variant="header" />

        <Link
          href="/how-to"
          className="btn quiet"
          style={{ padding: '6px 10px', fontSize: '12.5px' }}
          title="Learn how to use Fieldwork and explore deliverables"
        >
          {t('nav_guide')}
        </Link>

        <button
          type="button"
          className="btn quiet"
          onClick={onRestart}
          style={{ padding: '6px 10px', fontSize: '12.5px' }}
          title="Reset answers to default"
        >
          {t('nav_reset')}
        </button>
      </div>

      {/* Mobile Full-Width View Switcher Bar */}
      <div className="view-switcher mobile-only-switcher" role="tablist" aria-label="Mobile Layout View">
        <button
          type="button"
          className={`view-btn ${viewMode === 'studio' ? 'active' : ''}`}
          onClick={() => onViewModeChange('studio')}
        >
          {t('nav_studio')}
        </button>
        <button
          type="button"
          className={`view-btn ${viewMode === 'plan' ? 'active' : ''}`}
          onClick={() => onViewModeChange('plan')}
        >
          {t('nav_plan_view')}
        </button>
        <button
          type="button"
          className={`view-btn ${viewMode === 'inputs' ? 'active' : ''}`}
          onClick={() => onViewModeChange('inputs')}
        >
          {t('nav_signals')}
        </button>
      </div>

      {/* Mobile Drawer / Actions Dropdown */}
      {isMobileMenuOpen && (
        <div className="studio-mobile-menu">
          {/* Mobile Language Selector */}
          <div style={{ padding: '4px 0 10px', borderBottom: '1px solid var(--white-a10)', marginBottom: '8px' }}>
            <LanguageSelector variant="drawer" />
          </div>

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
              🔗 {t('nav_review_360')}
            </button>
          )}

          <button
            type="button"
            className="btn secondary"
            onClick={handleCopySummary}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            📋 {copied ? t('nav_copied') : t('nav_copy_plan')}
          </button>

          <button
            type="button"
            className="btn secondary"
            onClick={handlePrint}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            📄 {t('nav_export_pdf')}
          </button>

          <button
            type="button"
            className="btn secondary"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsBackupModalOpen(true);
            }}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            {t('nav_data_snapshots')}
          </button>

          <Link
            href="/how-to"
            className="btn secondary"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            📖 {t('nav_guide')}
          </Link>

          <button
            type="button"
            className="btn quiet"
            onClick={handleMobileRestart}
            style={{ justifyContent: 'flex-start', padding: '8px 14px', color: 'var(--rose-500)' }}
          >
            🔄 {t('nav_reset')}
          </button>
        </div>
      )}

      {/* Backup, Restore & Snapshots Modal */}
      {isBackupModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="backup-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setIsBackupModalOpen(false)}
        >
          <div
            className="hf-card"
            style={{
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#14171a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid var(--white-a10)',
                paddingBottom: '12px',
              }}
            >
              <h3
                id="backup-modal-title"
                style={{
                  margin: 0,
                  fontSize: '18px',
                  fontFamily: 'var(--font-grotesk)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>💾</span> {t('modal_data_title')}
              </h3>
              <button
                type="button"
                onClick={() => setIsBackupModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--white-a50)',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Section 1: File Export & Import */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--lime-100)', letterSpacing: '0.04em', margin: '0 0 8px' }}>
                {t('modal_json_section')}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--white-a70)', margin: '0 0 12px', lineHeight: 1.45 }}>
                {t('modal_json_desc')}
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleExportJson}
                  style={{ padding: '8px 14px', fontSize: '12.5px' }}
                >
                  {t('modal_btn_download_json')}
                </button>

                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ padding: '8px 14px', fontSize: '12.5px' }}
                >
                  {t('modal_btn_import_json')}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>

              {importSuccess && (
                <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(209, 254, 23, 0.1)', border: '1px solid var(--lime-100)', borderRadius: 'var(--r-md)', color: 'var(--lime-100)', fontSize: '12.5px' }}>
                  {t('modal_import_success')}
                </div>
              )}

              {importError && (
                <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--r-md)', color: '#ef4444', fontSize: '12.5px' }}>
                  {importError || t('modal_import_error')}
                </div>
              )}
            </div>

            {/* Section 2: Local Version Snapshots */}
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--lime-100)', letterSpacing: '0.04em', margin: '0 0 8px' }}>
                {t('modal_snapshot_section')}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--white-a70)', margin: '0 0 12px', lineHeight: 1.45 }}>
                {t('modal_snapshot_desc')}
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder={t('modal_snapshot_placeholder')}
                  value={snapshotTitle}
                  onChange={(e) => setSnapshotTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveSnapshot()}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--r-md)',
                    padding: '8px 12px',
                    color: 'var(--white)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleSaveSnapshot}
                  style={{ padding: '8px 14px', fontSize: '12.5px', whiteSpace: 'nowrap' }}
                >
                  {t('modal_btn_save_snapshot')}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {snapshots.length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--white-a40)', margin: 0, fontStyle: 'italic' }}>
                    {t('modal_snapshot_none')}
                  </p>
                ) : (
                  snapshots.map((snap) => (
                    <div
                      key={snap.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--r-md)',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--white)' }}>
                          {snap.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--white-a50)', marginTop: '2px' }}>
                          Saved {snap.createdAt} · {snap.state.role} · {snap.state.horizon}d horizon
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          className="btn primary"
                          onClick={() => handleRestoreSnapshotClick(snap)}
                          style={{ padding: '4px 10px', fontSize: '11.5px' }}
                        >
                          {t('modal_btn_load')}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSnapshot(snap.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--white-a40)',
                            fontSize: '13px',
                            cursor: 'pointer',
                            padding: '4px 6px',
                          }}
                          title={t('modal_btn_delete')}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
