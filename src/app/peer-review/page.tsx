'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TRAITS } from '@/lib/constants';
import { TraitId } from '@/types/plan';
import { TraitRadarPolygon } from '@/components/Dashboard/TraitRadarPolygon';
import { Wordmark } from '@/components/Common/Wordmark';
import { Footer } from '@/components/Common/Footer';

function PeerReviewContent() {
  const searchParams = useSearchParams();

  const userName = searchParams.get('user') || searchParams.get('u') || 'Your Colleague';
  const rawSelf = searchParams.get('self') || searchParams.get('s');

  // Parse Self Scores if passed via URL
  const selfTraits: Record<TraitId, number> = useMemo(() => {
    if (!rawSelf) {
      return { curiosity: 7, follow: 6, social: 5, read: 6, steady: 6, drive: 7 };
    }
    const parts = rawSelf.split(',').map((p) => Math.max(1, Math.min(10, Number(p) || 5)));
    return {
      curiosity: parts[0] ?? 7,
      follow: parts[1] ?? 6,
      social: parts[2] ?? 5,
      read: parts[3] ?? 6,
      steady: parts[4] ?? 6,
      drive: parts[5] ?? 7,
    };
  }, [rawSelf]);

  // Colleague's Observed Scores
  const [colleagueName, setColleagueName] = useState('');
  const [peerTraits, setPeerTraits] = useState<Record<TraitId, number>>({
    curiosity: 6,
    follow: 7,
    social: 6,
    read: 7,
    steady: 7,
    drive: 6,
  });
  const [copied, setCopied] = useState(false);

  const handleTraitChange = (id: TraitId, value: number) => {
    setPeerTraits((prev) => ({ ...prev, [id]: value }));
  };

  const selfParam = TRAITS.map((t) => selfTraits[t.id]).join(',');
  const peerParam = TRAITS.map((t) => peerTraits[t.id]).join(',');
  const effectivePeerName = colleagueName.trim() || 'Colleague';

  const returnUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?user=${encodeURIComponent(userName)}&self=${selfParam}&peer=${peerParam}&peerName=${encodeURIComponent(effectivePeerName)}`
    : `/?user=${encodeURIComponent(userName)}&self=${selfParam}&peer=${peerParam}&peerName=${encodeURIComponent(effectivePeerName)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(returnUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="studio-root">
      <header className="studio-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Wordmark />
          <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)' }}>
            360° Perception Calibration
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/" className="btn primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
            ← Back to Studio
          </Link>
        </div>
      </header>

      <main className="studio-main" style={{ maxWidth: '960px', paddingBottom: '70px' }}>
        {/* Banner */}
        <section className="dashboard-banner animate-fade-in" style={{ marginBottom: '28px' }}>
          <div className="banner-sub">
            <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)' }}>
              Colleague Review
            </span>
            <span>·</span>
            <span>Zero Remote Storage</span>
          </div>
          <h1 style={{ fontSize: '28px', marginTop: '6px' }}>
            Rate Observed Traits for {userName}
          </h1>
          <p className="tagline">
            Rate how you genuinely experience {userName} operating on a normal Tuesday.
            Your observed scores will render as an <strong>Electric Cyan</strong> polygon directly over
            their self-rated <strong>Electric Lime</strong> shape.
          </p>
        </section>

        {/* 2-Column Grid: Left Controls, Right Live Polygon */}
        <div className="peer-review-grid">
          {/* Left Column: Peer Inputs */}
          <div className="hf-card">
            <div className="hf-card-header">
              <div className="title-group">
                <h3>Your Observations</h3>
                <span className="desc">
                  Rate what you observe in meetings, projects, and delivery.
                </span>
              </div>
            </div>

            <div className="field" style={{ marginBottom: '16px' }}>
              <label htmlFor="peer-name">Your Name (Optional)</label>
              <input
                id="peer-name"
                type="text"
                placeholder="e.g. Jordan (Engineering Lead)"
                value={colleagueName}
                onChange={(e) => setColleagueName(e.target.value)}
              />
            </div>

            <div className="sliders-container">
              {TRAITS.map((t) => {
                const currentVal = peerTraits[t.id] ?? 5;
                return (
                  <div className="slider-item" key={t.id}>
                    <div className="slider-top">
                      <span className="slider-name">{t.name}</span>
                      <span
                        className="slider-score"
                        style={{ color: '#38bdf8', fontWeight: 700 }}
                      >
                        {currentVal} / 10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentVal}
                      aria-label={t.name}
                      onChange={(e) => handleTraitChange(t.id, Number(e.target.value))}
                      style={{
                        accentColor: '#38bdf8',
                      }}
                    />
                    <div className="slider-ends">
                      <span>{t.lo}</span>
                      <span>{t.hi}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid var(--white-a10)', paddingTop: '16px' }}>
              <button
                type="button"
                className="btn primary"
                onClick={handleCopyLink}
                style={{ width: '100%', padding: '10px 16px', fontSize: '13.5px', marginBottom: '8px' }}
              >
                {copied ? '✓ 360° Link Copied to Clipboard!' : '🔗 Copy 360° Comparison Link'}
              </button>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--white-a60)', textAlign: 'center' }}>
                Send the copied link to {userName} so they can view the dual overlay.
              </p>
            </div>
          </div>

          {/* Right Column: Live Dual Polygon */}
          <div className="hf-card">
            <div className="hf-card-header">
              <div className="title-group">
                <h3>Live Dual Hexagon Preview</h3>
                <span className="desc">
                  Self-rating (Lime) vs. Your observed perception (Cyan).
                </span>
              </div>
            </div>

            <div style={{ padding: '12px 0' }}>
              <TraitRadarPolygon
                traits={selfTraits}
                peerTraits={peerTraits}
                peerName={effectivePeerName}
                showPeer={true}
              />
            </div>

            <div style={{ marginTop: '16px', borderTop: '1px solid var(--white-a10)', paddingTop: '14px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--white)', marginBottom: '8px' }}>
                ✦ How {userName} Will Experience This:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: 'var(--white-a80)', lineHeight: 1.5 }}>
                <li><strong>Blindspots</strong> will highlight where {userName} rates higher than you observed.</li>
                <li><strong>Hidden Superpowers</strong> will validate strengths they undervalue.</li>
                <li>Both of you gain clear, actionable discussion questions for your next 1-on-1.</li>
              </ul>

              <div style={{ marginTop: '16px' }}>
                <a
                  href={returnUrl}
                  className="btn secondary"
                  style={{ display: 'block', textAlign: 'center', padding: '8px 14px', fontSize: '13px' }}
                >
                  Open Comparison in Live Studio →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PeerReviewPage() {
  return (
    <Suspense
      fallback={
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
          <p>Loading 360° Perception Calibration...</p>
        </div>
      }
    >
      <PeerReviewContent />
    </Suspense>
  );
}
