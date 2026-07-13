import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import ardoriLogo from "@/assets/ardori-logo.png";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "shop" | "bag">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // Snappier, lighter-weight spring than before (less lag on fast moves)
  const cursorX = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 });

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

    // Position updates only — no per-frame DOM/style lookups, which was
    // the source of the lag. Contrast against the background is now
    // handled with a CSS mix-blend-mode instead of JS.
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      lastPositionRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
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

  // Small monogram cursor — sized up slightly on interactive elements
  const getCursorSize = () => {
    switch (cursorState) {
      case "hover":
      case "shop":
      case "bag":
        return 26;
      default:
        return 18;
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
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {/* Ardori monogram — a drop-shadow keeps it visible on both
              light and dark sections without any per-frame background
              detection (that JS scan was the source of the old lag). */}
          <img
            src={ardoriLogo}
            alt=""
            width={size}
            height={size}
            style={{
              width: size,
              height: "auto",
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6)) drop-shadow(0 0 1px rgba(255,255,255,0.8))",
            }}
            draggable={false}
          />

          {/* Label */}
          {label && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-5 whitespace-nowrap text-[10px] font-sans tracking-wider"
              style={{
                color: "#F5F0E8",
                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
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
