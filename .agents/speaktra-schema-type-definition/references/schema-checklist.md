# Schema Checklist

## Standard File Set

Most feature folders in `packages/schema/src` follow this shape:

- `feature.schema.ts`
- `feature.type.ts`
- `index.ts`

## Common Pattern

1. Define the full entity schema.
2. Derive create schema by omitting generated fields.
3. Derive update schema as a partial form of the create schema or entity schema.
4. Export inferred types from `feature.type.ts`.
5. Re-export from the feature `index.ts` and package root `src/index.ts`.

## Cross-Repo Follow-Up

After changing a schema:

- Check API DTO wrappers that use `createZodDto`.
- Check `packages/api-client` request and response types.
- Check `packages/query` hooks.
- Check web and mobile consumers.

## Review Questions

- Is the contract defined once in `packages/schema`?
- Are enums imported from shared sources instead of copied?
- Are create and update contracts derived instead of manually duplicated?
