import { cn } from "@/lib/utils";

interface LoadingStateProps {
  text?: string;
  className?: string;
}

export function LoadingState({
  text = "Loading...",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-8",
        className,
      )}
    >
      <div className="relative size-8">
        <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
