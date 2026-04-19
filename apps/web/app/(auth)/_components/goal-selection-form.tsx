"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCompleteOnboarding } from "@repo/query";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mic,
  BookOpen,
  Trophy,
  Construction,
  type LucideIcon,
} from "lucide-react";
import { Goal, Level, userGoals } from "@repo/schema";
import { toast } from "sonner";

const iconMap: Record<string, LucideIcon> = {
  [Goal.FLUENCY]: MessageCircle,
  [Goal.PRONUNCIATION]: Mic,
  [Goal.VOCABULARY]: BookOpen,
  [Goal.CONFIDENCE]: Trophy,
  [Goal.GRAMMAR]: Construction,
};

export function GoalSelectionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "corporate";
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();

  const toggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      completeOnboarding(
        { domain, level: Level.INTERMEDIATE, goals: selectedGoals },
        {
          onSuccess: () => {
            toast.success("Onboarding completed!");
            router.push("/completion");
          },
          onError: (error: Error) => {
            toast.error(error.message || "Failed to complete onboarding");
          },
        },
      );
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-foreground mb-1">
        Your Learning Goals
      </h2>
      <p className="text-foreground-muted text-sm mb-6">
        Select one or more (we recommend 2-3)
      </p>

      <div className="space-y-3 mb-6">
        {userGoals.map((goal) => {
          const Icon = iconMap[goal.value] || MessageCircle;
          const isSelected = selectedGoals.includes(goal.value as Goal);
          return (
            <button
              key={goal.value}
              onClick={() => toggleGoal(goal.value as Goal)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                isSelected
                  ? "border-brand-secondary bg-brand-secondary/10"
                  : "border-border bg-card hover:border-brand-secondary/30"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? "bg-brand-secondary" : "bg-muted"}`}
              >
                <Icon
                  className={`w-5 h-5 ${isSelected ? "text-white" : "text-foreground-muted"}`}
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold ${isSelected ? "text-brand-secondary" : "text-foreground"}`}
                >
                  {goal.label}
                </h3>
              </div>
              {isSelected && (
                <svg
                  className="w-5 h-5 text-brand-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm text-foreground-muted mb-4">
        {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""}{" "}
        selected
      </p>

      <Button
        onClick={handleContinue}
        disabled={selectedGoals.length === 0 || isPending}
        className="w-full h-11 bg-brand-secondary hover:brightness-110 text-white"
      >
        {isPending ? "Loading..." : "Continue"}
      </Button>
    </>
  );
}
