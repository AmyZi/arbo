'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, fadeInUp, GradientText } from '@/components/motion/Reveal';
import { features } from '@/lib/content';

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Why it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Small Business SEO & Web Engine Built to <GradientText>dominate your market</GradientText>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One system for customer acquisition, conversion, and automation.
            No more stitching together six different tools and hoping it works.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-warm text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-warm transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
