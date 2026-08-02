'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, fadeInUp } from '@/components/motion/Reveal';
import { stats, testimonials } from '@/lib/content';
import { Star } from 'lucide-react';

function CountUp({ value }: { value: string }) {
  return <span className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{value}</span>;
}

export function Stats() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Stagger className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-200/60 bg-gradient-to-br from-muted/40 to-background p-8 dark:border-white/10 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <CountUp value={stat.value} />
              <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </Stagger>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-slate-200/60 bg-card p-6 shadow-sm dark:border-white/10"
            >
              <div className="flex gap-0.5 text-orange-500">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-warm text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
