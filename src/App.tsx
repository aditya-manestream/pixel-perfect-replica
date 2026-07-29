import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

// Route pages are code-split so each URL only ships its own chunk. A visitor who
// lands directly on a product page (e.g. from a Meta ad) no longer downloads the
// entire site's JS before anything can render.
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ShopifyProductDetail = lazy(() => import("./pages/ShopifyProductDetail"));
const OurStory = lazy(() => import("./pages/OurStory"));
const HandbagCare = lazy(() => import("./pages/HandbagCare"));
const Contact = lazy(() => import("./pages/Contact"));
const Returns = lazy(() => import("./pages/Returns"));
const Shipping = lazy(() => import("./pages/Shipping"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const WarrantyPolicy = lazy(() => import("./pages/WarrantyPolicy"));
const ShopifyCart = lazy(() => import("./pages/ShopifyCart"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Journal = lazy(() => import("./pages/Journal"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min — catalog data rarely changes within a session
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Neutral full-screen placeholder while a route chunk loads. Matches the site's
// paper background so the transition reads as a brief tint, not a white flash.
const RouteFallback = () => (
  <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }} />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:handle" element={<ShopifyProductDetail />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/story" element={<OurStory />} />
            <Route path="/handbag-care" element={<HandbagCare />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/returns-exchange" element={<Returns />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/warranty-policy" element={<WarrantyPolicy />} />
            <Route path="/cart" element={<ShopifyCart />} />
            <Route path="/checkout" element={<ShopifyCart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/track-order" element={<TrackOrder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
