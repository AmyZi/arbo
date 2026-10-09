import { siteConfig } from "@/lib/content";

export type Lang = "en" | "sv-SE";
type Node = Record<string, unknown>;
export type Crumb = { name: string; path: string };

/* ------------------------------------------------------------------ */
/* 1. SITE CONFIG - edit this once                                     */
/* ------------------------------------------------------------------ */
export const SITE = {
  url: siteConfig.url,
  name: siteConfig.name,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  legalName: "Arbo AB",
  image: `${siteConfig.url}/Arbologo.png`,
  email: "contact@arboweb.com",
  sameAs: [
    "https://twitter.com/Arboweb",
    "https://www.linkedin.com/company/Arboweb",
  ] as string[],
  primaryMarket: "Sweden",
  extraMarkets: ["United States", "United Kingdom"] as string[],
  languages: ["en", "sv-SE"] as Lang[],
};

/* ------------------------------------------------------------------ */
/* 2. Internal helpers                                                 */
/* ------------------------------------------------------------------ */
const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const abs = (path: string) => `${SITE.url}${path}`;
const areaServed = (): Node[] =>
  [SITE.primaryMarket, ...SITE.extraMarkets].map((name) => ({
    "@type": "Country",
    name,
  }));

/* ------------------------------------------------------------------ */
/* 3. Entity nodes (who you are)                                       */
/* ------------------------------------------------------------------ */

/** Full organisation record. Use on the home page (and optionally /about). */
export function organization(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.image,
    description: SITE.description,
    slogan: SITE.slogan,
    email: SITE.email,
    sameAs: SITE.sameAs,
    knowsLanguage: SITE.languages,
    areaServed: areaServed(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email,
      availableLanguage: ["English", "Swedish"],
    },
  };
}

/** Short version, repeated on every other page so the @id resolves locally. */
export function organizationRef(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.image,
  };
}

export function website(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.languages,
    publisher: { "@id": ORG_ID },
  };
}

/** The two nodes every page graph starts with. */
export function baseNodes(isHome = false): Node[] {
  return [isHome ? organization() : organizationRef(), website()];
}

/* ------------------------------------------------------------------ */
/* 4. Page-level nodes                                                 */
/* ------------------------------------------------------------------ */
type PageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage";

export function webPage(o: {
  path: string;
  name: string;
  description: string;
  lang: Lang;
  type?: PageType;
  hasBreadcrumb?: boolean;
  mainEntity?: Node | Node[];
}): Node {
  const url = abs(o.path);
  return {
    "@type": o.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: o.name,
    description: o.description,
    inLanguage: o.lang,
    isPartOf: { "@id": SITE_ID },
    ...(o.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(o.mainEntity ? { mainEntity: o.mainEntity } : {}),
  };
}

export function breadcrumbs(path: string, crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* 5. Content nodes (articles)                                         */
/* ------------------------------------------------------------------ */
export function article(o: {
  type?: "BlogPosting" | "Article" | "TechArticle";
  path: string;
  headline: string; // keep under ~110 characters
  description: string;
  image: string; // absolute URL, at least 1200px wide
  datePublished: string; // ISO 8601, e.g. 2026-10-06
  dateModified?: string; // set from CMS "updatedAt", not build time
  lang: Lang;
  author: { name: string; path?: string; sameAs?: string[] };
  keywords?: string[];
  // TechArticle only:
  proficiencyLevel?: "Beginner" | "Expert";
  dependencies?: string;
}): Node {
  const type = o.type ?? "BlogPosting";
  const url = abs(o.path);
  return {
    "@type": type,
    "@id": `${url}#article`,
    headline: o.headline,
    description: o.description,
    image: o.image,
    datePublished: o.datePublished,
    dateModified: o.dateModified ?? o.datePublished,
    inLanguage: o.lang,
    ...(o.keywords ? { keywords: o.keywords.join(", ") } : {}),
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: {
      "@type": "Person",
      name: o.author.name,
      ...(o.author.path ? { url: abs(o.author.path) } : {}),
      ...(o.author.sameAs ? { sameAs: o.author.sameAs } : {}),
    },
    publisher: { "@id": ORG_ID },
    ...(type === "TechArticle" && o.proficiencyLevel
      ? { proficiencyLevel: o.proficiencyLevel }
      : {}),
    ...(type === "TechArticle" && o.dependencies
      ? { dependencies: o.dependencies }
      : {}),
  };
}

/** Returns the mainEntity list for a FAQPage (pass to webPage with type "FAQPage"). */
export function faqEntities(items: { q: string; a: string }[]): Node[] {
  return items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  }));
}

/* ------------------------------------------------------------------ */
/* 6. Offer nodes (services and product)                               */
/* ------------------------------------------------------------------ */
export function service(o: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  audience?: string;
}): Node {
  const url = abs(o.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: o.name,
    serviceType: o.serviceType,
    description: o.description,
    url,
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
    ...(o.audience
      ? { audience: { "@type": "BusinessAudience", audienceType: o.audience } }
      : {}),
  };
}

export function softwareApp(o: {
  path: string;
  name: string;
  description: string;
  category: string; // e.g. "BusinessApplication"
  price?: string;
  currency?: string; // e.g. "SEK"
}): Node {
  const url = abs(o.path);
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: o.name,
    description: o.description,
    url,
    applicationCategory: o.category,
    operatingSystem: "Web",
    publisher: { "@id": ORG_ID },
    ...(o.price
      ? {
          offers: {
            "@type": "Offer",
            price: o.price,
            priceCurrency: o.currency ?? "SEK",
            url,
          },
        }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/* 7. Wrap nodes into one JSON-LD document                             */
/* ------------------------------------------------------------------ */
export function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}