import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Send, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    subject: "",
    message: ""
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (value: string) => {
    setFormData({ ...formData, subject: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, uploadedImage);
    // Handle form submission
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", newsletterEmail);
    setNewsletterEmail("");
  };

  const quickLinks = [
    { label: "Track Your Order", href: "#" },
    { label: "Return & Exchange Policy", href: "/returns" },
    { label: "Shipping Information", href: "/shipping" },
    { label: "FAQs", href: "#" },
    { label: "Handbag Care Guide", href: "/handbag-care" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative py-24 md:py-32 lg:py-40 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a2a3a 0%, #0d1821 50%, #1a2a3a 100%)",
        }}
      >
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${philosophyPattern})`,
            backgroundSize: "400px 400px",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            opacity: 0.4,
            mixBlendMode: "overlay"
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: "#C4A164"
            }}
          >
            ✦ SUPPORT ✦
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#FFFFFF"
            }}
          >
            We're Here to Help
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255, 255, 255, 0.65)"
            }}
          >
            Have questions? Get in touch with our customer care team
          </motion.p>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            
            {/* Left Column - Contact Info & Hours */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-12"
            >
              {/* Contact Information */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-light mb-8 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail size={20} strokeWidth={1.2} style={{ color: "#8B7355", marginTop: "2px" }} />
                    <div>
                      <p 
                        className="text-xs uppercase tracking-[0.15em] mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                      >
                        Email
                      </p>
                      <a 
                        href="mailto:ardori.work@gmail.com"
                        className="text-base transition-opacity hover:opacity-70"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        ardori.work@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone size={20} strokeWidth={1.2} style={{ color: "#8B7355", marginTop: "2px" }} />
                    <div>
                      <p 
                        className="text-xs uppercase tracking-[0.15em] mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                      >
                        WhatsApp
                      </p>
                      <p 
                        className="text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        +91 XXXXX XXXXX
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin size={20} strokeWidth={1.2} style={{ color: "#8B7355", marginTop: "2px" }} />
                    <div>
                      <p 
                        className="text-xs uppercase tracking-[0.15em] mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                      >
                        Location
                      </p>
                      <p 
                        className="text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        Mumbai, India<br />
                        <span className="text-sm opacity-70">(Full address coming soon)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-16 h-px" style={{ backgroundColor: "#D4C5B5" }} />

              {/* Business Hours */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-light mb-8 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Business Hours
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3" style={{ borderBottom: "1px solid #E8E4DF" }}>
                    <span 
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                    >
                      Monday – Saturday
                    </span>
                    <span 
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A" }}
                    >
                      10:00 AM – 6:00 PM IST
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3" style={{ borderBottom: "1px solid #E8E4DF" }}>
                    <span 
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                    >
                      Sunday
                    </span>
                    <span 
                      className="text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A" }}
                    >
                      Closed
                    </span>
                  </div>
                </div>
                <p 
                  className="text-sm mt-6 italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6B6B6B" }}
                >
                  We typically respond within 48–72 hours
                </p>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Premium Bordered Container */}
              <div 
                className="p-6 md:p-8 lg:p-10 rounded-sm"
                style={{ 
                  backgroundColor: "#FAF8F5", 
                  border: "1px solid #E8E4DF" 
                }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-light mb-8 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Name <span style={{ color: "#8B7355" }}>*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-2 bg-transparent"
                    style={{ 
                      borderColor: "#D4C5B5",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px"
                    }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="email"
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Email <span style={{ color: "#8B7355" }}>*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-2 bg-transparent"
                    style={{ 
                      borderColor: "#D4C5B5",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px"
                    }}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="phone"
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-2 bg-transparent"
                    style={{ 
                      borderColor: "#D4C5B5",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px"
                    }}
                  />
                </div>

                {/* Order Number */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="orderNumber"
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Order Number <span className="normal-case italic" style={{ color: "#999" }}>(if applicable)</span>
                  </Label>
                  <Input
                    id="orderNumber"
                    name="orderNumber"
                    type="text"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                    className="h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-2 bg-transparent"
                    style={{ 
                      borderColor: "#D4C5B5",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px"
                    }}
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label 
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Subject / Inquiry Type <span style={{ color: "#8B7355" }}>*</span>
                  </Label>
                  <Select onValueChange={handleSubjectChange} required>
                    <SelectTrigger 
                      className="h-12 rounded-none border-0 border-b focus:ring-0 bg-transparent"
                      style={{ 
                        borderColor: "#D4C5B5",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "16px"
                      }}
                    >
                      <SelectValue placeholder="Select an inquiry type" />
                    </SelectTrigger>
                    <SelectContent 
                      className="rounded-none z-50"
                      style={{ 
                        backgroundColor: "#FAF8F5",
                        fontFamily: "'Cormorant Garamond', serif"
                      }}
                    >
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order-status">Order Status</SelectItem>
                      <SelectItem value="product-question">Product Question</SelectItem>
                      <SelectItem value="returns">Returns / Exchange</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="message"
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Message <span style={{ color: "#8B7355" }}>*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-2 bg-transparent resize-none"
                    style={{ 
                      borderColor: "#D4C5B5",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px"
                    }}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label 
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#6B6B6B" }}
                  >
                    Upload Image <span className="normal-case italic" style={{ color: "#999" }}>(optional, for product issues)</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <label 
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-opacity hover:opacity-70"
                      style={{ 
                        border: "1px solid #D4C5B5",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        color: "#6B6B6B"
                      }}
                    >
                      <Upload size={14} strokeWidth={1.5} />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedImage && (
                      <div className="flex items-center gap-2" style={{ color: "#4A4A4A" }}>
                        <span 
                          className="text-sm truncate max-w-[150px]"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {uploadedImage.name}
                        </span>
                        <button 
                          type="button" 
                          onClick={removeImage}
                          className="transition-opacity hover:opacity-70"
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 rounded-none mt-8 transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: "#1A1A1A",
                    color: "#FAF8F5",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.2em"
                  }}
                >
                  <Send size={14} strokeWidth={1.5} className="mr-2" />
                  SEND MESSAGE
                </Button>
              </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section 
        className="py-16 md:py-20 px-6"
        style={{ backgroundColor: "#F5F2EE" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 
              className="text-2xl md:text-3xl font-light mb-10 tracking-wide"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1A1A1A"
              }}
            >
              Looking for something specific?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60 py-2"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#4A4A4A"
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 
              className="text-2xl md:text-3xl font-light mb-8 tracking-wide"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1A1A1A"
              }}
            >
              Connect with us
            </h2>
            <div className="flex items-center justify-center gap-8">
              <a
                href="https://instagram.com/ardori.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity hover:opacity-60"
                style={{ color: "#4A4A4A" }}
              >
                <Instagram size={22} strokeWidth={1.2} />
                <span 
                  className="text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Instagram
                </span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity hover:opacity-60"
                style={{ color: "#4A4A4A" }}
              >
                <Facebook size={22} strokeWidth={1.2} />
                <span 
                  className="text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Facebook
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        className="py-16 md:py-20 px-6"
        style={{ 
          backgroundColor: "#1A1A1A"
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 
              className="text-3xl md:text-4xl font-light mb-4 tracking-wide"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#FAF8F5"
              }}
            >
              Stay Updated.
            </h2>
            <p 
              className="text-base mb-10"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#A09A94"
              }}
            >
              Get exclusive access to new launches and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="h-12 flex-1 rounded-none border bg-transparent focus-visible:ring-0 focus-visible:border-white"
                style={{ 
                  borderColor: "#4A4A4A",
                  color: "#FAF8F5",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px"
                }}
              />
              <Button
                type="submit"
                className="h-12 px-8 rounded-none transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#C9A86C",
                  color: "#1A1A1A",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em"
                }}
              >
                SUBSCRIBE
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
