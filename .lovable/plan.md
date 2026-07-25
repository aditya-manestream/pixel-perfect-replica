
## Fixes

**1. Logo replacement**
- Convert page 1 of `Ardori_Final_Logo.pdf` to a transparent PNG (2x for retina).
- Upload via `lovable-assets`, replace the text "ARDORI" wordmark in `Navbar.tsx` and `Footer.tsx` with an `<img>` (keeps same size/spacing).
- Also generate a small square favicon variant and replace `public/favicon.ico`.

**2. Cut-off product images (Kumī, Kalikā, etc.)**
- These come from Shopify. The crop happens because product cards use `object-cover` with `object-position: center` and fixed aspect ratios.
- Fix: change product-card image `object-position` to `center top` (or `50% 30%`) and increase aspect-ratio container so bag bottoms aren't clipped. Apply in `ShopifyProductGrid.tsx`, `RelatedProductsCarousel.tsx`, `ProductListing.tsx`, and the product detail gallery in `ShopifyProductDetail.tsx`.
- Note: correct long-term fix is re-cropping in Shopify — this CSS change minimizes the clipping without needing new uploads.

**3. "Loved by those who carry Ardori" thumbnails**
- Upload the 6 attached bag photos as CDN assets.
- Update `TestimonialsSection.tsx` fallback map so each review card's product thumbnail uses one of the 6 uploaded photos (kept in the same order), instead of pulling generic Shopify images.

**4. Our Story hero image**
- Replace the current stock `story-hero.jpg` reference in `OurStory.tsx` with an existing real Ardori photo from the shop (e.g., a lifestyle shot from `values-lifestyle-*.jpg` or a hero crop of an actual product). No AI.

**5. Handbag Care "What to Avoid" image**
- Image is cropping the subject. Fix `object-position` on that specific card in `HandbagCare.tsx` so the full frame is visible, and swap to a better real photo from existing assets if needed.

**6. Handbag Care "Professional Care" image**
- Replace the founder photo with a clean product-only shot from the shop assets (e.g., `shop-product-3.jpg` or a Shopify product image not heavily used elsewhere).

**7. Remove INR button from navbar**
- Delete the currency dropdown block (desktop lines ~76–90) and the mobile "Currency: INR" row (~212–225) in `Navbar.tsx`.

**8. Branded emails — newsletter 2% off + contact form confirmation**

Setup steps:
- Open the email domain setup dialog so you can configure `notify.ardorilabel.com` (NS records added at Hostinger). Scaffolding proceeds even while DNS verifies.
- Run `setup_email_infra` → creates queue, tables, cron.
- Run `scaffold_transactional_email` → creates the `send-transactional-email` edge function + templates.
- Build 3 branded email templates (Cormorant Garamond header, navy + gold, off-white bg):
  1. `newsletter-welcome` — subject "Your 2% off Ardori", contains generated coupon code.
  2. `contact-confirmation` — subject "We've received your message", echoes the user's message.
  3. `contact-admin-notify` — sent to `love@ardorilabel.com` with the form submission.

Backend:
- New table `newsletter_signups (id, email, coupon_code, created_at)` with RLS (insert-only for anon, service-role read).
- New edge function `newsletter-subscribe`: generates a coupon code like `ARDORI-XXXX`, saves signup, invokes `send-transactional-email` with `newsletter-welcome`.
- New edge function `contact-submit`: saves contact submission (new table `contact_submissions`), sends both `contact-confirmation` to sender and `contact-admin-notify` to `love@ardorilabel.com`.

Frontend wiring:
- `Footer.tsx` newsletter form → POST to `newsletter-subscribe`, show success toast with code.
- `Contact.tsx` form → POST to `contact-submit`, show success toast.

**Note on the 2% coupon:** the code emailed is a generated string only. Actually redeeming 2% off at Shopify checkout requires creating a matching discount in Shopify Admin (via Admin API, which needs a token you haven't provided yet). I'll surface a follow-up asking whether to (a) create a single shared code manually in Shopify that we email to everyone, or (b) integrate the Shopify Admin API to auto-create unique codes.

## Order of execution

1. Logo + favicon (visual, quick win).
2. Image fixes (product cropping, Story, Handbag Care).
3. Remove INR.
4. Testimonials thumbnails.
5. Email domain setup dialog → infra → templates → functions → wiring.

## Technical details

- Files touched: `src/components/Navbar.tsx`, `Footer.tsx`, `TestimonialsSection.tsx`, `shop/ShopifyProductGrid.tsx`, `shop/ProductListing.tsx`, `product/RelatedProductsCarousel.tsx`, `src/pages/ShopifyProductDetail.tsx`, `OurStory.tsx`, `HandbagCare.tsx`, `Contact.tsx`, `index.html`, `public/favicon.ico`.
- New: `supabase/functions/newsletter-subscribe`, `contact-submit`, plus scaffolded email infrastructure and templates.
- New DB: `newsletter_signups`, `contact_submissions` (with GRANTs + RLS).
