'use client';

import { motion } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';
import { Reveal, Stagger, fadeInUp, staggerContainer } from '@/components/motion/Reveal';
import { problemSolutions } from '@/lib/content';

export function Manifesto() {
  return (
    <section id="manifesto" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            The problem
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Most small business marketing fails to deliver.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most small business marketing fails for one simple reason: it
            wasn&apos;t built for small businesses. Generic agencies and
            one-size-fits-all software hand you a dashboard full of numbers
            and call it a strategy — leaving you to figure out how to
            actually grow your small business on your own.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            We built something different. A system designed specifically to
            help small business owners attract customers, convert leads, and
            scale revenue — without the guesswork, the wasted ad spend, or
            the 80-hour weeks.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            This is how you get small business customers on autopilot: clear
            positioning, a funnel that converts, and automation that works
            while you sleep. Whether you&apos;re just starting to grow your
            small business or ready to scale past a revenue plateau, small
            business marketing shouldn&apos;t feel like a second job.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
          {problemSolutions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.pain}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-rose-500/0 opacity-0 transition-opacity duration-500 group-hover:from-orange-500/5 group-hover:to-rose-500/5 group-hover:opacity-100" />
                <div className="relative flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-warm text-white shadow-lg shadow-orange-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <p className="text-sm font-medium text-muted-foreground line-through decoration-red-500/40">
                        {item.pain}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                      <p className="text-base font-semibold text-foreground">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-5 py-2 text-sm font-medium text-foreground">
            Stop competing on hustle alone — start scaling with a system
            <ArrowRight className="h-4 w-4 text-orange-500" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
