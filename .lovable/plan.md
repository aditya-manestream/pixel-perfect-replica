

## Problem

The Navbar starts transparent and only becomes solid `#121B2D` (navy) after scrolling 70px. On the product page, the background is white (`#FDFCFA`), so the transparent navbar blends into white — looking washed out instead of branded.

## Solution

Add a `forceScrolled` prop to the Navbar component. When `true`, the navbar always renders with the solid navy background regardless of scroll position.

### Changes

1. **`src/components/Navbar.tsx`** — Add an optional `forceScrolled?: boolean` prop. Use `forceScrolled || isScrolled` to determine the background style.

2. **`src/pages/ShopifyProductDetail.tsx`** — Pass `<Navbar forceScrolled />` in all render paths (loading, error, and main content).

No layout, styling, or structural changes to anything else.

