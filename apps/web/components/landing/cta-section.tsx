"use client";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-[#F0F9FF] border border-sky-100">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C4A6E] mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            Join 10,000+ professionals building confidence in their professional
            English.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              Download for iOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-slate-300 text-slate-700 px-8 py-3"
            >
              Get on Android
            </Button>
          </div>

          <p className="mt-6 text-base text-slate-500">
            Free to download • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
