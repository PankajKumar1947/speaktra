"use client";

import { ReadingList } from "./reading-list";
import { useDailyLessonArticles } from "@repo/query";
import { useDailyLesson } from "@/context/daily-lesson-context";
import { ModuleNavigator } from "@/app/practice/_components/module-navigator";

export function ReadingDetail() {
  const { dailyLesson, isLoading: isLessonLoading } = useDailyLesson();
  const { data: articles, isLoading: isArticleLoading } =
    useDailyLessonArticles(dailyLesson?._id || "");

  const isLoading = isLessonLoading || isArticleLoading;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Reading{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
              Practice
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Read business articles and topics
          </p>
        </div>

        <ReadingList articles={articles} isLoading={isLoading} />
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-72 sticky top-24">
        <ModuleNavigator />
      </div>
    </div>
  );
}
