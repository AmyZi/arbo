// Approximate USD conversion rates, refreshed periodically by hand.
// These are ROUNDED ESTIMATES for display purposes only — not live FX rates.
// If you need live-accurate rates, swap the lookup below for a call to a
// live FX API (e.g. https://open.er-api.com/v6/latest/USD) and cache it
// with a daily revalidate.
const countryToCurrency: Record<string, { currency: string; rate: number }> = {
  // Europe
  GB: { currency: 'GBP', rate: 0.78 },
  DE: { currency: 'EUR', rate: 0.92 },
  FR: { currency: 'EUR', rate: 0.92 },
  ES: { currency: 'EUR', rate: 0.92 },
  IT: { currency: 'EUR', rate: 0.92 },
  NL: { currency: 'EUR', rate: 0.92 },
  BE: { currency: 'EUR', rate: 0.92 },
  IE: { currency: 'EUR', rate: 0.92 },
  PT: { currency: 'EUR', rate: 0.92 },
  AT: { currency: 'EUR', rate: 0.92 },
  FI: { currency: 'EUR', rate: 0.92 },
  GR: { currency: 'EUR', rate: 0.92 },
  SE: { currency: 'SEK', rate: 10.4 },
  NO: { currency: 'NOK', rate: 10.6 },
  DK: { currency: 'DKK', rate: 6.9 },
  PL: { currency: 'PLN', rate: 4.0 },
  CH: { currency: 'CHF', rate: 0.88 },
  TR: { currency: 'TRY', rate: 34.0 },

  // Americas
  CA: { currency: 'CAD', rate: 1.37 },
  MX: { currency: 'MXN', rate: 18.5 },
  BR: { currency: 'BRL', rate: 5.6 },
  AR: { currency: 'ARS', rate: 1000 },
  CL: { currency: 'CLP', rate: 950 },
  CO: { currency: 'COP', rate: 4100 },
  PE: { currency: 'PEN', rate: 3.75 },

  // Asia-Pacific
  AU: { currency: 'AUD', rate: 1.53 },
  NZ: { currency: 'NZD', rate: 1.66 },
  IN: { currency: 'INR', rate: 84.0 },
  JP: { currency: 'JPY', rate: 152.0 },
  CN: { currency: 'CNY', rate: 7.25 },
  SG: { currency: 'SGD', rate: 1.35 },
  MY: { currency: 'MYR', rate: 4.45 },
  TH: { currency: 'THB', rate: 34.5 },
  ID: { currency: 'IDR', rate: 15800 },
  PH: { currency: 'PHP', rate: 57.0 },
  VN: { currency: 'VND', rate: 25400 },
  KR: { currency: 'KRW', rate: 1380 },
  PK: { currency: 'PKR', rate: 278 },
  BD: { currency: 'BDT', rate: 118 },

  // Middle East & Africa
  AE: { currency: 'AED', rate: 3.67 },
  SA: { currency: 'SAR', rate: 3.75 },
  ZA: { currency: 'ZAR', rate: 18.2 },
  NG: { currency: 'NGN', rate: 1550 },
  KE: { currency: 'KES', rate: 129 },
  GH: { currency: 'GHS', rate: 15.5 },
  EG: { currency: 'EGP', rate: 49.5 },
};

export function formatCurrencyAmount(currency: string, amount: number): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface LocalPrice {
  isUS: boolean;
  country: string;
  currency: string;
  amount: number;
  formatted: string;
}

/**
 * Converts a base USD amount into an approximate local-currency estimate
 * for the given country. Falls back to displaying USD if the country is
 * the US, unrecognized, or unmapped.
 */
export function getLocalPrice(countryCode: string | null | undefined, usdAmount: number): LocalPrice {
  const code = (countryCode ?? '').toUpperCase();
  const info = code && code !== 'US' ? countryToCurrency[code] : undefined;

  if (!info) {
    return {
      isUS: true,
      country: code || 'US',
      currency: 'USD',
      amount: usdAmount,
      formatted: `$${usdAmount}`,
    };
  }

  const converted = Math.round(usdAmount * info.rate);
  const formatted = formatCurrencyAmount(info.currency, converted);

  return {
    isUS: false,
    country: code,
    currency: info.currency,
    amount: converted,
    formatted,
  };
}