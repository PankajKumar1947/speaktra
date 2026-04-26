---
name: speaktra-mobile-ui-integration
description: Builds or updates Speaktra mobile UI in the Expo Router app using the shared theme constants, reusable components, and route-group patterns. Use when implementing screens, cards, forms, or navigation-facing UI in apps/mobile.
---

# Speaktra Mobile UI Integration

## Overview

Use this skill for visual work inside `apps/mobile`. The app uses Expo Router, React Native primitives, and a local theme module in `apps/mobile/constants/theme.ts`.

Read these files first:

- `apps/mobile/app/_layout.tsx`
- `apps/mobile/constants/theme.ts`
- the nearest route in `apps/mobile/app`
- the nearest reusable component in `apps/mobile/components`

For current patterns, read [mobile-patterns.md](./references/mobile-patterns.md).

## Workflow

1. Identify the route group.
   Match `(auth)`, `(tabs)`, or the relevant nested feature folder.
2. Reuse the theme.
   Pull colors, spacing, radii, shadows, and sizes from `Theme`.
3. Reuse local components first.
   Check `Button`, `Input`, `Card`, and shared layout patterns before writing new primitives.
4. Keep screens mobile-first and safe-area aware.
5. Keep state and side effects outside purely presentational components when possible.

## Rules

- Do not hardcode pixel systems that ignore `Theme.spacing` and `Theme.components`.
- Do not duplicate the same button or card styling across screens when a shared component fits.
- Do not hardcode API or auth data into a visual component.
- Favor route-local composition with reusable components over giant screen files.

## One Example

If asked to add a new mobile onboarding card, inspect the nearest `(auth)` screen, reuse `Theme.colors`, `Theme.spacing`, and `components/Card.tsx` if it fits, and pass dynamic copy through props or screen state instead of fixing values directly in the shared component.

## Example Prompt

Use `$speaktra-mobile-ui-integration` to build a new Expo Router screen in `apps/mobile` that follows the current theme and reusable component conventions.
