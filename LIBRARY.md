# Manestream Library

This repo is part of the Manestream website library: an internal set of sites used to show clients
what they can get at each budget, and to repurpose into new builds quickly.

- Library ID: LX-02
- Track: Luxury
- Library branch: `library`
- Vercel project: `ms-lx-02-ardori`
- Tracker: Notion > Manestream Portfolio > Portfolio Library

> **Live client site.** All library work happens on the `library` branch. Never merge it into `main`: `main` is the live site and syncs to Lovable.

## Done when (every library site)

- [ ] Works at 375, 768 and 1440px with no horizontal scroll
- [ ] Every interactive element has hover, focus, active and disabled states
- [ ] Text contrast is at least 4.5:1
- [ ] Images have explicit sizes; the largest image above the fold loads first
- [ ] Selection colour, focus rings and scrollbars match the site
- [ ] Screenshots at 375 and 1440 reviewed, one fix batch, one confirm pass
- [ ] Builds cleanly (`npm run build`) and deploys on Vercel

## Indian market

- [ ] Prices in rupees with Indian digit grouping (₹12,50,000, not ₹1,250,000)
- [ ] Phone numbers in +91 format; WhatsApp CTA where enquiries matter
- [ ] Indian cities, addresses and context; no USD, no foreign placeholder addresses

## Content hygiene

- [ ] Browser title, meta description and social preview image are the brand's own (no "Lovable App", no lovable.dev preview image)
- [ ] No placeholders: no Acme, John Doe, +1234, lorem ipsum, example.com, "Item 1"
- [ ] No dead links: every `href="#"` goes somewhere real or is removed
- [ ] One H1 per page
- [ ] No hotlinked third-party images or video: everything lives in this repo (see below)
- [ ] No trace of the source template (names, credits, links, asset URLs) before any client sees it

## House rules (from the Manestream Build Library)

Apply in full on reskins and new builds; on polish passes, fix the worst offenders only.

- Design read first: audience, the one action, one visual thesis sentence.
- Layout: one focal point per viewport; no grids of identical icon cards, no nested cards, no three equal feature columns; no eyebrows, section numbers, scroll cues, status dots or decorative grids.
- Type: no Inter/system display face; body 16-18px at 65-75ch; display tracking -0.02 to -0.03em; `text-wrap: balance`; no gradient text.
- Colour: tinted neutrals (no #000, no flat grey); one accent with one job; no purple-blue gradients, glows or decorative glass; border OR soft shadow, not both.
- Motion: only when it explains; max two authored moments; entrances ease-out `cubic-bezier(0.23,1,0.32,1)`; never `scale(0)`, never `transition: all`; full `prefers-reduced-motion` fallback.
- Copy: only real proof; no filler verbs, no "not X, it's Y", no em dashes; buttons name the action.

## Self-hosting images

Hotlinked images are copied into `public/library-assets/` by a GitHub Action, because the
Manestream build environment can't reach image hosts directly.

1. Edit `.library/localize.json` (for Lovable `/__l5e/` assets, set `lovableOrigin` to the
   project's published lovable.app URL).
2. Push. The "Library - localise assets" workflow downloads every hotlinked image, rewrites the
   references to `/library-assets/...` and commits the result.
3. Check `.library/localize-report.json` for anything that failed.
