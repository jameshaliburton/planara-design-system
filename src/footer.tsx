import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./utils";

/**
 * Shared Planara Footer.
 *
 * Schema regions:
 *   - Brand block (logo + property name + tagline)
 *   - Property navigation (multiple titled columns)
 *   - Contact (emails with optional captions)
 *   - Cross-property block — HARDCODED, identical on every site
 *   - Legal row (copyright + privacy + optional attribution)
 *   - Optional disclaimer block (e.g. Leaders' institutional affiliations)
 *
 * Property-specific content lives in the props.
 * Cross-property routing lives inside this component, not as a prop —
 * that is the point of the shared component: when conduit.planara.com
 * eventually replaces intelligence.planara.com, we update one file.
 */

export interface NavColumn {
  /** Column title in mono uppercase. Pass empty string for an untitled column (e.g. Leaders). */
  title?: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface ContactItem {
  email: string;
  /** Small descriptor below the email (e.g. "General inquiries", "Pilot applications"). */
  caption?: string;
}

export interface FooterProps {
  /** Sub-brand name displayed below the wordmark in mono teal. Omit for parent brand. */
  propertyName?: string;
  /** One-line property tagline. */
  tagline?: string;
  /** Logo image source. Defaults to "/planara-logo.png" — each property hosts its own copy. */
  logoSrc?: string;
  /** Property nav, as titled columns. */
  navColumns?: NavColumn[];
  /** Contact section. */
  contact?: {
    title?: string; // default "Contact"
    items: ContactItem[];
  };
  /** Mono-uppercase attribution opposite the copyright (e.g. "Planara Conduit · Technical Service Intelligence"). */
  legalAttribution?: string;
  /** Privacy page href. Defaults to "/privacy". */
  privacyHref?: string;
  /** Override displayed year. Defaults to current. */
  copyrightYear?: number;
  /** Footer-adjacent disclaimer rendered below legal row in muted secondary text. */
  disclaimer?: string;
  className?: string;
}

const CROSS_PROPERTY_LINKS = [
  { label: "Services", href: "https://services.planara.com" },
  { label: "Platform", href: "https://intelligence.planara.com" },
  { label: "Leaders", href: "https://leaders.planara.com" },
] as const;

export function Footer({
  propertyName,
  tagline,
  logoSrc = "/planara-logo.png",
  navColumns,
  contact,
  legalAttribution,
  privacyHref = "/privacy",
  copyrightYear = new Date().getFullYear(),
  disclaimer,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "relative border-t border-[var(--border-on-dark)] bg-[var(--color-planara-dark)] px-6 pt-20 pb-12 sm:px-10",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top region: brand + nav columns + contact */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-base font-medium tracking-tight text-white"
            >
              <img
                src={logoSrc}
                alt=""
                aria-hidden
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-lg leading-none">Planara</span>
            </Link>
            {propertyName && (
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-planara-teal)]">
                {propertyName}
              </p>
            )}
            {tagline && (
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-on-dark-secondary)]">
                {tagline}
              </p>
            )}
          </div>

          {/* Property nav columns + contact, packed into the right 7 cols */}
          {(navColumns?.length || contact) && (
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
                {navColumns?.map((col, i) => (
                  <NavColumnView key={col.title || `col-${i}`} column={col} />
                ))}
                {contact && <ContactView contact={contact} />}
              </div>
            </div>
          )}
        </div>

        {/* Cross-property block — identical on every site */}
        <CrossPropertyBlock />

        {/* Legal row */}
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[var(--border-on-dark)] pt-8 text-xs text-[var(--text-on-dark-faint)] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© {copyrightYear} Planara</p>
            <Link
              href={privacyHref}
              className="transition-colors hover:text-[var(--text-on-dark-secondary)]"
            >
              Privacy
            </Link>
          </div>
          {legalAttribution && (
            <p className="font-mono text-[var(--text-on-dark-muted)]">
              {legalAttribution}
            </p>
          )}
        </div>

        {/* Disclaimer — optional, muted secondary text, slightly smaller than body */}
        {disclaimer && (
          <p className="mt-10 max-w-[68ch] text-[12px] leading-[1.6] text-[var(--text-on-dark-secondary)]">
            {disclaimer}
          </p>
        )}
      </div>
    </footer>
  );
}

function NavColumnView({ column }: { column: NavColumn }) {
  return (
    <div>
      {column.title && (
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark-muted)]">
          {column.title}
        </p>
      )}
      <ul className="space-y-3 text-sm">
        {column.links.map((l) => (
          <li key={l.href}>
            <FooterLink href={l.href} external={l.external}>
              {l.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactView({
  contact,
}: {
  contact: NonNullable<FooterProps["contact"]>;
}) {
  const title = contact.title ?? "Contact";
  return (
    <div>
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark-muted)]">
        {title}
      </p>
      <ul className="space-y-4 text-sm">
        {contact.items.map((item) => (
          <li key={item.email}>
            <a
              href={`mailto:${item.email}`}
              className="text-[var(--text-on-dark-secondary)] transition-colors hover:text-[var(--color-planara-teal)]"
            >
              {item.email}
            </a>
            {item.caption && (
              <p className="mt-0.5 text-[11px] text-[var(--text-on-dark-faint)]">
                {item.caption}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CrossPropertyBlock() {
  return (
    <div className="mt-16 border-t border-[var(--border-on-dark)] pt-10">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark-muted)]">
        Across Planara
      </p>
      <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
        {CROSS_PROPERTY_LINKS.map((l) => (
          <li key={l.href}>
            <FooterLink href={l.href} external>
              {l.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className =
    "text-[var(--text-on-dark-secondary)] transition-colors hover:text-[var(--color-planara-teal)]";
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
