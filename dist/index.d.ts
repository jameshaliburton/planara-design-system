import * as react_jsx_runtime from 'react/jsx-runtime';
import { ClassValue } from 'clsx';

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
interface NavColumn {
    /** Column title in mono uppercase. Pass empty string for an untitled column (e.g. Leaders). */
    title?: string;
    links: {
        label: string;
        href: string;
        external?: boolean;
    }[];
}
interface ContactItem {
    email: string;
    /** Small descriptor below the email (e.g. "General inquiries", "Pilot applications"). */
    caption?: string;
}
interface FooterProps {
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
        title?: string;
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
declare function Footer({ propertyName, tagline, logoSrc, navColumns, contact, legalAttribution, privacyHref, copyrightYear, disclaimer, className, }: FooterProps): react_jsx_runtime.JSX.Element;

/**
 * Planara font loader — drops the right <link> tags into <head>.
 *
 * Switzer comes from Fontshare (not on Google Fonts).
 * Fraunces + Space Mono come from Google Fonts.
 *
 * Usage in a Next.js App Router root layout:
 *
 *   import { PlanaraFonts } from "@planara/design-system";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <head><PlanaraFonts /></head>
 *         <body>{children}</body>
 *       </html>
 *     );
 *   }
 */
declare const fontFamilies: {
    readonly sans: "Switzer";
    readonly serif: "Fraunces";
    readonly mono: "Space Mono";
};
declare function PlanaraFonts(): react_jsx_runtime.JSX.Element;

/**
 * Plausible analytics — privacy-friendly, cookie-less.
 * Each property passes its own `domain` (e.g. "planara.com").
 *
 * Usage in a Next.js root layout:
 *
 *   import { PlausibleAnalytics } from "@planara/design-system";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <head>
 *           <PlausibleAnalytics domain="planara.com" />
 *         </head>
 *         <body>{children}</body>
 *       </html>
 *     );
 *   }
 *
 * Stats land at https://plausible.io/<domain> after the domain is registered
 * in the Plausible dashboard.
 */
declare function PlausibleAnalytics({ domain }: {
    domain: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Design tokens for Planara properties.
 *
 * These mirror the CSS custom properties exposed by tokens.css.
 * Use the JS exports for runtime values (e.g. inline style colors,
 * meta theme-color tags). Use the CSS variables in stylesheets via
 * `var(--color-planara-teal)`.
 *
 * Source of truth — do not redeclare these elsewhere.
 */
declare const tokens: {
    readonly color: {
        readonly planaraDark: "#131820";
        readonly planaraNavy: "#0F1729";
        readonly planaraTeal: "#43CED6";
        readonly planaraTealDim: "#1F8F8F";
        readonly planaraTealDeep: "#0E5A5A";
        readonly planaraBlue: "#2E95F5";
        readonly planaraMuted: "#627084";
        readonly planaraLight: "#F8FAFC";
        readonly planaraBorder: "#E2E5EA";
    };
    readonly font: {
        readonly sans: "\"Switzer\", system-ui, -apple-system, sans-serif";
        readonly serif: "\"Fraunces\", Georgia, serif";
        readonly mono: "\"Space Mono\", ui-monospace, monospace";
    };
    readonly radius: {
        readonly sm: "0.25rem";
        readonly base: "0.375rem";
        readonly lg: "0.5rem";
    };
};

declare function cn(...inputs: ClassValue[]): string;

export { type ContactItem, Footer, type FooterProps, type NavColumn, PlanaraFonts, PlausibleAnalytics, cn, fontFamilies, tokens };
