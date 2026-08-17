import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import {
  getAllPosts,
  getPostBySlug,
  formatDate,
  type PostMeta,
} from '@/lib/posts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/sections/Newsletter';
import { siteConfig } from '@/lib/content';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };

  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    // Falls back to description if metaDescription wasn't set in the CMS.
    description: post.metaDescription || post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.metaDescription || post.description,
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.cover ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.description,
      images: post.cover ? [post.cover] : [],
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  // Only built when the CMS "FAQs" list is non-empty. Deliberately kept
  // as a separate script tag rather than merged into jsonLd above —
  // Google reads multiple ld+json blocks on one page fine, and keeping
  // them separate means a malformed FAQ list can't break the core
  // BlogPosting schema.
  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Navbar />
      <main className="pt-16">
        <article className="relative">
          {/* header */}
          <header className="relative overflow-hidden border-b border-border/60 py-16">
            <div className="absolute inset-0 bg-mesh-warm" />
            <div className="absolute inset-0 bg-grid mask-fade-b opacity-30" />
            <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-warm text-sm font-bold text-white">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {post.author}
                    </div>
                    <div className="text-xs">{post.authorRole}</div>
                  </div>
                </div>
                <span className="h-4 w-px bg-border" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </header>

          {/* cover */}
          {post.cover && (
            <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
              <div className="-mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-xl">
                <Image
                  src={post.cover}
                  alt={`${post.title} small business SEO strategy`}
                  fill
                  sizes="(min-width: 768px) 896px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* body */}
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <div
              className="prose-content space-y-6 text-[1.0625rem] leading-[1.75] text-foreground/90"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>

        {/* related */}
        {related.length > 0 && (
          <section className="border-t border-border/60 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                Keep reading
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <RelatedCard key={r.slug} post={r} />
                ))}
              </div>
            </div>
          </section>
        )}

        <Newsletter />
        <Footer />
      </main>
    </>
  );
}

function RelatedCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={post.cover}
          alt={`${post.title} related small business growth article`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
          Read
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}