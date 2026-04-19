import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  color?: string;
}

export function ProgressBar({
  value,
  className,
  showLabel = false,
  color = "bg-primary",
}: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground w-8">
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}
