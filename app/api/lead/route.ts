import { NextResponse } from 'next/server';

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
      // Bots that script-submit instantly almost always beat this.
      renderedAt,
    } = body ?? {};

    // --- Bot checks (silently reject, don't tell the bot why) ---
    if (confirm_human === true) {
      console.warn('Blocked lead: honeypot checkbox checked', { ip });
      return NextResponse.json({ success: true }); // fake success, no email sent
    }

    if (typeof renderedAt === 'number') {
      const elapsed = Date.now() - renderedAt;
      if (elapsed < 1500) {
        console.warn('Blocked lead: submitted too fast', { ip, elapsed });
        return NextResponse.json({ success: true });
      }
    }

    // --- Real validation (these DO tell the user what's wrong) ---
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

    if (typeof name === 'string' && name.length > 100) {
      return NextResponse.json({ error: 'Name is too long.' }, { status: 400 });
    }

    const to = process.env.LEAD_NOTIFICATION_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!to || !apiKey) {
      console.error('RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL is not set.');
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

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Swap this once you've verified a domain in Resend.
        // Until then you can only send from onboarding@resend.dev.
        from: 'Arbo Leads <onboarding@resend.dev>',
        to,
        reply_to: email,
        subject: `New lead: ${name}${business ? ` (${business})` : ''}`,
        html: `
          <h2>New lead from Arbo.com</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
          ${business ? `<p><strong>Business:</strong> ${escapeHtml(business)}</p>` : ''}
          ${website ? `<p><strong>Website:</strong> ${escapeHtml(website)}</p>` : ''}
          ${plan ? `<p><strong>Interested in:</strong> ${escapeHtml(planLabels[plan] ?? plan)}</p>` : ''}
          ${message ? `<p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, '<br />')}</p>` : ''}
        `,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      console.error('Resend API error:', res.status, data);
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