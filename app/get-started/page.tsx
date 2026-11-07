// (server component)
// Holds metadata + schema. The interactive form lives in ./GetStartedForm.tsx.

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal, GlowBadge, GradientText } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { baseNodes, webPage, breadcrumbs, graph } from '@/lib/schema';
import { GetStartedForm } from './GetStartedForm';

const path = '/get-started';

export const metadata: Metadata = {
  title: 'Get your free SEO audit | ArboWeb',
  description:
    'Request a free SEO audit, help ranking higher in local search, or a custom-built, SEO-optimised website. We reply within 1 business day.',
  // All ?plan= variants point to this one URL.
  alternates: { canonical: path }, // requires metadataBase in your root layout
};

export default function GetStartedPage() {
  const data = graph([
    ...baseNodes(),
    webPage({
      path,
      name: 'Get your free SEO audit | ArboWeb',
      description: String(metadata.description),
      lang: 'en',
      hasBreadcrumb: true,
    }),
    breadcrumbs(path, [
      { name: 'Home', path: '/' },
      { name: 'Get started', path },
    ]),
  ]);

  return (
    <>
      <JsonLd data={data} />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <GlowBadge className="mx-auto">
                <Sparkles className="h-3.5 w-3.5" />
                Custom websites &amp; local SEO for small businesses
              </GlowBadge>
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
                Get a custom small business website —
                <br className="hidden sm:block" />{' '}
                <GradientText>built to rank, not just launch.</GradientText>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Whether you want a free SEO audit, help ranking higher in
                local search, or a fully custom-built, SEO-optimized website,
                this is the fastest way to reach us. We reply within 1
                business day.
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={0.1}>
              {/* useSearchParams inside the form needs a Suspense boundary */}
              <Suspense fallback={null}>
                <GetStartedForm />
              </Suspense>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}