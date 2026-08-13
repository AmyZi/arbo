import Link from 'next/link';
import { Sparkles, Instagram, Linkedin } from 'lucide-react';
import { footerSections, siteConfig } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm text-white shadow-lg shadow-orange-500/30">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                AR<span className="text-gradient-warm">BO</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-orange-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/#newsletter" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/#newsletter" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
