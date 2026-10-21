import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { normalizeMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

const markdownComponents: Components = {
  h1: ({ ...props }) => (
    <h1
      className="text-2xl sm:text-3xl font-bold mt-10 mb-5 text-foreground"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-foreground"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="text-lg sm:text-xl font-bold mt-6 mb-3 text-foreground"
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4 className="text-base font-bold mt-5 mb-2 text-foreground" {...props} />
  ),
  p: ({ ...props }) => (
    <p
      className="text-base leading-relaxed text-muted-foreground mb-5 break-words"
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
    <li
      className="text-base leading-relaxed break-words [&>p]:mb-2"
      {...props}
    />
  ),
  strong: ({ ...props }) => (
    <strong className="font-bold text-foreground" {...props} />
  ),
  em: ({ ...props }) => <em className="italic text-foreground" {...props} />,
  a: ({ ...props }) => (
    <a
      className="text-brand-secondary underline underline-offset-4 hover:opacity-80 transition-opacity"
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-4 border-brand-secondary pl-6 italic my-8 text-foreground"
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted p-4 text-sm leading-relaxed [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: ({ ...props }) => (
    <thead className="border-b border-border bg-muted/60" {...props} />
  ),
  th: ({ ...props }) => (
    <th className="px-3 py-2 font-semibold text-foreground" {...props} />
  ),
  td: ({ ...props }) => (
    <td
      className="border-b border-border/60 px-3 py-2 text-muted-foreground"
      {...props}
    />
  ),
};

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {normalizeMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}
