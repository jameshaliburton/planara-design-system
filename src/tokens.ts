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

export const tokens = {
  color: {
    planaraDark: "#131820",
    planaraNavy: "#0F1729",
    planaraTeal: "#43CED6",
    planaraTealDim: "#1F8F8F",
    planaraTealDeep: "#0E5A5A",
    planaraBlue: "#2E95F5",
    planaraMuted: "#627084",
    planaraLight: "#F8FAFC",
    planaraBorder: "#E2E5EA",
  },
  font: {
    sans: '"Switzer", system-ui, -apple-system, sans-serif',
    serif: '"Fraunces", Georgia, serif',
    mono: '"Space Mono", ui-monospace, monospace',
  },
  radius: {
    sm: "0.25rem",
    base: "0.375rem",
    lg: "0.5rem",
  },
} as const;

export type Tokens = typeof tokens;
