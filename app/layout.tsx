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

const siteUrl = 'https://genai-101.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GenAI 101 — Ship Generative AI Products That Actually Work',
    template: '%s · GenAI 101',
  },
  description:
    'The production playbook for generative AI. From prompt to deployment — workflows, evaluation, guardrails, and the infrastructure teams use to ship GenAI features customers love.',
  keywords: [
    'generative AI',
    'GenAI',
    'AI products',
    'LLM workflows',
    'AI evaluation',
    'AI guardrails',
    'production AI',
  ],
  authors: [{ name: 'GenAI 101' }],
  creator: 'GenAI 101',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'GenAI 101',
    title: 'GenAI 101 — Ship Generative AI Products That Actually Work',
    description:
      'The production playbook for generative AI. Workflows, evaluation, guardrails, and the infrastructure teams use to ship GenAI features customers love.',
    images: [
      {
        url: '/og-image.png',
        alt: 'GenAI 101',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenAI 101 — Ship Generative AI Products That Actually Work',
    description:
      'The production playbook for generative AI. Workflows, evaluation, guardrails, and infrastructure for shipping GenAI features.',
    images: ['/og-image.png'],
    creator: '@genai101',
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
