# Shopify Sync, Media, Tags and Resilience

Goal: every Razorpay order lands in Shopify (orders, analytics, Shiprocket pickup), the site always shows the real Shopify photos and tags, and a product going to Draft never breaks a page again.

## 1. Razorpay orders into Shopify

Today the payment is verified and the buyer sees a confirmation page, but nothing reaches Shopify. Nothing about the checkout experience changes for the customer — the sync happens server-side right after the payment is verified.

Flow after this change:

```text
Customer pays (Razorpay) -> payment verified server-side
   -> order created in Shopify: marked Paid, inventory reduced
   -> Razorpay payment id + amount stored on the order (note + tag)
   -> Shopify order number shown on the confirmation page
   -> Shiprocket picks it up from Shopify as usual
```

Details:
- The verify step becomes the single source of truth: signature is checked first, and only a verified payment creates a Shopify order. No order can be faked from the browser.
- Line items reference real Shopify variant IDs, so product, variant, price and inventory all match the catalogue. Shipping and any promo discount are passed through so the Shopify total equals what was charged.
- Customer name, email, phone and shipping address collected at checkout are attached to the order so Shiprocket has a complete shipping record.
- The order is tagged (e.g. `razorpay`, `website`) and carries the Razorpay payment id, so reconciliation is one search away.
- Duplicate protection: the same Razorpay payment id can only ever produce one Shopify order.
- If Shopify is briefly unreachable the customer still sees success; the failure is logged with the full payload so the order can be recovered rather than lost.

### What I need from you (step by step)

In your Shopify admin (`ardori-4`):
1. Settings > Apps and sales channels > Develop apps > Allow custom app development (accept once).
2. Create an app, name it `Ardori Website`.
3. Configuration > Admin API integration > Configure, then enable: `write_orders`, `read_orders`, `read_products`, `write_inventory`, `read_inventory`, `write_customers`.
4. Save, then API credentials > Install app.
5. Copy the Admin API access token (starts `shpat_`) — it is shown once.

Send me that token and I will store it as a secret (never in the code). I will build everything else first so it works the moment the token is in.

## 2. Show every Shopify photo

- The listing query currently fetches only 2 images per product; it will fetch the full set.
- Product pages will show all gallery images with thumbnails, and variant-specific images where they exist.
- Grid cards keep the hover second-image effect, and fall back cleanly for products with a single photo.

## 3. Tags

- Tag handling stays case- and format-insensitive (`new`, `New Arrival`, `new-arrival`, `bestseller`, etc.).
- New Arrivals will also accept `just in` / `latest` spellings and, if no product carries a new tag at all, fall back to the most recently published products instead of vanishing — so the homepage section is never empty by accident.
- Badges (New, Best Seller) render from the live tags everywhere: grid, new arrivals, styled carousel, related products.
- Product type is used for related-product matching, with a tag-based fallback for products where the type field is blank in Shopify.

## 4. See it Styled

- Keeps your five styled lifestyle photos, but each one is validated against the live catalogue.
- If a mapped product is Draft or deleted (the Kumi Small case), that slide is dropped and the gap is filled from live Shopify products with their own product images — the carousel always stays full.
- The whole strip is clickable to the correct product page and keeps the current slow continuous scroll with pause-on-hover.

## 5. Draft-product resilience (site-wide)

- One shared lookup replaces the scattered hardcoded handles. Any handle that no longer resolves is skipped instead of rendering a dead link.
- Testimonials, related products, curated/category links and the styled carousel all run through it.
- Direct visits to a drafted product URL show a clean "no longer available" state with a link back to Shop, not a broken page.

## Technical notes

- New Shopify Admin secret: `SHOPIFY_ADMIN_ACCESS_TOKEN` (edge-function only).
- `verify-razorpay-payment` is extended (or paired with a `create-shopify-order` function) to call Shopify Admin GraphQL `orderCreate` with `financialStatus: PAID` and inventory behaviour set to decrement.
- Idempotency by Razorpay payment id, checked against existing Shopify orders before creating.
- Storefront `PRODUCTS_QUERY`: `images(first: 10)`, variants raised, `publishedAt` added for the New Arrivals fallback.
- Cart checkout payload extended to carry variant IDs, shipping address and discount so the Shopify order mirrors the charge exactly.
- Confirmation page displays the Shopify order name when the sync returns one, keeping the current local fallback otherwise.

## Testing

- End-to-end test order in Razorpay test mode, verifying the order appears in Shopify with correct items, totals, address and Paid status, and that inventory drops by one.
- Draft a product in Shopify and confirm no page breaks and the styled carousel refills.
- Verify Meta Pixel Purchase still fires exactly once.
