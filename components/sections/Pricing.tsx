'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal, Stagger, fadeInUp, GradientText } from '@/components/motion/Reveal';

const tiers = [
  {
    name: 'Build',
    price: 'Free',
    cadence: 'forever',
    description: 'For development and evaluation. No credit card.',
    features: [
      '10k inferences / month',
      'Automated evals (5 rubrics)',
      'Community Slack support',
      '1 project',
    ],
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Ship',
    price: '$49',
    cadence: 'per seat / month',
    description: 'For teams putting GenAI features in production.',
    features: [
      '1M inferences / month included',
      'Unlimited evals & custom rubrics',
      'Guardrails library + custom policies',
      'Full observability & tracing',
      'Priority email support',
    ],
    cta: 'Start 14-day trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    cadence: 'talk to us',
    description: 'For high-volume and self-hosted deployments.',
    features: [
      'Volume inference pricing',
      'Self-hosted / VPC deployment',
      'SSO, SAML, audit logs',
      'Dedicated support + SLA',
    ],
    cta: 'Contact sales',
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
                  Most popular
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

              <button
                className={`group mt-7 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition ${
                  tier.highlighted
                    ? 'bg-gradient-warm text-white shadow-lg shadow-orange-500/25 hover:brightness-105'
                    : 'border border-input bg-background text-foreground hover:bg-muted'
                }`}
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
