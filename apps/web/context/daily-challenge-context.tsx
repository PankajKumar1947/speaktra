"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { useDailyChallengeForUser } from "@repo/query";
import { DailyChallenge } from "@repo/schema";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

type DailyChallengeContextType = {
  dailyChallenge: DailyChallenge | undefined;
  isLoading: boolean;
  refetch: () => void;
};

const DailyChallengeContext = createContext<
  DailyChallengeContextType | undefined
>(undefined);

export function DailyChallengeProvider({ children }: PropsWithChildren) {
  const {
    data: dailyChallenge,
    isLoading,
    refetch,
  } = useDailyChallengeForUser();

  if (!isLoading && !dailyChallenge) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
        <div className="bg-card border border-border rounded-2xl p-10 shadow-xl max-w-md w-full text-center flex flex-col items-center">
          <EmptyState
            title="Daily Challenge Not Found"
            description="We're sorry, but we couldn't find your daily challenge for today. Please try again later."
          />
          <Button
            onClick={() => refetch()}
            className="mt-6 px-6 py-2 bg-brand-secondary text-white rounded-lg font-medium hover:bg-brand-secondary/90 transition-colors"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DailyChallengeContext.Provider
      value={{
        dailyChallenge,
        isLoading,
        refetch,
      }}
    >
      {children}
    </DailyChallengeContext.Provider>
  );
}

export function useDailyChallenge() {
  const context = useContext(DailyChallengeContext);
  if (context === undefined) {
    throw new Error(
      "useDailyChallenge must be used within a DailyChallengeProvider",
    );
  }
  return context;
}
