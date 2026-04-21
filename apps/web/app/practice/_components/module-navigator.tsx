"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  MessageCircle,
  Newspaper,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    name: "Vocabulary",
    href: "/practice/vocabulary",
    icon: BookOpen,
    description: "Learn domain-specific words",
  },
  {
    name: "Sentences",
    href: "/practice/sentences",
    icon: MessageCircle,
    description: "Practice corporate sentences",
  },
  {
    name: "Reading",
    href: "/practice/reading",
    icon: Newspaper,
    description: "Business articles & topics",
  },
];

export function ModuleNavigator() {
  const pathname = usePathname();

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-xl shadow-brand-secondary/5 space-y-1 animate-in fade-in slide-in-from-right-4 duration-500">
      <Link
        href="/practice"
        className={cn(
          "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
          pathname === "/practice"
            ? "bg-brand-secondary/10 text-brand-secondary ring-1 ring-brand-secondary/20 shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <div
          className={cn(
            "p-2 rounded-lg transition-colors duration-300",
            pathname === "/practice"
              ? "bg-brand-secondary text-white"
              : "bg-muted text-muted-foreground group-hover:bg-background",
          )}
        >
          <LayoutDashboard className="size-4" />
        </div>
        <div>
          <p className="text-sm font-bold leading-none">Dashboard</p>
          <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
            Back to practice overview
          </p>
        </div>
      </Link>

      {modules.map((module) => {
        const isActive = pathname === module.href;
        const Icon = module.icon;

        return (
          <Link
            key={module.name}
            href={module.href}
            className={cn(
              "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
              isActive
                ? "bg-brand-secondary/10 text-brand-secondary ring-1 ring-brand-secondary/20 shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <div
              className={cn(
                "p-2 rounded-lg transition-colors duration-300",
                isActive
                  ? "bg-brand-secondary text-white"
                  : "bg-muted text-muted-foreground group-hover:bg-background",
              )}
            >
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">{module.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                {module.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
