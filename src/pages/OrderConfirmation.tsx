import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OrderConfirmation = () => {
  const { clearCart } = useCartStore();

  // Clear cart on mount (after successful checkout)
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderNumber = `ARD-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
      <Navbar />

      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="max-w-[700px] mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {/* Success Icon */}
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ backgroundColor: "#E8F5E9" }}
            >
              <CheckCircle size={40} strokeWidth={1.5} style={{ color: "#4CAF50" }} />
            </div>

            {/* Thank You Message */}
            <h1 
              className="font-serif font-normal mb-4"
              style={{ color: "#2C2824", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Thank You for Your Order
            </h1>
            
            <p 
              className="font-serif text-[15px] lg:text-[17px] font-light leading-relaxed mb-8"
              style={{ color: "#6A655F" }}
            >
              We've received your order and are preparing your handcrafted bag with care.
              A confirmation email has been sent to your inbox.
            </p>

            {/* Order Details */}
            <div 
              className="p-8 mb-8 text-left"
              style={{ backgroundColor: "#F8F6F3", border: "1px solid #E8E4DF" }}
            >
              <h2 
                className="font-serif text-[18px] lg:text-[20px] font-normal mb-6"
                style={{ color: "#2C2824" }}
              >
                Order Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3" style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <span className="font-sans text-[12px] tracking-[0.1em] uppercase" style={{ color: "#7A7570" }}>
                    Order Number
                  </span>
                  <span className="font-sans text-[14px] font-medium" style={{ color: "#2C2824" }}>
                    {orderNumber}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3" style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <span className="font-sans text-[12px] tracking-[0.1em] uppercase" style={{ color: "#7A7570" }}>
                    Estimated Delivery
                  </span>
                  <span className="font-sans text-[14px]" style={{ color: "#2C2824" }}>
                    {estimatedDelivery}
                  </span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div 
              className="p-8 mb-8 text-left"
              style={{ backgroundColor: "#F8F6F3", border: "1px solid #E8E4DF" }}
            >
              <h3 
                className="font-serif text-[16px] lg:text-[18px] font-normal mb-6"
                style={{ color: "#2C2824" }}
              >
                What Happens Next
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Package size={20} strokeWidth={1.5} style={{ color: "#C9A86C" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-[13px] font-medium" style={{ color: "#3D3530" }}>
                      Order Confirmation
                    </p>
                    <p className="font-serif text-[13px] font-light" style={{ color: "#7A7570" }}>
                      You'll receive an email with your order details
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Package size={20} strokeWidth={1.5} style={{ color: "#C9A86C" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-[13px] font-medium" style={{ color: "#3D3530" }}>
                      Crafting Your Bag
                    </p>
                    <p className="font-serif text-[13px] font-light" style={{ color: "#7A7570" }}>
                      Our artisans will carefully prepare your order
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Truck size={20} strokeWidth={1.5} style={{ color: "#C9A86C" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-[13px] font-medium" style={{ color: "#3D3530" }}>
                      Shipping Update
                    </p>
                    <p className="font-serif text-[13px] font-light" style={{ color: "#7A7570" }}>
                      We'll notify you once your order ships with tracking info
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <p 
              className="font-serif text-[13px] lg:text-[14px] font-light mb-8"
              style={{ color: "#7A7570" }}
            >
              Questions about your order? Contact us at{" "}
              <a 
                href="mailto:love@ardorilabel.com" 
                className="transition-opacity hover:opacity-70"
                style={{ color: "#C9A86C" }}
              >
                ardori.work@gmail.com
              </a>
            </p>

            {/* CTA */}
            <Link
              to="/shop"
              className="inline-block font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase transition-all hover:opacity-90"
              style={{
                backgroundColor: "#2C2824",
                color: "#FFFFFF",
                padding: "16px 40px",
              }}
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
