"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { useDailyLessonForUser } from "@repo/query";
import { DailyLesson } from "@repo/schema";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

type DailyLessonContextType = {
  dailyLesson: DailyLesson | undefined;
  isLoading: boolean;
  refetch: () => void;
};

const DailyLessonContext = createContext<DailyLessonContextType | undefined>(
  undefined,
);

export function DailyLessonProvider({ children }: PropsWithChildren) {
  const { data: dailyLesson, isLoading, refetch } = useDailyLessonForUser();

  if (!isLoading && !dailyLesson) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
        <div className="bg-card border border-border rounded-2xl p-10 shadow-xl max-w-md w-full text-center flex flex-col items-center">
          <EmptyState
            title="Daily Lesson Not Found"
            description="We're sorry, but we couldn't find your daily lesson for today. Please try again later."
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
    <DailyLessonContext.Provider
      value={{
        dailyLesson,
        isLoading,
        refetch,
      }}
    >
      {children}
    </DailyLessonContext.Provider>
  );
}

export function useDailyLesson() {
  const context = useContext(DailyLessonContext);
  if (context === undefined) {
    throw new Error("useDailyLesson must be used within a DailyLessonProvider");
  }
  return context;
}
