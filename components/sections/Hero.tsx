'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Brain,
  Gauge,
  GitBranch,
  ArrowRight,
  Check,
  TrendingUp,
} from 'lucide-react';
import { GlowBadge, GradientText } from '@/components/motion/Reveal';
import { mockWorkflowNodes } from '@/lib/content';

const nodeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  input: Sparkles,
  guard: ShieldCheck,
  model: Brain,
  eval: Gauge,
  output: GitBranch,
};

function WorkflowMockup() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => {
      setActive((v) => (v + 1) % mockWorkflowNodes.length);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* glow backdrop */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-warm opacity-20 blur-3xl" />

      <div className="relative rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-2xl shadow-orange-500/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-6">
        {/* window chrome */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
            Growth.engine
          </span>
        </div>

        {/* node pipeline */}
        <div className="space-y-3">
          {mockWorkflowNodes.map((node, i) => {
            const Icon = nodeIcons[node.id] ?? Sparkles;
            const isActive = i === active;
            const isDone = i < active;
            return (
              <motion.div
                key={node.id}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive
                    ? 'hsl(18 89% 55% / 0.6)'
                    : 'hsl(224 20% 90% / 1)',
                }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center gap-3 rounded-xl border bg-white p-3 dark:bg-slate-800/60"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-warm text-white'
                      : isDone
                        ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {node.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {node.id}.step
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-gradient-warm"
                      initial={{ width: '0%' }}
                      animate={{
                        width: isActive ? '100%' : isDone ? '100%' : '0%',
                      }}
                      transition={{ duration: isActive ? 1.2 : 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* live metrics footer */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'New Leads', value: '+128' },
            { label: 'Conversion', value: '24%' },
            { label: 'Revenue Growth', value: '+3.2x' },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-muted/40 p-3 dark:border-white/10 dark:from-slate-800/60 dark:to-slate-900/40"
            >
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {m.label}
              </div>
              <div className="mt-0.5 text-lg font-bold tracking-tight text-foreground">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating accent chips */}
      <motion.div
        className="absolute -right-4 -top-4 hidden rounded-2xl border border-slate-200/60 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900 sm:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/15 text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Lead conversion</div>
            <div className="text-sm font-bold text-foreground">3.2x</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-slate-200/60 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900 sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Automation</div>
            <div className="text-sm font-bold text-foreground">Active</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* background layers */}
      <div className="absolute inset-0 bg-mesh-warm" />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
      <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-warm opacity-20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* left: copy + capture */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <GlowBadge>
                <Sparkles className="h-3.5 w-3.5" />
                Built for Growing Businesses
              </GlowBadge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tighter text-foreground sm:text-5xl lg:text-6xl"
            >
              Turn Your Small Business Into a
              <br className="hidden sm:block" />{' '}
              <GradientText>Customer-Getting Machine</GradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
            >
              Tired of feast-or-famine months, wasted ad spend, and marketing
              that just doesn&apos;t convert? We help small business owners
              attract the right customers, automatically — so you spend less
              time chasing leads and more time running the business you built.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row lg:mx-0"
            >
              <input
                type="email"
                required
                placeholder="you@yourbusiness.com"
                aria-label="Email address"
                className="h-12 flex-1 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none ring-offset-background transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
              />
              <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-gradient-warm px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40 hover:brightness-105"
              >
                Get More Customers Today
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
            >
              <span className="flex -space-x-2">
                {['bg-orange-500', 'bg-rose-500', 'bg-pink-500', 'bg-amber-500'].map(
                  (c, i) => (
                    <span
                      key={i}
                      className={`h-6 w-6 rounded-full border-2 border-background ${c}`}
                    />
                  )
                )}
              </span>
              Trusted by 500+ local and digital small businesses
            </motion.p>
          </div>

          {/* right: animated mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <WorkflowMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
