"use client";

import { VocabularyCard } from "./vocabulary-card";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";

interface VocabularyItem {
  _id: string;
  word: string;
  noun?: { meaning: string; example?: string };
  verb?: { meaning: string; example?: string };
  adjective?: { meaning: string; example?: string };
  adverb?: { meaning: string; example?: string };
  difficulty: "easy" | "medium" | "hard";
}

interface VocabularyListProps {
  vocabularies?: VocabularyItem[];
  isLoading?: boolean;
}

export function VocabularyList({
  vocabularies = [],
  isLoading = false,
}: VocabularyListProps) {
  if (isLoading) {
    return <LoadingState text="Loading vocabulary words..." />;
  }

  if (vocabularies.length === 0) {
    return (
      <EmptyState
        title="No vocabulary available"
        description="Check back later for new words to learn."
      />
    );
  }

  return (
    <div className="space-y-4">
      {vocabularies.map((item) => (
        <VocabularyCard
          key={item._id}
          word={item.word}
          noun={item.noun}
          verb={item.verb}
          adjective={item.adjective}
          adverb={item.adverb}
          difficulty={item.difficulty}
        />
      ))}
    </div>
  );
}
