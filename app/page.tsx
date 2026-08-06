import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { LogoCloud } from '@/components/sections/LogoCloud';
import { Manifesto } from '@/components/sections/Manifesto';
import { Workflow } from '@/components/sections/Workflow';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Newsletter } from '@/components/sections/Newsletter';
import { siteConfig } from '@/lib/content';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SubscribeAction',
      target: `${siteConfig.url}/#newsletter`,
    },
  };

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    sameAs: [
      'https://twitter.com/Arboweb',
      'https://www.linkedin.com/company/Arboweb',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Manifesto />
        <Workflow />
        <Features />
        <Stats />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
