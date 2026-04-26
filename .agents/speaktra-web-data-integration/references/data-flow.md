# Data Flow

## Chain To Follow

For most web features, the clean path is:

1. `packages/schema`
2. `packages/api-client/src/react-queries`
3. `packages/api-client/src/routes`
4. `packages/query`
5. `apps/web`

## Why This Matters

- `packages/schema` holds shared Zod schemas and inferred TypeScript types.
- `packages/api-client` centralizes endpoints, axios usage, auth handling, and request functions.
- `packages/query` wraps those calls in React Query hooks that the app can consume.
- `apps/web` should stay focused on rendering and interaction.

## Auth Notes

- `packages/api-client/src/services/axios.ts` owns the access-token header and refresh-token retry flow.
- Avoid duplicating refresh or retry logic in web components.

## Review Checklist

- Is the endpoint defined once in `packages/api-client`?
- Is the request payload type imported from `@repo/schema`?
- Is cache key naming aligned with the existing feature pattern?
- Does the UI handle loading and error states instead of assuming success?
