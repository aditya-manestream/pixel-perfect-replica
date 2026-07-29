import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Send, Upload, X, Eye, ArrowRight } from "lucide-react";
import instagram1 from "@/assets/instagram-reel-1.jpg";
import instagram2 from "@/assets/instagram-reel-2.jpeg";
import instagram3 from "@/assets/instagram-reel-3.jpg";
import instagram4 from "@/assets/instagram-reel-4.jpg";
import curatedDetail from "@/assets/curated-detail.jpg";
import curatedTote from "@/assets/curated-tote.jpg";
import storyLeatherTexture from "@/assets/story-leather-texture.jpg";
import productLotus1 from "@/assets/product-lotus-1.jpg";
import productLotus2 from "@/assets/product-lotus-2.jpg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";
import Seo from "@/components/Seo";

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
  const [sending, setSending] = useState(false);


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          orderNumber: formData.orderNumber.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
        },
      });
      if (error) throw error;
      toast.success("Thank you — we've emailed you a confirmation.");
      setFormData({ name: "", email: "", phone: "", orderNumber: "", subject: "", message: "" });
      setUploadedImage(null);
    } catch {
      toast.error("Your message couldn't be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };


  const quickLinks = [
    { label: "Track Your Order", href: "/track-order" },
    { label: "Return & Exchange Policy", href: "/returns" },
    { label: "Shipping Information", href: "/shipping" },
    { label: "FAQs", href: "/faqs" },
    { label: "Handbag Care Guide", href: "/handbag-care" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Seo
        title={"Contact Ardori — We're Here to Help"}
        description={"Questions about an order, sizing or leather care? Reach the Ardori customer care team at love@ardorilabel.com or send us a message."}
        path="/contact"
      />
      <Navbar />
      
      {/* Hero Section - Navy Pattern Background (Prominent) */}
      <section 
        className="relative py-24 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden"
        data-dark-section
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${navyPatternBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
              color: "#C9A86C"
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
              color: "rgba(255, 255, 255, 0.75)"
            }}
          >
            Have questions? Get in touch with our customer care team
          </motion.p>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Contact Info & Hours */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-10"
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
                        href="mailto:love@ardorilabel.com"
                        className="text-base transition-opacity hover:opacity-70"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        love@ardorilabel.com
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
                      <a
                        href="https://wa.me/919702304058"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base transition-opacity hover:opacity-70"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        +91 97023 04058
                      </a>
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
                        Mumbai/Thane
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

              {/* Social Media */}
              <div>
                <h3 
                  className="text-xl font-light mb-6 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Connect with us
                </h3>
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.instagram.com/ardoridesigns/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-opacity hover:opacity-60"
                    style={{ color: "#4A4A4A" }}
                  >
                    <Instagram size={20} strokeWidth={1.2} />
                    <span 
                      className="text-xs tracking-[0.12em] uppercase"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Instagram
                    </span>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61588155480760"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-opacity hover:opacity-60"
                    style={{ color: "#4A4A4A" }}
                  >
                    <Facebook size={20} strokeWidth={1.2} />
                    <span 
                      className="text-xs tracking-[0.12em] uppercase"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Facebook
                    </span>
                  </a>
                </div>
              </div>

              {/* Instagram Gallery Grid */}
              <div className="mt-10">
                <h3 
                  className="text-xl font-light mb-6 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Follow Our Journey
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { src: instagram1, link: "https://www.instagram.com/p/DTvJdD6DCjj/" },
                    { src: instagram2, link: "https://www.instagram.com/p/DUlMGHnDI38/?img_index=1" },
                    { src: instagram3, link: "https://www.instagram.com/p/DVlcC18k9pN/" },
                  ].map((image, index) => (
                    <a
                      key={index}
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer block"
                    >
                      <img
                        src={image.src}
                        alt={`Instagram ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Eye size={24} className="text-white" strokeWidth={1.5} />
                      </div>
                    </a>
                  ))}
                </div>
                <a 
                  href="https://www.instagram.com/ardoridesigns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                >
                  <Instagram size={16} strokeWidth={1.2} />
                  @ardoridesigns
                  <ArrowRight size={14} strokeWidth={1.2} />
                </a>
              </div>
            </motion.div>

            {/* Right Column - Contact Form (Card Panel) */}
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
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid #E8E4DF",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
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
                
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      rows={4}
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
                      Upload Image
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
                    disabled={sending}
                    className="w-full h-14 rounded-none mt-6 transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                    style={{
                      backgroundColor: "#1A1A1A",
                      color: "#FAF8F5",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.2em"
                    }}
                  >
                    <Send size={14} strokeWidth={1.5} className="mr-2" />
                    {sending ? "SENDING…" : "SEND MESSAGE"}
                  </Button>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links Section - Navy Pattern Background */}
      <section 
        className="relative py-16 md:py-20 px-6 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${navyPatternBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Gold Divider */}
            <div 
              className="w-12 h-[1px] mx-auto mb-8"
              style={{ backgroundColor: "#C9A86C" }}
            />
            
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: "#C9A86C"
              }}
            >
              ✦ QUICK LINKS ✦
            </p>
            
            <h2 
              className="text-2xl md:text-3xl font-light mb-10 tracking-wide"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#FFFFFF"
              }}
            >
              Looking for something specific?
            </h2>
            
            {/* Gold Divider */}
            <div 
              className="w-12 h-[1px] mx-auto mb-10"
              style={{ backgroundColor: "#C9A86C" }}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60 py-2"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    color: "rgba(255,255,255,0.85)"
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;