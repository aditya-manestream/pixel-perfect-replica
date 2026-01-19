import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatPrice, isNewProduct, isBestSeller, ShopifyProduct } from "@/lib/shopify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface RelatedProductsCarouselProps {
  currentProductId?: string;
  currentProductType?: string;
}

const RelatedProductsCarousel = ({ 
  currentProductId, 
  currentProductType 
}: RelatedProductsCarouselProps) => {
  const { products, loading } = useShopifyProducts();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps'
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Smart filtering: prefer same category, fallback to best sellers/new arrivals
  const relatedProducts = useMemo(() => {
    const otherProducts = products.filter(p => p.node.id !== currentProductId);
    
    if (otherProducts.length <= 4) {
      return otherProducts;
    }
    
    // Step 1: Get products from same category/type
    const sameCategoryProducts = currentProductType 
      ? otherProducts.filter(p => 
          p.node.productType?.toLowerCase() === currentProductType.toLowerCase()
        )
      : [];
    
    // Step 2: Get best sellers and new arrivals
    const bestSellers = otherProducts.filter(p => isBestSeller(p.node));
    const newArrivals = otherProducts.filter(p => isNewProduct(p.node));
    
    // Step 3: Combine with priority: same category > best sellers > new arrivals > others
    const prioritized: ShopifyProduct[] = [];
    const addedIds = new Set<string>();
    
    // Add same category first
    for (const product of sameCategoryProducts) {
      if (!addedIds.has(product.node.id)) {
        prioritized.push(product);
        addedIds.add(product.node.id);
      }
    }
    
    // Add best sellers
    for (const product of bestSellers) {
      if (!addedIds.has(product.node.id)) {
        prioritized.push(product);
        addedIds.add(product.node.id);
      }
    }
    
    // Add new arrivals
    for (const product of newArrivals) {
      if (!addedIds.has(product.node.id)) {
        prioritized.push(product);
        addedIds.add(product.node.id);
      }
    }
    
    // Fill remaining with other products
    for (const product of otherProducts) {
      if (!addedIds.has(product.node.id)) {
        prioritized.push(product);
        addedIds.add(product.node.id);
      }
    }
    
    return prioritized;
  }, [products, currentProductId, currentProductType]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (loading) {
    return (
      <section 
        className="w-full py-16 lg:py-24"
        style={{ backgroundColor: "#FDFCFA" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-10 lg:mb-12">
            <div className="h-4 w-40 mb-3 animate-pulse" style={{ backgroundColor: "#EEEBE6" }} />
            <div className="h-9 w-64 animate-pulse" style={{ backgroundColor: "#EEEBE6" }} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] mb-4" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-3 w-1/2 mb-1" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-4 w-1/3" style={{ backgroundColor: "#EEEBE6" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) return null;

  return (
    <section 
      className="w-full py-16 lg:py-24"
      style={{ backgroundColor: "#FDFCFA" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 lg:mb-12">
          <div>
            <p 
              className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-3"
              style={{ color: "#C9A86C" }}
            >
              ✦ CONTINUE EXPLORING ✦
            </p>
            <h2 
              className="font-serif text-[28px] lg:text-[36px] font-normal"
              style={{ color: "#2C2824" }}
            >
              You May Also Like
            </h2>
          </div>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`w-10 h-10 flex items-center justify-center transition-all ${
                !canScrollPrev ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              style={{ border: "1px solid #E8E4DF" }}
              aria-label="Previous products"
            >
              <ChevronLeft size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`w-10 h-10 flex items-center justify-center transition-all ${
                !canScrollNext ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              style={{ border: "1px solid #E8E4DF" }}
              aria-label="Next products"
            >
              <ChevronRight size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 lg:gap-8">
            {relatedProducts.map((product) => {
              const img = product.node.images.edges[0]?.node;
              const isNew = isNewProduct(product.node);
              const isBest = isBestSeller(product.node);
              
              return (
                <div 
                  key={product.node.id}
                  className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[calc(25%-18px)]"
                >
                  <Link
                    to={`/product/${product.node.handle}`}
                    className="group block"
                  >
                    {/* Product Card */}
                    <div 
                      className="relative aspect-[4/5] overflow-hidden mb-4 transition-shadow duration-300 group-hover:shadow-xl"
                      style={{ backgroundColor: "#EEEBE6" }}
                    >
                      {/* Badge */}
                      {isNew && (
                        <span
                          className="absolute top-3 left-3 z-10 px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.08em] uppercase"
                          style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                        >
                          NEW
                        </span>
                      )}
                      {isBest && !isNew && (
                        <span
                          className="absolute top-3 left-3 z-10 px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.08em] uppercase"
                          style={{ backgroundColor: "#C9A86C", color: "#FFFFFF" }}
                        >
                          BEST SELLER
                        </span>
                      )}

                      {/* Image */}
                      {img ? (
                        <img
                          src={img.url}
                          alt={img.altText || product.node.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShoppingBag size={32} strokeWidth={1} style={{ color: "#9A958F" }} />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <h3 
                      className="font-serif text-[16px] lg:text-[18px] font-normal mb-1"
                      style={{ color: "#2C2824" }}
                    >
                      {product.node.title}
                    </h3>
                    <p 
                      className="font-sans text-[12px] tracking-[0.02em] mb-1"
                      style={{ color: "#9A958E" }}
                    >
                      {product.node.productType || "Handbag"}
                    </p>
                    <p 
                      className="font-sans text-[14px] lg:text-[15px] font-medium"
                      style={{ color: "#2C2824" }}
                    >
                      {formatPrice(
                        product.node.priceRange.minVariantPrice.amount,
                        product.node.priceRange.minVariantPrice.currencyCode
                      )}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile swipe indicator */}
        <p 
          className="lg:hidden text-center font-sans text-[11px] tracking-[0.05em] mt-6"
          style={{ color: "#9A958E" }}
        >
          Swipe to explore more →
        </p>
      </div>
    </section>
  );
};

export default RelatedProductsCarousel;