import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { isNewProduct } from "@/lib/shopify";
import styled1 from "@/assets/shop-product-1.jpg";
import styled2 from "@/assets/shop-product-2.jpg";
import styled3 from "@/assets/shop-product-3.jpg";
import styled4 from "@/assets/shop-product-4.jpg";
import styled5 from "@/assets/shop-product-5.jpg";

const STYLED_IMAGES = [styled1, styled2, styled3, styled4, styled5];

interface CarouselItem {
  id: string;
  handle: string;
  name: string;
  image: string;
  alt: string;
  isNew: boolean;
}

interface CarouselCardProps {
  product: CarouselItem;
  index: number;
  activeIndex: MotionValue<number>;
  itemsLength: number;
  onMouseEnter: (index: number, e: React.MouseEvent) => void;
}

const CarouselCard = ({
  product,
  index,
  activeIndex,
  itemsLength,
  onMouseEnter,
}: CarouselCardProps) => {
  const position = useTransform(activeIndex, (latest) => {
    const rawPos = index - latest;
    const k = Math.round(rawPos / itemsLength);
    return rawPos - k * itemsLength;
  });
  const x = useTransform(position, (p) => p * 280);
  const scale = useTransform(
    position,
    (p) => 1.1 - Math.min(Math.abs(p), 2) * 0.125
  );
  const opacity = useTransform(
    position,
    (p) => 1 - Math.min(Math.abs(p), 2) * 0.15
  );
  const zIndex = useTransform(
    position,
    (p) => 10 - Math.round(Math.min(Math.abs(p), 2) * 2)
  );
  const shadow = useTransform(position, (p) =>
    Math.abs(p) < 0.5
      ? "0 20px 40px -10px rgba(0,0,0,0.25)"
      : "0 10px 20px -5px rgba(0,0,0,0.1)"
  );
  const pointerEvents = useTransform(position, (p) =>
    Math.abs(p) <= 2 ? "auto" : "none"
  );

  return (
    <motion.div
      key={product.id}
      className="absolute"
      style={{ x, scale, opacity, zIndex, boxShadow: shadow, pointerEvents }}
      onMouseEnter={(e) => onMouseEnter(index, e)}
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
};

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

  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const activeIndex = useMotionValue(0);
  const speed = useRef(0.5); // cards per second
  const lastCenterPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      activeIndex.set(Math.floor(items.length / 2));
    }
  }, [items.length, activeIndex]);

  useAnimationFrame((t, delta) => {
    if (isPaused || items.length < 2) return;
    const current = activeIndex.get();
    activeIndex.set((current + (speed.current * delta) / 1000) % items.length);
  });

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    setIsPaused(true);
    const currentIndex = activeIndex.get();
    const centerIndex = Math.round(currentIndex);
    if (index === centerIndex) return;

    const from = lastCenterPointer.current;
    if (
      from &&
      Math.abs(e.clientX - from.x) < 4 &&
      Math.abs(e.clientY - from.y) < 4
    ) {
      return;
    }

    lastCenterPointer.current = { x: e.clientX, y: e.clientY };
    animate(activeIndex, index, { duration: 0.7, ease: [0.4, 0, 0.2, 1] });
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
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const current = activeIndex.get();
      const target = diff > 0 ? Math.round(current + 1) : Math.round(current - 1);
      const wrapped = ((target % items.length) + items.length) % items.length;
      animate(activeIndex, wrapped, { duration: 0.7, ease: [0.4, 0, 0.2, 1] });
    }
    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 3000);
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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((product, index) => (
          <CarouselCard
            key={product.id}
            product={product}
            index={index}
            activeIndex={activeIndex}
            itemsLength={items.length}
            onMouseEnter={handleMouseEnter}
          />
        ))}
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
