// app/thank-you/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/ui/PageBackground';

export const metadata: Metadata = {
  title: 'Thank you | ArboWeb',
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <>
      <main className="pt-16">
        <PageBackground>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
              Thanks, we have your request
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              The developer will review your website and reply to you by email.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing arriving? Check your spam folder, or write to us directly at [EMAIL].
            </p>
            <div className="mt-8 flex justify-center gap-4 text-sm">
              <Link href="/" className="underline">Back to home</Link>
              <Link href="/blog" className="underline">Read the blog</Link>
            </div>
          </div>
        </PageBackground>
      </main>
    </>
  );
}