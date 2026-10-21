// Library build: the live Shopify Storefront API is disconnected (no token, no network calls).
// Products come from the local snapshot in src/data/catalog.ts, kept in the Storefront shape
// so every component works unchanged.
import { catalog } from "@/data/catalog";

// Types
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml: string;
    handle: string;
    tags: string[];
    productType: string;
    publishedAt?: string;

    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
          image?: {
            url: string;
            altText: string | null;
          };
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    metafields: Array<{
      key: string;
      value: string;
      type: string;
    } | null>;
  };
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

// Listing query for the shop grid, homepage sections and related-products carousel.
// It fetches the full image set (galleries and hover images need more than the first
// two photos) plus every variant, while still skipping the heavy description and
// metafield fields that only the product detail page renders.




// API Functions (local catalogue)
export async function fetchProducts(first: number = 50, query?: string): Promise<ShopifyProduct[]> {
  const q = query?.trim().toLowerCase();
  const list = q
    ? catalog.filter(({ node }) => `${node.title} ${node.productType} ${node.tags.join(" ")}`.toLowerCase().includes(q))
    : catalog;
  return list.slice(0, first);
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  return catalog.find(({ node }) => node.handle === handle)?.node ?? null;
}

// Helper functions
// Ask Shopify's image CDN for an appropriately sized image instead of shipping the
// full-resolution original. Shopify resizes on the fly and auto-serves WebP/AVIF to
// browsers that support it, so a grid thumbnail becomes ~50–150 KB instead of MBs.
export function shopifyImage(url: string | undefined | null, width: number): string {
  if (!url) return '';
  // Local images are already sized; only Shopify CDN URLs take a width parameter.
  if (!url.startsWith('https://cdn.shopify.com/')) return url;
  const u = new URL(url);
  u.searchParams.set('width', String(width));
  return u.toString();
}

export function formatPrice(amount: string, currencyCode: string = 'INR'): string {
  const num = parseFloat(amount);
  if (currencyCode === 'INR') {
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(num);
}

// Tags in Shopify are typed by hand, so match them loosely: case, spaces,
// hyphens and underscores are all normalised away before comparing.
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[\s_-]+/g, '');
}

function hasAnyTag(product: ShopifyProduct['node'], candidates: string[]): boolean {
  const normalized = (product.tags ?? []).map(normalizeTag);
  return candidates.some(c => normalized.includes(normalizeTag(c)));
}

const NEW_TAGS = ['new', 'new arrival', 'new arrivals', 'newin', 'just in', 'latest'];
const BEST_SELLER_TAGS = ['best seller', 'bestseller', 'best sellers', 'popular'];

export function isNewProduct(product: ShopifyProduct['node']): boolean {
  return hasAnyTag(product, NEW_TAGS);
}

export function isBestSeller(product: ShopifyProduct['node']): boolean {
  return hasAnyTag(product, BEST_SELLER_TAGS);
}

/**
 * Products for the "New Arrivals" surface. Prefers explicitly tagged products, but
 * if nobody has tagged anything in Shopify yet it falls back to the most recently
 * published products so the section never silently disappears.
 */
export function selectNewArrivals(products: ShopifyProduct[], limit = 3): ShopifyProduct[] {
  const tagged = products.filter(p => isNewProduct(p.node));
  if (tagged.length > 0) return tagged.slice(0, limit);

  return [...products]
    .sort((a, b) => {
      const at = a.node.publishedAt ? Date.parse(a.node.publishedAt) : 0;
      const bt = b.node.publishedAt ? Date.parse(b.node.publishedAt) : 0;
      return bt - at;
    })
    .slice(0, limit);
}

/**
 * Resolve a hardcoded handle against the live catalogue. Returns null when the
 * product was drafted, unpublished or deleted in Shopify, so callers can skip the
 * item instead of rendering a link to a page that no longer exists.
 */
export function resolveHandle(
  products: ShopifyProduct[],
  handle: string
): ShopifyProduct['node'] | null {
  return products.find(p => p.node.handle === handle)?.node ?? null;
}

/**
 * Best-effort category matching. Uses productType when the merchant filled it in,
 * otherwise falls back to shared tags (excluding generic marketing tags).
 */
export function isSameCategory(a: ShopifyProduct['node'], b: ShopifyProduct['node']): boolean {
  if (a.productType && b.productType) {
    return a.productType.toLowerCase() === b.productType.toLowerCase();
  }
  const generic = new Set([...NEW_TAGS, ...BEST_SELLER_TAGS].map(normalizeTag));
  const aTags = (a.tags ?? []).map(normalizeTag).filter(t => !generic.has(t));
  const bTags = new Set((b.tags ?? []).map(normalizeTag).filter(t => !generic.has(t)));
  return aTags.some(t => bTags.has(t));
}


export function getColorOptions(product: ShopifyProduct['node']): string[] {
  const colorOption = product.options.find(opt => 
    opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour'
  );
  return colorOption?.values || [];
}
