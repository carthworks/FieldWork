'use client';

import React, { useState } from 'react';
import { ScoredTrait, TraitId, SignalQualityReport, PeerReviewData, PerceptionGap } from '@/types/plan';
import { TraitRadarPolygon } from './TraitRadarPolygon';

interface TraitScoresPanelProps {
  scoredTraits: ScoredTrait[];
  traits?: Record<TraitId, number>;
  signalQuality?: SignalQualityReport;
  peerReview?: PeerReviewData | null;
  perceptionGaps?: PerceptionGap[];
  onRequestPeerReview?: () => void;
  onSimulatePeer?: () => void;
  onClearPeer?: () => void;
}

export const TraitScoresPanel: React.FC<TraitScoresPanelProps> = ({
  scoredTraits,
  traits,
  signalQuality,
  peerReview,
  perceptionGaps,
  onRequestPeerReview,
  onSimulatePeer,
  onClearPeer,
}) => {
  const [viewMode, setViewMode] = useState<'radar' | 'bars' | 'both'>('radar');
  const [showPeerOverlay, setShowPeerOverlay] = useState<boolean>(true);

  const traitsMap: Record<TraitId, number> =
    traits ||
    scoredTraits.reduce((acc, t) => {
      acc[t.id] = t.score;
      return acc;
    }, {} as Record<TraitId, number>);

  const hasPeer = Boolean(peerReview);

  return (
    <div className="insight-panel">
      {/* Panel Header */}
      <div
        className="insight-panel-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: 'var(--lime-100)',
                  display: 'inline-block',
                }}
              />
              Key Character Traits &amp; Hexagon
            </h3>
            {signalQuality?.straightLined && (
              <span
                className="badge badge-rose"
                title="Low contrast straight-lining detected across traits"
                style={{ fontSize: '11px', animation: 'pulse 2s infinite' }}
              >
                Straight-Lining Detected
              </span>
            )}
            {signalQuality?.status === 'high_contrast' && (
              <span className="badge badge-lime" style={{ fontSize: '11px' }}>
                High Contrast Signal
              </span>
            )}
            {hasPeer && (
              <span
                className="badge"
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  fontSize: '11px',
                }}
              >
                360° Active ({peerReview?.peerName || 'Peer'})
              </span>
            )}
          </div>
          <p>
            {hasPeer
              ? 'Comparing your self-ratings (Lime) against observed peer perception (Cyan).'
              : 'Multi-dimensional operational polygon & ranked baseline.'}
          </p>
        </div>

        {/* View Switcher: Radar / Bars / Both */}
        <div
          className="view-switcher"
          role="tablist"
          aria-label="Trait visualization type"
          style={{ padding: '2px' }}
        >
          <button
            type="button"
            className={`view-btn ${viewMode === 'radar' ? 'active' : ''}`}
            onClick={() => setViewMode('radar')}
            style={{ fontSize: '11.5px', padding: '3px 8px' }}
            title="Radar Polygon View"
          >
            Radar
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'bars' ? 'active' : ''}`}
            onClick={() => setViewMode('bars')}
            style={{ fontSize: '11.5px', padding: '3px 8px' }}
            title="Ranked Meters View"
          >
            Bars
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'both' ? 'active' : ''}`}
            onClick={() => setViewMode('both')}
            style={{ fontSize: '11.5px', padding: '3px 8px' }}
            title="Both Radar & Meters"
          >
            Both
          </button>
        </div>
      </div>

      {/* STRAIGHT-LINING ALERT BANNER */}
      {signalQuality?.straightLined && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: 'var(--r-md)',
            padding: '12px 14px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: '#f43f5e', fontSize: '16px', lineHeight: 1 }}>⚠</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#f43f5e', fontSize: '13px', marginBottom: '3px' }}>
                Signal Quality Warning: Flat Mid-Zone Clustering
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                {signalQuality.message}
              </p>
              {signalQuality.actionPrompt && (
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--lime-100)', fontWeight: 500 }}>
                  💡 {signalQuality.actionPrompt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DISCREPANCY PROBE ALERT */}
      {signalQuality?.hasDiscrepancy && !signalQuality.straightLined && (
        <div
          style={{
            background: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: 'var(--r-md)',
            padding: '10px 14px',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: '#eab308' }}>⚡</span>
            <span style={{ color: '#fef08a', fontSize: '12.5px', fontWeight: 600 }}>
              Calibration Gap:
            </span>
            <span style={{ color: 'var(--white-a80)', fontSize: '12px' }}>
              {signalQuality.details[0]}
            </span>
          </div>
        </div>
      )}

      {/* Trait Radar Polygon Visual with Colleague Overlay */}
      {(viewMode === 'radar' || viewMode === 'both') && (
        <div
          style={{
            padding: '8px 0 10px',
            borderBottom:
              viewMode === 'both' ? '1px solid var(--white-a10)' : 'none',
            marginBottom: viewMode === 'both' ? '16px' : '0',
          }}
        >
          <TraitRadarPolygon
            traits={traitsMap}
            peerTraits={showPeerOverlay ? peerReview?.traits : null}
            peerName={peerReview?.peerName}
            showPeer={showPeerOverlay}
          />
        </div>
      )}

      {/* 360° Perception Gap Table (If Colleague Feedback Present) */}
      {hasPeer && perceptionGaps && perceptionGaps.length > 0 && (
        <div
          style={{
            marginTop: '16px',
            borderTop: '1px solid var(--white-a10)',
            paddingTop: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: '13.5px',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>✦</span> Self-vs-Observed Perception Gaps
            </h4>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                className="btn secondary"
                onClick={() => setShowPeerOverlay(!showPeerOverlay)}
                style={{ padding: '3px 8px', fontSize: '11px' }}
              >
                {showPeerOverlay ? 'Hide Colleague Layer' : 'Show Colleague Layer'}
              </button>
              {onClearPeer && (
                <button
                  type="button"
                  className="btn quiet"
                  onClick={onClearPeer}
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                  title="Remove colleague comparison"
                >
                  Clear Peer
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {perceptionGaps.map((gap) => {
              const isBlindspot = gap.type === 'blindspot';
              const isHiddenStrength = gap.type === 'hidden_strength';

              const badgeColor = isBlindspot
                ? 'badge-rose'
                : isHiddenStrength
                ? 'badge-lime'
                : 'badge-neutral';

              return (
                <div
                  key={gap.traitId}
                  style={{
                    background: isBlindspot
                      ? 'rgba(244, 63, 94, 0.05)'
                      : isHiddenStrength
                      ? 'rgba(56, 189, 248, 0.06)'
                      : 'var(--white-a5)',
                    border: `1px solid ${
                      isBlindspot
                        ? 'rgba(244, 63, 94, 0.25)'
                        : isHiddenStrength
                        ? 'rgba(56, 189, 248, 0.3)'
                        : 'var(--white-a10)'
                    }`,
                    borderRadius: 'var(--r-md)',
                    padding: '10px 12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--white)' }}>
                      {gap.traitName}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--lime-100)' }}>
                        Self: <strong>{gap.selfScore}</strong>
                      </span>
                      <span style={{ color: 'var(--white-a30)' }}>·</span>
                      <span style={{ fontSize: '11.5px', color: '#38bdf8' }}>
                        Observed: <strong>{gap.peerScore}</strong>
                      </span>
                      <span className={`badge ${badgeColor}`} style={{ fontSize: '10.5px' }}>
                        {gap.headline}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                    {gap.coachingAdvice}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Colleague Invitation Controls (When No Peer Data Yet) */}
      {!hasPeer && (
        <div
          style={{
            marginTop: '16px',
            borderTop: '1px solid var(--white-a10)',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--white-a70)' }}>
            Want 360° feedback on this polygon?
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {onRequestPeerReview && (
              <button
                type="button"
                className="btn secondary"
                onClick={onRequestPeerReview}
                style={{ padding: '4px 10px', fontSize: '12px' }}
              >
                🔗 Request Colleague Rating
              </button>
            )}
            {onSimulatePeer && (
              <button
                type="button"
                className="btn quiet"
                onClick={onSimulatePeer}
                style={{ padding: '4px 10px', fontSize: '12px' }}
                title="Simulate a colleague rating to test dual overlay"
              >
                ⚡ Simulate Peer Review
              </button>
            )}
          </div>
        </div>
      )}

      {/* Ranked Trait List (Bars Mode) */}
      {(viewMode === 'bars' || viewMode === 'both') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {scoredTraits.map((t) => (
            <div className="trait-row" key={t.id}>
              <div className="trait-info">
                <b>{t.name}</b>
                <i>{t.score} / 10</i>
              </div>
              <div className="trait-meter">
                <div
                  className="trait-meter-fill"
                  style={{ width: `${t.score * 10}%` }}
                />
              </div>
              <span className="trait-desc">{t.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
