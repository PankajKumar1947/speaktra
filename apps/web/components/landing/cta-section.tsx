"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Smartphone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_50%)]" />
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="relative bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                Start Free Today
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Transform Your{" "}
                <span className="text-brand-secondary">
                  Professional English
                </span>{" "}
                in 30 Days
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Join 10,000+ professionals who've improved their workplace
                communication with Speaktra.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Daily 15-minute practice sessions",
                  "AI-powered pronunciation feedback",
                  "Domain-specific vocabulary",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg bg-brand-secondary hover:brightness-110 text-white px-8 py-4 transition-all shadow-lg shadow-brand-secondary/30 hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-4"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Get on Android
                </Button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 to-orange-100 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold text-sm">
                          Daily Streak
                        </p>
                        <p className="text-slate-500 text-xs">
                          Keep your streak going
                        </p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-brand-secondary">
                      7
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold text-sm">
                          Words Learned
                        </p>
                        <p className="text-slate-500 text-xs">This month</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-orange-600">
                      127
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <span className="text-xl">⭐</span>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold text-sm">
                          Fluency Score
                        </p>
                        <p className="text-slate-500 text-xs">Current level</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-emerald-600">
                      78%
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-center">
                  <p className="text-brand-secondary font-semibold text-sm">
                    🔥 3-day streak! Keep going!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free to download</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
