---
name: speaktra-mobile-data-integration
description: Connects Speaktra mobile screens to shared query hooks, API client flows, auth state, and schema contracts. Use when wiring apps/mobile screens to backend data without hardcoding endpoints, tokens, or payload types.
---

# Speaktra Mobile Data Integration

## Overview

Use this skill when a change in `apps/mobile` needs real data, mutations, auth-aware API calls, or query caching. The mobile app already gets React Query and auth providers from the app root layout.

Read these files first:

- the target screen in `apps/mobile/app`
- `apps/mobile/app/_layout.tsx`
- `apps/mobile/contexts/auth-context.tsx`
- the relevant files in `packages/query`, `packages/api-client`, and `packages/schema`

For the contract chain, read [mobile-data-flow.md](./references/mobile-data-flow.md).

## Workflow

1. Start from the screen requirement.
2. Find the shared type or schema in `packages/schema`.
3. Find or add the API client route in `packages/api-client`.
4. Find or add the React Query hook in `packages/query`.
5. Consume the hook in the mobile screen and connect loading, empty, and error UI states.
6. If auth is involved, reuse the existing auth context and axios token refresh path.

## Rules

- Do not hardcode `API_URL`, access tokens, or refresh logic in screens.
- Do not create one-off fetch wrappers inside mobile components when a shared hook belongs in `packages/query`.
- Keep the data contract shared between web and mobile whenever the backend resource is shared.
- Prefer schema-derived types over custom mobile-only request types.

## One Example

If a mobile practice screen needs daily challenge content, start with the shared `daily-challenge` schema and client exports, then expose the data through a reusable query hook and render the result in the screen rather than calling axios directly from the route file.

## Example Prompt

Use `$speaktra-mobile-data-integration` to connect a mobile screen to shared API-client and React Query layers with auth-safe data handling.
