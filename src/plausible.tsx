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
export function PlausibleAnalytics({ domain }: { domain: string }) {
  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
