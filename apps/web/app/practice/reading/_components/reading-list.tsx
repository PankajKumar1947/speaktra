"use client";

import { ArticleCard } from "./article-card";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";

interface ArticleItem {
  _id: string;
  title: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  keywords?: string[];
  minRead: number;
}

interface ReadingListProps {
  articles?: ArticleItem[];
  isLoading?: boolean;
}

export function ReadingList({
  articles = [],
  isLoading = false,
}: ReadingListProps) {
  if (isLoading) {
    return <LoadingState text="Loading articles..." />;
  }

  if (articles.length === 0) {
    return (
      <EmptyState
        title="No articles available"
        description="Check back later for new articles to read."
      />
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          id={article._id}
          title={article.title}
          type={article.type}
          difficulty={article.difficulty}
          keywords={article.keywords}
          minRead={article.minRead}
        />
      ))}
    </div>
  );
}
