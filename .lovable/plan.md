# Homepage & site tweaks

## 1. Hero text — shift left, off the model's face

`src/pages/Index.tsx`: change the hero overlay from centered to left-aligned on desktop. Wrap headline/subheading/CTAs in a container with `text-left`, `items-start`, `max-w-[600px]`, and left padding (`pl-[6vw] lg:pl-[8vw]`). Keep centered stack on mobile (`items-center text-center lg:items-start lg:text-left`). Buttons stay side-by-side on desktop.

## 2. "The Collection" section — image height = text height

`src/components/CategorySection.tsx`: the right image uses `aspectRatio: 4/3` which is taller than the left text column. Switch to a self-sizing image column that matches the text column height:

- Change grid to `items-stretch` (was `items-start`).
- Replace the fixed-ratio wrapper with a flex column: `h-full` with `min-h-[420px]`, and the `<img>` uses `absolute inset-0 h-full w-full object-cover`.
Result: the image tracks the natural height of the categories list on the left.

## 3. "Our Values" section — balance heights

`src/components/ValuesSection.tsx`: currently side images are `aspect-[3/4]` (tall), center is short. Make the two side images match the center column height:

- Change the grid to `items-stretch`.
- Replace `aspect-[3/4]` on each image column with `relative h-full min-h-[520px]` so they fill the row height determined by the values list.
- Tighten the center list vertical padding slightly (`py-6 lg:py-8`) so it doesn't drive an oversized row.

## 4. "See it Styled" — real Shopify products, clickable

`src/components/WatchShopSection.tsx`: replace the hard-coded 5-product array with live data from `useShopifyProducts` (same hook `NewArrivalsSection` uses). For each product:

- Use `product.images[0]` as the card image.
- Wrap each card in `<Link to={`/product/${product.handle}`}>`.
- Keep the carousel/center-focus behavior and NEW badge (drive `isNew` from the existing "new" tag helper).
- Fallback: if fewer than 3 products load, hide the section (or render what's available).

## 5. Handbag Care page — remove AI-looking images, reuse real photos

`src/pages/HandbagCare.tsx` currently uses `care-daily.jpg`, `care-cleaning.jpg`, `care-storage.jpg`, `care-avoid.jpg`, `care-professional.jpg`, `care-leather.jpg`, `care-resources.jpg`. Replace all seven imports with existing real-photo assets already used elsewhere on the site, e.g.:

- Daily → `curated-detail.jpg`
- Cleaning → `story-craft.jpg`
- Storage → `instagram-reel-2.jpeg` (bag flat-lay)
- Avoid → `values-lifestyle-2.jpg`
- Professional → `values-product-2.jpg`
- Leather / Resources → `story-leather-texture.jpg`, `curated-hero.jpg`
No new images generated. If you want a different mapping I'll adjust.

## 6. Our Story — real founder photo

Copy the uploaded `user-uploads://1000223166.jpg` into `src/assets/founder-eesha.jpg`, replace the `storyFounder` import in `src/pages/OurStory.tsx` with the new asset. Keep existing framing/crop styles.

## 7. Contact — swap Instagram thumbnails to homepage "Follow Our Journey" set

`src/pages/Contact.tsx`: the 3-thumbnail grid currently uses `instagram-1/2/3.jpg`. Replace them with the same four reel thumbnails used by `InstagramSection.tsx` (`instagram-reel-1.jpg`, `instagram-reel-2.jpeg`, `instagram-reel-3.jpg`) and reuse their reel links so the two sections stay in sync.

## Technical notes

- No backend/schema changes.
- Only presentation changes except (4), which swaps a static array for the existing `useShopifyProducts` hook already in the codebase.
- No new AI-generated images. Founder image comes from the user upload; everything else is reused existing assets.

## Open question

Item 5: I've proposed a mapping using existing real photos. Confirm the mapping is fine, or point out which specific care photos you consider AI so I can be surgical.  - everything except first and last photo is AI