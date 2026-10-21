import type { ShopifyProduct } from "@/lib/shopify";

// Library build: local snapshot of the Ardori catalogue in the Shopify Storefront shape.
// The live store is unavailable, so this stays empty until a product export is provided
// (see BATCH.md, "Needs from Aditya"). Images go in public/library-assets/shop/.
export const catalog: ShopifyProduct[] = [];
