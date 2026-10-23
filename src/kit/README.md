# Manestream library kit

Shared building blocks for every site in the Manestream library. Copy `src/kit/` into a
Vite + React + shadcn site (every Lovable project qualifies), add `src/site.config.ts`, and the
site gets the Indian-market and craft-floor basics without rebuilding them.

| File | What it gives you |
|---|---|
| `site.config.ts` (per site) | Brand name, URL, OG image, phone, WhatsApp, email, socials. Reskin starts here. |
| `format.ts` | `formatINR` (₹12,50,000), `formatINRCompact` (₹12.5 L, ₹1.2 Cr), Indian mobile checks |
| `contact.ts` | `whatsappLink`, `telLink`, `mailLink`, `socialLinks` (only profiles that exist) |
| `usePageMeta.ts` | Per-route title, description, canonical, OG and Twitter tags |
| `EnquiryForm.tsx` | Validated enquiry form; WhatsApp hand-off with no backend, or email via Web3Forms |
| `WhatsAppButton.tsx` | Floating WhatsApp button, safe-area aware, no pulsing decoration |
| `LegalPage.tsx` | Privacy and terms pages (DPDP Act aware) so footers have no dead links |
| `NotFoundPage.tsx` | Branded 404 with a way home and a WhatsApp fallback |
| `Reveal.tsx` + `kit.css` | One quiet scroll entrance; selection, focus, caret, scrollbar, reduced motion |
| `motion.ts` | House easings and `usePrefersReducedMotion` |
| `share.ts` | `shareOrCopy`: native share sheet on phones, copy link on desktop (needs sonner) |
| `ScrollManager.tsx` | Scroll to top on route change, to `#id` for `/#section` links. Render once inside the router |
| `sendEnquiry.ts` | `sendEnquiry(e, topic)`: hand a template's existing `<form>` to WhatsApp using its labels |
| `re/` (`@/kit/re`) | Real estate: `EmiCalculator`, `ConfigurationTable`, `ReraBadge`, `SiteVisitForm`, `AmenitiesGrid`, `LocationAdvantages`, `BrochureButton`, area and EMI helpers |

`site.config.ts` options added in 0.2: `noindex: true` (every page out of search; client library copies)
and `rera` (shows `ReraBadge`; set only with a real number). `LegalPage` and `NotFoundPage` take
`headingClassName`, e.g. `"font-serif font-normal"`, to match the site's headings.

## Install in a site

1. Copy `src/kit/` in, then add `@import "./kit/kit.css";` as the first line of `src/index.css`.
2. Create `src/site.config.ts`:

   ```ts
   import type { SiteConfig } from "@/kit/types";
   export const site: SiteConfig = {
     name: "Brand", tagline: "What you do, where", description: "One line.", url: "https://example.vercel.app",
     ogImage: "/og.jpg", themeColor: "#1f3d2b",
     contact: { phone: "9823012345", email: "hello@brand.in", city: "Nashik" },
   };
   ```

3. Self-host fonts with Fontsource (`npm i @fontsource-variable/<font>` and import it in `main.tsx`)
   instead of a Google Fonts `<link>`: faster, private, and it builds offline.
4. Copy `vercel.json` to the repo root for Vite single-page apps so deep links don't 404.

## Rules the kit encodes

From the Manestream Build Library: rupees with Indian grouping, +91 numbers, WhatsApp as a primary
path, buttons that name the action, inline errors that say how to fix, visible keyboard focus,
themed browser surfaces, entrances that ease out, and a complete reduced-motion path.
