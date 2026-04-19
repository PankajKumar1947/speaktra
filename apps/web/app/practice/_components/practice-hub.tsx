"use client";

import { useState } from "react";
import { addDays, subDays, isSameDay } from "date-fns";
import {
  BookOpen,
  MessageCircle,
  Newspaper,
  Target,
  Flame,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PracticeModuleCard } from "./practice-module-card";
import { ProgressBar } from "@/components/common/progress-bar";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRACTICE_MODULES = [
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Learn domain-specific words",
    route: "/practice/vocabulary",
    color: "bg-primary",
    iconBg: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
    progress: 65,
    todayCount: 12,
    todayTotal: 15,
  },
  {
    id: "sentences",
    title: "Sentence Practice",
    description: "Practice corporate sentences",
    route: "/practice/sentences",
    color: "bg-secondary",
    iconBg:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    progress: 40,
    todayCount: 8,
    todayTotal: 10,
  },
  {
    id: "reading",
    title: "Reading",
    description: "Business articles & topics",
    route: "/practice/reading",
    color: "bg-primary",
    iconBg: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
    progress: 33,
    todayCount: 2,
    todayTotal: 5,
  },
];

const icons: Record<string, React.ReactNode> = {
  vocabulary: <BookOpen className="size-6" />,
  sentences: <MessageCircle className="size-6" />,
  reading: <Newspaper className="size-6" />,
};

export function PracticeHub() {
  const [date, setDate] = useState<Date>(new Date());

  const handlePrev = () => setDate((prev) => subDays(prev, 1));
  const handleNext = () => setDate((prev) => addDays(prev, 1));
  const handleToday = () => setDate(new Date());

  const totalToday = PRACTICE_MODULES.reduce((acc, m) => acc + m.todayCount, 0);
  const totalTarget = PRACTICE_MODULES.reduce(
    (acc, m) => acc + m.todayTotal,
    0,
  );
  const avgProgress = Math.round(
    PRACTICE_MODULES.reduce((acc, m) => acc + m.progress, 0) /
      PRACTICE_MODULES.length,
  );

  return (
    <div className="space-y-10">
      {/* Stats & Navigation Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-brand-heading">
            Overall Performance
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Target className="size-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Progress
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-secondary">
                {totalToday}
                <span className="text-lg text-muted-foreground font-medium">
                  /{totalTarget}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                items completed today
              </p>
            </div>
          </div>

          <div className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 hover:border-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform duration-300">
                <Flame className="size-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Streak
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-secondary">7</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                days in a row
              </p>
            </div>
          </div>

          <div className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Clock className="size-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Time
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-secondary">
                45
                <span className="text-lg text-muted-foreground font-medium">
                  m
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                practice time
              </p>
            </div>
          </div>

          <div className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="size-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overall
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-secondary">
                {avgProgress}
                <span className="text-lg text-muted-foreground font-medium">
                  %
                </span>
              </p>
              <ProgressBar value={avgProgress} className="mt-3 h-1.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content: Modules */}
        <div className="flex-1 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Practice{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
                Modules
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Master professional speaking with specialized modules designed to
              build your confidence in corporate settings.
            </p>
          </div>

          <div className="grid gap-4">
            {PRACTICE_MODULES.map((module) => (
              <PracticeModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                icon={icons[module.id]}
                iconBg={module.iconBg}
                route={module.route}
                color={module.color}
                progress={module.progress}
                itemCount={`${module.todayCount}/${module.todayTotal} today`}
              />
            ))}
          </div>
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
