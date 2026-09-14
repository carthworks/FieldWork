import React, { useState } from 'react';
import { GenerationalPlaybook } from '@/types/plan';

interface GenerationalPlaybookCardProps {
  playbook: GenerationalPlaybook;
}

export const GenerationalPlaybookCard: React.FC<GenerationalPlaybookCardProps> = ({
  playbook,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(playbook.simpleScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } catch (e) {
      console.error('Failed to copy script', e);
    }
  };

  return (
    <div className="hf-card animate-fade-in" style={{ marginTop: '16px' }}>
      {/* Header */}
      <div className="hf-card-header" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div className="title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '18px' }}>Generational Alignment Playbook</h3>
            <span className="badge badge-lime">
              {playbook.generation} ({playbook.years})
            </span>
          </div>
          <span className="desc">
            A simple, understandable guide to thrive at work without the unfair stereotypes.
          </span>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '14px',
          marginTop: '6px',
        }}
      >
        {/* Box 1: Stereotype vs Plain Truth */}
        <div className="hf-card-subtle" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-grotesk), sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--rose-500)',
              }}
            >
              The Unfair Stereotype
            </span>
            <span className="badge badge-rose" style={{ fontSize: '11px', padding: '1px 6px' }}>
              Myth
            </span>
          </div>
          <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--white-a70)', fontSize: '13px' }}>
            &ldquo;{playbook.stereotype}&rdquo;
          </p>

          <div style={{ borderTop: '1px solid var(--white-a10)', paddingTop: '8px', marginTop: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-grotesk), sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--lime-100)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              The Plain Truth
            </span>
            <p style={{ margin: 0, color: 'var(--white-a90)', fontSize: '13px', lineHeight: 1.45 }}>
              {playbook.plainTruth}
            </p>
          </div>
        </div>

        {/* Box 2: What Helps You Thrive */}
        <div className="hf-card-subtle">
          <span
            style={{
              fontFamily: 'var(--font-grotesk), sans-serif',
              fontSize: '11.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--lime-100)',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            What Helps You Thrive
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {playbook.thriveFactors.map((item, i) => (
              <span
                key={i}
                style={{
                  background: 'var(--lime-50-a20)',
                  color: 'var(--lime-100)',
                  border: '1px solid rgba(209, 254, 23, 0.3)',
                  padding: '5px 11px',
                  borderRadius: 'var(--r-full)',
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-grotesk), sans-serif',
                  fontWeight: 600,
                }}
              >
                ✓ {item}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '14px', borderTop: '1px solid var(--white-a10)', paddingTop: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-grotesk), sans-serif',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--white-a70)',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              What You Need From Leaders &amp; Peers
            </span>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--white-a80)', fontSize: '13px', lineHeight: 1.5 }}>
              {playbook.leadershipNeeds.map((need, idx) => (
                <li key={idx}>{need}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ready-to-Use 1-on-1 Script */}
      <div
        className="hf-card-subtle"
        style={{
          marginTop: '14px',
          background: 'rgba(209, 254, 23, 0.04)',
          borderColor: 'rgba(209, 254, 23, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-grotesk), sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--lime-100)',
            }}
          >
            How To Work With Me (Simple Conversation Script)
          </span>
          <button
            type="button"
            className="btn secondary"
            onClick={handleCopyScript}
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            {copiedScript ? '✓ Copied' : 'Copy Script'}
          </button>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '13.5px',
            color: 'var(--white)',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}
        >
          {playbook.simpleScript}
        </p>
      </div>

      {/* Cross-Generational Leadership Tip */}
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--neutral-500)', fontFamily: 'var(--font-grotesk), sans-serif' }}>
          💡 <strong style={{ color: 'var(--white-a90)' }}>Leader Tip:</strong> {playbook.leadershipAdvice}
        </span>
      </div>
    </div>
  );
};
