// lib/generateJsonLd.ts
//
// Builds JSON-LD structured data objects from a blog post's frontmatter.
// Pulls from the Decap CMS fields defined in config.yml:
//   title, description, date, author, coverImage, tags,
//   seoTitle, metaDescription, targetKeyword, slugOverride,
//   schemaTypes, faqs
//
// This does NOT render anything — it just returns plain objects.
// Pair it with the <JsonLd /> component to inject <script> tags.

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  description?: string;
  date: string; // "YYYY-MM-DD"
  author?: string;
  coverImage?: string;
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
  targetKeyword?: string;
  slugOverride?: string;
  schemaTypes?: string[]; // e.g. ["Article", "FAQPage", "Table"]
  faqs?: FaqEntry[];
}

const SITE_NAME = "ArboWeb";
const SITE_URL = "https://www.arboweb.com"; // update if this differs from your live domain

/**
 * Builds the canonical URL for a post given its computed slug.
 */
export function buildPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

/**
 * Article schema — safe to include on every blog post regardless of
 * whether "Article" is explicitly checked in schemaTypes.
 */
function buildArticleSchema(fm: BlogFrontmatter, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.seoTitle || fm.title,
    description: fm.metaDescription || fm.description || "",
    datePublished: fm.date,
    dateModified: fm.date,
    author: {
      "@type": "Organization",
      name: fm.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`, // update path if different
      },
    },
    image: fm.coverImage ? `${SITE_URL}${fm.coverImage}` : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildPostUrl(slug),
    },
  };
}

/**
 * FAQPage schema — only built if faqs[] is non-empty.
 * This is the piece that actually earns the expandable FAQ rich result.
 */
function buildFaqSchema(fm: BlogFrontmatter) {
  if (!fm.faqs || fm.faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fm.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateJsonLd(fm: BlogFrontmatter, slug: string): object[] {
  const selected = new Set(fm.schemaTypes || []);
  const blocks: object[] = [buildArticleSchema(fm, slug)];

  if (selected.has("FAQPage")) {
    const faqSchema = buildFaqSchema(fm);
    if (faqSchema) blocks.push(faqSchema);
  }

  return blocks;
}