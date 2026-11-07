import { NextRequest, NextResponse } from 'next/server';

// GitHub redirects the popup here after the user approves access.
// We exchange the temporary `code` for a real access token, then hand
// it back to the Decap CMS window that opened this popup, using the
// postMessage handshake Decap's OAuth client expects.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = request.cookies.get('decap_oauth_state')?.value;

  if (!code || !state || state !== savedState) {
    return htmlResponse(renderMessage('error', { message: 'Invalid or expired login attempt. Please try again.' }));
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse(renderMessage('error', { message: 'Server is missing GitHub OAuth credentials.' }));
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      renderMessage('error', { message: tokenData.error_description ?? 'GitHub rejected the login.' })
    );
  }

  const response = htmlResponse(
    renderMessage('success', { token: tokenData.access_token, provider: 'github' })
  );
  response.cookies.delete('decap_oauth_state');
  return response;
}

function htmlResponse(html: string) {
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
}

function renderMessage(status: 'success' | 'error', payload: Record<string, unknown>) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

  // This exact handshake — wait for the opener's "authorizing" ping, then
  // reply with the token — is what Decap's login popup expects.
  return `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin);
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;
}