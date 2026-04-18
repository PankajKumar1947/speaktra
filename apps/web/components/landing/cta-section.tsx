"use client";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-surface-alt border border-brand-primary/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-heading mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-foreground-muted mb-8 max-w-md mx-auto">
            Join 10,000+ professionals building confidence in their professional
            English.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg bg-brand-secondary hover:brightness-110 text-white px-8 py-3 transition-all"
            >
              Download for iOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-slate-300 text-foreground-muted px-8 py-3"
            >
              Get on Android
            </Button>
          </div>

          <p className="mt-6 text-base text-muted-foreground">
            Free to download • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
