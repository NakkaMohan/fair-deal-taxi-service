import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Type definition for reviews
type Review = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source?: string;
  date?: string;
};

// Sample reviews data
const REVIEWS_DATA: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    text: "Fair Deal Taxi Service is absolutely fantastic! The driver was professional, courteous, and arrived exactly on time. The vehicle was clean and comfortable. I'll definitely be using them for all my rides in the future!",
    source: "Google Reviews",
    date: "January 8, 2026",
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 5,
    text: "Best taxi service in the Capital Region hands down. I've used them for airport runs multiple times and they've never let me down. Highly reliable and reasonably priced. Highly recommended!",
    source: "Yelp",
    date: "January 5, 2026",
  },
  {
    id: "3",
    name: "Jennifer Martinez",
    rating: 5,
    text: "Fair Deal is the only taxi service I trust. Safe drivers, clean cars, and transparent pricing. Had an issue once and their customer service resolved it immediately. Five stars!",
    source: "Google Reviews",
    date: "December 28, 2025",
  },
  {
    id: "4",
    name: "Robert Thompson",
    rating: 5,
    text: "Used Fair Deal for a wedding day ride. The driver was early, friendly, and made sure I arrived looking perfect. Outstanding service from start to finish. Worth every penny!",
    source: "Facebook",
    date: "December 20, 2025",
  },
  {
    id: "5",
    name: "Emma Wilson",
    rating: 5,
    text: "I'm impressed with Fair Deal's professionalism and efficiency. Booked through their website, ride was smooth, driver knew the routes perfectly. This is what customer service should look like!",
    source: "Google Reviews",
    date: "December 15, 2025",
  },
];

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const currentReview = REVIEWS_DATA[activeIndex];

  // Navigate to previous review with wrap-around
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1
    );
  };

  // Navigate to next review with wrap-around
  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Optional autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [autoplay]);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center justify-center gap-1 mb-4">
        <span className="text-sm text-muted-foreground mr-2" aria-label={`${rating} out of 5 stars`}>
          Rating:
        </span>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background faint text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-9xl md:text-9xl font-display font-bold text-foreground/5 uppercase">
          REVIEWS
        </span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Small label */}
          <p className="text-sm text-primary uppercase tracking-widest font-semibold mb-2">
            Testimonials
          </p>

          {/* Main heading */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            KIND WORDS FROM <span className="text-primary">OUR CUSTOMERS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our satisfied customers have to say about Fair Deal Taxi Service
          </p>
        </div>

        {/* Review Carousel */}
        <div className="max-w-3xl mx-auto">
          {/* Review Card */}
          <div className="relative">
            {/* Navigation arrows - Desktop visible, mobile below */}
            <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 justify-between px-0 pointer-events-none">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="pointer-events-auto -ml-6 lg:-ml-16 p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next review"
                className="pointer-events-auto -mr-6 lg:-mr-16 p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Review Content Card */}
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg transition-all duration-500">
              {/* Star Rating */}
              {renderStars(currentReview.rating)}

              {/* Review Text */}
              <p className="text-center text-foreground text-lg leading-relaxed mb-6 italic">
                "{currentReview.text}"
              </p>

              {/* Reviewer Info */}
              <div className="text-center border-t border-border pt-6">
                <p className="font-display text-xl text-foreground font-semibold">
                  {currentReview.name}
                </p>
                {currentReview.source && (
                  <p className="text-sm text-muted-foreground">
                    {currentReview.source}
                  </p>
                )}
                {currentReview.date && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentReview.date}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Navigation - Below card */}
            <div className="flex md:hidden justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {REVIEWS_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to review ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-current={index === activeIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-border hover:border-primary/50 hover:bg-secondary/50"
            >
              <a href="/reviews">READ MORE</a>
            </Button>

            <Button
              variant="cta"
              size="lg"
              asChild
              className="bg-yellow-400 hover:bg-yellow-500 text-black hover:text-black"
            >
              <a href="https://www.google.com/maps/place/fair+deal+taxi" target="_blank" rel="noopener noreferrer">
                WRITE A REVIEW
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
