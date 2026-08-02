import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const siteUrl = 'https://growth101.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Growth101 — Get More Small Business Customers, On Autopilot',
    template: '%s · Growth101',
  },
  description:
    'A high-converting system built to help small business owners get small business customers, grow their small business, and scale revenue \u2014 without wasted ad spend or 80-hour weeks.',
  keywords: [
    'small business',
    'get small business customers',
    'grow your small business',
    'small business marketing',
    'scale small business',
    'small business leads',
    'small business growth',
  ],
  authors: [{ name: 'Growth101' }],
  creator: 'Growth101',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Growth101',
    title: 'Growth101 — Get More Small Business Customers, On Autopilot',
    description:
      'The small business growth system \u2014 targeted customer acquisition, a high-converting funnel, and automation built to help small business owners scale revenue.',
    images: [
      {
        url: '/og-image.png',
        alt: 'Growth101 \u2014 Small Business Growth System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth101 — Get More Small Business Customers, On Autopilot',
    description:
      'Attract customers, convert leads, and scale your small business \u2014 without the guesswork or wasted ad spend.',
    images: ['/og-image.png'],
    creator: '@growth101',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
