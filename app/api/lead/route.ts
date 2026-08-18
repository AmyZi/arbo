import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, business, website, plan, message } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const to = process.env.LEAD_NOTIFICATION_EMAIL;
    if (!to) {
      console.error('LEAD_NOTIFICATION_EMAIL is not set.');
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

    const { error } = await resend.emails.send({
      // Swap this once you've verified a domain in Resend.
      // Until then you can only send from onboarding@resend.dev.
      from: 'Arbo Leads <onboarding@resend.dev>',
      to,
      replyTo: email,
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
    });

    if (error) {
      console.error('Resend error:', error);
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