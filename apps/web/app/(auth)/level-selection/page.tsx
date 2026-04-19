"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "../auth-layout";
import { CircleDot, Circle } from "lucide-react";
import { Level, userLevels } from "@repo/schema";

export default function LevelSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "corporate";
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const handleContinue = () => {
    if (selectedLevel) {
      router.push(`/goal-selection?domain=${domain}&level=${selectedLevel}`);
    }
  };

  const getIcon = (isSelected: boolean) => {
    if (isSelected) {
      return <CircleDot className="w-5 h-5 text-brand-secondary" />;
    }
    return <Circle className="w-5 h-5 text-foreground-muted" />;
  };

  return (
    <AuthLayout stepLabel="Step 2 of 3">
      <h2 className="text-xl font-bold text-foreground mb-1">
        Your Current Level
      </h2>
      <p className="text-foreground-muted text-sm mb-6">
        Help us understand where you are
      </p>

      <div className="space-y-3 mb-6">
        {userLevels.map((level) => {
          const isSelected = selectedLevel === level.value;
          return (
            <button
              key={level.value}
              onClick={() => setSelectedLevel(level.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                isSelected
                  ? "border-brand-secondary bg-brand-secondary/10"
                  : "border-border bg-card hover:border-brand-secondary/30"
              }`}
            >
              {getIcon(isSelected)}
              <div className="flex-1">
                <h3
                  className={`font-semibold ${isSelected ? "text-brand-secondary" : "text-foreground"}`}
                >
                  {level.label}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {level.description}
                </p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-brand-secondary flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedLevel}
        className="w-full h-11 bg-brand-secondary hover:brightness-110 text-white"
      >
        Continue
      </Button>
    </AuthLayout>
  );
}
