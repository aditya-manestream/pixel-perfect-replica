import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatPrice, isNewProduct, isBestSeller } from "@/lib/shopify";

interface RelatedProductsCarouselProps {
  currentProductId?: string;
}

const RelatedProductsCarousel = ({ currentProductId }: RelatedProductsCarouselProps) => {
  const { products, loading } = useShopifyProducts();
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Filter out current product
  const relatedProducts = products.filter(p => p.node.id !== currentProductId);
  const visibleCount = 4;
  const maxIndex = Math.max(0, relatedProducts.length - visibleCount);

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleProducts = relatedProducts.slice(startIndex, startIndex + visibleCount);

  if (loading) {
    return (
      <section 
        className="w-full py-16 lg:py-24"
        style={{ backgroundColor: "#FDFCFA" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] mb-4" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-3 w-1/2" style={{ backgroundColor: "#EEEBE6" }} />
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

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className={`w-10 h-10 flex items-center justify-center transition-all ${
                startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              style={{ border: "1px solid #E8E4DF" }}
              aria-label="Previous products"
            >
              <ChevronLeft size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} />
            </button>
            <button
              onClick={nextSlide}
              disabled={startIndex >= maxIndex}
              className={`w-10 h-10 flex items-center justify-center transition-all ${
                startIndex >= maxIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              style={{ border: "1px solid #E8E4DF" }}
              aria-label="Next products"
            >
              <ChevronRight size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {visibleProducts.map((product) => {
            const img = product.node.images.edges[0]?.node;
            const isNew = isNewProduct(product.node);
            const isBest = isBestSeller(product.node);
            
            return (
              <Link
                key={product.node.id}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProductsCarousel;
