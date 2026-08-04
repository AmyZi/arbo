import { NextResponse } from 'next/server';
import { getLocalPrice } from '@/lib/geo-pricing';

// Base USD price for the "Rank & Track" tier that gets localized.
const BASE_USD_PRICE = 50;

export async function GET(request: Request) {
  // Vercel automatically sets this header on every request at the edge —
  // no middleware needed. Locally (npm run dev) it won't be set, so we
  // fall back to 'US' and you'll just see the standard $49 pricing.
  const country = request.headers.get('x-vercel-ip-country') ?? 'US';

  const price = getLocalPrice(country, BASE_USD_PRICE);

  return NextResponse.json(price, {
    headers: {
      // Safe to cache briefly at the edge/browser — country rarely changes
      // mid-session, and rates are static estimates anyway.
      'Cache-Control': 'public, max-age=3600',
    },
  });
}