"use client";

import { ReactNode } from "react";
import { Mic, MessageSquare, TrendingUp, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  stepLabel?: string;
}

const brandFeatures = [
  {
    icon: Mic,
    title: "Speaking Practice",
    description: "Daily structured sessions",
  },
  {
    icon: MessageSquare,
    title: "AI Feedback",
    description: "Fluency scores & suggestions",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Improve over time",
  },
  {
    icon: Sparkles,
    title: "Domain Vocabulary",
    description: "Learn industry-specific words",
  },
];

export function AuthCard({
  children,
  stepLabel,
}: {
  children: ReactNode;
  stepLabel?: string;
}) {
  return (
    <div className="w-full max-w-5xl bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        <div className="hidden lg:flex bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] p-8 sm:p-12 relative flex-col justify-center">
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-16 right-8 w-40 h-40 bg-[#F97316]/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-[#F97316]/10 rounded-full blur-xl" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="dots"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="0.5" fill="white" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dots)" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="relative h-20 w-auto drop-shadow-lg -ml-4">
              <img
                src="/logo-text.png"
                alt="Speaktra"
                className="h-full w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Master Professional English
            </h1>
            <div className="space-y-3">
              {brandFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-secondary flex items-center justify-center shadow-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-white">
                      {feature.title}
                    </p>
                    <p className="text-xs text-white/75">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 flex flex-col justify-center overflow-y-auto">
          {stepLabel && (
            <div className="mb-6">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider bg-muted px-3 py-1.5 rounded-full">
                {stepLabel}
              </span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthLayout({ children, stepLabel }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-alt to-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="lg:hidden mb-6">
        <img src="/logo-text.png" alt="Speaktra" className="h-14 w-auto" />
      </div>
      <AuthCard stepLabel={stepLabel}>{children}</AuthCard>
    </div>
  );
}

export function BrandLogo() {
  return (
    <div className="relative h-16 w-auto mb-8">
      <img src="/logo-text.png" alt="Speaktra" className="h-full w-auto" />
    </div>
  );
}
