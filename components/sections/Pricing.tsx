'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal, Stagger, fadeInUp, GradientText } from '@/components/motion/Reveal';

const tiers = [
  {
    name: 'Audit & Strategy',
    price: '$0',
    cadence: 'completely free',
    description:
      'Evaluate your current website performance and uncover hidden Growth opportunities.',
    features: [
      'Full Website & Technical SEO Audit',
      '1-on-1 Development & Strategy Session (30 mins)',
      'Customer Acquisition Roadmap',
      'Core Web Vitals & Speed Score Analysis',
      'Actionable UX & Lead Capture Recommendations',
    ],
    cta: 'Request Free Audit',
    highlighted: false,
  },
  {
    name: 'Rank & Track',
    price: '$49',
    cadence: 'month ($39/mo billed annually)',
    description:
      'Track your keyword rankings, capture more leads, and systematically outrank local competitors.',
    features: [
      'Everything in Audit & Strategy, plus:',
      'Real-Time Keyword & Rank Tracking (Up to 100 keywords)',
      'Automated Local SEO & Google Business Sync',
      'Competitor SEO & Traffic Intelligence',
      'Monthly On-Page SEO Recommendations',
      'Weekly Customer Conversion & Lead Reports',
      'Priority Email & Support',
    ],
    cta: 'Start Ranking Now',
    highlighted: true,
  },
  {
    name: 'Custom Build & Scale',
    price: 'Custom',
    cadence: 'talk to us',
    description:
      'A bespoke, high-performance website engine built from the ground up to dominate your niche SEO.',
    features: [
      'Everything in Rank & Track, plus:',
      'Custom Next.js Site Built Around Your Niche SEO',
      'End-to-End Content Strategy & Execution',
      'Custom Lead Capture Funnels & CRM Integration',
      'Done-For-You Schema & Advanced Technical SEO',
      'Dedicated SEO Strategist & Priority SLA Support',
    ],
    cta: 'Book Growth Call',
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pricing that scales with <GradientText>your usage</GradientText>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Pay only when you ship to production. No surprises.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-3xl border p-7 transition-shadow ${
                tier.highlighted
                  ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/5 to-background shadow-2xl shadow-orange-500/10'
                  : 'border-slate-200/60 bg-card shadow-sm hover:shadow-xl dark:border-white/10'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-warm px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-extrabold tracking-tight text-foreground">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">/ {tier.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#newsletter"
                className={`group mt-7 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition ${
                  tier.highlighted
                    ? 'bg-gradient-warm text-white shadow-lg shadow-orange-500/25 hover:brightness-105'
                    : 'border border-input bg-background text-foreground hover:bg-muted'
                }`}
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
