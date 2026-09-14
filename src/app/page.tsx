'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { PlanFormState, TraitId } from '@/types/plan';
import { DEFAULT_PLAN_STATE, TRAITS } from '@/lib/constants';
import { generatePlan } from '@/lib/engine';
import {
  loadSavedFormState,
  saveFormState,
  loadCompletedTasks,
  saveCompletedTasks,
  clearSavedPlan,
} from '@/lib/storage';
import { StudioHeader, StudioViewMode } from '@/components/Studio/StudioHeader';
import { SignalsPanel } from '@/components/Studio/SignalsPanel';
import { DashboardView } from '@/components/Dashboard/DashboardView';
import { Footer } from '@/components/Common/Footer';

export default function HomePage() {
  const [formState, setFormState] = useState<PlanFormState>(DEFAULT_PLAN_STATE);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<StudioViewMode>('studio');
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Safe hydration from localStorage + URL SearchParams on client mount
  useEffect(() => {
    const savedState = loadSavedFormState();
    const savedTasks = loadCompletedTasks();
    const savedView = typeof window !== 'undefined'
      ? (localStorage.getItem('fieldwork_view_mode') as StudioViewMode) || 'studio'
      : 'studio';

    // Parse any incoming peer review data from URL parameters
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const peerRaw = params.get('peer');
      const peerName = params.get('peerName') || 'Jordan (Colleague)';

      if (peerRaw) {
        const parts = peerRaw.split(',').map((p) => Math.max(1, Math.min(10, Number(p) || 5)));
        const peerTraits: Record<TraitId, number> = {
          curiosity: parts[0] ?? 6,
          follow: parts[1] ?? 7,
          social: parts[2] ?? 6,
          read: parts[3] ?? 7,
          steady: parts[4] ?? 7,
          drive: parts[5] ?? 6,
        };
        savedState.peerReview = {
          peerName,
          traits: peerTraits,
          submittedAt: new Date().toISOString(),
        };
      }
    }

    setFormState(savedState);
    setCompletedTasks(savedTasks);
    setViewMode(savedView);
    setIsHydrated(true);
  }, []);

  const handleStateChange = (updates: Partial<PlanFormState>) => {
    setFormState((prev) => {
      const next = { ...prev, ...updates };
      saveFormState(next);
      return next;
    });
  };

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      saveCompletedTasks(next);
      return next;
    });
  };

  const handleViewModeChange = (mode: StudioViewMode) => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fieldwork_view_mode', mode);
    }
  };

  const handleRestart = () => {
    if (
      window.confirm(
        'Reset your development signals back to default values?'
      )
    ) {
      clearSavedPlan();
      setFormState(DEFAULT_PLAN_STATE);
      setCompletedTasks({});
      if (typeof window !== 'undefined') {
        localStorage.removeItem('fieldwork_view_mode');
      }
      setViewMode('studio');
    }
  };

  // Peer review share link URL
  const peerShareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/peer-review?u=${encodeURIComponent(
        formState.name || 'Your Colleague'
      )}&s=${TRAITS.map((t) => formState.traits[t.id] ?? 5).join(',')}`
    : '';

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(peerShareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2400);
    } catch (e) {
      console.error('Failed to copy share link', e);
    }
  };

  const handleSimulatePeer = () => {
    const simTraits: Record<TraitId, number> = {
      curiosity: Math.max(1, Math.min(10, (formState.traits.curiosity || 7) - 2)), // blindspot
      follow: Math.max(1, Math.min(10, (formState.traits.follow || 6) + 2)), // hidden superpower
      social: formState.traits.social || 5,
      read: formState.traits.read || 6,
      steady: Math.max(1, Math.min(10, (formState.traits.steady || 6) + 1)),
      drive: formState.traits.drive || 7,
    };
    handleStateChange({
      peerReview: {
        peerName: 'Jordan (Peer Review)',
        traits: simTraits,
        submittedAt: new Date().toISOString(),
      },
    });
    setIsShareModalOpen(false);
  };

  const handleClearPeer = () => {
    handleStateChange({ peerReview: null });
  };

  // Live real-time deterministic assessment calculation
  const assessment = useMemo(() => {
    return generatePlan(formState);
  }, [formState]);

  if (!isHydrated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f1113',
          color: 'var(--neutral-500)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <p>Loading Studio...</p>
      </div>
    );
  }

  return (
    <div className="studio-root">
      <StudioHeader
        assessment={assessment}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onRestart={handleRestart}
        onRequestPeerReview={() => setIsShareModalOpen(true)}
      />

      <main className="studio-main">
        {viewMode === 'studio' && (
          <div className="studio-grid">
            <SignalsPanel state={formState} onChange={handleStateChange} />
            <DashboardView
              assessment={assessment}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              onRequestPeerReview={() => setIsShareModalOpen(true)}
              onSimulatePeer={handleSimulatePeer}
              onClearPeer={handleClearPeer}
            />
          </div>
        )}

        {viewMode === 'plan' && (
          <div style={{ maxWidth: '1060px', margin: '0 auto', width: '100%' }}>
            <DashboardView
              assessment={assessment}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              onRequestPeerReview={() => setIsShareModalOpen(true)}
              onSimulatePeer={handleSimulatePeer}
              onClearPeer={handleClearPeer}
            />
          </div>
        )}

        {viewMode === 'inputs' && (
          <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            <SignalsPanel state={formState} onChange={handleStateChange} />
          </div>
        )}
      </main>

      {/* 360° Colleague Rating Share Modal */}
      {isShareModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '12px',
          }}
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="hf-card animate-fade-in"
            style={{
              maxWidth: '540px',
              width: '100%',
              padding: '20px 16px',
              borderColor: 'rgba(56, 189, 248, 0.4)',
              background: '#16191c',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#38bdf8',
                  }}
                />
                <h3 style={{ margin: 0, fontSize: '16.5px', color: 'var(--white)' }}>
                  Request Colleague 360° Rating
                </h3>
              </div>
              <button
                type="button"
                className="btn quiet"
                onClick={() => setIsShareModalOpen(false)}
                style={{ padding: '2px 8px', fontSize: '13px' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.5, margin: '0 0 16px' }}>
              Self-ratings only capture your own self-image. Send this private link to a peer, manager,
              or teammate. Their observed ratings will draw an <strong>Electric Cyan polygon</strong> over
              your <strong>Electric Lime hexagon</strong> to reveal blindspots and hidden superpowers.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="share-input" style={{ fontSize: '12px', color: 'var(--white-a70)', marginBottom: '4px', display: 'block' }}>
                Your Shareable 360° Link (Zero Remote Database):
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  id="share-input"
                  type="text"
                  readOnly
                  value={peerShareUrl}
                  style={{
                    flex: '1 1 200px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    color: '#38bdf8',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--white-a15)',
                    padding: '8px 10px',
                    borderRadius: 'var(--r-default)',
                    minWidth: 0,
                  }}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleCopyShareLink}
                  style={{ padding: '8px 14px', fontSize: '12.5px', whiteSpace: 'nowrap', flex: '0 0 auto' }}
                >
                  {copiedShare ? '✓ Copied' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--white-a10)',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <button
                type="button"
                className="btn quiet"
                onClick={handleSimulatePeer}
                style={{ fontSize: '12px', color: '#38bdf8', padding: '6px 10px', textAlign: 'left' }}
              >
                ⚡ Test with Simulated Colleague Data
              </button>

              <button
                type="button"
                className="btn secondary"
                onClick={() => setIsShareModalOpen(false)}
                style={{ fontSize: '12.5px', padding: '6px 14px', minWidth: '80px' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
