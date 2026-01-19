import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  productHandle: string;
}

const testimonialsData: Testimonial[][] = [
  [
    {
      quote: "The craftsmanship is unlike anything I've owned. Every stitch tells a story of dedication and artistry.",
      name: "Ananya Sharma",
      location: "Mumbai, India",
      productHandle: "the-lotus",
    },
    {
      quote: "My Ardori tote has become my daily companion. The leather has developed the most beautiful patina over time.",
      name: "Priya Menon",
      location: "Bangalore, India",
      productHandle: "the-heritage-tote",
    },
    {
      quote: "A gift that left my mother speechless. The unboxing experience alone was worth it — pure elegance.",
      name: "Kavitha Reddy",
      location: "Chennai, India",
      productHandle: "the-crossbody",
    },
  ],
  [
    {
      quote: "I've never received so many compliments on a bag. It's art you carry with you.",
      name: "Meera Patel",
      location: "Ahmedabad, India",
      productHandle: "the-lotus",
    },
    {
      quote: "Sustainable, beautiful, and timeless. Ardori represents everything I value in craftsmanship.",
      name: "Deepika Nair",
      location: "Kochi, India",
      productHandle: "the-heritage-tote",
    },
    {
      quote: "The attention to detail is extraordinary. You can feel the heritage in every piece.",
      name: "Shreya Iyer",
      location: "Pune, India",
      productHandle: "the-crossbody",
    },
  ],
  [
    {
      quote: "From the packaging to the product, every touchpoint feels intentional and luxurious.",
      name: "Aishwarya Das",
      location: "Kolkata, India",
      productHandle: "the-lotus",
    },
    {
      quote: "My crossbody bag from Ardori is the perfect blend of tradition and modern elegance.",
      name: "Lakshmi Venkat",
      location: "Hyderabad, India",
      productHandle: "the-crossbody",
    },
    {
      quote: "The vegetable-tanned leather ages so gracefully. It truly becomes more beautiful with time.",
      name: "Nandini Rao",
      location: "Delhi, India",
      productHandle: "the-heritage-tote",
    },
  ],
];

const TestimonialsSection = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const { products } = useShopifyProducts();
  
  // Create a map of handle -> product for quick lookup
  const productMap = new Map(
    products.map(p => [p.node.handle, p.node])
  );

  const nextSet = useCallback(() => {
    setActiveSet((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const prevSet = useCallback(() => {
    setActiveSet((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSet();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, nextSet]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSet();
      } else {
        prevSet();
      }
    }

    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const getProductInfo = (handle: string) => {
    const product = productMap.get(handle);
    if (product) {
      return {
        image: product.images.edges[0]?.node.url || null,
        title: product.title,
        handle: product.handle,
      };
    }
    // Fallback if product not found
    return {
      image: null,
      title: "Ardori Product",
      handle: handle,
    };
  };

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden" data-dark-section>
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${navyPatternBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <h2
            className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
            style={{ color: "#E8E4DF" }}
          >
            Loved by Those Who Carry Ardori
          </h2>
          <p
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[500px] mx-auto"
            style={{ color: "rgba(232, 228, 223, 0.75)" }}
          >
            Stories from those who have made Ardori a part of their journey
          </p>
        </div>

        {/* Testimonials */}
        <div
          className="relative min-h-[380px] lg:min-h-[320px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
            >
              {testimonialsData[activeSet].map((testimonial, index) => {
                const productInfo = getProductInfo(testimonial.productHandle);
                
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Product Image */}
                    <Link 
                      to={`/product/${productInfo.handle}`}
                      className="mb-5 group/product"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden transition-all duration-300 group-hover/product:scale-105"
                        style={{ 
                          border: "1px solid rgba(232, 228, 223, 0.25)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        {productInfo.image ? (
                          <img 
                            src={productInfo.image} 
                            alt={productInfo.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(232, 228, 223, 0.1)" }}
                          >
                            <span 
                              className="font-serif text-xs"
                              style={{ color: "rgba(232, 228, 223, 0.5)" }}
                            >
                              A
                            </span>
                          </div>
                        )}
                      </div>
                      <p 
                        className="mt-2 font-sans text-[10px] lg:text-[11px] tracking-[0.05em] transition-opacity duration-300 opacity-60 group-hover/product:opacity-100"
                        style={{ color: "rgba(232, 228, 223, 0.8)" }}
                      >
                        View Product →
                      </p>
                    </Link>

                    {/* Decorative Quote Mark */}
                    <div
                      className="font-serif text-[40px] lg:text-[48px] leading-none mb-3 select-none"
                      style={{ color: "rgba(232, 228, 223, 0.3)" }}
                    >
                      "
                    </div>

                    {/* Quote */}
                    <p
                      className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.8] mb-6 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: "rgba(232, 228, 223, 0.85)", opacity: 0.9 }}
                    >
                      {testimonial.quote}
                    </p>

                    {/* Name */}
                    <p
                      className="font-sans text-[13px] lg:text-[14px] tracking-[0.1em] uppercase mb-1 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: "#E8E4DF", opacity: 0.95 }}
                    >
                      {testimonial.name}
                    </p>

                    {/* Location */}
                    <p
                      className="font-sans text-[11px] lg:text-[12px] tracking-[0.05em]"
                      style={{ color: "rgba(232, 228, 223, 0.6)" }}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSet(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === activeSet ? "#E8E4DF" : "rgba(232, 228, 223, 0.3)",
              }}
              aria-label={`View testimonial set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
