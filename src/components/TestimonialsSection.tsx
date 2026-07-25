import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import t1 from "@/assets/testimonial-t1.jpg.asset.json";
import t2 from "@/assets/testimonial-t2.jpg.asset.json";
import t3 from "@/assets/testimonial-t3.jpg.asset.json";
import t4 from "@/assets/testimonial-t4.jpg.asset.json";
import t5 from "@/assets/testimonial-t5.jpg.asset.json";
import t6 from "@/assets/testimonial-t6.jpg.asset.json";

const testimonialImages = [t1.url, t2.url, t3.url, t4.url, t5.url, t6.url];

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  productHandle: string;
  rating: number;
}

const testimonialsData: Testimonial[][] = [
  [
    {
      quote: "The craftsmanship is unlike anything I've owned. Every stitch tells a story of dedication and artistry.",
      name: "Ananya Sharma",
      location: "Mumbai, India",
      productHandle: "the-lotus",
      rating: 5,
    },
    {
      quote: "My Ardori tote has become my daily companion. The leather has developed the most beautiful patina over time.",
      name: "Priya Menon",
      location: "Bangalore, India",
      productHandle: "the-heritage-tote",
      rating: 5,
    },
    {
      quote: "A gift that left my mother speechless. The unboxing experience alone was worth it — pure elegance.",
      name: "Kavitha Reddy",
      location: "Chennai, India",
      productHandle: "the-crossbody",
      rating: 5,
    },
  ],
  [
    {
      quote: "I've never received so many compliments on a bag. It's art you carry with you.",
      name: "Meera Patel",
      location: "Ahmedabad, India",
      productHandle: "the-lotus",
      rating: 5,
    },
    {
      quote: "Sustainable, beautiful, and timeless. Ardori represents everything I value in craftsmanship.",
      name: "Deepika Nair",
      location: "Kochi, India",
      productHandle: "the-heritage-tote",
      rating: 5,
    },
    {
      quote: "The attention to detail is extraordinary. You can feel the heritage in every piece.",
      name: "Shreya Iyer",
      location: "Pune, India",
      productHandle: "the-crossbody",
      rating: 4,
    },
  ],
  [
    {
      quote: "From the packaging to the product, every touchpoint feels intentional and luxurious.",
      name: "Aishwarya Das",
      location: "Kolkata, India",
      productHandle: "the-lotus",
      rating: 5,
    },
    {
      quote: "My crossbody bag from Ardori is the perfect blend of tradition and modern elegance.",
      name: "Lakshmi Venkat",
      location: "Hyderabad, India",
      productHandle: "the-crossbody",
      rating: 5,
    },
    {
      quote: "The vegetable-tanned leather ages so gracefully. It truly becomes more beautiful with time.",
      name: "Nandini Rao",
      location: "Delhi, India",
      productHandle: "the-heritage-tote",
      rating: 5,
    },
  ],
];

// Flatten for mobile carousel (single card per view)
const allTestimonials = testimonialsData.flat();

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className="transition-colors"
        fill={i < rating ? "#C9A86C" : "transparent"}
        stroke={i < rating ? "#C9A86C" : "rgba(232, 228, 223, 0.4)"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const TestimonialCard = ({ 
  testimonial, 
  productInfo,
  isMobile = false 
}: { 
  testimonial: Testimonial; 
  productInfo: { image: string | null; title: string; handle: string };
  isMobile?: boolean;
}) => (
  <motion.div
    className={`flex flex-col items-center text-center group ${
      isMobile ? "px-4" : ""
    }`}
    whileHover={!isMobile ? { y: -4 } : undefined}
    transition={{ duration: 0.3 }}
  >
    {/* Card Container */}
    <div 
      className="w-full p-6 lg:p-8 rounded-2xl transition-all duration-300 group-hover:shadow-2xl"
      style={{ 
        backgroundColor: "rgba(232, 228, 223, 0.06)",
        border: "1px solid rgba(232, 228, 223, 0.12)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Product Image */}
      <Link 
        to={`/product/${productInfo.handle}`}
        className="block mx-auto mb-5 group/product"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-xl overflow-hidden transition-all duration-300 group-hover/product:scale-105 group-hover/product:shadow-lg"
          style={{ 
            border: "2px solid rgba(201, 168, 108, 0.3)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
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
                className="font-serif text-lg"
                style={{ color: "rgba(232, 228, 223, 0.5)" }}
              >
                A
              </span>
            </div>
          )}
        </div>
        <p 
          className="mt-3 font-sans text-[10px] lg:text-[11px] tracking-[0.1em] uppercase transition-all duration-300 opacity-60 group-hover/product:opacity-100"
          style={{ color: "#C9A86C" }}
        >
          View Product →
        </p>
      </Link>

      {/* Star Rating */}
      <div className="flex justify-center mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <p
        className="font-serif text-[16px] lg:text-[18px] font-light leading-[1.9] mb-6 italic"
        style={{ color: "#E8E4DF" }}
      >
        "{testimonial.quote}"
      </p>

      {/* Customer Info */}
      <div>
        <p
          className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase mb-1 font-medium"
          style={{ color: "#C9A86C" }}
        >
          {testimonial.name}
        </p>
        <p
          className="font-sans text-[10px] lg:text-[11px] tracking-[0.08em]"
          style={{ color: "rgba(232, 228, 223, 0.55)" }}
        >
          {testimonial.location}
        </p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { products } = useShopifyProducts();
  
  // Create a map of handle -> product for quick lookup
  const productMap = new Map(
    products.map(p => [p.node.handle, p.node])
  );

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSet = useCallback(() => {
    if (isMobile) {
      setMobileIndex((prev) => (prev + 1) % allTestimonials.length);
    } else {
      setActiveSet((prev) => (prev + 1) % testimonialsData.length);
    }
  }, [isMobile]);

  const prevSet = useCallback(() => {
    if (isMobile) {
      setMobileIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
    } else {
      setActiveSet((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    }
  }, [isMobile]);

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
    
    // Fallback: pick a random product from available products
    if (products.length > 0) {
      const randomProduct = products[Math.floor(Math.random() * products.length)].node;
      return {
        image: randomProduct.images.edges[0]?.node.url || null,
        title: randomProduct.title,
        handle: randomProduct.handle,
      };
    }
    
    // Final fallback if no products
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
            className="font-serif text-[32px] lg:text-[48px] font-normal italic mb-4"
            style={{ color: "#E8E4DF" }}
          >
            Loved by Those Who Carry Ardori
          </h2>
          <p
            className="font-serif text-[14px] lg:text-[17px] font-light max-w-[500px] mx-auto"
            style={{ color: "rgba(232, 228, 223, 0.75)" }}
          >
            Stories from those who have made Ardori a part of their journey
          </p>
        </div>

        {/* Desktop Testimonials - 3 Column Grid */}
        <div
          className="hidden md:block relative min-h-[420px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-3 gap-8"
            >
              {testimonialsData[activeSet].map((testimonial, index) => {
                const productInfo = getProductInfo(testimonial.productHandle);
                const globalIndex = activeSet * 3 + index;
                productInfo.image = testimonialImages[globalIndex % testimonialImages.length];

                return (
                  <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                    productInfo={productInfo}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Testimonials - Single Card Carousel */}
        <div
          className="md:hidden relative min-h-[480px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-[340px] mx-auto"
            >
              <TestimonialCard
                testimonial={allTestimonials[mobileIndex]}
                productInfo={{
                  ...getProductInfo(allTestimonials[mobileIndex].productHandle),
                  image: testimonialImages[mobileIndex % testimonialImages.length],
                }}
                isMobile
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Pagination Dots */}
        <div className="hidden md:flex justify-center gap-3 mt-12">
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
                backgroundColor: index === activeSet ? "#C9A86C" : "rgba(232, 228, 223, 0.3)",
              }}
              aria-label={`View testimonial set ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-8">
          {allTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setMobileIndex(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === mobileIndex ? "#C9A86C" : "rgba(232, 228, 223, 0.25)",
                transform: index === mobileIndex ? "scale(1.2)" : "scale(1)",
              }}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;