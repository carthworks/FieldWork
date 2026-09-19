import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ConsoleSignature } from '@/components/Common/ConsoleSignature';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1113',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fieldwork.dev'),
  title: {
    default: 'Fieldwork — Real-time Development Studio',
    template: '%s | Fieldwork Studio',
  },
  description:
    'Modern, interactive single-page development planner powered by the Higgsfield AI design language. 100% private, client-side career roadmap engine.',
  keywords: [
    'development plan',
    'career growth',
    'archetypes',
    'generational alignment',
    'higgsfield',
    'self improvement',
    'action roadmap',
    'manager 1-on-1',
  ],
  authors: [{ name: 'Karthikeyan T', url: 'https://github.com/carthworks' }],
  creator: 'Karthikeyan T (@carthworks)',
  publisher: 'Fieldwork',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fieldwork.dev',
    title: 'Fieldwork — Real-time Development Studio',
    description:
      'Transform personal signals and operating traits into a deterministic, action-ready development roadmap. Zero trackers, 100% private.',
    siteName: 'Fieldwork Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fieldwork — Real-time Development Studio',
    description:
      'Deterministic development planner powered by the Higgsfield design language. 100% private and client-side.',
    creator: '@carthworks',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body suppressHydrationWarning>
        <LanguageProvider>
          <ConsoleSignature />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

