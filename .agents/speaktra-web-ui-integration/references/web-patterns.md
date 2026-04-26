# Web Patterns

## Current Stack

- Next.js App Router in `apps/web/app`
- shadcn `base-nova` config from `apps/web/components.json`
- Tailwind v4 with tokens in `apps/web/app/globals.css`

## Patterns Already Present

- Landing screens use gradient backgrounds, soft radial highlights, and brand token colors.
- Auth screens use small, focused forms with inline error copy and route-local components.
- Practice routes split pages from route-local `_components` to keep the page file thin.

## Integration Checklist

1. Start from the route directory you are editing.
2. Check whether the UI should be server or client rendered.
3. Reuse `@/components/ui/*` and `@/components/common/*` first.
4. Use semantic tokens such as `bg-background`, `text-foreground`, `text-brand-secondary`, and `bg-surface-alt`.
5. Match existing spacing and breakpoint style instead of introducing a new scale.

## Known Repo Details

- `components.json` declares aliases under `@/components`, `@/lib`, and `@/hooks`.
- The project is RSC-aware, so event handlers and hooks require `"use client"`.
- `globals.css` defines the brand surface and heading tokens already used by the landing page.
