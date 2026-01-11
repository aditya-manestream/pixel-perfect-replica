import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import shopProduct1 from "@/assets/shop-product-1.jpg";
import shopProduct2 from "@/assets/shop-product-2.jpg";
import shopProduct3 from "@/assets/shop-product-3.jpg";
import shopProduct4 from "@/assets/shop-product-4.jpg";
import shopProduct5 from "@/assets/shop-product-5.jpg";

const products = [
  { id: 0, image: shopProduct1, name: "Cognac Tote", isNew: true },
  { id: 1, image: shopProduct2, name: "Olive Crossbody", isNew: true },
  { id: 2, image: shopProduct3, name: "Burgundy Clutch", isNew: false },
  { id: 3, image: shopProduct4, name: "Sage Shoulder Bag", isNew: true },
  { id: 4, image: shopProduct5, name: "Camel Tote", isNew: true },
];

const WatchShopSection = () => {
  const [centerIndex, setCenterIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextProduct = useCallback(() => {
    setCenterIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prevProduct = useCallback(() => {
    setCenterIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextProduct();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, nextProduct]);

  const handleMouseEnter = (index: number) => {
    if (index !== centerIndex) {
      setCenterIndex(index);
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

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
        nextProduct();
      } else {
        prevProduct();
      }
    }
    
    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const getPosition = (index: number) => {
    const diff = index - centerIndex;
    const normalizedDiff = ((diff + products.length + 2) % products.length) - 2;
    return normalizedDiff;
  };

  return (
    <section
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16 px-6">
        <h2
          className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
          style={{ color: "#2C2824" }}
        >
          Watch & Shop
        </h2>
        <p
          className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto"
          style={{ color: "#7A7570" }}
        >
          Discover our artisans' finest creations, each piece a celebration of heritage and luxury.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product, index) => {
          const position = getPosition(index);
          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 2;

          if (!isVisible) return null;

          const xOffset = position * 280;
          const scale = isCenter ? 1.1 : 0.85;
          const opacity = isCenter ? 1 : 0.7;
          const zIndex = isCenter ? 10 : 5 - Math.abs(position);
          const shadow = isCenter
            ? "0 20px 40px -10px rgba(0,0,0,0.25)"
            : "0 10px 20px -5px rgba(0,0,0,0.1)";

          return (
            <motion.div
              key={product.id}
              className="absolute cursor-pointer"
              initial={false}
              animate={{
                x: xOffset,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1],
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              style={{
                boxShadow: shadow,
              }}
            >
              <div
                className="relative w-[200px] lg:w-[260px] rounded-lg overflow-hidden"
                style={{ backgroundColor: "#F5F2ED" }}
              >
                {/* NEW Badge */}
                {product.isNew && (
                  <div
                    className="absolute top-3 left-3 z-10 px-3 py-1 text-[10px] lg:text-[11px] font-sans tracking-[0.1em] uppercase"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#3A3530",
                    }}
                  >
                    NEW
                  </div>
                )}

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[280px] lg:h-[360px] object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-10 lg:mt-14">
        <Link
          to="/shop"
          className="inline-block font-sans text-[12px] lg:text-[13px] tracking-[0.2em] uppercase border-b pb-1 transition-opacity hover:opacity-70"
          style={{
            color: "#5A5550",
            borderColor: "#5A5550",
          }}
        >
          EXPLORE FULL COLLECTION
        </Link>
      </div>
    </section>
  );
};

export default WatchShopSection;
