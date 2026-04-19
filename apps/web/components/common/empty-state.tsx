import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-8 text-center",
        className,
      )}
    >
      <p className="text-lg font-medium text-foreground">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
