"use client";

import Link from "next/link";
import { ChevronLeft, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { useArticle } from "@repo/query";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/common/difficulty-badge";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { MarkdownContent } from "@/components/common/markdown-content";
import { ModuleNavigator } from "@/app/practice/_components/module-navigator";

interface ArticleDetailProps {
  id: string;
}

function BackToReading() {
  return (
    <Link
      href="/practice/reading"
      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
    >
      <ChevronLeft className="size-4 mr-1 transition-transform group-hover:-translate-x-0.5" />
      Back to Reading Practice
    </Link>
  );
}

export function ArticleDetail({ id }: ArticleDetailProps) {
  const { data: article, isLoading } = useArticle(id);

  if (isLoading) {
    return <LoadingState text="Fetching article content..." />;
  }

  if (!article) {
    return (
      <EmptyState
        title="Article not found"
        description="The article you are looking for does not exist or has been removed."
      />
    );
  }

  return (
    <div>
      {/* Back navigation (mobile) */}
      <div className="mb-4 flex justify-end lg:hidden">
        <BackToReading />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 pb-20">
          {/* Header */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/10 px-2.5 py-1 rounded-full">
                {article.type}
              </span>
              <DifficultyBadge difficulty={article.difficulty} />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-[1.2]">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{article.minRead} min read</span>
              </div>
              {article.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <MarkdownContent content={article.description} />

          {/* Footer Actions */}
          <div className="mt-16 pt-10 border-t border-border flex flex-col items-center gap-6 text-center">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Finished reading?</h3>
              <p className="text-muted-foreground">
                Great job! You&apos;ve completed today&apos;s business reading.
              </p>
            </div>
            <Button
              size="lg"
              className="rounded-full px-8 font-bold gap-2 bg-brand-secondary hover:bg-brand-secondary/90 text-white"
            >
              Mark as Completed
              <CheckCircle2 className="size-5" />
            </Button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-72 sticky top-24 space-y-4">
          <div className="hidden justify-end lg:flex">
            <BackToReading />
          </div>
          <ModuleNavigator />
        </div>
      </div>
    </div>
  );
}
