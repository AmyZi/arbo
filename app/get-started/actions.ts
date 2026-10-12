'use server';

import nodemailer from 'nodemailer';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PLANS = ['audit', 'rank', 'custom'] as const;
type Plan = (typeof PLANS)[number];

const PLAN_LABEL: Record<Plan, string> = {
  audit: 'free SEO analysis',
  rank: 'SEO growth',
  custom: 'custom website',
};

const Lead = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().max(2000),
});

// Single-line fields: strip line breaks so nothing can sneak into email headers.
const oneLine = (v: FormDataEntryValue | null) =>
  String(v ?? '').replace(/[\r\n]+/g, ' ').trim();

// Accepts "example.se" or "https://example.se". Returns '' if empty, null if invalid.
function normaliseWebsite(input: string): string | null {
  if (!input) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
    return url.hostname.includes('.') ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function submitLead(formData: FormData) {
  // Honeypot: bots fill the hidden field. Pretend it worked, send nothing.
  if (String(formData.get('company') ?? '')) redirect('/thank-you');

  const rawPlan = oneLine(formData.get('plan'));
  const plan: Plan = (PLANS as readonly string[]).includes(rawPlan)
    ? (rawPlan as Plan)
    : 'audit';

  const parsed = Lead.safeParse({
    name: oneLine(formData.get('name')),
    email: oneLine(formData.get('email')),
    message: String(formData.get('message') ?? '').trim(),
  });
  const website = normaliseWebsite(oneLine(formData.get('website')));

  // Website is required for everything except a brand-new custom build.
  if (!parsed.success || website === null || (plan !== 'custom' && !website)) {
    redirect(`/get-started?plan=${plan}&error=invalid`);
  }

  const { name, email, message } = parsed.data;

  let sent = false;
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"ArboWeb website" <${process.env.GMAIL_USER}>`,
      to: process.env.LEAD_TO_EMAIL || process.env.GMAIL_USER,
      replyTo: { name, address: email }, // hitting Reply answers the lead
      subject: `New ${PLAN_LABEL[plan]} request from ${name}`,
      text: [
        `Plan: ${PLAN_LABEL[plan]}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Website: ${website || '(none given)'}`,
        '',
        message || '(no message)',
      ].join('\n'),
    });
    sent = true;
  } catch (err) {
    console.error('Lead email failed:', err);
  }

  // redirect() works by throwing, so it must stay outside the try/catch.
  redirect(sent ? '/thank-you' : `/get-started?plan=${plan}&error=send`);
}