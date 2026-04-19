import Link from "next/link";
import { Clock, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { DifficultyBadge } from "@/components/common/difficulty-badge";

interface ArticleCardProps {
  id: string;
  title: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  keywords?: string[];
  minRead: number;
}

export function ArticleCard({
  id,
  title,
  type,
  difficulty,
  keywords = [],
  minRead,
}: ArticleCardProps) {
  return (
    <Link
      href={`/practice/reading/${id}`}
      className={cn(
        "group relative block p-5 rounded-2xl bg-card border border-border transition-all duration-300",
        "hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "cursor-pointer",
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30">
              <FileText className="size-4 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 px-2 py-1 rounded">
              {type}
            </span>
          </div>
          <DifficultyBadge difficulty={difficulty} showDot />
        </div>

        <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-3">
          {title}
        </h3>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.slice(0, 3).map((keyword, i) => (
              <span
                key={i}
                className="text-xs bg-muted px-2 py-1 rounded-full border text-muted-foreground"
              >
                {keyword}
              </span>
            ))}
            {keywords.length > 3 && (
              <span className="text-xs text-muted-foreground py-1">
                +{keywords.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            <span className="text-sm">{minRead} min read</span>
          </div>
          <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
            Read
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
