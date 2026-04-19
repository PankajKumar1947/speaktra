import { BookOpen, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DifficultyBadge } from "@/components/common/difficulty-badge";

interface VocabularyCardProps {
  word: string;
  noun?: { meaning: string; example?: string };
  verb?: { meaning: string; example?: string };
  adjective?: { meaning: string; example?: string };
  adverb?: { meaning: string; example?: string };
  difficulty: "easy" | "medium" | "hard";
}

export function VocabularyCard({
  word,
  noun,
  verb,
  adjective,
  adverb,
  difficulty,
}: VocabularyCardProps) {
  const forms = [
    { type: "noun", data: noun },
    { type: "verb", data: verb },
    { type: "adj", data: adjective },
    { type: "adv", data: adverb },
  ].filter((f) => f.data) as Array<{
    type: string;
    data: { meaning: string; example?: string };
  }>;

  return (
    <div
      className={cn(
        "group relative p-5 rounded-2xl bg-card border border-border transition-all duration-300",
        "hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5",
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-100 dark:bg-sky-900/30">
              <BookOpen className="size-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="text-lg font-bold capitalize text-foreground">
              {word}
            </h3>
          </div>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        <div className="space-y-4">
          {forms.map((form, index) => (
            <div
              key={form.type}
              className={cn(index > 0 && "pt-4 border-t border-border")}
            >
              <span className="text-xs font-bold uppercase tracking-wider bg-muted px-2 py-1 rounded text-muted-foreground">
                {form.type}
              </span>
              <p className="text-foreground mt-2">{form.data.meaning}</p>
              {form.data.example && (
                <p className="text-sm text-muted-foreground italic mt-1">
                  "{form.data.example}"
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer">
            <Volume2 className="size-4" />
            Pronounce
          </button>
        </div>
      </div>
    </div>
  );
}
