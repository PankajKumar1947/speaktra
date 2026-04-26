# Backend Slice

## Typical Feature Shape

Most API features in `apps/api/src/<feature>` follow this layout:

- `<feature>.module.ts`
- `<feature>.controller.ts`
- `<feature>.service.ts`
- `dto/*`
- `entities/*`

## Current Repo Practices

- DTOs often wrap shared Zod schemas through `createZodDto`.
- Controllers stay thin and hand off to services.
- Services own orchestration and persistence decisions.
- Guards and role checks are applied per-route, not globally by default.
- Mongoose entities define the Mongo document shape, while `packages/schema` defines shared contracts.

## Integration Checklist

1. Does the request or response contract belong in `packages/schema`?
2. Is the controller only routing and delegating?
3. Is service logic reusable and testable?
4. Is the route exposed through `packages/api-client` if apps need it?
