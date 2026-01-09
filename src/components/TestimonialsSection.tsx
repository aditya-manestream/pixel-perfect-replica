import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import promisePattern from "@/assets/promise-pattern.jpg";

const testimonials = [
  [
    {
      quote: "The craftsmanship is unlike anything I've owned. Every stitch tells a story of dedication and artistry.",
      name: "Ananya Sharma",
      location: "Mumbai, India",
    },
    {
      quote: "My Ardori tote has become my daily companion. The leather has developed the most beautiful patina over time.",
      name: "Priya Menon",
      location: "Bangalore, India",
    },
    {
      quote: "A gift that left my mother speechless. The unboxing experience alone was worth it — pure elegance.",
      name: "Kavitha Reddy",
      location: "Chennai, India",
    },
  ],
  [
    {
      quote: "I've never received so many compliments on a bag. It's art you carry with you.",
      name: "Meera Patel",
      location: "Ahmedabad, India",
    },
    {
      quote: "Sustainable, beautiful, and timeless. Ardori represents everything I value in craftsmanship.",
      name: "Deepika Nair",
      location: "Kochi, India",
    },
    {
      quote: "The attention to detail is extraordinary. You can feel the heritage in every piece.",
      name: "Shreya Iyer",
      location: "Pune, India",
    },
  ],
  [
    {
      quote: "From the packaging to the product, every touchpoint feels intentional and luxurious.",
      name: "Aishwarya Das",
      location: "Kolkata, India",
    },
    {
      quote: "My crossbody bag from Ardori is the perfect blend of tradition and modern elegance.",
      name: "Lakshmi Venkat",
      location: "Hyderabad, India",
    },
    {
      quote: "The vegetable-tanned leather ages so gracefully. It truly becomes more beautiful with time.",
      name: "Nandini Rao",
      location: "Delhi, India",
    },
  ],
];

const TestimonialsSection = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSet = useCallback(() => {
    setActiveSet((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSet = useCallback(() => {
    setActiveSet((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSet();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, nextSet]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSet();
      } else {
        prevSet();
      }
    }

    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${promisePattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <h2
            className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
            style={{ color: "#2C2824" }}
          >
            Loved by Those Who Carry Ardori
          </h2>
          <p
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[500px] mx-auto"
            style={{ color: "#7A7570" }}
          >
            Stories from those who have made Ardori a part of their journey
          </p>
        </div>

        {/* Testimonials */}
        <div
          className="relative min-h-[280px] lg:min-h-[220px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
            >
              {testimonials[activeSet].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group cursor-default"
                >
                  {/* Decorative Quote Mark */}
                  <div
                    className="font-serif text-[48px] lg:text-[56px] leading-none mb-4 select-none"
                    style={{ color: "#D5D0CA" }}
                  >
                    "
                  </div>

                  {/* Quote */}
                  <p
                    className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.8] mb-6 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "#5A5550", opacity: 0.9 }}
                  >
                    {testimonial.quote}
                  </p>

                  {/* Name */}
                  <p
                    className="font-sans text-[13px] lg:text-[14px] tracking-[0.1em] uppercase mb-1 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "#3A3530", opacity: 0.95 }}
                  >
                    {testimonial.name}
                  </p>

                  {/* Location */}
                  <p
                    className="font-sans text-[11px] lg:text-[12px] tracking-[0.05em]"
                    style={{ color: "#9A958F" }}
                  >
                    {testimonial.location}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSet(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === activeSet ? "#7A7570" : "#D5D0CA",
              }}
              aria-label={`View testimonial set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
