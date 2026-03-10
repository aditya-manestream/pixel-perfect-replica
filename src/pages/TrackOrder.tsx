import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[40vh] lg:min-h-[45vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#121B2D" }}
      >
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${philosophyPattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        
        <motion.div 
          className="relative z-10 text-center px-6 py-20 lg:py-24"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="font-sans text-[11px] lg:text-[12px] tracking-[0.4em] uppercase mb-4" style={{ color: "#C4A164" }}>
            ✦ ORDER STATUS ✦
          </p>
          <h1 className="font-serif font-normal tracking-[0.02em] leading-[1.1] mb-4" style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Track Your Order
          </h1>
          <p className="font-serif text-[14px] lg:text-[16px] font-light max-w-[500px] mx-auto" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            Enter your order details to check the status of your shipment.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[600px] mx-auto px-6 lg:px-8">
          {!submitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div>
                <label className="block font-sans text-[11px] lg:text-[12px] tracking-[0.15em] uppercase mb-2" style={{ color: "#3D3530" }}>
                  Order Number *
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., ARD-2025-001234"
                  required
                  className="w-full px-4 py-4 font-serif text-[15px] transition-all focus:outline-none"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #E0DCD6",
                    color: "#2C2824",
                  }}
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] lg:text-[12px] tracking-[0.15em] uppercase mb-2" style={{ color: "#3D3530" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-4 font-serif text-[15px] transition-all focus:outline-none"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #E0DCD6",
                    color: "#2C2824",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 font-sans text-[12px] lg:text-[13px] tracking-[0.15em] uppercase transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#2C2824",
                  color: "#FFFFFF",
                  padding: "16px 24px",
                }}
              >
                <Search size={16} strokeWidth={1.5} />
                Track Order
              </button>
            </motion.form>
          ) : (
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="p-8 mb-8" style={{ backgroundColor: "#F8F6F3", border: "1px solid #E8E4DF" }}>
                <p className="font-serif text-[18px] lg:text-[20px] font-normal mb-4" style={{ color: "#2C2824" }}>
                  Order Not Found
                </p>
                <p className="font-serif text-[14px] lg:text-[15px] font-light leading-relaxed mb-6" style={{ color: "#6A655F" }}>
                  We couldn't find an order matching these details. Please verify your order number and email address.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-sans text-[11px] lg:text-[12px] tracking-[0.15em] uppercase transition-all hover:opacity-80"
                  style={{
                    backgroundColor: "transparent",
                    color: "#2C2824",
                    border: "1px solid #2C2824",
                    padding: "12px 24px",
                  }}
                >
                  Try Again
                </button>
              </div>

              {/* Order Status Example */}
              <div className="text-left p-8" style={{ backgroundColor: "#F8F6F3", border: "1px solid #E8E4DF" }}>
                <h3 className="font-serif text-[16px] lg:text-[18px] font-normal mb-6" style={{ color: "#2C2824" }}>
                  Typical Order Journey
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Package, label: "Order Confirmed", desc: "Your order has been received" },
                    { icon: Package, label: "Processing", desc: "Your bag is being prepared" },
                    { icon: Truck, label: "Shipped", desc: "On its way to you" },
                    { icon: CheckCircle, label: "Delivered", desc: "Enjoy your Ardori bag!" },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <step.icon size={20} strokeWidth={1.5} style={{ color: "#C9A86C" }} />
                      <div>
                        <p className="font-sans text-[13px] tracking-[0.02em]" style={{ color: "#3D3530" }}>
                          {step.label}
                        </p>
                        <p className="font-serif text-[13px] font-light" style={{ color: "#7A7570" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact */}
          <motion.div 
            className="text-center mt-12 pt-8"
            style={{ borderTop: "1px solid #E8E4DF" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-serif text-[14px] lg:text-[15px] font-light mb-2" style={{ color: "#6A655F" }}>
              Need help with your order?
            </p>
            <a
              href="mailto:ardori.work@gmail.com"
              className="font-sans text-[12px] tracking-[0.05em] transition-opacity hover:opacity-70"
              style={{ color: "#C9A86C" }}
            >
              ardori.work@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackOrder;
