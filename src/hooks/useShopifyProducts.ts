import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';

// Backed by React Query so results are cached and de-duplicated: navigating
// shop -> product (or rendering the related-products carousel, which also calls
// useShopifyProducts) reuses the cached list instead of re-fetching from Shopify.

export function useShopifyProducts(query?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', query ?? null],
    queryFn: () => fetchProducts(50, query),
  });

  return {
    products: (data ?? []) as ShopifyProduct[],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load products') : null,
  };
}

export function useShopifyProduct(handle: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle as string),
    enabled: !!handle,
  });

  return {
    product: (data ?? null) as ShopifyProduct['node'] | null,
    loading: !!handle && isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load product') : null,
  };
}
