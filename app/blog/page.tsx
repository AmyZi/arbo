import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { getAllPosts, formatDate, type PostMeta } from '@/lib/posts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/sections/Newsletter';
import { GradientText } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Blog — Small business growth insights',
  description:
    'Field notes on getting more small business customers: lead generation tactics, funnel fixes, and case studies from real small business growth campaigns.',
  alternates: { canonical: 'https://arboweb.com/blog' },
  openGraph: {
    title: 'Blog — Small business growth insights',
    description:
      'Field notes on getting more small business customers: lead generation tactics, funnel fixes, and case studies from real campaigns.',
    url: 'https://arboweb.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden border-b border-border/60 py-20">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              The Arbo Blog
            </span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
              Field notes on growing your <GradientText>small business</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Lead generation tactics, funnel fixes, and case studies from
              small business owners who scaled past the plateau.
            </p>
          </div>
        </section>

        {featured && <FeaturedPost post={featured} />}

        {rest.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                More articles
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
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

function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/blog/${post.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-slate-200/60 bg-card shadow-sm transition-all hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10 lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto">
            <Image
              src={post.cover}
              alt={`${post.title} small business SEO and web development article`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
              Read the article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={post.cover}
          alt={`${post.title} small business customer acquisition article`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
