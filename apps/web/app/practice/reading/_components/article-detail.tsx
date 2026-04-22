"use client";

import Link from "next/link";
import { ChevronLeft, Clock, Calendar, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useArticle } from "@repo/query";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/common/difficulty-badge";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { ModuleNavigator } from "@/app/practice/_components/module-navigator";

interface ArticleDetailProps {
  id: string;
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
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 min-w-0 pb-20">
        {/* Navigation & Header */}
        <div className="mb-10 space-y-6">
          <Link
            href="/practice/reading"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ChevronLeft className="size-4 mr-1 transition-transform group-hover:-translate-x-0.5" />
            Back to Reading Practice
          </Link>

          <div className="space-y-4">
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
        </div>

        {/* Article Content */}
        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-2xl font-bold mt-10 mb-5 text-foreground"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-xl font-bold mt-8 mb-4 text-foreground"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-lg font-bold mt-6 mb-3 text-foreground"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="text-base leading-relaxed text-muted-foreground mb-5"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="list-disc list-outside ml-5 mb-5 space-y-2 text-muted-foreground"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="list-decimal list-outside ml-5 mb-5 space-y-2 text-muted-foreground"
                  {...props}
                />
              ),
              li: ({ ...props }) => (
                <li className="text-base leading-relaxed" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="font-bold text-foreground" {...props} />
              ),
              a: ({ ...props }) => (
                <a
                  className="text-brand-secondary underline underline-offset-4 hover:opacity-80 transition-opacity"
                  {...props}
                />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-brand-secondary pl-6 italic my-8 text-foreground"
                  {...props}
                />
              ),
            }}
          >
            {article.description}
          </ReactMarkdown>
        </div>

        {/* Footer Actions */}
        <div className="mt-16 pt-10 border-t border-border flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Finished reading?</h3>
            <p className="text-muted-foreground">
              Great job! You've completed today's business reading.
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
      <div className="w-full lg:w-72 sticky top-24">
        <ModuleNavigator />
      </div>
    </div>
  );
}
