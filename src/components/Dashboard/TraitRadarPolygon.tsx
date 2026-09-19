import React from 'react';
import { TRAITS } from '@/lib/constants';
import { TraitId } from '@/types/plan';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TraitRadarPolygonProps {
  traits: Record<TraitId, number>;
  peerTraits?: Record<TraitId, number> | null;
  peerName?: string;
  showPeer?: boolean;
  compact?: boolean;
}

const C = { x: 340, y: 225, R: 150 };
const RINGS = [2, 4, 6, 8, 10];

const pt = (i: number, v: number): [number, number] => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  const r = (v / 10) * C.R;
  return [C.x + r * Math.cos(a), C.y + r * Math.sin(a)];
};

export const TraitRadarPolygon: React.FC<TraitRadarPolygonProps> = ({
  traits,
  peerTraits,
  peerName = 'Colleague',
  showPeer = true,
}) => {
  const { t: translate } = useLanguage();
  // Self Shape
  const selfShape = TRAITS.map((t, i) =>
    pt(i, traits[t.id] ?? 5)
      .map((n) => n.toFixed(1))
      .join(',')
  ).join(' ');

  // Peer Shape (if provided and enabled)
  const hasPeer = Boolean(peerTraits && showPeer);
  const peerShape = hasPeer
    ? TRAITS.map((t, i) =>
        pt(i, peerTraits![t.id] ?? 5)
          .map((n) => n.toFixed(1))
          .join(',')
      ).join(' ')
    : null;

  return (
    <div
      className="radar-container"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Legend Badge Bar */}
      {hasPeer && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '10px',
            fontSize: '12px',
            fontFamily: 'var(--font-grotesk)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--lime-100)',
                boxShadow: '0 0 6px rgba(209, 254, 23, 0.6)',
              }}
            />
            <span style={{ color: 'var(--white)', fontWeight: 600 }}>Self Rating</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#38bdf8',
                boxShadow: '0 0 6px rgba(56, 189, 248, 0.6)',
              }}
            />
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>
              Observed by {peerName}
            </span>
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 680 450"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: 'auto',
          overflow: 'visible',
          display: 'block',
        }}
        aria-label="Operating Traits Radar Polygon with Colleague Overlay"
        role="img"
      >
        <defs>
          <filter id="lime-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Guide Web Polygons */}
        {RINGS.map((lvl) => {
          const ringPoints = TRAITS.map((_, i) =>
            pt(i, lvl)
              .map((n) => n.toFixed(1))
              .join(',')
          ).join(' ');

          const isOuter = lvl === 10;

          return (
            <polygon
              key={`ring-${lvl}`}
              points={ringPoints}
              fill={isOuter ? 'rgba(255, 255, 255, 0.015)' : 'none'}
              stroke={isOuter ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.08)'}
              strokeDasharray={isOuter ? undefined : '3 3'}
              strokeWidth={isOuter ? 1.5 : 1}
            />
          );
        })}

        {/* Radial Axis Spokes */}
        {TRAITS.map((_, i) => {
          const [ax, ay] = pt(i, 10);
          return (
            <line
              key={`axis-${i}`}
              x1={C.x}
              y1={C.y}
              x2={ax}
              y2={ay}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Scale Metric Ticks on Top Vertical Axis */}
        {RINGS.map((lvl) => {
          const [, y] = pt(0, lvl);
          return (
            <text
              key={`tick-${lvl}`}
              x={C.x + 6}
              y={y + 4}
              fill="rgba(255, 255, 255, 0.35)"
              fontSize="10"
              fontFamily="var(--font-grotesk)"
              fontWeight="600"
            >
              {lvl}
            </text>
          );
        })}

        {/* Layer 1: Colleague / Peer Polygon (Electric Cyan) */}
        {hasPeer && peerShape && (
          <>
            <polygon
              points={peerShape}
              fill="rgba(56, 189, 248, 0.16)"
              stroke="#38bdf8"
              strokeWidth="2.2"
              strokeDasharray="4 2"
              strokeLinejoin="round"
              filter="url(#cyan-glow)"
              style={{
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            {TRAITS.map((t, i) => {
              const pVal = peerTraits![t.id] ?? 5;
              const [px, py] = pt(i, pVal);
              return (
                <g key={`peer-dot-${t.id}`}>
                  <circle cx={px} cy={py} r="6.5" fill="rgba(56, 189, 248, 0.3)" />
                  <circle cx={px} cy={py} r="4" fill="#38bdf8" stroke="#0f1113" strokeWidth="1.5" />
                </g>
              );
            })}
          </>
        )}

        {/* Layer 2: User Self Polygon (Electric Lime) */}
        <polygon
          points={selfShape}
          fill="rgba(209, 254, 23, 0.18)"
          stroke="#d1fe17"
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter="url(#lime-glow)"
          style={{
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Center Pivot Point */}
        <circle cx={C.x} cy={C.y} r="3.5" fill="#d1fe17" opacity={0.7} />

        {/* Self Vertex Highlight Dots */}
        {TRAITS.map((t, i) => {
          const val = traits[t.id] ?? 5;
          const [vx, vy] = pt(i, val);
          return (
            <g
              key={`self-dot-${t.id}`}
              style={{
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <circle cx={vx} cy={vy} r="7" fill="rgba(209, 254, 23, 0.25)" />
              <circle cx={vx} cy={vy} r="4.5" fill="#d1fe17" stroke="#0f1113" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Axis Labels & Values (Showing Self vs Peer if present) */}
        {TRAITS.map((t, i) => {
          const a = ((-90 + i * 60) * Math.PI) / 180;
          const val = traits[t.id] ?? 5;
          const peerVal = hasPeer ? peerTraits![t.id] : undefined;

          // Calibrate anchor and coordinates
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          let lx = C.x;
          let ly = C.y;

          if (i === 0) {
            textAnchor = 'middle';
            lx = C.x;
            ly = C.y - C.R - 22;
          } else if (i === 1) {
            textAnchor = 'start';
            lx = C.x + (C.R + 24) * Math.cos(a);
            ly = C.y + (C.R + 24) * Math.sin(a) - 6;
          } else if (i === 2) {
            textAnchor = 'start';
            lx = C.x + (C.R + 24) * Math.cos(a);
            ly = C.y + (C.R + 24) * Math.sin(a) + 6;
          } else if (i === 3) {
            textAnchor = 'middle';
            lx = C.x;
            ly = C.y + C.R + 28;
          } else if (i === 4) {
            textAnchor = 'end';
            lx = C.x + (C.R + 24) * Math.cos(a);
            ly = C.y + (C.R + 24) * Math.sin(a) + 6;
          } else if (i === 5) {
            textAnchor = 'end';
            lx = C.x + (C.R + 24) * Math.cos(a);
            ly = C.y + (C.R + 24) * Math.sin(a) - 6;
          }

          return (
            <text
              key={`label-${t.id}`}
              x={lx}
              y={ly}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              style={{ userSelect: 'none' }}
            >
              <tspan
                fill="#ffffff"
                fontSize="12.5"
                fontFamily="var(--font-sans)"
                fontWeight="600"
              >
                {translate(`trait_${t.id}` as any)}
              </tspan>
              <tspan
                dx="6"
                fill="#d1fe17"
                fontSize="12.5"
                fontFamily="var(--font-grotesk)"
                fontWeight="700"
              >
                {val}
              </tspan>
              {peerVal !== undefined && (
                <tspan
                  dx="5"
                  fill="#38bdf8"
                  fontSize="12"
                  fontFamily="var(--font-grotesk)"
                  fontWeight="600"
                >
                  [{peerVal}]
                </tspan>
              )}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
