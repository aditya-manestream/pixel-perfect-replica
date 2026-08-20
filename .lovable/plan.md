# Meta Pixel: real commerce events for cart and checkout

Right now the pixel only fires `PageView` (plus Meta's auto-detected `SubscribedButtonClick`, which is not optimisable). Checkout runs entirely on your own frontend via Razorpay, not Shopify hosted checkout, so `Purchase` will never be captured natively — all three funnel events need explicit code.

## What gets added

1. **ViewContent** — on the product detail page once the product loads (product id, name, price, INR).
2. **AddToCart** — fired after the item is actually added to the cart store, from both places that add items: the product detail page and the shop grid's quick-add. Includes `content_ids`, `content_type: 'product'`, `content_name`, `value`, `currency: 'INR'`, `contents` with quantity.
3. **InitiateCheckout** — fired when "Pay with Razorpay" successfully opens the Razorpay modal (after the order is created), with all cart item ids, `num_items`, cart `value`, INR.
4. **Purchase** — fired on the order confirmation page only after the Razorpay signature is verified, using the verified payment id as `eventID` so a duplicate is never counted. Value = the amount actually charged.

## Technical notes

- New helper `src/lib/pixel.ts` wrapping `window.fbq` safely (no-op if the pixel is blocked), typed, with one function per event so payload shape stays consistent.
- The cart page currently navigates to `/order-confirmation` with `{ paymentId, orderId }` in router state. The plan extends that state with the order value and line items so the confirmation page can fire an accurate `Purchase`. The confirmation page clears the cart on mount, so the payload must be read before/independently of the store.
- `OrderConfirmation` also shows a fake order number generated from `Date.now()`; it will use the real Razorpay order id when present, falling back to the current behaviour.
- Deduplication: `Purchase` fires once per payment id, guarded so a page refresh does not re-fire.
- No changes to pricing, cart totals, Razorpay functions, or UI layout.

## Verification

Build, then drive the flow in a headless browser to confirm `fbq` calls fire with correct payloads at add-to-cart and checkout-open. Purchase firing is confirmed by simulating the confirmation route with payment state (a real end-to-end payment is on your side, checked in the pixel's Test Events tab).
