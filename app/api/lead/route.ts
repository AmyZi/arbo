import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// nodemailer needs the Node.js runtime (it does not run on the Edge runtime).
export const runtime = 'nodejs';

// Very small in-memory rate limiter. Resets on cold start, so it's not
// bulletproof — but it stops a bot hammering the endpoint in a burst,
// which is the most common pattern. For stronger protection under real
// load, swap this for Vercel KV / Upstash Redis.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3; // max submissions per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Max length for every field (stops oversized payloads).
const MAX_LEN = {
  name: 100,
  email: 200,
  phone: 50,
  business: 150,
  website: 300,
  plan: 20,
  message: 3000,
} as const;

// Strip line breaks from anything used in headers (subject, reply-to name).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      business,
      website,
      plan,
      message,
      // Honeypot — a checkbox real visitors never see, so it's never
      // checked by a human. Text-field honeypots can get silently
      // autofilled by the browser (e.g. Chrome's "company"/"url"
      // heuristics), which false-positives on real submissions.
      // Checkboxes don't have that problem.
      confirm_human,
      // Timestamp (ms) of when the form was rendered, sent by the client.
      renderedAt,
      // Optional: milliseconds the visitor spent on the form, measured on
      // the client. Immune to clock differences between the visitor's
      // device and the server.
      elapsedMs,
    } = body ?? {};

    // --- Bot checks (silently reject, don't tell the bot why) ---
    if (confirm_human === true) {
      console.warn('Blocked lead: honeypot checkbox checked', { ip });
      return NextResponse.json({ success: true }); // fake success, no email sent
    }

    // Prefer the client-measured duration; fall back to renderedAt.
    const elapsed =
      typeof elapsedMs === 'number'
        ? elapsedMs
        : typeof renderedAt === 'number'
          ? Date.now() - renderedAt
          : null;

    if (elapsed !== null && elapsed < 1500) {
      console.warn('Blocked lead: submitted too fast', { ip, elapsed });
      return NextResponse.json({ success: true });
    }

    // --- Real validation (these DO tell the user what's wrong) ---
    // Every field must be a string (or missing) and within its limit.
    const fields = { name, email, phone, business, website, plan, message };
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined || value === null || value === '') continue;
      if (typeof value !== 'string') {
        return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
      }
      if (value.length > MAX_LEN[key as keyof typeof MAX_LEN]) {
        return NextResponse.json(
          { error: `${key[0].toUpperCase()}${key.slice(1)} is too long.` },
          { status: 400 }
        );
      }
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // --- Gmail SMTP config ---
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.LEAD_NOTIFICATION_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass || !to) {
      console.error('GMAIL_USER or GMAIL_APP_PASSWORD is not set.');
      return NextResponse.json(
        { error: 'Server is not configured to receive leads yet.' },
        { status: 500 }
      );
    }

    const planLabels: Record<string, string> = {
      audit: 'Audit & Strategy (Free)',
      rank: 'Rank & Track',
      custom: 'Custom Build & Scale',
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass },
    });

    try {
      await transporter.sendMail({
        // Gmail always sends from the authenticated account, whatever is set here.
        from: `"ArboWeb Leads" <${gmailUser}>`,
        to,
        // Hitting Reply in Gmail answers the lead directly.
        replyTo: { name: oneLine(name), address: email },
        subject: oneLine(`New lead: ${name}${business ? ` (${business})` : ''}`),
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : '',
          business ? `Business: ${business}` : '',
          website ? `Website: ${website}` : '',
          plan ? `Interested in: ${planLabels[plan] ?? plan}` : '',
          message ? `\nMessage:\n${message}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        html: `
          <h2>New lead from ArboWeb</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
          ${business ? `<p><strong>Business:</strong> ${escapeHtml(business)}</p>` : ''}
          ${website ? `<p><strong>Website:</strong> ${escapeHtml(website)}</p>` : ''}
          ${plan ? `<p><strong>Interested in:</strong> ${escapeHtml(planLabels[plan] ?? plan)}</p>` : ''}
          ${message ? `<p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, '<br />')}</p>` : ''}
        `,
      });
    } catch (err) {
      console.error('Gmail SMTP error:', err);
      return NextResponse.json(
        { error: 'Failed to send. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}