import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Lifestyle images
import lifestyleImg1 from "@/assets/values-lifestyle-1.jpg";
import lifestyleImg2 from "@/assets/values-lifestyle-2.jpg";
import lifestyleImg3 from "@/assets/values-lifestyle-3.jpg";
import lifestyleImg4 from "@/assets/values-lifestyle-4.jpg";

// Product images
import productImg1 from "@/assets/values-product-1.jpg";
import productImg2 from "@/assets/values-product-2.jpg";
import productImg3 from "@/assets/values-product-3.jpg";
import productImg4 from "@/assets/values-product-4.jpg";

const values = [
  {
    id: 0,
    title: "Crafted with Intention",
    icon: "leaf",
    lifestyleImage: lifestyleImg1,
    productImage: productImg1,
    lifestylePosition: "65% 75%",
    productPosition: "center center",
  },
  {
    id: 1,
    title: "Balance & Form",
    icon: "circle",
    lifestyleImage: lifestyleImg2,
    productImage: productImg2,
    lifestylePosition: "30% center",
    productPosition: "65% 45%",
  },
  {
    id: 2,
    title: "Rooted in Nature",
    icon: "mountain",
    lifestyleImage: lifestyleImg3,
    productImage: productImg3,
    lifestylePosition: "75% 80%",
    productPosition: "center 40%",
  },
  {
    id: 3,
    title: "Enduring Design",
    icon: "clock",
    lifestyleImage: lifestyleImg4,
    productImage: productImg4,
    lifestylePosition: "60% 75%",
    productPosition: "center 35%",
  },
];

const LeafIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={isActive ? "1.5" : "1"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const CircleIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={isActive ? "1.5" : "1"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const MountainIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={isActive ? "1.5" : "1"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const ClockIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={isActive ? "1.5" : "1"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const getIcon = (iconName: string, isActive: boolean) => {
  switch (iconName) {
    case "leaf":
      return <LeafIcon isActive={isActive} />;
    case "circle":
      return <CircleIcon isActive={isActive} />;
    case "mountain":
      return <MountainIcon isActive={isActive} />;
    case "clock":
      return <ClockIcon isActive={isActive} />;
    default:
      return <LeafIcon isActive={isActive} />;
  }
};

const ValuesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextValue = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % values.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextValue();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, nextValue]);

  const handleValueInteraction = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const activeValue = values[activeIndex];

  return (
    <section
      className="w-full py-20 lg:py-28"
      style={{ backgroundColor: "#F5F2ED" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Left Image - Lifestyle */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-0 overflow-hidden rounded-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeValue.lifestyleImage}
                src={activeValue.lifestyleImage}
                alt="Lifestyle"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: activeValue.lifestylePosition }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Center - Values List */}
          <div
            className="flex flex-col items-center py-6 lg:py-8"
            onMouseLeave={handleMouseLeave}
          >
            {/* Header */}
            <p
              className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-8 lg:mb-10"
              style={{ color: "#7A7570" }}
            >
              OUR VALUES
            </p>

            {/* Values */}
            <div className="flex flex-col items-center gap-6 lg:gap-7">
              {values.map((value, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={value.id}
                    className="flex flex-col items-center cursor-pointer group"
                    onMouseEnter={() => handleValueInteraction(index)}
                    onClick={() => handleValueInteraction(index)}
                  >
                    {/* Icon Container */}
                    <div
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border flex items-center justify-center mb-2 transition-all duration-300"
                      style={{
                        borderColor: isActive ? "#7A7570" : "#C9C5BF",
                        color: isActive ? "#4A4540" : "#A9A5A0",
                      }}
                    >
                      {getIcon(value.icon, isActive)}
                    </div>

                    {/* Title */}
                    <p
                      className="font-serif text-[15px] lg:text-[17px] transition-all duration-300"
                      style={{
                        color: isActive ? "#2C2824" : "#8A857F",
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {value.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image - Product */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[460px] overflow-hidden rounded-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeValue.productImage}
                src={activeValue.productImage}
                alt="Product"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: activeValue.productPosition }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValuesSection;
