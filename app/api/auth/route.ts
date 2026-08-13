import { NextResponse } from 'next/server';

// Kicks off GitHub's OAuth flow. Decap CMS opens this URL in a popup
// window when someone clicks "Login with GitHub" on /admin.
export async function GET(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new NextResponse('Missing GITHUB_OAUTH_CLIENT_ID env var.', { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', `${origin}/api/callback`);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  const response = NextResponse.redirect(authorizeUrl.toString());
  // Read back in the callback to guard against CSRF.
  response.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: true,
    maxAge: 600, // 10 minutes — the whole login round-trip should take seconds
    path: '/',
    sameSite: 'lax',
  });
  return response;
}