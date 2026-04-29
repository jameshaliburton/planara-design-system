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

export const fontFamilies = {
  sans: "Switzer",
  serif: "Fraunces",
  mono: "Space Mono",
} as const;

const FONTSHARE_HREF =
  "https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&display=swap";

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Space+Mono:wght@400;700&display=swap";

export function PlanaraFonts() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://api.fontshare.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={FONTSHARE_HREF} />
      <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
    </>
  );
}
