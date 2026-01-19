import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ShopifyProductDetail from "./pages/ShopifyProductDetail";
import OurStory from "./pages/OurStory";
import HandbagCare from "./pages/HandbagCare";
import Contact from "./pages/Contact";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import ShopifyCart from "./pages/ShopifyCart";
import OrderConfirmation from "./pages/OrderConfirmation";
import FAQs from "./pages/FAQs";
import Journal from "./pages/Journal";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
