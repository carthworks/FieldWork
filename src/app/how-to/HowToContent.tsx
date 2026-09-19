'use client';

import React from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/Common/Wordmark';
import { Footer } from '@/components/Common/Footer';
import { LanguageSelector } from '@/components/Common/LanguageSelector';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getHowToContent } from '@/lib/i18n/howToTranslations';

export const HowToContent: React.FC = () => {
  const { language } = useLanguage();
  const c = getHowToContent(language);

  return (
    <div className="studio-root">
      {/* Top Navigation */}
      <header className="studio-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Wordmark />
          <span className="badge badge-neutral">{c.userGuideBadge}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LanguageSelector variant="header" />
          <Link href="/" className="btn primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
            {c.backToStudio}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="studio-main" style={{ maxWidth: '960px', paddingBottom: '90px' }}>
        {/* Hero Section */}
        <section
          className="dashboard-banner animate-fade-in"
          style={{ marginBottom: '28px' }}
        >
          <div className="banner-sub">
            <span className="badge badge-lime">{c.walkthroughBadge}</span>
            <span>·</span>
            <span>{c.readTime}</span>
          </div>
          <h1>{c.heroTitle}</h1>
          <p className="tagline">{c.heroTagline}</p>
          <div style={{ marginTop: '16px' }}>
            <Link href="/" className="btn primary">
              {c.openStudioBtn}
            </Link>
          </div>
        </section>

        {/* Section 1: Step-by-Step */}
        <section style={{ marginBottom: '36px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: 'var(--lime-100)',
                  display: 'inline-block',
                }}
              />
              {c.section1Title}
            </h2>
            <p style={{ color: 'var(--neutral-500)', fontSize: '14px', margin: '4px 0 0' }}>
              {c.section1Subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {c.steps.map((s, idx) => (
              <div className="hf-card" key={idx}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      background: 'var(--lime-50-a20)',
                      color: 'var(--lime-100)',
                      border: '1px solid rgba(209, 254, 23, 0.35)',
                      padding: '4px 10px',
                      borderRadius: 'var(--r-md)',
                      fontFamily: 'var(--font-grotesk)',
                      fontWeight: 700,
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.step}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{s.title}</h3>
                    <p style={{ color: 'var(--white-a80)', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Key Deliverables */}
        <section style={{ marginBottom: '36px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: 'var(--lime-100)',
                  display: 'inline-block',
                }}
              />
              {c.section2Title}
            </h2>
            <p style={{ color: 'var(--neutral-500)', fontSize: '14px', margin: '4px 0 0' }}>
              {c.section2Subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {c.deliverables.map((d, idx) => (
              <div className="hf-card" key={idx}>
                <span
                  className={`badge ${d.highlight ? 'badge-lime' : 'badge-neutral'}`}
                  style={{ marginBottom: '10px' }}
                >
                  {d.badge}
                </span>
                <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{d.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Where to Use */}
        <section className="hf-card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>{c.section3Title}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {c.useCases.map((u, idx) => (
              <div key={idx}>
                <h4 style={{ color: 'var(--lime-100)', marginBottom: '4px' }}>{u.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--white-a80)', margin: 0 }}>{u.desc}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '24px',
              borderTop: '1px solid var(--white-a10)',
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--white-a70)' }}>
              {c.ctaQuestion}
            </p>
            <Link href="/" className="btn primary">
              {c.ctaButton}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
