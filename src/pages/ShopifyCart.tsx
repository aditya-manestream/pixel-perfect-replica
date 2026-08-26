import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, Tag, X, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { trackInitiateCheckout, PixelLine } from "@/lib/pixel";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface CheckoutDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}

const EMPTY_DETAILS: CheckoutDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

const DETAILS_KEY = "ardori_checkout_details";

function validateDetails(d: CheckoutDetails): Partial<Record<keyof CheckoutDetails, string>> {
  const e: Partial<Record<keyof CheckoutDetails, string>> = {};
  if (!d.firstName.trim()) e.firstName = "Required";
  if (!d.lastName.trim()) e.lastName = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter a valid email";
  if (!/^\d{10}$/.test(d.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit number";
  if (!d.address1.trim()) e.address1 = "Required";
  if (!d.city.trim()) e.city = "Required";
  if (!d.state.trim()) e.state = "Required";
  if (!/^\d{6}$/.test(d.pincode.trim())) e.pincode = "Enter a 6-digit PIN code";
  return e;
}


const ShopifyCart = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getDiscount,
    getShipping,
    getTotal,
    getItemCount,
    appliedPromoCode,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    clearCart,
    isLoading,
  } = useCartStore();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [payLoading, setPayLoading] = useState(false);

  // Shipping details are required so the paid order can be pushed into Shopify
  // (and from there picked up by Shiprocket) with a real delivery address.
  const [details, setDetails] = useState<CheckoutDetails>(() => {
    try {
      const saved = localStorage.getItem(DETAILS_KEY);
      if (saved) return { ...EMPTY_DETAILS, ...JSON.parse(saved) };
    } catch { /* ignore corrupt storage */ }
    return EMPTY_DETAILS;
  });
  const [touched, setTouched] = useState(false);

  const errors = validateDetails(details);
  const detailsValid = Object.keys(errors).length === 0;

  const setField = (key: keyof CheckoutDetails, value: string) => {
    setDetails((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(DETAILS_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  };

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
    }
  };


  const handleCheckout = async () => {
    setTouched(true);
    if (!detailsValid) {
      toast({
        title: "Shipping details needed",
        description: "Please complete your delivery details before paying.",
        variant: "destructive",
      });
      document.getElementById("shipping-details")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const totalRupees = getTotal();
    const amountPaise = Math.round(totalRupees * 100);
    if (amountPaise < 100) {
      toast({ title: "Cart total too low", description: "Minimum order is ₹1.", variant: "destructive" });
      return;
    }

    const pixelLines: PixelLine[] = items.map((item) => ({
      id: item.variantId,
      name: item.product.node.title,
      quantity: item.quantity,
      price: parseFloat(item.price.amount),
    }));

    // Sent to the server so the verified payment can be mirrored as a real
    // Shopify order (inventory, analytics and Shiprocket pickup).
    const orderLines = items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
      price: parseFloat(item.price.amount),
    }));

    setPayLoading(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Failed to load payment gateway");

      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: amountPaise, currency: "INR", receipt: `ardori_${Date.now()}` },
      });
      if (error || !data?.order_id) throw new Error(error?.message || "Could not create order");

      const rzp = new window.Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: "Ardori",
        description: `Order of ${itemCount} item(s)`,
        theme: { color: "#121B2D" },
        prefill: {
          name: `${details.firstName} ${details.lastName}`.trim(),
          email: details.email,
          contact: details.phone,
        },
        handler: async (response: any) => {
          try {
            const { data: verify, error: verr } = await supabase.functions.invoke(
              "verify-razorpay-payment",
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  customer: details,
                  lines: orderLines,
                  totals: {
                    subtotal: getSubtotal(),
                    discount: getDiscount(),
                    shipping: getShipping(),
                    total: totalRupees,
                    promoCode: appliedPromoCode,
                  },
                },
              }
            );
            if (verr || !verify?.verified) {
              toast({ title: "Payment verification failed", description: "Please contact support.", variant: "destructive" });
              return;
            }
            toast({ title: "Payment successful", description: `Payment ID: ${verify.payment_id}` });
            clearCart();
            navigate("/order-confirmation", {
              state: {
                paymentId: verify.payment_id,
                orderId: verify.order_id,
                shopifyOrderName: verify.shopify_order_name,
                value: totalRupees,
                lines: pixelLines,
              },
            });
          } catch (e: any) {
            toast({ title: "Verification error", description: e.message, variant: "destructive" });
          }
        },

        modal: {
          ondismiss: () => {
            toast({ title: "Payment cancelled" });
          },
        },
      });

      rzp.on("payment.failed", (resp: any) => {
        toast({ title: "Payment failed", description: resp.error?.description || "Try again.", variant: "destructive" });
      });

      rzp.open();
      trackInitiateCheckout(pixelLines, totalRupees);
    } catch (e: any) {
      toast({ title: "Checkout error", description: e.message, variant: "destructive" });
    } finally {
      setPayLoading(false);
    }
  };

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
        <Navbar />
        <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
          <div className="max-w-[600px] mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center"
                style={{ backgroundColor: "#F8F6F3" }}
              >
                <ShoppingBag size={40} strokeWidth={1} style={{ color: "#9A958F" }} />
              </div>
              <h1 
                className="font-serif text-[28px] lg:text-[36px] font-normal mb-4"
                style={{ color: "#2C2824" }}
              >
                Your Cart is Empty
              </h1>
              <p 
                className="font-serif text-[15px] lg:text-[17px] font-light leading-relaxed mb-8"
                style={{ color: "#6A655F" }}
              >
                Discover our collection of handcrafted luxury bags, each inspired by India's natural heritage.
              </p>
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
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
      <Navbar />

      <div className="pt-20 lg:pt-24 pb-16 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div 
            className="mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.1em] uppercase mb-6 transition-opacity hover:opacity-70"
              style={{ color: "#7A7570" }}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Continue Shopping
            </Link>
            <h1 
              className="font-serif font-normal"
              style={{ color: "#2C2824", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Shopping Cart ({itemCount})
            </h1>
          </motion.div>

          {/* Cart Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Cart Items */}
            <motion.div 
              className="lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="space-y-0">
                {items.map((item, index) => {
                  const image = item.product.node.images?.edges?.[0]?.node;
                  const variantInfo = item.selectedOptions.map(opt => opt.value).join(' / ');
                  
                  return (
                    <div
                      key={item.variantId}
                      className="flex gap-4 lg:gap-6 py-6"
                      style={{ 
                        borderBottom: index < items.length - 1 ? "1px solid #E8E4DF" : "none" 
                      }}
                    >
                      {/* Product Image */}
                      <Link 
                        to={`/product/${item.product.node.handle}`}
                        className="w-24 h-28 lg:w-28 lg:h-32 flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: "#EEEBE6" }}
                      >
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag size={24} strokeWidth={1} style={{ color: "#9A958F" }} />
                          </div>
                        )}
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.product.node.handle}`}
                          className="block mb-1"
                        >
                          <h3 
                            className="font-serif text-[16px] lg:text-[18px] font-normal truncate transition-opacity hover:opacity-70"
                            style={{ color: "#2C2824" }}
                          >
                            {item.product.node.title}
                          </h3>
                        </Link>
                        
                        {variantInfo && variantInfo !== "Default Title" && (
                          <p 
                            className="font-sans text-[12px] tracking-[0.05em] mb-2"
                            style={{ color: "#7A7570" }}
                          >
                            {variantInfo}
                          </p>
                        )}

                        <p 
                          className="font-serif text-[16px] font-normal mb-4"
                          style={{ color: "#2C2824" }}
                        >
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>

                        {/* Quantity & Remove */}
                        <div className="flex items-center gap-4">
                          <div 
                            className="inline-flex items-center"
                            style={{ border: "1px solid #E8E4DF" }}
                          >
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-9 h-9 flex items-center justify-center transition-colors hover:bg-gray-50"
                              style={{ color: "#3D3530" }}
                            >
                              <Minus size={14} strokeWidth={1.5} />
                            </button>
                            <span 
                              className="w-10 h-9 flex items-center justify-center font-sans text-[14px]"
                              style={{ color: "#2C2824", borderLeft: "1px solid #E8E4DF", borderRight: "1px solid #E8E4DF" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-9 h-9 flex items-center justify-center transition-colors hover:bg-gray-50"
                              style={{ color: "#3D3530" }}
                            >
                              <Plus size={14} strokeWidth={1.5} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.1em] uppercase transition-opacity hover:opacity-70"
                            style={{ color: "#9A958F" }}
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div 
              className="lg:col-span-5"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div 
                className="p-6 lg:p-8 lg:sticky lg:top-24"
                style={{ backgroundColor: "#F8F6F3", border: "1px solid #E8E4DF" }}
              >
                <h2 
                  className="font-serif text-[20px] lg:text-[22px] font-normal mb-6"
                  style={{ color: "#2C2824" }}
                >
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag 
                        size={16} 
                        strokeWidth={1.5} 
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#9A958F" }}
                      />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code"
                        className="w-full pl-10 pr-4 py-3 font-sans text-[13px] transition-all focus:outline-none"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E0DCD6",
                          color: "#2C2824",
                        }}
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 font-sans text-[11px] tracking-[0.15em] uppercase transition-all hover:opacity-90"
                      style={{
                        backgroundColor: "#2C2824",
                        color: "#FFFFFF",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  
                  {promoMessage && (
                    <p 
                      className="mt-2 font-sans text-[12px]"
                      style={{ color: appliedPromoCode ? "#4CAF50" : "#E57373" }}
                    >
                      {promoMessage}
                    </p>
                  )}

                  {appliedPromoCode && (
                    <div 
                      className="mt-3 inline-flex items-center gap-2 px-3 py-1.5"
                      style={{ backgroundColor: "#E8F5E9" }}
                    >
                      <span className="font-sans text-[11px] tracking-[0.05em] uppercase" style={{ color: "#4CAF50" }}>
                        {appliedPromoCode}
                      </span>
                      <button
                        onClick={removePromoCode}
                        className="transition-opacity hover:opacity-70"
                      >
                        <X size={14} style={{ color: "#4CAF50" }} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Summary Lines */}
                <div className="space-y-3 mb-6" style={{ borderTop: "1px solid #E0DCD6", paddingTop: "24px" }}>
                  <div className="flex justify-between">
                    <span className="font-sans text-[13px]" style={{ color: "#6A655F" }}>Subtotal</span>
                    <span className="font-sans text-[14px]" style={{ color: "#2C2824" }}>
                      {formatPrice(subtotal.toString())}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="font-sans text-[13px]" style={{ color: "#4CAF50" }}>Discount</span>
                      <span className="font-sans text-[14px]" style={{ color: "#4CAF50" }}>
                        -{formatPrice(discount.toString())}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="font-sans text-[13px]" style={{ color: "#6A655F" }}>Shipping</span>
                    <span className="font-sans text-[14px]" style={{ color: "#2C2824" }}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping.toString())}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div 
                  className="flex justify-between items-center py-4 mb-6"
                  style={{ borderTop: "1px solid #D0CBC4", borderBottom: "1px solid #D0CBC4" }}
                >
                  <span className="font-serif text-[18px] font-normal" style={{ color: "#2C2824" }}>Total</span>
                  <span className="font-serif text-[22px] font-normal" style={{ color: "#2C2824" }}>
                    {formatPrice(total.toString())}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={payLoading}
                  className="w-full font-sans text-[12px] lg:text-[13px] tracking-[0.15em] uppercase transition-all hover:opacity-90 disabled:opacity-60"
                  style={{
                    backgroundColor: "#2C2824",
                    color: "#FFFFFF",
                    padding: "16px 24px",
                  }}
                >
                  {payLoading ? "Processing..." : "Pay with Razorpay"}
                </button>

                {/* Free Shipping Note */}
                {subtotal < 5000 && (
                  <p 
                    className="mt-4 font-serif text-[12px] lg:text-[13px] font-light text-center"
                    style={{ color: "#7A7570" }}
                  >
                    Add {formatPrice((5000 - subtotal).toString())} more for free shipping
                  </p>
                )}

                <p 
                  className="mt-4 font-sans text-[11px] text-center"
                  style={{ color: "#9A958F" }}
                >
                  Secure checkout powered by Razorpay
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopifyCart;
