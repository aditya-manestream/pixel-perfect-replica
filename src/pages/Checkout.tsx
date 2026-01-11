import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Check, Lock, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const serviceablePincodes = ["400001", "400002", "400003", "400004", "400005", "400050", "400051", "400053", "400054", "400055", "400056", "400057", "400058", "400059", "400060", "400061", "400062", "400063", "400064", "400065", "400066", "400067", "400068", "400069", "400070", "400071", "400072", "400073", "400074", "400075", "400076", "400077", "400078", "400079", "400080", "400081", "400082", "400083", "400084", "400085", "400086", "400087", "400088", "400089", "400090", "400091", "400092", "400093", "400094", "400095", "400096", "400097", "400098", "400099", "400100", "110001", "110002", "110003", "110004", "110005", "110006", "110007", "110008", "110009", "110010", "560001", "560002", "560003", "560004", "560005", "500001", "500002", "500003", "500004", "500005", "600001", "600002", "600003", "600004", "600005"];

interface ShippingData {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}

interface OrderData {
  orderNumber: string;
  shippingAddress: ShippingData;
  paymentMethod: string;
  estimatedDelivery: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, shipping, total, appliedPromo, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileOrderSummaryOpen, setMobileOrderSummaryOpen] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<"checking" | "available" | "unavailable" | null>(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      checkPincode(value);
    } else if (name === "pincode") {
      setPincodeStatus(null);
      setEstimatedDelivery("");
    }
  };

  const checkPincode = (pincode: string) => {
    setPincodeStatus("checking");
    setTimeout(() => {
      if (serviceablePincodes.includes(pincode)) {
        setPincodeStatus("available");
        const deliveryDays = Math.floor(Math.random() * 5) + 3;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
        const endDate = new Date(deliveryDate);
        endDate.setDate(endDate.getDate() + 3);
        setEstimatedDelivery(
          `${deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} - ${endDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
        );
      } else {
        setPincodeStatus("unavailable");
        setEstimatedDelivery("");
      }
    }, 500);
  };

  const isShippingValid = () => {
    return (
      shippingData.fullName.trim() &&
      shippingData.email.trim() &&
      shippingData.phone.trim() &&
      shippingData.address1.trim() &&
      shippingData.city.trim() &&
      shippingData.state.trim() &&
      shippingData.pincode.trim().length === 6 &&
      pincodeStatus === "available"
    );
  };

  const handleContinueToPayment = () => {
    if (isShippingValid()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePayNow = () => {
    const orderNumber = `ARD${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    setOrderData({
      orderNumber,
      shippingAddress: shippingData,
      paymentMethod,
      estimatedDelivery,
    });
    
    localStorage.setItem("ardori-has-purchased", "true");
    clearCart();
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (items.length === 0 && currentStep !== 3) {
    navigate("/cart");
    return null;
  }

  const steps = [
    { number: 1, label: "Shipping" },
    { number: 2, label: "Payment" },
    { number: 3, label: "Confirmation" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Navbar />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Step Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentStep > step.number
                          ? "bg-[#4A6741]"
                          : currentStep === step.number
                          ? "bg-[#1A1A1A]"
                          : "bg-transparent"
                      }`}
                      style={{
                        border: currentStep >= step.number ? "none" : "1px solid #D4C5B5",
                      }}
                    >
                      {currentStep > step.number ? (
                        <Check size={18} color="#FAF8F5" />
                      ) : (
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: currentStep === step.number ? "#FAF8F5" : "#999",
                          }}
                        >
                          {step.number}
                        </span>
                      )}
                    </div>
                    <span
                      className="mt-2 text-xs uppercase tracking-[0.1em]"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: currentStep >= step.number ? "#1A1A1A" : "#999",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-12 md:w-24 h-px mx-4"
                      style={{
                        backgroundColor: currentStep > step.number ? "#4A6741" : "#D4C5B5",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {currentStep < 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form Area */}
              <div className="lg:col-span-2">
                {/* Step 1: Shipping */}
                {currentStep === 1 && (
                  <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                    <h2
                      className="text-2xl font-light mb-8 tracking-wide"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                    >
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label
                          htmlFor="fullName"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          Full Name <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={shippingData.fullName}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          Email <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingData.email}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          Phone Number <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label
                          htmlFor="address1"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          Address Line 1 <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="address1"
                          name="address1"
                          value={shippingData.address1}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label
                          htmlFor="address2"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          Address Line 2
                        </Label>
                        <Input
                          id="address2"
                          name="address2"
                          value={shippingData.address2}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="city"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          City <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="state"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          State <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="pincode"
                          className="text-xs uppercase tracking-[0.15em] mb-2 block"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                        >
                          Pincode <span style={{ color: "#8B7355" }}>*</span>
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          maxLength={6}
                          value={shippingData.pincode}
                          onChange={handleShippingChange}
                          className="h-12 rounded-none border bg-transparent focus-visible:ring-0"
                          style={{
                            borderColor: "#D4C5B5",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                          }}
                        />
                        {pincodeStatus === "checking" && (
                          <p className="mt-2 text-sm" style={{ color: "#8B7355" }}>
                            Checking availability...
                          </p>
                        )}
                        {pincodeStatus === "available" && (
                          <div className="mt-2">
                            <p className="text-sm" style={{ color: "#4A6741" }}>
                              ✓ Delivery available
                            </p>
                            <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>
                              Estimated delivery: {estimatedDelivery}
                            </p>
                          </div>
                        )}
                        {pincodeStatus === "unavailable" && (
                          <p className="mt-2 text-sm" style={{ color: "#C45C5C" }}>
                            Pincode not serviceable. Please contact customer care for alternatives.
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleContinueToPayment}
                      disabled={!isShippingValid()}
                      className="mt-10 px-10 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90 disabled:opacity-50"
                      style={{
                        backgroundColor: "#1A1A1A",
                        color: "#FAF8F5",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Continue to Payment
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                    <div className="flex items-center gap-2 mb-8">
                      <Lock size={18} style={{ color: "#4A6741" }} />
                      <h2
                        className="text-2xl font-light tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        Secure Payment
                      </h2>
                    </div>

                    <p
                      className="mb-8 text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                    >
                      All transactions are secured with SSL encryption.
                    </p>

                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div
                        className="flex items-center p-4 cursor-pointer transition-all"
                        style={{
                          border: paymentMethod === "card" ? "1px solid #1A1A1A" : "1px solid #D4C5B5",
                          backgroundColor: paymentMethod === "card" ? "#F5F2EF" : "transparent",
                        }}
                      >
                        <RadioGroupItem value="card" id="card" className="mr-4" />
                        <Label
                          htmlFor="card"
                          className="text-base cursor-pointer flex-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                        >
                          Credit / Debit Card
                        </Label>
                      </div>

                      <div
                        className="flex items-center p-4 cursor-pointer transition-all"
                        style={{
                          border: paymentMethod === "upi" ? "1px solid #1A1A1A" : "1px solid #D4C5B5",
                          backgroundColor: paymentMethod === "upi" ? "#F5F2EF" : "transparent",
                        }}
                      >
                        <RadioGroupItem value="upi" id="upi" className="mr-4" />
                        <Label
                          htmlFor="upi"
                          className="text-base cursor-pointer flex-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                        >
                          UPI
                        </Label>
                      </div>

                      <div
                        className="flex items-center p-4 cursor-pointer transition-all"
                        style={{
                          border: paymentMethod === "netbanking" ? "1px solid #1A1A1A" : "1px solid #D4C5B5",
                          backgroundColor: paymentMethod === "netbanking" ? "#F5F2EF" : "transparent",
                        }}
                      >
                        <RadioGroupItem value="netbanking" id="netbanking" className="mr-4" />
                        <Label
                          htmlFor="netbanking"
                          className="text-base cursor-pointer flex-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                        >
                          Net Banking
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="flex gap-4 mt-10">
                      <Button
                        onClick={() => setCurrentStep(1)}
                        className="px-8 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300"
                        style={{
                          backgroundColor: "transparent",
                          color: "#1A1A1A",
                          border: "1px solid #1A1A1A",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePayNow}
                        className="px-10 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90"
                        style={{
                          backgroundColor: "#1A1A1A",
                          color: "#FAF8F5",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        Pay {formatPrice(total)}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                {/* Mobile Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setMobileOrderSummaryOpen(!mobileOrderSummaryOpen)}
                    className="w-full flex items-center justify-between p-4"
                    style={{ backgroundColor: "#F5F2EF" }}
                  >
                    <span
                      className="text-sm uppercase tracking-[0.15em]"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: "#1A1A1A" }}
                    >
                      Order Summary ({items.length} items)
                    </span>
                    {mobileOrderSummaryOpen ? (
                      <ChevronUp size={18} style={{ color: "#8B7355" }} />
                    ) : (
                      <ChevronDown size={18} style={{ color: "#8B7355" }} />
                    )}
                  </button>
                </div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className={`sticky top-32 p-6 ${mobileOrderSummaryOpen ? "block" : "hidden lg:block"}`}
                  style={{ backgroundColor: "#F5F2EF" }}
                >
                  <h3
                    className="text-xl font-light mb-6 tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                  >
                    Order Summary
                  </h3>

                  {/* Items */}
                  <div className="space-y-4 mb-6 pb-6" style={{ borderBottom: "1px solid #E8E4DF" }}>
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor.hex}`} className="flex gap-4">
                        <div
                          className="w-16 h-20 flex-shrink-0 rounded overflow-hidden"
                          style={{ backgroundColor: "#E8E4DF" }}
                        >
                          <img
                            src={`https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=120&fit=crop`}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4
                            className="text-base font-light"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                          >
                            {item.product.name}
                          </h4>
                          <p
                            className="text-sm"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                          >
                            {item.selectedColor.name} × {item.quantity}
                          </p>
                          <p
                            className="text-sm mt-1"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                          >
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Lines */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}>
                        Subtotal
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A6741" }}>
                          Discount ({appliedPromo?.value}% off)
                        </span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A6741" }}>
                          -{formatPrice(discount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}>
                        Shipping
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between pt-4" style={{ borderTop: "1px solid #D4C5B5" }}>
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
                </motion.div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && orderData && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: "#4A6741" }}
              >
                <Check size={36} color="#FAF8F5" />
              </div>

              <h1
                className="text-3xl md:text-4xl font-light tracking-wide mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
              >
                Thank You for Your Order!
              </h1>

              <p
                className="text-lg mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
              >
                Your order has been placed successfully.
              </p>

              <p
                className="text-base mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
              >
                Order Number: <strong>{orderData.orderNumber}</strong>
              </p>

              <div
                className="p-6 mb-8 text-left"
                style={{ backgroundColor: "#F5F2EF" }}
              >
                <h3
                  className="text-lg font-light mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                >
                  Shipping Address
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", lineHeight: "1.7" }}>
                  {orderData.shippingAddress.fullName}<br />
                  {orderData.shippingAddress.address1}<br />
                  {orderData.shippingAddress.address2 && <>{orderData.shippingAddress.address2}<br /></>}
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}
                </p>

                <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E8E4DF" }}>
                  <h3
                    className="text-lg font-light mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                  >
                    Estimated Delivery
                  </h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A" }}>
                    {orderData.estimatedDelivery}
                  </p>
                </div>

                <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E8E4DF" }}>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                  >
                    You will receive a confirmation email at{" "}
                    <span style={{ color: "#8B7355" }}>{orderData.shippingAddress.email}</span> with tracking
                    information once your order ships.
                  </p>
                </div>
              </div>

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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
