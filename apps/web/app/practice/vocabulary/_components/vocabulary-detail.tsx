"use client";

import { VocabularyList } from "./vocabulary-list";
import { useDailyChallengeVocabularies } from "@repo/query";
import { useDailyChallenge } from "@/context/daily-challenge-context";
import { ModuleNavigator } from "@/app/practice/_components/module-navigator";

export function VocabularyDetail() {
  const { dailyChallenge, isLoading: isChallengeLoading } = useDailyChallenge();
  const { data: vocabularies, isLoading: isVocabLoading } =
    useDailyChallengeVocabularies(dailyChallenge?._id || "");

  const isLoading = isChallengeLoading || isVocabLoading;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Vocabulary{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
              Practice
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Learn domain-specific words for your professional context
          </p>
        </div>

        <VocabularyList vocabularies={vocabularies} isLoading={isLoading} />
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-72 sticky top-24">
        <ModuleNavigator />
      </div>
    </div>
  );
}
