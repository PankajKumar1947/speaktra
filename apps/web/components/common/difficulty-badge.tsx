import { cn } from "@/lib/utils";

type DifficultyLevel = "easy" | "medium" | "hard";

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
  showDot?: boolean;
}

const difficultyConfig = {
  easy: {
    bg: "bg-green-500/10",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  medium: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600",
    dot: "bg-yellow-500",
  },
  hard: {
    bg: "bg-red-500/10",
    text: "text-red-600",
    dot: "bg-red-500",
  },
};

export function DifficultyBadge({
  difficulty,
  className,
  showDot = true,
}: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
        config.bg,
        config.text,
        className,
      )}
    >
      {showDot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      )}
      <span className="text-xs font-medium capitalize">{difficulty}</span>
    </div>
  );
}
