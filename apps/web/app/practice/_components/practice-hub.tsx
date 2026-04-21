"use client";

import { useState } from "react";
import { addDays, subDays, isSameDay } from "date-fns";
import {
  BookOpen,
  MessageCircle,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PracticeModuleCard } from "./practice-module-card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDailyChallenge } from "@/context/daily-challenge-context";
import { EmptyState } from "@/components/common/empty-state";

const icons: Record<string, React.ReactNode> = {
  vocabulary: <BookOpen className="size-6" />,
  sentences: <MessageCircle className="size-6" />,
  reading: <Newspaper className="size-6" />,
};

export function PracticeHub() {
  const [date, setDate] = useState<Date>(new Date());
  const { dailyChallenge, isLoading } = useDailyChallenge();

  const handlePrev = () => setDate((prev) => subDays(prev, 1));
  const handleNext = () => setDate((prev) => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  const isTodaySelected = isSameDay(date, new Date());

  const PRACTICE_MODULES = [
    {
      id: "vocabulary",
      title: "Vocabulary",
      description: dailyChallenge
        ? `${dailyChallenge.vocabularies?.length || 0} words for today`
        : "Learn domain-specific words",
      route: "/practice/vocabulary",
      color: "bg-primary",
      iconBg: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
      progress: 0,
      todayCount: dailyChallenge?.vocabularies?.length || 0,
    },
    {
      id: "sentences",
      title: "Sentence Practice",
      description: dailyChallenge
        ? `${dailyChallenge.sentences?.length || 0} sentences for today`
        : "Practice corporate sentences",
      route: "/practice/sentences",
      color: "bg-secondary",
      iconBg:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      progress: 0,
      todayCount: dailyChallenge?.sentences?.length || 0,
    },
    {
      id: "reading",
      title: "Reading",
      description: dailyChallenge
        ? `${dailyChallenge.articles?.length || 0} articles for today`
        : "Business articles & topics",
      route: "/practice/reading",
      color: "bg-primary",
      iconBg: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
      progress: 0,
      todayCount: dailyChallenge?.articles?.length || 0,
    },
  ];

  const renderModuleContent = () => {
    if (!isTodaySelected) {
      return (
        <div className="bg-card border border-border rounded-2xl p-10 animate-in fade-in zoom-in-95 duration-500 mt-8">
          <EmptyState
            title="History Not Available"
            description="We're currently only displaying the daily challenge for today. Historical data and archives are coming soon!"
          />
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 w-full bg-card animate-pulse rounded-2xl border border-border"
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid gap-4">
        {PRACTICE_MODULES.map((module) => (
          <PracticeModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            icon={icons[module.id]}
            iconBg={module.iconBg}
            route={module.route}
            color={module.color}
            progress={module.progress}
            itemCount={`${module.todayCount} today`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content: Modules */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Practice{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
                Modules
              </span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Master professional speaking with specialized modules designed to
              build your confidence in corporate settings.
            </p>
          </div>

          {renderModuleContent()}
        </div>

        {/* Sidebar: Navigation & Calendar */}
        <div className="w-full lg:w-fit sticky top-24 space-y-4">
          {/* Date Navigation Card */}
          <div className="bg-card border border-border rounded-2xl p-3 shadow-xl shadow-brand-secondary/5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-1 p-1 bg-muted/50 border rounded-xl shadow-sm backdrop-blur-sm w-full justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                className="h-8 flex-1 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="size-4 mr-1" />
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleToday}
                className={cn(
                  "h-8 flex-1 font-semibold transition-all",
                  isSameDay(date, new Date()) &&
                    "bg-brand-secondary text-white hover:bg-brand-secondary/90",
                )}
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="h-8 flex-1 text-muted-foreground hover:text-foreground"
              >
                Next
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-xl shadow-brand-secondary/5 animate-in fade-in slide-in-from-right-4 delay-150 duration-500">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className="rounded-md border-0"
              classNames={{
                selected:
                  "rounded-full border-2 border-brand-secondary text-brand-secondary bg-brand-secondary/10 hover:bg-brand-secondary/20 font-bold",
                today:
                  "rounded-full bg-brand-secondary/20 text-brand-secondary font-bold",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
