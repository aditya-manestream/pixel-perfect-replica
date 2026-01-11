import { useState } from "react";
import { Star, ThumbsUp, ChevronDown } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  helpfulCount: number;
  author: string;
  location: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Absolutely exquisite craftsmanship",
    content: "The leather quality exceeded my expectations. You can tell this is made by artisans who truly care about their craft. The bag has a beautiful weight and structure to it. Already developing a gorgeous patina after just a few weeks of use.",
    helpfulCount: 24,
    author: "Priya M.",
    location: "Mumbai",
    date: "December 2024",
    verified: true,
  },
  {
    id: "2",
    rating: 5,
    title: "Perfect everyday companion",
    content: "I've been searching for a bag that balances elegance with practicality, and this is it. The interior is thoughtfully designed, and it fits everything I need without looking bulky. The color is exactly as shown in the photos.",
    helpfulCount: 18,
    author: "Ananya S.",
    location: "Bangalore",
    date: "November 2024",
    verified: true,
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

const CustomerReviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const averageRating = 4.8;
  const totalReviews = 47;

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
      className="w-full py-16 lg:py-24"
      style={{ backgroundColor: "#FDFCFA", borderTop: "1px solid #E8E4DF" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          {/* Eyebrow */}
          <p 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#7A7570" }}
          >
            ✦ CUSTOMER REVIEWS ✦
          </p>
          {/* Heading */}
          <h2 
            className="font-serif text-[28px] lg:text-[36px] font-normal"
            style={{ color: "#2C2824" }}
          >
            What Our Customers Say
          </h2>
        </div>

        {/* Rating Summary + Write Review Button */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 lg:mb-16">
          {/* Left: Rating Summary */}
          <div className="flex items-start gap-8 lg:gap-12">
            {/* Average Rating */}
            <div className="text-center">
              <p 
                className="font-serif text-[48px] lg:text-[56px] font-normal leading-none mb-2"
                style={{ color: "#2C2824" }}
              >
                {averageRating}
              </p>
              {renderStars(5, 16)}
              <p 
                className="font-sans text-[13px] mt-2"
                style={{ color: "#7A7570" }}
              >
                {totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="flex flex-col gap-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span 
                    className="font-sans text-[12px] w-10"
                    style={{ color: "#5A5550" }}
                  >
                    {item.stars} star
                  </span>
                  <div 
                    className="w-32 lg:w-40 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#E8E4DF" }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.percentage > 50 ? "#C9A86C" : "#D4D0CB"
                      }}
                    />
                  </div>
                  <span 
                    className="font-sans text-[12px] w-8"
                    style={{ color: "#7A7570" }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Write Review Button */}
          <button
            className="self-start px-8 py-4 font-sans text-[12px] tracking-[0.15em] uppercase transition-all hover:bg-gray-50"
            style={{ 
              border: "1px solid #2C2824",
              color: "#2C2824"
            }}
          >
            WRITE A REVIEW
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className="py-8"
              style={{ borderTop: index === 0 ? "1px solid #E8E4DF" : "none", borderBottom: "1px solid #E8E4DF" }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* Review Content */}
                <div className="flex-1">
                  {/* Stars */}
                  <div className="mb-3">
                    {renderStars(review.rating, 14)}
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-serif text-[18px] lg:text-[20px] font-normal mb-4"
                    style={{ color: "#2C2824" }}
                  >
                    {review.title}
                  </h3>

                  {/* Content */}
                  <p 
                    className="font-sans text-[14px] lg:text-[15px] leading-relaxed mb-5"
                    style={{ color: "#5A5550" }}
                  >
                    {review.content}
                  </p>

                  {/* Helpful */}
                  <button 
                    className="flex items-center gap-2 font-sans text-[13px] transition-opacity hover:opacity-70"
                    style={{ color: "#7A7570" }}
                  >
                    <ThumbsUp size={14} strokeWidth={1.5} />
                    Helpful ({review.helpfulCount})
                  </button>
                </div>

                {/* Reviewer Info */}
                <div className="lg:text-right lg:min-w-[160px]">
                  <p 
                    className="font-sans text-[14px] font-medium mb-1"
                    style={{ color: "#2C2824" }}
                  >
                    {review.author}
                  </p>
                  <p 
                    className="font-sans text-[13px] mb-2"
                    style={{ color: "#7A7570" }}
                  >
                    {review.location} · {review.date}
                  </p>
                  {review.verified && (
                    <p 
                      className="font-sans text-[12px] flex items-center lg:justify-end gap-1"
                      style={{ color: "#6B8E5A" }}
                    >
                      ✓ Verified Purchase
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Reviews */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.15em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "#3D3530" }}
          >
            SHOW ALL {totalReviews} REVIEWS
            <ChevronDown 
              size={16} 
              strokeWidth={1.5} 
              className={`transition-transform ${showAllReviews ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
