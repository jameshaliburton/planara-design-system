import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/footer.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var CROSS_PROPERTY_LINKS = [
  { label: "Services", href: "https://services.planara.com" },
  { label: "Platform", href: "https://intelligence.planara.com" },
  { label: "Leaders", href: "https://leaders.planara.com" }
];
function Footer({
  propertyName,
  tagline,
  logoSrc = "/planara-logo.png",
  navColumns,
  contact,
  legalAttribution,
  privacyHref = "/privacy",
  copyrightYear = (/* @__PURE__ */ new Date()).getFullYear(),
  disclaimer,
  className
}) {
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: cn(
        "relative border-t border-[var(--border-on-dark)] bg-[var(--color-planara-dark)] px-6 pt-20 pb-12 sm:px-10",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/",
                className: "inline-flex items-center gap-3 text-base font-medium tracking-tight text-white",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: logoSrc,
                      alt: "",
                      "aria-hidden": true,
                      width: 36,
                      height: 36,
                      className: "h-9 w-9"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-lg leading-none", children: "Planara" })
                ]
              }
            ),
            propertyName && /* @__PURE__ */ jsx("p", { className: "mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-planara-teal)]", children: propertyName }),
            tagline && /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-on-dark-secondary)]", children: tagline })
          ] }),
          (navColumns?.length || contact) && /* @__PURE__ */ jsx("div", { className: "md:col-span-7", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "grid gap-x-6 gap-y-10",
                rightItemCount(navColumns, contact) === 1 && "grid-cols-1",
                rightItemCount(navColumns, contact) === 2 && "grid-cols-1 sm:grid-cols-2",
                rightItemCount(navColumns, contact) === 3 && "grid-cols-2 sm:grid-cols-3",
                rightItemCount(navColumns, contact) >= 4 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              ),
              children: [
                navColumns?.map((col, i) => /* @__PURE__ */ jsx(NavColumnView, { column: col }, col.title || `col-${i}`)),
                contact && /* @__PURE__ */ jsx(ContactView, { contact })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(CrossPropertyBlock, {}),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col justify-between gap-3 border-t border-[var(--border-on-dark)] pt-8 text-xs text-[var(--text-on-dark-faint)] sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-5 gap-y-2", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "\xA9 ",
              copyrightYear,
              " Planara"
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: privacyHref,
                className: "transition-colors hover:text-[var(--text-on-dark-secondary)]",
                children: "Privacy"
              }
            )
          ] }),
          legalAttribution && /* @__PURE__ */ jsx("p", { className: "font-mono text-[var(--text-on-dark-muted)]", children: legalAttribution })
        ] }),
        disclaimer && /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-[68ch] text-[12px] leading-[1.6] text-[var(--text-on-dark-secondary)]", children: disclaimer })
      ] })
    }
  );
}
function rightItemCount(navColumns, contact) {
  return (navColumns?.length || 0) + (contact ? 1 : 0);
}
function NavColumnView({ column }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    column.title && /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark-muted)]", children: column.title }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm", children: column.links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { href: l.href, external: l.external, children: l.label }) }, l.href)) })
  ] });
}
function ContactView({
  contact
}) {
  const title = contact.title ?? "Contact";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark-muted)]", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-sm", children: contact.items.map((item) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `mailto:${item.email}`,
          className: "text-[var(--text-on-dark-secondary)] transition-colors hover:text-[var(--color-planara-teal)]",
          children: item.email
        }
      ),
      item.caption && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[11px] text-[var(--text-on-dark-faint)]", children: item.caption })
    ] }, item.email)) })
  ] });
}
function CrossPropertyBlock() {
  return /* @__PURE__ */ jsxs("div", { className: "mt-16 border-t border-[var(--border-on-dark)] pt-10", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-on-dark-muted)]", children: "Across Planara" }),
    /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-x-8 gap-y-3 text-sm", children: CROSS_PROPERTY_LINKS.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { href: l.href, external: true, children: l.label }) }, l.href)) })
  ] });
}
function FooterLink({
  href,
  external,
  children
}) {
  const className = "text-[var(--text-on-dark-secondary)] transition-colors hover:text-[var(--color-planara-teal)]";
  if (external) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        target: "_blank",
        rel: "noreferrer",
        className,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(Link, { href, className, children });
}
var fontFamilies = {
  sans: "Switzer",
  serif: "Fraunces",
  mono: "Space Mono"
};
var FONTSHARE_HREF = "https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&display=swap";
var GOOGLE_FONTS_HREF = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Space+Mono:wght@400;700&display=swap";
function PlanaraFonts() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preconnect",
        href: "https://api.fontshare.com",
        crossOrigin: "anonymous"
      }
    ),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      }
    ),
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: FONTSHARE_HREF }),
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: GOOGLE_FONTS_HREF })
  ] });
}
function PlausibleAnalytics({ domain }) {
  return /* @__PURE__ */ jsx(
    "script",
    {
      defer: true,
      "data-domain": domain,
      src: "https://plausible.io/js/script.js"
    }
  );
}

// src/tokens.ts
var tokens = {
  color: {
    planaraDark: "#131820",
    planaraNavy: "#0F1729",
    planaraTeal: "#43CED6",
    planaraTealDim: "#1F8F8F",
    planaraTealDeep: "#0E5A5A",
    planaraBlue: "#2E95F5",
    planaraMuted: "#627084",
    planaraLight: "#F8FAFC",
    planaraBorder: "#E2E5EA"
  },
  font: {
    sans: '"Switzer", system-ui, -apple-system, sans-serif',
    serif: '"Fraunces", Georgia, serif',
    mono: '"Space Mono", ui-monospace, monospace'
  },
  radius: {
    sm: "0.25rem",
    base: "0.375rem",
    lg: "0.5rem"
  }
};

export { Footer, PlanaraFonts, PlausibleAnalytics, cn, fontFamilies, tokens };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map