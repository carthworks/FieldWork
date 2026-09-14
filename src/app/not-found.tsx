import Link from 'next/link';
import { Wordmark } from '@/components/Common/Wordmark';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f1113',
        color: 'var(--white)',
        fontFamily: 'var(--font-sans)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <Wordmark />
      </div>
      <h1 style={{ fontFamily: 'var(--font-grotesk)', fontSize: '56px', marginBottom: '8px', color: 'var(--lime-100)' }}>
        404
      </h1>
      <p style={{ color: 'var(--white-a70)', marginBottom: '24px', fontSize: '15px' }}>
        The page or resource you requested could not be found.
      </p>
      <Link href="/" className="btn primary">
        Back to Studio →
      </Link>
    </div>
  );
}
