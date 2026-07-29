import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ratingDistribution = [
  { stars: 5, percentage: 72, count: 89 },
  { stars: 4, percentage: 18, count: 22 },
  { stars: 3, percentage: 6, count: 8 },
  { stars: 2, percentage: 3, count: 4 },
  { stars: 1, percentage: 1, count: 1 },
];

const topReviews = [
  {
    rating: 5,
    title: "Exceptional Quality",
    content: "The craftsmanship is outstanding. Every stitch is perfect and the leather has such a beautiful texture. Worth every penny.",
    author: "Priya M.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    rating: 5,
    title: "Perfect Everyday Bag",
    content: "Finally found a bag that's both stylish and practical. The size is perfect for my daily essentials and it's incredibly well-made.",
    author: "Ananya R.",
    date: "1 month ago",
    verified: true,
  },
];

const moreReviews = [
  {
    rating: 5,
    title: "Beautifully Made",
    content: "The leather feels rich and the finish is flawless. It has quickly become the bag I reach for every day.",
    author: "Meera S.",
    date: "1 month ago",
    verified: true,
  },
  {
    rating: 4,
    title: "Elegant and Roomy",
    content: "Holds far more than it looks like it would. The gold hardware is a lovely touch.",
    author: "Sanya K.",
    date: "2 months ago",
    verified: true,
  },
  {
    rating: 5,
    title: "Worth the Wait",
    content: "Packaging, craft, detail — everything felt considered. Genuinely a keepsake piece.",
    author: "Ritika D.",
    date: "3 months ago",
    verified: true,
  },
];

const ProductReviewsCompact = () => {
  const [showAll, setShowAll] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error("Please add your name and a few words about the bag.");
      return;
    }
    setReviewOpen(false);
    setName("");
    setTitle("");
    setContent("");
    setRating(5);
    toast.success("Thank you — your review has been submitted for approval.");
  };

  const averageRating = 4.8;
  const totalReviews = 124;
  const visibleReviews = showAll ? [...topReviews, ...moreReviews] : topReviews;

  const renderStars = (rating: number, size: number = 14) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={star <= rating ? "#C9A86C" : "transparent"}
            stroke={star <= rating ? "#C9A86C" : "#D4D0CB"}
            strokeWidth={1.5}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      className="w-full py-16 lg:py-20"
      style={{ backgroundColor: "#F8F6F3" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#C9A86C" }}
          >
            ✦ CUSTOMER REVIEWS ✦
          </p>
          <h2 
            className="font-serif text-[26px] lg:text-[32px] font-normal"
            style={{ color: "#2C2824" }}
          >
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Rating Summary */}
          <div className="lg:col-span-4">
            <div 
              className="p-6 lg:p-8"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF" }}
            >
              {/* Overall Rating */}
              <div className="text-center mb-6 pb-6" style={{ borderBottom: "1px solid #E8E4DF" }}>
                <p 
                  className="font-serif text-[48px] lg:text-[56px] font-normal leading-none mb-2"
                  style={{ color: "#2C2824" }}
                >
                  {averageRating}
                </p>
                <div className="flex justify-center mb-2">
                  {renderStars(5, 18)}
                </div>
                <p 
                  className="font-sans text-[12px] tracking-[0.05em]"
                  style={{ color: "#7A7570" }}
                >
                  Based on {totalReviews} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span 
                      className="font-sans text-[12px] w-3"
                      style={{ color: "#3D3530" }}
                    >
                      {item.stars}
                    </span>
                    <Star size={12} fill="#C9A86C" stroke="#C9A86C" />
                    <div 
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "#EEEBE6" }}
                    >
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: "#C9A86C"
                        }}
                      />
                    </div>
                    <span 
                      className="font-sans text-[11px] w-8 text-right"
                      style={{ color: "#7A7570" }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Write Review CTA */}
              <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full mt-8 py-3 font-sans text-[11px] tracking-[0.15em] uppercase transition-all hover:opacity-90"
                    style={{
                      backgroundColor: "#2C2824",
                      color: "#FFFFFF"
                    }}
                  >
                    Write a Review
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[440px]" style={{ backgroundColor: "#FDFCFA" }}>
                  <DialogHeader>
                    <DialogTitle className="font-serif text-[22px] font-normal" style={{ color: "#2C2824" }}>
                      Write a Review
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            size={22}
                            fill={star <= rating ? "#C9A86C" : "transparent"}
                            stroke={star <= rating ? "#C9A86C" : "#D4D0CB"}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      aria-label="Your name"
                      className="w-full px-3 py-2 font-sans text-[13px] bg-transparent outline-none"
                      style={{ border: "1px solid #E8E4DF", color: "#2C2824" }}
                    />
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Review title"
                      aria-label="Review title"
                      className="w-full px-3 py-2 font-sans text-[13px] bg-transparent outline-none"
                      style={{ border: "1px solid #E8E4DF", color: "#2C2824" }}
                    />
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Tell us about your bag"
                      aria-label="Your review"
                      rows={4}
                      className="w-full px-3 py-2 font-sans text-[13px] bg-transparent outline-none resize-none"
                      style={{ border: "1px solid #E8E4DF", color: "#2C2824" }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 font-sans text-[11px] tracking-[0.15em] uppercase transition-all hover:opacity-90"
                      style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                    >
                      Submit Review
                    </button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Right - Top Reviews */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {visibleReviews.map((review, index) => (
                <div 
                  key={index}
                  className="p-6"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {renderStars(review.rating)}
                      <h4 
                        className="font-serif text-[16px] font-normal mt-2"
                        style={{ color: "#2C2824" }}
                      >
                        {review.title}
                      </h4>
                    </div>
                    {review.verified && (
                      <span 
                        className="px-2 py-1 font-sans text-[9px] tracking-[0.1em] uppercase"
                        style={{ backgroundColor: "#E8F5E8", color: "#2D7D32" }}
                      >
                        Verified
                      </span>
                    )}
                  </div>
                  <p 
                    className="font-serif text-[14px] font-light leading-relaxed mb-4"
                    style={{ color: "#5A5550" }}
                  >
                    {review.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <p 
                      className="font-sans text-[12px]"
                      style={{ color: "#7A7570" }}
                    >
                      {review.author} · {review.date}
                    </p>
                    <button 
                      className="font-sans text-[11px] tracking-[0.05em]"
                      style={{ color: "#7A7570" }}
                    >
                      Helpful (12)
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Reviews Link */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="font-sans text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-70"
                style={{ color: "#3D3530", borderBottom: "1px solid #3D3530" }}
              >
                {showAll ? "Show Fewer Reviews" : "View All Reviews"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReviewsCompact;
