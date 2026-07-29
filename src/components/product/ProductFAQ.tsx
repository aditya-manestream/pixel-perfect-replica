import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqItems = [
  {
    question: "How long does shipping take?",
    answer: "We ship across India within 5–8 business days. Once dispatched, you'll receive a tracking link via email and SMS to monitor your order."
  },
  {
    question: "What is your return/exchange policy?",
    answer: "We offer a 7-day return and exchange window from delivery. Items must be unused, in original packaging with all tags attached."
  },
  {
    question: "What does the warranty cover?",
    answer: "All Ardori products come with an 8-month warranty covering manufacturing defects in materials and workmanship. Normal wear and tear, misuse, or damage from improper care are not covered."
  },
  {
    question: "How should I care for my leather bag?",
    answer: "Store in the provided dust bag when not in use. Keep away from direct sunlight and water. Clean with a soft dry cloth and condition the leather every 3-6 months for best longevity."
  }
];

const ProductFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="w-full py-16 lg:py-20"
      style={{ backgroundColor: "#FDFCFA" }}
    >
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#C9A86C" }}
          >
            ✦ HAVE QUESTIONS? ✦
          </p>
          <h2 
            className="font-serif text-[26px] lg:text-[32px] font-normal"
            style={{ color: "#2C2824" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              style={{ borderBottom: "1px solid #E8E4DF" }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <h3 
                  className="font-serif text-[16px] lg:text-[18px] font-normal pr-4"
                  style={{ color: "#2C2824" }}
                >
                  {item.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} className="flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} className="flex-shrink-0" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 pb-5" : "max-h-0"
                }`}
              >
                <p 
                  className="font-serif text-[14px] lg:text-[15px] font-light leading-relaxed"
                  style={{ color: "#5A5550" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFAQ;
