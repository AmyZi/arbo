import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/ui/PageBackground';
import { JsonLd } from '@/components/JsonLd';
import { baseNodes, webPage, breadcrumbs, graph } from '@/lib/schema';

/* ------------------------------------------------------------------ */
/* Edit these values. Everything on the page reads from here.          */
/* ------------------------------------------------------------------ */
const CONTACT = {
  name: 'Amina Abah',
  role: 'Web developer & SEO specialist',
  photo: '/images/amina-abah.jpeg',
  photoAlt: 'Amina Abah, web developer and SEO specialist at ArboWeb',
  phoneDisplay: '+46 70 123 45 67',
  phoneHref: '+46701234567',
  linkedin: 'https://www.linkedin.com/in/amina-idris-at-lkin',
};

const WHAT_I_DO = [
  {
    title: 'Custom websites',
    text: 'Fast, clean sites built directly by me, with SEO designed in from the start.',
  },
  {
    title: 'SEO and local visibility',
    text: 'Technical fixes, local SEO and content, so the customers searching on Google can find you.',
  },
  {
    title: 'Clear reporting',
    text: 'A plain-language view of what is working, tied to enquiries rather than vanity numbers.',
  },
];

const path = '/contact'; // match your trailingSlash setting

export const metadata: Metadata = {
  title: 'Contact | ArboWeb',
  description:
    'Talk directly with the developer behind ArboWeb. Call, connect on LinkedIn, or request a free SEO audit.',
  alternates: { canonical: path }, // requires metadataBase in your root layout
};

export default function ContactPage() {
  const data = graph([
    ...baseNodes(),
    webPage({
      path,
      name: 'Contact | ArboWeb',
      description: String(metadata.description),
      lang: 'en',
      type: 'ContactPage',
      hasBreadcrumb: true,
    }),
    breadcrumbs(path, [
      { name: 'Home', path: '/' },
      { name: 'Contact', path },
    ]),
  ]);

  return (
    <>
      <JsonLd data={data} />
      <Navbar />
      <main className="pt-16">
        <PageBackground>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Photo */}
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <Image
                src={CONTACT.photo}
                alt={CONTACT.photoAlt}
                width={640}
                height={800}
                priority
                className="h-auto w-full rounded-3xl object-cover shadow-xl shadow-black/10"
              />
            </div>

            {/* Text */}
            <div>
              <h1 className="font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
                Talk directly with the developer
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {CONTACT.name} · {CONTACT.role}
              </p>

              <h2 className="mt-8 text-lg font-semibold text-foreground">What I do</h2>
              <ul className="mt-3 space-y-4">
                {WHAT_I_DO.map((item) => (
                  <li key={item.title}>
                    <span className="block font-medium text-foreground">{item.title}</span>
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-lg font-semibold text-foreground">Get in touch</h2>
              <ul className="mt-3 space-y-3">
                <li>
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              </ul>

              <Link
                href="/get-started?plan=audit"
                className="group mt-8 inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-gradient-warm px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40 hover:brightness-105"
              >
                Get my free SEO audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </PageBackground>
      </main>
      <Footer />
    </>
  );
}