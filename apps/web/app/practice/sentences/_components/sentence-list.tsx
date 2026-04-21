"use client";

import { SentenceCard } from "@/app/practice/sentences/_components/sentence-card";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";

import { Sentence } from "@repo/schema";

interface SentenceListProps {
  sentences?: Sentence[];
  isLoading?: boolean;
}

export function SentenceList({
  sentences = [],
  isLoading = false,
}: SentenceListProps) {
  if (isLoading) {
    return <LoadingState text="Loading sentences..." />;
  }

  if (sentences.length === 0) {
    return (
      <EmptyState
        title="No sentences available"
        description="Check back later for new sentences to practice."
      />
    );
  }

  return (
    <div className="space-y-4">
      {sentences.map((item, index) => (
        <SentenceCard
          key={item._id}
          sentence={item.sentence}
          explanation={item.explanation}
          otherWays={item.otherWays}
          context={item.context}
          difficulty={item.difficulty}
          index={index}
        />
      ))}
    </div>
  );
}
