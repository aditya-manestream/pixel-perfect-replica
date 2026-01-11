import { useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "shop" | "bag">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth spring animation for cursor position
  const cursorX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouchDevice();

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  const handleElementDetection = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for product cards
    if (target.closest("[data-cursor='shop']") || target.closest(".product-card")) {
      setCursorState("shop");
      return;
    }
    
    // Check for add to bag buttons
    if (target.closest("[data-cursor='bag']") || 
        target.textContent?.toLowerCase().includes("add to bag") ||
        target.textContent?.toLowerCase().includes("add to cart")) {
      setCursorState("bag");
      return;
    }
    
    // Check for any clickable elements
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("[role='button']") ||
      target.closest("input[type='submit']") ||
      target.closest("[data-cursor='hover']") ||
      getComputedStyle(target).cursor === "pointer"
    ) {
      setCursorState("hover");
      return;
    }
    
    setCursorState("default");
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    
    window.addEventListener("mouseover", handleElementDetection);
    return () => window.removeEventListener("mouseover", handleElementDetection);
  }, [handleElementDetection, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const getCursorSize = () => {
    switch (cursorState) {
      case "hover":
      case "shop":
      case "bag":
        return 40;
      default:
        return 28;
    }
  };

  const getCursorColor = () => {
    switch (cursorState) {
      case "hover":
      case "shop":
      case "bag":
        return "#C9A86C"; // Gold accent
      default:
        return "#0E1513"; // Dark for contrast
    }
  };

  const getLabel = () => {
    switch (cursorState) {
      case "shop":
        return "Shop";
      case "bag":
        return "+ Bag";
      default:
        return null;
    }
  };

  const size = getCursorSize();
  const color = getCursorColor();
  const label = getLabel();

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
        @media (pointer: coarse), (hover: none) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Cursor container - offset to center */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          animate={{
            scale: cursorState !== "default" ? 1.1 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Handbag SVG */}
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Handbag handle */}
            <path
              d="M10 12C10 8 12.5 5 16 5C19.5 5 22 8 22 12"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Handbag body */}
            <path
              d="M6 14C6 13.4477 6.44772 13 7 13H25C25.5523 13 26 13.4477 26 14V24C26 25.6569 24.6569 27 23 27H9C7.34315 27 6 25.6569 6 24V14Z"
              fill={color}
              fillOpacity={cursorState === "default" ? 0.9 : 1}
            />
            {/* Handbag clasp */}
            <rect
              x="14"
              y="16"
              width="4"
              height="3"
              rx="1"
              fill={cursorState === "default" ? "#3A3530" : "#2C2824"}
            />
          </motion.svg>
          
          {/* Label */}
          {label && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-5 whitespace-nowrap text-[10px] font-sans tracking-wider"
              style={{ 
                color: color,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)"
              }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
