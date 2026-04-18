"use client";

import { Button } from "@/components/ui/button";
import { Mic, MessageSquare } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 bg-[#F0F9FF]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-base font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              For Working Professionals
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0C4A6E] leading-tight mb-6">
              Speak Confident, Professional English
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-xl">
              Domain-specific English learning customized for your job. Build
              real confidence at work through daily speaking practice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                className="text-lg bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              >
                Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-slate-300 text-slate-700 hover:bg-white px-8 py-3"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 text-base text-slate-500">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
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
                <span className="font-medium">10K+ professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">★★★★★</span>
                <span className="font-medium">4.9 rating</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-xs lg:w-[320px]">
            <div className="aspect-[9/16] rounded-3xl bg-slate-900 overflow-hidden shadow-2xl">
              <div className="p-5 pt-10">
                <div className="text-center mb-6">
                  <p className="text-slate-400 text-sm">
                    Today&apos;s Practice
                  </p>
                  <h3 className="text-white text-xl font-semibold mt-1">
                    Speaking Session
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Team Update</p>
                      <p className="text-slate-400 text-sm">2 min speaking</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">5 Words</p>
                      <p className="text-slate-400 text-sm">
                        Corporate vocabulary
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
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
