'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/Common/Wordmark';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fieldwork Application Error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f1113',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <Wordmark />
      </div>

      <div
        className="hf-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          padding: '36px 28px',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          background: 'rgba(239, 68, 68, 0.05)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            fontSize: '22px',
            marginBottom: '16px',
            fontWeight: 'bold',
          }}
        >
          !
        </div>

        <h1 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'var(--font-grotesk)' }}>
          Something unexpected occurred
        </h1>

        <p style={{ color: 'var(--white-a70)', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '24px' }}>
          An unexpected error interrupted the studio calculation. Your local state remains safe in your browser.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn primary"
            onClick={() => reset()}
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="btn secondary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            Reload Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
