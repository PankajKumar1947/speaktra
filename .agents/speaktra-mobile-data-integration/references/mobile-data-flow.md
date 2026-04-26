# Mobile Data Flow

## Chain To Follow

For mobile features, the preferred flow is:

1. `packages/schema`
2. `packages/api-client`
3. `packages/query`
4. `apps/mobile`

## Existing Runtime Wiring

- `apps/mobile/app/_layout.tsx` mounts `ReactQueryProvider` and `AuthProvider`.
- `packages/api-client/src/services/axios.ts` already handles bearer token injection and refresh retry logic.

## Review Checklist

- Is the request function shared instead of embedded in a screen?
- Is the hook reusable across screens?
- Are auth failures surfaced through existing context callbacks instead of local token code?
- Are loading and error states rendered in the UI?
