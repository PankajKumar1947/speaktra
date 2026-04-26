---
name: speaktra-web-ui-integration
description: Builds or updates Speaktra web UI in the Next.js app using existing shadcn, Tailwind, auth-form, and landing-page patterns. Use when implementing web pages, form UIs, practice views, or presentational components in apps/web.
---

# Speaktra Web UI Integration

## Overview

Use this skill for UI work inside `apps/web`. It assumes the app uses Next.js App Router, Tailwind v4, `base-nova` shadcn components, and the existing Speaktra token set from `app/globals.css`.

Read these files first:

- `apps/web/components.json`
- `apps/web/app/globals.css`
- `apps/web/app/layout.tsx`
- the closest route/component you are editing

If the work uses shadcn UI primitives, also use the local `shadcn` skill.

For web-specific patterns, read [web-patterns.md](./references/web-patterns.md).

## Workflow

1. Find the closest existing page pattern.
   Prefer matching route-local components under the same feature folder.
2. Reuse the current tokens.
   Pull color, spacing, and radius from `globals.css` and existing component usage.
3. Preserve App Router boundaries.
   Add `"use client"` only when the component actually needs client behavior.
4. Prefer existing UI primitives.
   Use `apps/web/components/ui/*` before custom markup.
5. Keep layout responsive.
   Match the current mobile-first class style seen in landing and auth screens.

## Rules

- Do not hardcode API URLs, domain IDs, or sample data into UI components.
- Do not introduce a second design system.
- Do not invent new color values when an existing semantic token fits.
- Keep form validation errors close to their inputs.
- When adding a new section, search for a similar component in `components/landing`, `components/common`, or the same route group first.

## Good Targets

- `apps/web/app/(auth)/_components/*`
- `apps/web/app/practice/**/_components/*`
- `apps/web/components/common/*`
- `apps/web/components/landing/*`

## One Example

If asked to add a new practice card on the web app, inspect the nearest `apps/web/app/practice/**/_components` files first, reuse `Card`, `Button`, `Badge`, and existing brand tokens, and keep any data passed in through props instead of hardcoding copy or IDs.

## Example Prompt

Use `$speaktra-web-ui-integration` to add a new responsive web practice component in `apps/web` that follows the current shadcn and brand-token conventions.
