# Mobile Patterns

## Current Stack

- Expo Router route groups under `apps/mobile/app`
- React Query provider from `@repo/query`
- Auth provider in `apps/mobile/contexts/auth-context.tsx`
- Theme tokens in `apps/mobile/constants/theme.ts`

## Existing Conventions

- `_layout.tsx` wraps screens with `SafeAreaProvider`, `ReactQueryProvider`, `AuthProvider`, and toast support.
- Shared components already encapsulate common styles.
- Theme constants expose semantic colors, spacing, radii, typography, shadows, and component sizes.

## Integration Checklist

1. Read the closest screen in the same route group.
2. Reuse `Theme` tokens rather than raw values whenever practical.
3. Keep loading and disabled states visible in buttons and inputs.
4. Keep route files thin by extracting repeated UI to `apps/mobile/components` when reuse is likely.
