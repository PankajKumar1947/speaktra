"use client";

import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { format, isSameDay, startOfDay } from "date-fns";
import { useDailyLessonForUser } from "@repo/query";
import { DailyLesson } from "@repo/schema";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

type DailyLessonContextType = {
  dailyLesson: DailyLesson | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  isToday: boolean;
  joinedAt: Date | undefined;
  isBeforeSignup: boolean;
};

const DailyLessonContext = createContext<DailyLessonContextType | undefined>(
  undefined,
);

export function DailyLessonProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const isToday = isSameDay(selectedDate, new Date());

  const joinedAt = user?.createdAt ? new Date(user.createdAt) : undefined;
  const isBeforeSignup = joinedAt
    ? startOfDay(selectedDate) < startOfDay(joinedAt)
    : false;

  const dateParam = isToday ? undefined : format(selectedDate, "yyyy-MM-dd");

  const {
    data: dailyLesson,
    isLoading,
    isError,
    refetch,
  } = useDailyLessonForUser(dateParam, { enabled: !isBeforeSignup });

  if (!isLoading && !dailyLesson && isToday) {
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
        isError,
        refetch,
        selectedDate,
        setSelectedDate,
        isToday,
        joinedAt,
        isBeforeSignup,
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
