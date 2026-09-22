"use client";

import { SentenceList } from "./sentence-list";
import { useDailyLessonSentences } from "@repo/query";
import { useDailyLesson } from "@/context/daily-lesson-context";
import { ModuleNavigator } from "@/app/practice/_components/module-navigator";

export function SentencesDetail() {
  const { dailyLesson, isLoading: isLessonLoading } = useDailyLesson();
  const { data: sentences, isLoading: isSentenceLoading } =
    useDailyLessonSentences(dailyLesson?._id || "");

  const isLoading = isLessonLoading || isSentenceLoading;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Sentence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
              Practice
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Practice corporate sentences for professional communication
          </p>
        </div>

        <SentenceList sentences={sentences} isLoading={isLoading} />
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-72 sticky top-24">
        <ModuleNavigator />
      </div>
    </div>
  );
}
