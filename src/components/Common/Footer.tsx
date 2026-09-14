import React from 'react';
import Link from 'next/link';
import { Wordmark } from './Wordmark';

export const Footer: React.FC = () => {
  return (
    <footer className="studio-footer no-print" style={{
      borderTop: '1px solid var(--white-a10)',
      background: 'var(--neutral-950-3)',
      padding: '48px 24px 36px',
      marginTop: '60px',
      color: 'var(--neutral-500)',
      fontSize: '13px',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '32px',
        marginBottom: '36px',
      }}>
        {/* Col 1: Brand & Philosophy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wordmark />
            <span className="badge badge-lime">v1.0.0</span>
          </div>
          <p style={{ margin: 0, color: 'var(--white-a70)', lineHeight: 1.5, fontSize: '13px' }}>
            A modern, deterministic development studio translating personal signals and operating traits
            into an actionable growth roadmap. Built using the Higgsfield AI design language.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
            <span className="badge badge-neutral" style={{ fontSize: '11px' }}>🔒 Zero Tracking</span>
            <span className="badge badge-neutral" style={{ fontSize: '11px' }}>⚡ 100% Client-Side</span>
            <span className="badge badge-neutral" style={{ fontSize: '11px' }}>💾 LocalStorage Only</span>
          </div>
        </div>

        {/* Col 2: Navigation & Tools */}
        <div>
          <h4 style={{
            color: 'var(--white)',
            fontFamily: 'var(--font-grotesk)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}>
            Navigation
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <Link href="/" style={{ color: 'var(--white-a80)', textDecoration: 'none' }} className="hover-lime">
                Live Studio
              </Link>
            </li>
            <li>
              <Link href="/how-to" style={{ color: 'var(--white-a80)', textDecoration: 'none' }} className="hover-lime">
                User Guide &amp; Deliverables
              </Link>
            </li>
            <li>
              <Link href="/privacy" style={{ color: 'var(--white-a80)', textDecoration: 'none' }} className="hover-lime">
                Privacy Policy &amp; Data Ethics
              </Link>
            </li>
            <li>
              <Link href="/terms" style={{ color: 'var(--white-a80)', textDecoration: 'none' }} className="hover-lime">
                Terms of Service &amp; License
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Trust, Compliance & Security */}
        <div>
          <h4 style={{
            color: 'var(--white)',
            fontFamily: 'var(--font-grotesk)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}>
            Trust &amp; Ethics
          </h4>
          <p style={{ margin: 0, color: 'var(--white-a70)', lineHeight: 1.5, fontSize: '12.5px' }}>
            Fieldwork operates completely inside your browser. No personal dates of birth,
            names, or behavioral scores are ever transmitted to any remote servers, analytics
            providers, or third parties.
          </p>
          <div style={{ marginTop: '10px' }}>
            <span style={{ color: 'var(--white-a50)', fontSize: '12px' }}>
              WCAG 2.1 AA Compliant · Anti-Dark Pattern Verified
            </span>
          </div>
        </div>

        {/* Col 4: Author & Contact */}
        <div>
          <h4 style={{
            color: 'var(--white)',
            fontFamily: 'var(--font-grotesk)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}>
            Crafted By
          </h4>
          <p style={{ margin: 0, color: 'var(--white-a80)', lineHeight: 1.5, fontSize: '13px' }}>
            Designed and engineered by <strong>Karthikeyan T</strong> (<code>@carthworks</code>).
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
            <a
              href="https://github.com/carthworks"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--lime-100)', textDecoration: 'none', fontWeight: 500 }}
              className="hover-underline"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/carthworks"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--lime-100)', textDecoration: 'none', fontWeight: 500 }}
              className="hover-underline"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--white-a5)',
        paddingTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}>
        <p style={{ margin: 0, color: 'var(--white-a50)', fontSize: '12px' }}>
          © {new Date().getFullYear()} Fieldwork. Released under Apache-2.0 / MIT. All rights reserved.
        </p>
        <p style={{ margin: 0, color: 'var(--white-a40)', fontSize: '11.5px' }}>
          Open Source Development Framework · Free &amp; Private Forever
        </p>
      </div>
    </footer>
  );
};
