import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change with instant behavior
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
    // Also reset any hash-based scroll and prevent focus-based auto-scroll
    if (window.location.hash) {
      window.history.replaceState(null, "", pathname);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
