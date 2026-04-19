import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "../../../components/common/progress-bar";

interface PracticeModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg?: string;
  route: string;
  color?: string;
  progress?: number;
  itemCount?: string;
}

export function PracticeModuleCard({
  title,
  description,
  icon,
  iconBg = "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
  route,
  color = "bg-primary",
  progress = 0,
  itemCount,
}: PracticeModuleCardProps) {
  return (
    <Link
      href={route}
      className={cn(
        "group relative p-6 rounded-2xl bg-card border border-border transition-all duration-300",
        "hover:border-secondary/40 hover:shadow-2xl hover:shadow-secondary/10 hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "cursor-pointer",
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner Accent */}
      <div className="absolute -top-px -left-px w-16 h-16 bg-gradient-to-br from-secondary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center gap-5">
        <div
          className={cn(
            "flex size-15 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-md",
            iconBg,
          )}
        >
          <div className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-lg text-brand-heading group-hover:text-brand-secondary transition-colors duration-300">
              {title}
            </h3>
            {itemCount && (
              <span className="text-sm text-muted-foreground font-medium">
                {itemCount}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
          <div className="mt-4">
            <ProgressBar value={progress} showLabel color={color} />
          </div>
        </div>

        <div className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/5 group-hover:text-secondary">
          <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
