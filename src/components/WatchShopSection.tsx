import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { isNewProduct } from "@/lib/shopify";
import styled1 from "@/assets/shop-product-1.jpg";
import styled2 from "@/assets/shop-product-2.jpg";
import styled3 from "@/assets/shop-product-3.jpg";
import styled4 from "@/assets/shop-product-4.jpg";
import styled5 from "@/assets/shop-product-5.jpg";

const STYLED_IMAGES = [styled1, styled2, styled3, styled4, styled5];

const WatchShopSection = () => {
  const { products, loading } = useShopifyProducts();

  const items = useMemo(
    () =>
      products
        .slice(0, 5)
        .map((p, i) => {
          const node = p.node;
          return {
            id: node.id,
            handle: node.handle,
            name: node.title,
            image: STYLED_IMAGES[i],
            alt: node.title,
            isNew: isNewProduct(node),
          };
        }),
    [products]
  );

  const [centerIndex, setCenterIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      setCenterIndex(Math.floor(items.length / 2));
    }
  }, [items.length]);

  const nextProduct = useCallback(() => {
    setCenterIndex((prev) => (prev + 1) % Math.max(items.length, 1));
  }, [items.length]);

  const prevProduct = useCallback(() => {
    setCenterIndex((prev) => (prev - 1 + items.length) % Math.max(items.length, 1));
  }, [items.length]);

  useEffect(() => {
    if (isPaused || items.length < 2) return;
    const interval = setInterval(nextProduct, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextProduct, items.length]);

  const handleMouseEnter = (index: number) => {
    if (index !== centerIndex) setCenterIndex(index);
    setIsPaused(true);
  };
  const handleMouseLeave = () => setIsPaused(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextProduct() : prevProduct();
    }
    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const getPosition = (index: number) => {
    const diff = index - centerIndex;
    const normalizedDiff = ((diff + items.length + 2) % items.length) - 2;
    return normalizedDiff;
  };

  if (!loading && items.length === 0) return null;

  return (
    <section
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      <div className="text-center mb-12 lg:mb-16 px-6">
        <h2
          className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
          style={{ color: "#2C2824" }}
        >
          See it Styled
        </h2>
        <p
          className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto"
          style={{ color: "#7A7570" }}
        >
          How Ardori complements your daily life
        </p>
      </div>

      <div
        className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((product, index) => {
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
              className="absolute"
              initial={false}
              animate={{ x: xOffset, scale, opacity, zIndex }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => handleMouseEnter(index)}
              style={{ boxShadow: shadow }}
            >
              <Link
                to={`/product/${product.handle}`}
                className="block cursor-pointer"
                aria-label={`View ${product.name}`}
              >
                <div
                  className="relative w-[200px] lg:w-[260px] rounded-lg overflow-hidden"
                  style={{ backgroundColor: "#F5F2ED" }}
                >
                  {product.isNew && (
                    <div
                      className="absolute top-3 left-3 z-10 px-3 py-1 text-[10px] lg:text-[11px] font-sans tracking-[0.1em] uppercase"
                      style={{ backgroundColor: "#FFFFFF", color: "#3A3530" }}
                    >
                      NEW
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-[280px] lg:h-[360px] object-cover"
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-10 lg:mt-14">
        <Link
          to="/shop"
          className="inline-block font-sans text-[12px] lg:text-[13px] tracking-[0.2em] uppercase border-b pb-1 transition-opacity hover:opacity-70"
          style={{ color: "#5A5550", borderColor: "#5A5550" }}
        >
          EXPLORE FULL COLLECTION
        </Link>
      </div>
    </section>
  );
};

export default WatchShopSection;
