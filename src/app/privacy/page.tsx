import React from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/Common/Wordmark';
import { Footer } from '@/components/Common/Footer';

export const metadata = {
  title: 'Privacy Policy & Data Ethics — Fieldwork Studio',
  description:
    'Complete transparency on data handling: 100% client-side calculation, zero cookies, zero trackers, and local-only storage.',
};

export default function PrivacyPage() {
  return (
    <div className="studio-root">
      {/* Top Header */}
      <header className="studio-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Wordmark />
          <span className="badge badge-lime">Privacy &amp; Data Ethics</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/" className="btn primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
            ← Back to Studio
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="studio-main" style={{ maxWidth: '860px', paddingBottom: '60px' }}>
        {/* Banner */}
        <section className="dashboard-banner animate-fade-in" style={{ marginBottom: '32px' }}>
          <div className="banner-sub">
            <span className="badge badge-lime">Zero-Tracking Guarantee</span>
            <span>·</span>
            <span>Effective: September 2026</span>
          </div>
          <h1>Privacy Policy &amp; Data Ethics</h1>
          <p className="tagline">
            Fieldwork was engineered from the ground up to respect your privacy. Everything you type,
            rate, or select stays 100% inside your browser. No accounts, no surveillance, no trackers.
          </p>
        </section>

        {/* Content Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Summary Box */}
          <div className="hf-card" style={{ borderColor: 'rgba(209, 254, 23, 0.3)', background: 'rgba(209, 254, 23, 0.04)' }}>
            <h3 style={{ color: 'var(--lime-100)', fontSize: '17px', marginBottom: '8px' }}>
              ✦ The 3-Second Summary
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--white-a90)', fontSize: '14px', lineHeight: 1.6 }}>
              <li><strong>Zero remote servers:</strong> Your inputs (name, date of birth, trait ratings, goals) are never sent across the internet.</li>
              <li><strong>Zero cookies or tracking scripts:</strong> We do not use Google Analytics, Meta Pixels, Mixpanel, Hotjar, or advertising cookies.</li>
              <li><strong>Browser-only persistence:</strong> We use your browser&rsquo;s <code>localStorage</code> solely to prevent your roadmap from disappearing when you refresh the page.</li>
              <li><strong>100% user controlled:</strong> You can purge all saved data at any second by clicking &ldquo;Reset&rdquo; in the header.</li>
            </ul>
          </div>

          {/* Section 1 */}
          <section className="hf-card">
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--white)' }}>
              1. Information We Collect and Process
            </h2>
            <p style={{ color: 'var(--white-a80)', fontSize: '14px', lineHeight: 1.6 }}>
              Fieldwork processes personal and behavioral signals solely on your local client device to generate your career roadmap:
            </p>
            <ul style={{ margin: '8px 0', paddingLeft: '20px', color: 'var(--white-a80)', fontSize: '13.5px', lineHeight: 1.6 }}>
              <li><strong>Identity &amp; Life Stage:</strong> Optional first name, date of birth (used strictly to compute age and generation cohort), and current professional role.</li>
              <li><strong>Work Preferences:</strong> Weekly protected hours, peak energy time, workplace culture factors, and manager expectations.</li>
              <li><strong>Operating Trait Calibration:</strong> Numerical ratings (1–10) across Curiosity, Follow-through, Social energy, Reading people, Pressure steadiness, and Appetite for challenge.</li>
              <li><strong>Focus Goals &amp; Blockers:</strong> Chosen domains of growth, target outcome description, and selected execution blockers.</li>
              <li><strong>Task Progress:</strong> Binary checklist completion statuses for the 9-action phased roadmap.</li>
            </ul>
            <p style={{ color: 'var(--white-a70)', fontSize: '13px', lineHeight: 1.5, marginTop: '8px' }}>
              <em>Note:</em> None of this information is transmitted to any backend database or API. Processing occurs entirely in JavaScript memory via deterministic functions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="hf-card">
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--white)' }}>
              2. Browser Storage &amp; Cookies
            </h2>
            <p style={{ color: 'var(--white-a80)', fontSize: '14px', lineHeight: 1.6 }}>
              Fieldwork does <strong>not</strong> use HTTP cookies. It uses the Web Storage API (<code>localStorage</code>) to store your inputs under the following keys:
            </p>
            <div style={{ overflowX: 'auto', margin: '12px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--white-a15)', color: 'var(--lime-100)' }}>
                    <th style={{ padding: '8px 12px' }}>Storage Key</th>
                    <th style={{ padding: '8px 12px' }}>Purpose</th>
                    <th style={{ padding: '8px 12px' }}>Lifespan</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--white-a80)' }}>
                  <tr style={{ borderBottom: '1px solid var(--white-a5)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>fieldwork_plan_state</td>
                    <td style={{ padding: '8px 12px' }}>Saves your inputs and ratings between page visits</td>
                    <td style={{ padding: '8px 12px' }}>Persistent until cleared</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--white-a5)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>fieldwork_completed_tasks</td>
                    <td style={{ padding: '8px 12px' }}>Saves checked roadmap milestones</td>
                    <td style={{ padding: '8px 12px' }}>Persistent until cleared</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>fieldwork_view_mode</td>
                    <td style={{ padding: '8px 12px' }}>Remembers your UI layout view preference (Studio, Plan, or Inputs)</td>
                    <td style={{ padding: '8px 12px' }}>Persistent until cleared</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ color: 'var(--white-a80)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
              You can clear these values at any moment by clicking the &ldquo;Reset&rdquo; button in the application header or clearing your browser site data.
            </p>
          </section>

          {/* Section 3 */}
          <section className="hf-card">
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--white)' }}>
              3. Legal Bases for Processing (GDPR &amp; CCPA/CPRA)
            </h2>
            <p style={{ color: 'var(--white-a80)', fontSize: '14px', lineHeight: 1.6 }}>
              Under GDPR Article 6(1)(a) and CCPA/CPRA provisions, the processing of any user data is based exclusively on your voluntary input and explicit consent to view a self-development roadmap. Because no data is collected or retained on remote servers, we do not sell, share, rent, or monetize your personal information under any circumstance.
            </p>
          </section>

          {/* Section 4 */}
          <section className="hf-card">
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--white)' }}>
              4. Third-Party Sub-processors
            </h2>
            <p style={{ color: 'var(--white-a80)', fontSize: '14px', lineHeight: 1.6 }}>
              Fieldwork does not employ any third-party marketing, analytics, or behavioral surveillance sub-processors. Web fonts are served via Next.js Google Fonts optimization (hosted directly with the app bundle with zero external requests to Google servers at runtime).
            </p>
          </section>

          {/* Section 5 */}
          <section className="hf-card">
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--white)' }}>
              5. Contact &amp; Privacy Officer
            </h2>
            <p style={{ color: 'var(--white-a80)', fontSize: '14px', lineHeight: 1.6 }}>
              If you have any questions, suggestions, or concerns regarding privacy practices or technical compliance, please reach out directly:
            </p>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13.5px' }}>
              <div><strong>Lead Engineer &amp; Maintainer:</strong> Karthikeyan T (<code>@carthworks</code>)</div>
              <div><strong>GitHub:</strong> <a href="https://github.com/carthworks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime-100)' }}>https://github.com/carthworks</a></div>
              <div><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/carthworks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime-100)' }}>https://www.linkedin.com/in/carthworks</a></div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
