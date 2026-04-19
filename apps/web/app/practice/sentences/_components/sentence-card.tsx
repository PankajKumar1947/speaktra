import {
  MessageCircle,
  Lightbulb,
  ArrowRightLeft,
  ArrowRight,
  MapPin,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DifficultyBadge } from "../../../../components/common/difficulty-badge";

interface SentenceCardProps {
  sentence: string;
  explanation: string;
  otherWays?: string[];
  context: string;
  difficulty: "easy" | "medium" | "hard";
  index: number;
}

export function SentenceCard({
  sentence,
  explanation,
  otherWays,
  context,
  difficulty,
  index,
}: SentenceCardProps) {
  return (
    <div
      className={cn(
        "group relative p-5 rounded-2xl bg-card border border-border transition-all duration-300",
        "hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5",
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <div className="p-2.5 rounded-2xl bg-sky-100 dark:bg-sky-900/30">
            <MessageCircle className="size-5 text-sky-600 dark:text-sky-400" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Sentence {index + 1}
          </span>
        </div>

        <p className="text-lg font-semibold text-foreground mb-5">{sentence}</p>

        <div className="bg-orange-50 dark:bg-orange-950/30 border-l-2 border-l-orange-400 p-4 rounded-r-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="size-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Explanation
            </span>
          </div>
          <p className="text-foreground">{explanation}</p>
        </div>

        {otherWays && otherWays.length > 0 && (
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRightLeft className="size-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Other Ways
              </span>
            </div>
            <div className="space-y-2">
              {otherWays.map((way, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ArrowRight className="size-3.5 text-muted-foreground mt-1 shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{way}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-sky-50 dark:bg-sky-950/30 border-l-2 border-l-sky-500 p-3 rounded-r-lg mb-4">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="size-3.5 text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Scenario
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{context}</p>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <DifficultyBadge difficulty={difficulty} />
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer">
            <Volume2 className="size-4" />
            Pronounce
          </button>
        </div>
      </div>
    </div>
  );
}
