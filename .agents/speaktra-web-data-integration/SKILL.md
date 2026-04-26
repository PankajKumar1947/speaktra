---
name: speaktra-web-data-integration
description: Connects Speaktra web features to shared query hooks, API client routes, auth context, and schema contracts. Use when wiring apps/web pages or components to backend data without hardcoding endpoints or payload shapes.
---

# Speaktra Web Data Integration

## Overview

Use this skill when the change touches data flow in `apps/web`, especially when a page needs to consume or mutate API state through `@repo/query` and `@repo/api-client`.

Start by reading:

- the target page or component in `apps/web`
- `packages/query/src/index.ts`
- the relevant hook file in `packages/query/src/query` or `packages/query/src/mutation`
- the matching route definition in `packages/api-client/src/react-queries`
- the matching API call in `packages/api-client/src/routes`
- the related schema in `packages/schema`

For the contract chain, read [data-flow.md](./references/data-flow.md).

## Workflow

1. Find the feature contract in `packages/schema`.
2. Locate the route key and endpoint builder in `packages/api-client/src/react-queries`.
3. Locate the request function in `packages/api-client/src/routes`.
4. Reuse or extend the existing React Query hook in `packages/query`.
5. Consume the hook from `apps/web` and keep loading, empty, success, and error states explicit.

## Rules

- Do not hardcode endpoint strings in `apps/web`.
- Do not duplicate Zod shapes in the web app.
- Do not bypass `@repo/query` unless the feature clearly needs a one-off fetch.
- Keep auth-dependent pages aligned with the existing auth context and token refresh flow.
- Prefer deriving payload types from shared schema exports rather than local interfaces.

## One Example

If a web page needs vocabulary data by domain, look for the existing `vocabularyQueries.findByDomain`, `findVocabulariesByDomain`, and `useVocabulariesByDomain` flow first, then consume the hook from the page rather than creating a raw fetch inside the component.

## Example Prompt

Use `$speaktra-web-data-integration` to wire a web practice page to shared React Query hooks and the API client while keeping endpoint and type definitions centralized.
