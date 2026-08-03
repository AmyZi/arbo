'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Reveal, GlowBadge, GradientText } from '@/components/motion/Reveal';

type PlanId = 'audit' | 'rank' | 'custom' | '';

const planLabels: Record<Exclude<PlanId, ''>, string> = {
  audit: 'Audit & Strategy (Free)',
  rank: 'Rank & Track',
  custom: 'Custom Build & Scale',
};

function GetStartedForm() {
  const searchParams = useSearchParams();
  const planParam = (searchParams.get('plan') ?? '') as PlanId;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    website: '',
    plan: planParam in planLabels ? planParam : ('' as PlanId),
    message: '',
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-green-500/30 bg-green-500/10 px-8 py-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        <h2 className="font-display text-xl font-bold text-foreground">
          You&apos;re in! We&apos;ll be in touch shortly.
        </h2>
        <p className="text-sm text-muted-foreground">
          Keep an eye on your inbox — we typically reply within 1 business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-2xl gap-5 rounded-3xl border border-slate-200/60 bg-card p-6 shadow-xl shadow-black/[0.03] dark:border-white/10 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full name *
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Jordan Ellis"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@yourbusiness.com"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="business" className="text-sm font-medium text-foreground">
            Business name
          </label>
          <input
            id="business"
            value={form.business}
            onChange={(e) => update('business', e.target.value)}
            placeholder="Ellis Home Services"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="website" className="text-sm font-medium text-foreground">
            Website (if you have one)
          </label>
          <input
            id="website"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://yourbusiness.com"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="plan" className="text-sm font-medium text-foreground">
            What are you interested in?
          </label>
          <select
            id="plan"
            value={form.plan}
            onChange={(e) => update('plan', e.target.value as PlanId)}
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          >
            <option value="">Not sure yet</option>
            <option value="audit">{planLabels.audit}</option>
            <option value="rank">{planLabels.rank}</option>
            <option value="custom">{planLabels.custom}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Anything else we should know?
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Tell us about your business and what you're hoping to achieve."
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-gradient-warm text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-105 disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send My Request
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="text-center text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground">
        No spam, ever. We&apos;ll only use this to reach out about your Growth plan.
      </p>
    </form>
  );
}

export default function GetStartedPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <GlowBadge className="mx-auto">
                <Sparkles className="h-3.5 w-3.5" />
                Let&apos;s grow your small business
              </GlowBadge>
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
                Tell us about your business —
                <br className="hidden sm:block" />{' '}
                <GradientText>we&apos;ll take it from there.</GradientText>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Whether you want a free audit, help ranking locally, or a
                custom-built Growth engine, this is the fastest way to reach
                us. We reply within 1 business day.
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={0.1}>
              <Suspense fallback={null}>
                <GetStartedForm />
              </Suspense>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}