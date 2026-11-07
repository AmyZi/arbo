'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, fadeInUp, GradientText } from '@/components/motion/Reveal';
import { workflowSteps } from '@/lib/content';

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How Small Business Web Development Turns Search Into <GradientText>Predictable Growth</GradientText>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A single system that takes you from an empty pipeline to a
            fully automated engine that attracts, converts, and scales.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent lg:block" />

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-background shadow-lg shadow-orange-500/10">
                    <Icon className="h-6 w-6 text-orange-500" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-warm text-[11px] font-bold text-white shadow-md">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
