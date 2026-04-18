"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatar: "SC",
    content:
      "Speaktra transformed how I present in meetings. After 3 months, I speak with confidence and my team actually listens to my ideas now.",
    rating: 5,
  },
  {
    name: "Raj Patel",
    role: "Sales Director at GlobalTech",
    avatar: "RP",
    content:
      "The domain-specific vocabulary for sales is incredible. I finally have the right phrases for client calls and negotiations.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Healthcare Administrator",
    avatar: "EW",
    content:
      "As a non-native speaker, I was terrified of speaking in front of doctors. Now I lead meetings without hesitation.",
    rating: 5,
  },
  {
    name: "James Liu",
    role: "Software Engineer at DataCorp",
    avatar: "JL",
    content:
      "The IT vocabulary module helped me communicate with my international team. My presentations have improved drastically.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Marketing Lead at BrandCo",
    avatar: "MG",
    content:
      "Daily practice with Speaktra gave me the confidence to pitch ideas to clients. My English feels natural now.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C4A6E] mb-4">
            What Professionals Say
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands who have transformed their English speaking skills.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 sm:w-96 p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 snap-center"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <Quote className="w-8 h-8 text-sky-200 mb-4" />
              <p className="text-base text-slate-700 leading-relaxed mb-6">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
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
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-semibold text-slate-700">4.9/5</span>
            <span className="text-slate-500">from 10,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
