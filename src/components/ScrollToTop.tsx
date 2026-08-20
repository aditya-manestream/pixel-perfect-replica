import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Scroll to top on route change with instant behavior
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
    // Also reset any hash-based scroll and prevent focus-based auto-scroll
    if (window.location.hash) {
      window.history.replaceState(null, "", pathname);
    }

    // Meta Pixel: index.html already fires the initial PageView, so only track
    // subsequent client-side route changes here.
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);


  return null;
};

export default ScrollToTop;
