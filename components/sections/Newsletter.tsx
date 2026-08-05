'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { GradientText } from '@/components/motion/Reveal';

type Status = 'idle' | 'loading' | 'success';

export function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      // TODO: wire this up to your own backend/email provider, e.g.:
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email: trimmed }) });
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      toast.success('You\u2019re booked! We\u2019ll reach out within 1 business day.');
      setEmail('');
    } catch (err) {
      setStatus('idle');
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="newsletter" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-mesh-warm" />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-white to-orange-50/40 p-8 text-center shadow-2xl shadow-orange-500/10 dark:from-slate-900 dark:to-slate-900/60 sm:p-12"
        >
          <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-gradient-warm opacity-20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-warm text-white shadow-lg shadow-orange-500/30">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Competitors Are Already <GradientText>Scaling</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Book your free strategy session and discover exactly how to
              attract more customers and grow your small business — starting
              this week.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-medium text-green-700 dark:text-green-400"
              >
                <CheckCircle2 className="h-5 w-5" />
                You&apos;re booked in. We&apos;ll be in touch shortly.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best email"
                  aria-label="Email address"
                  disabled={status === 'loading'}
                  className="h-12 flex-1 rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none ring-offset-background transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-gradient-warm px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-105 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Claim My Free Growth Session
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              We&apos;ll show you your custom growth plan. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
