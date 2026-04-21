"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { useDailyChallengeForUser } from "@repo/query";
import { DailyChallenge } from "@repo/schema";

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
