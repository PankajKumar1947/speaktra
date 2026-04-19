"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, CheckCircle } from "lucide-react";
import { DifficultyBadge } from "@/components/common/difficulty-badge";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";

interface Article {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  type: string;
  keywords?: string[];
  minRead: number;
}

interface ReadingDetailProps {
  articleId: string;
  article?: Article;
  isLoading?: boolean;
}

export function ReadingDetail({
  article,
  isLoading = false,
}: ReadingDetailProps) {
  if (isLoading) return <LoadingState text="Loading article..." />;
  if (!article)
    return (
      <EmptyState
        title="Article not found"
        description="The article you're looking for doesn't exist."
      />
    );

  return (
    <div className="space-y-4">
      <Link
        href="/practice/reading"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="size-4 mr-1" />
        Back to Reading
      </Link>

      <article className="bg-card border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b">
          <DifficultyBadge difficulty={article.difficulty} />
          <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium uppercase text-muted-foreground">
            {article.type}
          </span>
          <div className="flex items-center gap-1 ml-auto text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">{article.minRead} min read</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-foreground leading-tight mb-4">
          {article.title}
        </h1>

        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: article.description }} />
        </div>

        {article.keywords && article.keywords.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <Sparkles className="size-4 text-primary" />
              Key Takeaways
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, i) => (
                <button
                  key={i}
                  className="text-sm bg-muted border px-3 py-1.5 rounded-full hover:bg-muted/80 cursor-pointer transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}
      </article>

      <button className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
        <CheckCircle className="size-5" />
        Mark as Completed
      </button>
    </div>
  );
}
