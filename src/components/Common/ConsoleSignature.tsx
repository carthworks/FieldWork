'use client';

import { useEffect, useRef } from 'react';
import { loadSavedFormState, loadCompletedTasks, clearSavedPlan } from '@/lib/storage';
import { generatePlan } from '@/lib/engine';

export function ConsoleSignature() {
  const hasExecutedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasExecutedRef.current) return;
    hasExecutedRef.current = true;

    // Signature Styling Tokens (Higgsfield Palette)
    const headerStyle = [
      'color: #d1fe17',
      'background: #0f1113',
      'font-family: "Space Grotesk", monospace, sans-serif',
      'font-size: 13px',
      'font-weight: bold',
      'padding: 8px 14px',
      'border-left: 3px solid #d1fe17',
      'border-radius: 4px',
    ].join(';');

    const titleStyle = [
      'color: #ffffff',
      'background: #1a1d20',
      'font-family: Inter, system-ui, sans-serif',
      'font-size: 11px',
      'font-weight: 600',
      'padding: 3px 8px',
      'border-radius: 3px',
    ].join(';');

    const labelStyle = [
      'color: #898a8b',
      'font-family: monospace',
      'font-size: 11px',
      'font-weight: 500',
    ].join(';');

    const valueStyle = [
      'color: #d1fe17',
      'font-family: monospace',
      'font-size: 11px',
      'font-weight: bold',
    ].join(';');

    const linkStyle = [
      'color: #80c5ff',
      'font-family: monospace',
      'font-size: 11px',
      'text-decoration: underline',
    ].join(';');

    const hintStyle = [
      'color: #ffffff',
      'background: rgba(209, 254, 23, 0.12)',
      'font-family: monospace',
      'font-size: 10.5px',
      'padding: 4px 8px',
      'border-radius: 3px',
      'border: 1px solid rgba(209, 254, 23, 0.25)',
    ].join(';');

    // ASCII Art & Title
    const asciiBanner = `
███████╗██╗███████╗██╗     ██████╗ ██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔════╝██║██╔════╝██║     ██╔══██╗██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
█████╗  ██║█████╗  ██║     ██║  ██║██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
██╔══╝  ██║██╔══╝  ██║     ██║  ██║██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
██║     ██║███████╗███████╗██████╔╝╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚═╝     ╚═╝╚══════╝╚══════╝╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`;

    console.groupCollapsed(
      '%c✦ FIELDWORK STUDIO v1.0.0 — Crafted by @carthworks',
      headerStyle
    );

    console.log(`%c${asciiBanner}`, 'color: #d1fe17; font-family: monospace; font-size: 10px; font-weight: bold;');

    console.log(
      '%cProject:     %cFieldwork — Real-time Development Studio\n' +
      '%cArchitecture:%cNext.js 15 App Router · React 19 · TypeScript · Higgsfield Design\n' +
      '%cCompute:     %c100% Client-side deterministic calculation (zero telemetry/trackers)\n' +
      '%cAuthor:      %cKarthikeyan T (@carthworks)\n' +
      '%cGitHub:      %chttps://github.com/carthworks\n' +
      '%cLinkedIn:    %chttps://www.linkedin.com/in/carthworks\n' +
      '%cLicense:     %cApache-2.0 / MIT Open Source',
      labelStyle, valueStyle,
      labelStyle, valueStyle,
      labelStyle, valueStyle,
      labelStyle, valueStyle,
      labelStyle, linkStyle,
      labelStyle, linkStyle,
      labelStyle, valueStyle
    );

    console.log(
      '%c💡 Tip: Explore live state in DevTools by typing `Fieldwork.help()`',
      hintStyle
    );

    console.groupEnd();

    // Register Global DevTools Helper (window.Fieldwork)
    const fieldworkHelper = {
      version: '1.0.0',
      developer: {
        name: 'Karthikeyan T',
        handle: '@carthworks',
        github: 'https://github.com/carthworks',
        linkedin: 'https://www.linkedin.com/in/carthworks',
      },
      getPlan: () => {
        const state = loadSavedFormState();
        const tasks = loadCompletedTasks();
        const assessment = generatePlan(state);
        console.info('📊 Fieldwork Assessment Data:', { state, tasks, assessment });
        return { state, tasks, assessment };
      },
      getState: () => loadSavedFormState(),
      getCompletedTasks: () => loadCompletedTasks(),
      reset: () => {
        if (window.confirm('Reset all Fieldwork signals and completed tasks?')) {
          clearSavedPlan();
          window.location.reload();
        }
      },
      help: () => {
        console.table([
          { Command: 'Fieldwork.getPlan()', Description: 'Outputs the complete computed assessment, archetypes, and tasks' },
          { Command: 'Fieldwork.getState()', Description: 'Returns the current input signals (traits, role, DOB, etc.)' },
          { Command: 'Fieldwork.getCompletedTasks()', Description: 'Returns checked roadmap tasks dictionary' },
          { Command: 'Fieldwork.reset()', Description: 'Clears saved progress from localStorage and reloads' },
          { Command: 'Fieldwork.developer', Description: 'Author and project metadata' },
          { Command: 'Fieldwork.version', Description: 'Installed build version' },
        ]);
        return 'Fieldwork DevTools ready.';
      },
    };

    (window as unknown as { Fieldwork: typeof fieldworkHelper }).Fieldwork = fieldworkHelper;
  }, []);

  return null;
}
