"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDomains } from "@repo/query";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Code,
  ShoppingCart,
  Stethoscope,
  Landmark,
  GraduationCap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  corporate: Building2,
  it: Code,
  sales: ShoppingCart,
  healthcare: Stethoscope,
  finance: Landmark,
  education: GraduationCap,
};

export function DomainSelectionForm() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const { data: domains, isLoading } = useDomains();

  const handleContinue = () => {
    if (selectedDomain) {
      router.push(`/level-selection?domain=${selectedDomain}`);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-foreground mb-1">
        Choose Your Domain
      </h2>
      <p className="text-foreground-muted text-sm mb-6">
        We&apos;ll personalize your learning experience
      </p>

      {isLoading ? (
        <div className="space-y-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full h-20 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {domains?.map((domain) => {
            const Icon = iconMap[domain._id] || Building2;
            const isSelected = selectedDomain === domain._id;
            return (
              <button
                key={domain._id}
                onClick={() => setSelectedDomain(domain._id)}
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
                    {domain.name}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {domain.description}
                  </p>
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
      )}

      <Button
        onClick={handleContinue}
        disabled={!selectedDomain}
        className="w-full h-11 bg-brand-secondary hover:brightness-110 text-white"
      >
        Continue
      </Button>
    </>
  );
}
