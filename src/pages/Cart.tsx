import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const Cart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo,
    promoMessage,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
        <Navbar />
        <div className="pt-32 pb-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-3xl md:text-4xl font-light tracking-wide mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
              >
                Your Cart is Empty
              </h1>
              <p
                className="text-lg mb-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
              >
                Discover our handcrafted leather bags and find your perfect companion.
              </p>
              <Link to="/shop">
                <Button
                  className="px-10 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90"
                  style={{
                    backgroundColor: "#1A1A1A",
                    color: "#FAF8F5",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Navbar />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1
              className="text-3xl md:text-4xl font-light tracking-wide mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
            >
              Shopping Cart
            </h1>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.hex}`}
                    className="flex gap-6 pb-6"
                    style={{ borderBottom: index < items.length - 1 ? "1px solid #E8E4DF" : "none" }}
                  >
                    {/* Product Image */}
                    <div
                      className="w-28 h-36 md:w-36 md:h-44 flex-shrink-0 rounded overflow-hidden"
                      style={{ backgroundColor: "#E8E4DF" }}
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=400&fit=crop`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-xl font-light mb-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                        >
                          {item.product.name}
                        </h3>
                        <p
                          className="text-sm mb-2"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                        >
                          {item.product.category}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: item.selectedColor.hex, borderColor: "#D4C5B5" }}
                          />
                          <span
                            className="text-sm"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                          >
                            {item.selectedColor.name}
                          </span>
                        </div>
                        <p
                          className="text-lg font-light"
                          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                        >
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedColor.hex, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70 disabled:opacity-30"
                            style={{ border: "1px solid #D4C5B5" }}
                          >
                            <Minus size={14} style={{ color: "#1A1A1A" }} />
                          </button>
                          <span
                            className="w-8 text-center text-base"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedColor.hex, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-70"
                            style={{ border: "1px solid #D4C5B5" }}
                          >
                            <Plus size={14} style={{ color: "#1A1A1A" }} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.selectedColor.hex)}
                          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#999" }}
                        >
                          <Trash2 size={16} />
                          <span className="hidden md:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="sticky top-32 p-6"
                style={{ backgroundColor: "#F5F2EF" }}
              >
                <h2
                  className="text-xl font-light mb-6 tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                >
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#8B7355" }}
                      />
                      <Input
                        type="text"
                        placeholder="Promo code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="pl-10 h-11 rounded-none border bg-transparent focus-visible:ring-0"
                        style={{
                          borderColor: "#D4C5B5",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "15px",
                        }}
                      />
                    </div>
                    <Button
                      onClick={handleApplyPromo}
                      className="h-11 px-5 rounded-none text-[12px] uppercase tracking-[0.1em] transition-all duration-300"
                      style={{
                        backgroundColor: "transparent",
                        color: "#1A1A1A",
                        border: "1px solid #1A1A1A",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoMessage && (
                    <p
                      className="mt-2 text-sm"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: appliedPromo ? "#4A6741" : "#C45C5C",
                      }}
                    >
                      {promoMessage}
                    </p>
                  )}
                  {appliedPromo && (
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className="text-sm px-3 py-1"
                        style={{
                          backgroundColor: "#E8E4DF",
                          fontFamily: "'Montserrat', sans-serif",
                          color: "#4A6741",
                        }}
                      >
                        {appliedPromo.code}
                      </span>
                      <button
                        onClick={removePromoCode}
                        className="text-sm transition-opacity hover:opacity-70"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#999" }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Summary Lines */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span
                        className="text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A6741" }}
                      >
                        Discount ({appliedPromo?.value}% off)
                      </span>
                      <span
                        className="text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A6741" }}
                      >
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                    >
                      Shipping
                    </span>
                    <span
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                    >
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="flex justify-between pt-4 mb-6"
                  style={{ borderTop: "1px solid #D4C5B5" }}
                >
                  <span
                    className="text-lg font-medium"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Link to="/checkout">
                  <Button
                    className="w-full py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90"
                    style={{
                      backgroundColor: "#1A1A1A",
                      color: "#FAF8F5",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Free Shipping Note */}
                {subtotal < 5000 && (
                  <p
                    className="mt-4 text-center text-sm"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#8B7355" }}
                  >
                    Add {formatPrice(5000 - subtotal)} more for free shipping
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
