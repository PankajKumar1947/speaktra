---
name: speaktra-backend-integration
description: Builds or extends Speaktra backend features in the NestJS API using shared schemas, feature modules, controllers, services, Mongoose models, and auth guards. Use when implementing or wiring server-side endpoints in apps/api.
---

# Speaktra Backend Integration

## Overview

Use this skill for API-side work inside `apps/api`. It fits feature additions, route changes, DTO alignment, service wiring, guard usage, and Mongoose-backed module work.

Start with:

- `apps/api/src/app.module.ts`
- the closest feature module under `apps/api/src`
- the matching shared contract in `packages/schema`
- the nearest similar controller/service/entity trio

For a backend slice map, read [backend-slice.md](./references/backend-slice.md).

## Workflow

1. Start from the contract.
   Confirm whether the schema already exists in `packages/schema`.
2. Update or create the Nest feature slice.
   Module, controller, service, DTOs, and entity should evolve together.
3. Wire authorization deliberately.
   Reuse `AuthGuard`, `RolesGuard`, and `Roles` only where the route actually requires them.
4. Keep persistence concerns in the service and entity layer.
5. Update downstream consumers in `packages/api-client` and `packages/query` if the API surface changes.

## Rules

- Do not hardcode validation logic separately from shared schema contracts if the request shape belongs in `packages/schema`.
- Do not place business logic in controllers.
- Do not add app-specific response assumptions to shared types without checking current consumers.
- Prefer following the existing feature folder structure already used by `vocabulary`, `sentence`, `article`, and `daily-challenge`.

## One Example

If you add a new API endpoint for a feature, define or confirm the shared schema first, wrap it with a DTO if needed, add the controller route, keep orchestration in the service, and then expose the new contract through `packages/api-client` instead of telling web or mobile to call a raw URL.

## Example Prompt

Use `$speaktra-backend-integration` to add or modify a NestJS feature in `apps/api` while keeping DTOs, guards, Mongoose models, and shared contracts aligned.
