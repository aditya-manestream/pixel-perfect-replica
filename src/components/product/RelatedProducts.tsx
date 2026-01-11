import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, Product } from "@/data/products";

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const [startIndex, setStartIndex] = useState(0);
  
  // Get related products (exclude current product)
  const relatedProducts = products.filter((p) => p.id !== currentProductId);
  const visibleCount = 4;
  const maxIndex = Math.max(0, relatedProducts.length - visibleCount);

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleProducts = relatedProducts.slice(startIndex, startIndex + visibleCount);

  return (
    <section 
      className="w-full py-16 lg:py-24"
      style={{ backgroundColor: "#FDFCFA" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 lg:mb-12">
          <div>
            {/* Eyebrow */}
            <p 
              className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-3"
              style={{ color: "#7A7570" }}
            >
              ✦ CONTINUE EXPLORING ✦
            </p>
            {/* Heading */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group block"
            >
              {/* Product Card */}
              <div 
                className="relative aspect-[4/5] overflow-hidden mb-4 transition-shadow duration-300 group-hover:shadow-xl"
                style={{ backgroundColor: "#EEEBE6" }}
              >
                {/* Badge */}
                {product.isNew && (
                  <span
                    className="absolute top-3 left-3 z-10 px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.08em] uppercase"
                    style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                  >
                    NEW
                  </span>
                )}

                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#9A958E" 
                      strokeWidth="1.5"
                      className="opacity-60"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <h3 
                className="font-serif text-[16px] lg:text-[18px] font-normal mb-1"
                style={{ color: "#2C2824" }}
              >
                {product.name}
              </h3>
              <p 
                className="font-sans text-[12px] tracking-[0.02em] mb-1"
                style={{ color: "#9A958E" }}
              >
                {product.category}
              </p>
              <p 
                className="font-sans text-[14px] lg:text-[15px] font-medium"
                style={{ color: "#2C2824" }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
