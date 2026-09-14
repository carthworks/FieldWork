'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { PlanFormState } from '@/types/plan';
import { DEFAULT_PLAN_STATE } from '@/lib/constants';
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

  // Safe hydration from localStorage on client mount
  useEffect(() => {
    const savedState = loadSavedFormState();
    const savedTasks = loadCompletedTasks();
    const savedView = typeof window !== 'undefined'
      ? (localStorage.getItem('fieldwork_view_mode') as StudioViewMode) || 'studio'
      : 'studio';

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
      />

      <main className="studio-main">
        {viewMode === 'studio' && (
          <div className="studio-grid">
            <SignalsPanel state={formState} onChange={handleStateChange} />
            <DashboardView
              assessment={assessment}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
            />
          </div>
        )}

        {viewMode === 'plan' && (
          <div style={{ maxWidth: '1060px', margin: '0 auto', width: '100%' }}>
            <DashboardView
              assessment={assessment}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
            />
          </div>
        )}

        {viewMode === 'inputs' && (
          <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            <SignalsPanel state={formState} onChange={handleStateChange} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
