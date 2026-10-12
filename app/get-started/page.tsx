// app/get-started/page.tsx
// Plan-aware intake page. ?plan=audit | rank | custom changes the copy only.
// All variants share one canonical URL (/get-started), which fixes the
// duplicate-URL and duplicate-schema findings from the Semrush audit.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { baseNodes, webPage, breadcrumbs, graph } from '@/lib/schema';

const path = '/get-started';

export const metadata: Metadata = {
  title: 'Get your free SEO analysis | ArboWeb',
  description:
    'Tell us about your business and website. We review how you show up on Google and send back a clear list of what to fix first. Free and no commitment.',
  alternates: { canonical: path }, // requires metadataBase in your root layout
};

/* ------------------------------------------------------------------ */
/* Copy per plan. Edit the wording here, nowhere else.                 */
/* ------------------------------------------------------------------ */
const PLANS = {
  audit: {
    heading: 'Get your free SEO analysis',
    intro:
      'Tell us about your business and your website. We look at how you show up on Google today and send you a short, plain-language list of what to fix first.',
    cta: 'Send me my free analysis',
    gets: [
      'A technical check: speed, mobile, indexing and structured data',
      'How your site appears for the searches your customers actually use',
      'A short list of fixes, ordered by what is likely to matter most',
    ],
  },
  rank: {
    heading: 'Grow your visibility on Google',
    intro:
      'Ongoing SEO from the developer who works on your site. Tell us where you are today and which customers you want to reach.',
    cta: 'Tell us about your goals',
    gets: [
      'A starting audit of your site and your main search terms',
      'Technical fixes and content planned together, not in separate silos',
      'Reporting on enquiries and bookings, not just rankings',
    ],
  },
  custom: {
    heading: 'Get a website built to be found',
    intro:
      'A custom-built site with SEO designed in from day one, built directly by the developer you will be talking to.',
    cta: 'Tell us about your project',
    gets: [
      'A direct conversation with the person who will build your site',
      'Clean, fast code with SEO built into the structure',
      'You own the site, the code and the accounts',
    ],
  },
} as const;

type PlanKey = keyof typeof PLANS;
const isPlan = (v: string | undefined): v is PlanKey => !!v && v in PLANS;

const STEPS = [
  { title: 'You tell us the basics', text: 'Your business, your website and what you want more of.' },
  { title: 'We take a proper look', text: 'The developer who would do the work reviews your site.' },
  { title: 'You get a clear answer', text: 'What to fix, in what order, and what it would take.' },
];

/* ------------------------------------------------------------------ */
/* Form handler. Replace the TODO with your real delivery method.      */
/* ------------------------------------------------------------------ */
async function submitLead(formData: FormData) {
  'use server';
  const lead = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    website: String(formData.get('website') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    plan: String(formData.get('plan') ?? 'audit'),
  };
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get('company') ?? '')) return;
  // TODO: validate the fields, then send `lead` to your CMS, CRM or email service.
  // TODO: redirect to a thank-you page after saving.
  void lead;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default async function GetStarted({
  searchParams,
}: {
  // Next.js 15 passes searchParams as a Promise. On Next 14, remove the Promise and await.
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: raw } = await searchParams;
  const plan: PlanKey = isPlan(raw) ? raw : 'audit';
  const copy = PLANS[plan];

  const data = graph([
    ...baseNodes(),
    webPage({
      path,
      name: 'Get your free SEO analysis | ArboWeb',
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
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <JsonLd data={data} />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: promise and proof of process */}
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
            {copy.heading}
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">{copy.intro}</p>

          <h2 className="mt-10 text-lg font-semibold text-foreground">What you get</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {copy.gets.map((g) => (
              <li key={g} className="flex gap-2">
                <span aria-hidden="true">&#10003;</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg font-semibold text-foreground">How it works</h2>
          <ol className="mt-3 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-warm text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-medium text-foreground">{s.title}</span>
                  <span className="text-muted-foreground">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: the form */}
        <form action={submitLead} className="space-y-4 rounded-2xl border border-input bg-background p-6 shadow-sm">
          <input type="hidden" name="plan" value={plan} />
          {/* Honeypot, hidden from people */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <Field label="Your name" name="name" type="text" autoComplete="name" required />
          <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@yourbusiness.com" />
          <Field label="Your website" name="website" type="url" placeholder="https://" required={plan !== 'custom'} />

          <label className="block text-sm font-medium text-foreground">
            What would you like more of? <span className="font-normal text-muted-foreground">(optional)</span>
            <textarea
              name="message"
              rows={4}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
            />
          </label>

          <button
            type="submit"
            className="group inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-warm px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40 hover:brightness-105"
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* GDPR: say what you do with the data and link your privacy policy */}
          <p className="text-xs text-muted-foreground">
            We use your details only to reply to this request. Read our{' '}
            <Link href="/privacy" className="underline">privacy policy</Link>.
          </p>
        </form>
      </div>
    </main>
  );
}

function Field(props: {
  label: string; name: string; type: string;
  required?: boolean; placeholder?: string; autoComplete?: string;
}) {
  const { label, ...input } = props;
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      <input
        {...input}
        className="mt-1 h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30"
      />
    </label>
  );
}