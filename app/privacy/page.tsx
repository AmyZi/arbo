import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/ui/PageBackground';
import { JsonLd } from '@/components/JsonLd';
import { baseNodes, webPage, breadcrumbs, graph } from '@/lib/schema';

const path = '/privacy';
export const metadata: Metadata = {
  title: 'Privacy Policy | ArboWeb',
  description:
    'How ArboWeb collects, uses, and protects personal data when you contact us or use this website.',
  alternates: { canonical: path },
};

export default function PrivacyPolicy() {
  const data = graph([
    ...baseNodes(),
    webPage({
      path,
      name: 'Privacy Policy | ArboWeb',
      description: String(metadata.description),
      lang: 'en',
      hasBreadcrumb: true,
    }),
    breadcrumbs(path, [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path },
    ]),
  ]);

  return (
    <>
      <JsonLd data={data} />
      <main className="pt-16">
        <PageBackground>
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: September 1, 2026
            </p>

            <div className="mt-10 space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  1. Who is responsible
                </h2>
                <p className="mt-2">
                  Arbo AB, organisation number 559309-5408, Borås, Sweden, is
                  the data controller for the personal data described here. You
                  can reach us at{' '}
                  <a
                    href="mailto:contact@arboweb.com"
                    className="text-foreground underline underline-offset-4 hover:text-orange-500"
                  >
                    contact@arboweb.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  2. What we collect
                </h2>
                <p className="mt-2">
                  When you use the form on our Get Started page, we collect:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>your name and email address</li>
                  <li>your website address</li>
                  <li>any message you choose to write</li>
                  <li>
                    which option you selected (for example, the free SEO
                    analysis)
                  </li>
                </ul>
                <p className="mt-2">
                  When you subscribe to our newsletter, we collect your email
                  address.
                </p>
                <p className="mt-2">
                  We collect basic usage data, including pages visited,
                  interactions on the site, and approximate location
                  (country/city level), to help us understand visitor interest
                  and enhance our product offering. No personal identifiers are
                  collected or stored.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  3. Why we use it, and on what basis
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>
                    To reply to your request and provide the analysis or quote
                    you asked for. Legal basis: taking steps at your request
                    before entering into a contract, and our legitimate interest
                    in handling enquiries (GDPR Article 6(1)(b) and (f)).
                  </li>
                  <li>
                    To send you our newsletter. Legal basis: your consent
                    (Article 6(1)(a)). You can withdraw it at any time using the
                    unsubscribe link.
                  </li>
                  <li>
                    To understand how the site is used. Legal basis: legitimate
                    interests (to analyze visitor interactions and approximate
                    location in order to enhance our product and market
                    offering).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  4. Who we share it with
                </h2>
                <p className="mt-2">
                  We do not sell your data. We use service providers that process
                  data on our behalf: Google (email delivery and storage),
                  Vercel, Namecheap, and Google Search Console.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  5. Transfers outside the EU/EEA
                </h2>
                <p className="mt-2">
                  We do not transfer your data outside the EU/EEA.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  6. How long we keep it
                </h2>
                <p className="mt-2">
                  Enquiries are kept for 12 months after our last contact, unless
                  you become a client, in which case we keep the data needed for
                  the engagement and for our legal obligations, such as
                  accounting.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  7. Your rights
                </h2>
                <p className="mt-2">
                  You have the right to access your data, have it corrected or
                  erased, restrict or object to its use, and receive a copy in a
                  portable format. Where we rely on your consent, you can
                  withdraw it at any time. To exercise any of these rights, email{' '}
                  <a
                    href="mailto:contact@arboweb.com"
                    className="text-foreground underline underline-offset-4 hover:text-orange-500"
                  >
                    contact@arboweb.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  8. Complaints
                </h2>
                <p className="mt-2">
                  If you think we handle your data incorrectly, you can complain
                  to the Swedish Authority for Privacy Protection
                  (Integritetsskyddsmyndigheten, IMY) at imy.se.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  9. Changes
                </h2>
                <p className="mt-2">
                  We may update this policy. The date at the top shows when it
                  was last changed.
                </p>
              </section>
            </div>
          </div>
        </PageBackground>
      </main>
    </>
  );
}