"use client";

import { useState, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Project Manager at Infosys",
    avatar: "PS",
    content:
      "Speaktra transformed how I present in meetings. After 3 months, I speak with confidence and my team actually listens to my ideas now.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Sales Lead at TCS",
    avatar: "AK",
    content:
      "The domain-specific vocabulary for sales is incredible. I finally have the right phrases for client calls and negotiations.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Healthcare Administrator at Apollo",
    avatar: "SR",
    content:
      "As a non-native speaker, I was terrified of speaking in front of doctors. Now I lead meetings without hesitation.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Software Engineer at Wipro",
    avatar: "VS",
    content:
      "The IT vocabulary module helped me communicate with my international team. My presentations have improved drastically.",
    rating: 5,
  },
  {
    name: "Anjali Mehta",
    role: "Marketing Head at Reliance",
    avatar: "AM",
    content:
      "Daily practice with Speaktra gave me the confidence to pitch ideas to clients. My English feels natural now.",
    rating: 5,
  },
];

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-50 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(249,115,22,0.04),transparent_50%)]" />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What <span className="text-brand-secondary">Professionals</span> Say
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Join thousands who have transformed their English speaking skills.
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all duration-300 hover:border-brand-secondary hover:bg-brand-secondary/5 ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all duration-300 hover:border-brand-secondary hover:bg-brand-secondary/5 ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] px-8 sm:px-12"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative flex flex-col flex-shrink-0 w-80 sm:w-96 p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-secondary/20 hover:shadow-2xl hover:shadow-brand-secondary/5 transition-all duration-300 snap-center"
              >
                <Quote className="absolute top-2 right-3 w-14 h-14 text-brand-secondary/40" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100 mt-auto">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-md shrink-0"
                    style={{
                      backgroundColor: [
                        "#0EA5E9",
                        "#F97316",
                        "#38BDF8",
                        "#10B981",
                        "#8B5CF6",
                      ][index],
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 px-8 py-5 bg-white rounded-2xl border border-slate-200 shadow-lg">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-lg">4.9/5</span>
            <span className="text-slate-500">from 10,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
