// @ts-ignore: side-effect import for global CSS (handled by Next.js)
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import  {JsonLd}  from '@/components/JsonLd';
import { siteConfig } from '@/lib/content';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap' 
});

const sora = Sora({ 
  subsets: ['latin'], 
  variable: '--font-display', 
  display: 'swap', 
  weight: ['400', '500', '600', '700', '800'] 
});

const siteUrl = siteConfig.url;
const ogImage = '/og-image.png';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#f97316',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'ArboWeb',
  title: { 
    default: 'Small Business Web Development & SEO | ArboWeb', 
    template: '%s | ArboWeb' 
  },
  description: 'ArboWeb builds custom small business web development, small business SEO, and conversion systems that help owners rank locally, get small business customers, and grow revenue.',
  keywords: [
    'small business web development',
    'small business SEO',
    'get small business customers',
    'custom website for small business',
    'local SEO for small business',
    'small business lead generation',
    'small business website design',
    'SEO web development agency'
  ],
  authors: [{ name: 'ArboWeb', url: siteUrl }],
  creator: 'ArboWeb',
  publisher: 'ArboWeb',
  category: 'Small Business Web Development and SEO',
  alternates: { 
    canonical: '/', 
    languages: { 'en-US': '/' } 
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ArboWeb',
    title: 'Small Business Web Development & SEO | ArboWeb',
    description: 'Custom websites, small business SEO, and customer acquisition systems engineered to help local businesses rank on Google and convert more leads.',
    images: [{ 
      url: ogImage, 
      width: 1200, 
      height: 630, 
      alt: 'ArboWeb small business web development and SEO growth system' 
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Small Business Web Development & SEO | ArboWeb',
    description: 'Rank locally, convert visitors, and get small business customers with ArboWeb web development and SEO systems.',
    images: [ogImage],
    creator: '@ArboWeb',
  },
  robots: { 
    index: true, 
    follow: true, 
    googleBot: { 
      index: true, 
      follow: true, 
      'max-image-preview': 'large', 
      'max-snippet': -1, 
      'max-video-preview': -1 
    } 
  },
};

const serviceCatalog = [
  'Small business web development',
  'Small business SEO',
  'Local SEO strategy',
  'Conversion-focused landing pages',
  'Lead generation automation'
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'ArboWeb',
    alternateName: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: siteConfig.email,
    slogan: 'Custom Web Development & SEO for Small Businesses',
    sameAs: [
      'https://www.linkedin.com/company/arboweb',
      'https://www.instagram.com/ArboWeb',
      'https://www.tiktok.com/arboweb'
    ],
    knowsAbout: serviceCatalog,
    makesOffer: serviceCatalog.map((name) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name,
        audience: { '@type': 'Audience', audienceType: 'Small business owners' }
      }
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${siteUrl}/#professional-service`,
    name: 'ArboWeb Small Business Web Development & SEO',
    url: siteUrl,
    image: `${siteUrl}${ogImage}`,
    logo: `${siteUrl}/logo.png`,
    email: siteConfig.email,
    priceRange: '$$',
    areaServed: [{ '@type': 'Country', name: 'United States' }],
    audience: { 
      '@type': 'Audience', 
      audienceType: 'Small business owners looking to rank on Google and get more customers' 
    },
    serviceType: serviceCatalog,
    provider: { '@id': `${siteUrl}/#organization` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'ArboWeb',
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <JsonLd data={structuredData} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}