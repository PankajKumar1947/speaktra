"use client";

import { Button } from "@/components/ui/button";
import { Mic, MessageSquare } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-20 sm:pt-24 lg:pt-0 pb-12 sm:pb-16 lg:pb-0 overflow-hidden bg-gradient-to-b from-surface-alt to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_40%)]" />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
              For Working Professionals
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Speak{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
                Confident
              </span>
              , Professional English
            </h1>

            <p className="text-lg sm:text-xl text-foreground-muted mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0">
              Domain-specific English learning customized for your job. Build
              real confidence at work through daily speaking practice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <Button
                size="lg"
                className="text-base sm:text-lg bg-brand-secondary hover:brightness-110 text-white px-6 sm:px-8 py-3 sm:py-4 transition-all shadow-lg shadow-brand-secondary/25 hover:shadow-xl w-full sm:w-auto"
              >
                Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg border-border text-foreground-muted hover:bg-accent px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-10 pt-4 border-t border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm"
                      style={{
                        backgroundColor: [
                          "#0EA5E9",
                          "#38BDF8",
                          "#7DD3FC",
                          "#BAE6FD",
                        ][i],
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="font-medium text-foreground-muted text-sm sm:text-base">
                  10K+ professionals
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-medium text-foreground-muted text-sm sm:text-base">
                  4.9 rating
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-[240px] sm:max-w-xs lg:w-[340px] mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-brand-secondary/20 to-orange-400/20 rounded-[2rem] sm:rounded-[2.5rem] blur-xl" />
              <div className="relative aspect-[9/16] rounded-[2rem] sm:rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl border border-slate-800/50">
                <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-b from-slate-900 to-transparent z-10" />
                <div className="p-4 sm:p-6 pt-10 sm:pt-12">
                  <div className="text-center mb-4 sm:mb-6">
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Today&apos;s Practice
                    </p>
                    <h3 className="text-white text-lg sm:text-xl font-semibold mt-1 sm:mt-2">
                      Speaking Session
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 backdrop-blur-sm">
                      <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-lg sm:rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                        <Mic className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          Team Update
                        </p>
                        <p className="text-slate-400 text-xs">2 min speaking</p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 backdrop-blur-sm">
                      <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-lg sm:rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          5 Words
                        </p>
                        <p className="text-slate-400 text-xs">
                          Corporate vocabulary
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-brand-secondary flex items-center justify-center shadow-lg shadow-brand-secondary/30 hover:scale-105 transition-transform cursor-pointer">
                      <Mic className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
