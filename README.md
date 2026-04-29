# @planara/design-system

Shared design tokens + components for the four Planara properties:

- **planara.com** (parent brand)
- **services.planara.com** (consultancy)
- **intelligence.planara.com** (Conduit)
- **leaders.planara.com** (Leaders)

Job: keep cross-site visual coherence (palette, typography, footer) and let each property own everything else (hero treatments, page IA, animation register).

## What's in v1

- **`tokens.css`** — canonical CSS custom properties (palette, typography, radius, dark-text semantics)
- **`tokens` (JS)** — same tokens accessible at runtime
- **`<PlanaraFonts />`** — drops the Fontshare + Google Fonts `<link>` tags for Switzer / Fraunces / Space Mono
- **`<Footer />`** — shared footer with hardcoded cross-property block
- **`cn()`** — shared `clsx + tailwind-merge` helper

## What's NOT in v1

Buttons, nav, cards, layouts, animation primitives, hero scaffolds. Each property owns these. We extract here only when actual duplication justifies sharing.

## Install

Public GitHub repo, installed directly via git URL. No registry, no auth tokens, no Vercel env vars. Pin to a specific tag for reproducibility.

```sh
npm install github:jameshaliburton/planara-design-system#v0.1.1
```

In `package.json` it appears as:

```json
"@planara/design-system": "github:jameshaliburton/planara-design-system#v0.1.1"
```

The repo's `dist/` folder is committed, so installs are fast and don't require building. The `prepare` script also runs `tsup` automatically when installed from git as a fallback.

### Why git URL (and not GitHub Packages or public npm)?

GitHub Packages publish needs `write:packages` token and Actions billing on the parent repo — added friction. Public npm registry would work too but adds a maintainer-account dependency. Git URL is the cheapest path that ergonomically lands as a normal `package.json` dependency.

If we ever need versioning ergonomics beyond git tags (semver ranges, deprecation, deprecate notices), we move to a registry then. Not yet.

## Use

### Tokens

In your `globals.css`:

```css
@import "tailwindcss";
@import "@planara/design-system/tokens.css";

/* Optional: map the canonical vars into Tailwind v4's @theme so you can use
   Tailwind's color utilities like `bg-planara-teal`. */
@theme inline {
  --color-planara-dark: var(--color-planara-dark);
  --color-planara-teal: var(--color-planara-teal);
  /* etc */
}
```

If you import a `@planara/design-system` component (like `<Footer />`), also tell Tailwind v4 to scan the package's compiled output:

```css
@source "../node_modules/@planara/design-system/dist/**/*.{js,mjs}";
```

### Fonts

In your root `layout.tsx`:

```tsx
import { PlanaraFonts } from "@planara/design-system";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PlanaraFonts />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Footer

Each property passes its own brand block, nav, contact. The cross-property block (`Services / Platform / Leaders`) is rendered automatically.

```tsx
import { Footer } from "@planara/design-system";

<Footer
  propertyName="Conduit"
  tagline="Technical Service Intelligence: cited, safety-validated answers for the people who service the equipment."
  navColumns={[
    {
      title: "Product",
      links: [
        { label: "Platform", href: "/platform" },
        { label: "See the demo", href: "https://demo.planara.com/demo", external: true },
        { label: "White paper", href: "/whitepaper" },
      ],
    },
    {
      title: "Verticals",
      links: [
        { label: "Marine", href: "/marine" },
        { label: "Manufacturing", href: "/manufacturing" },
        { label: "HVAC", href: "/hvac" },
      ],
    },
  ]}
  contact={{
    title: "Talk to us",
    items: [
      { email: "hello@planara.com", caption: "General inquiries" },
      { email: "pilots@planara.com", caption: "Pilot applications" },
    ],
  }}
  legalAttribution="Planara Conduit · Technical Service Intelligence"
/>
```

For the parent brand (no sub-brand, no nav):

```tsx
<Footer
  tagline="Frontier model to factory floor."
  contact={{
    items: [
      { email: "hello@planara.com", caption: "Services" },
      { email: "pilots@planara.com", caption: "Conduit pilots" },
      { email: "leaders@planara.com", caption: "Leaders programs" },
    ],
  }}
/>
```

For Leaders (untitled column, includes disclaimer):

```tsx
<Footer
  propertyName="Leaders"
  tagline="Executive education from Planara."
  navColumns={[
    {
      links: [
        { label: "Approach", href: "/approach" },
        { label: "Program", href: "/program" },
        { label: "Faculty", href: "/faculty" },
        { label: "Manufacturing", href: "/manufacturing" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ]}
  contact={{ items: [{ email: "hello@planara.com" }] }}
  disclaimer="Institutional affiliations shown on this site reflect faculty teaching and professional history. Planara's programs are independent and not endorsed by or affiliated with any of these institutions."
/>
```

## Add or change something

1. Land it here first (this repo is the source of truth).
2. Bump version in `package.json` (semver: patch for fixes, minor for additive props/exports, major for breaking changes).
3. Tag and push: `git tag v0.2.0 && git push --tags` — CI publishes.
4. In each consumer: bump the version, test, ship.

### When to extract something new vs. keep it property-specific

Default: keep it in the property repo.

Extract here when **all three sites would benefit from identical implementation** AND the duplication is real (not just incidental). Buttons that look slightly different per site? Property-specific. Cards that need consistent hover affordance everywhere? Maybe extract.

The footer is here because the cross-property block being identical is non-negotiable. Tokens are here because hex values copy-pasted across four repos drifted in two months last time. Add things to this list with the same litmus test.

## Repo layout

```
src/
├── index.ts        re-exports
├── tokens.ts       JS-accessible tokens
├── tokens.css      CSS custom properties (canonical)
├── fonts.tsx       <PlanaraFonts /> link-tag component
├── footer.tsx      <Footer /> with hardcoded cross-property block
└── utils.ts        cn() helper
```

Bundled with `tsup` to ESM-only output in `dist/`. Tailwind classes in component source survive bundling and are scanned by consumer Tailwind via the `@source` directive shown above.
