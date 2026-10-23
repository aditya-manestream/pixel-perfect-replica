// Manestream library kit: scroll to the top on route change, or to #section for /#section links.
// Render once inside the router: <BrowserRouter><ScrollManager />…</BrowserRouter>
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait a tick so the target section has rendered after a page change.
    const timer = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 50);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}
