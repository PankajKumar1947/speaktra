---
name: speaktra-schema-type-definition
description: Defines or updates shared Zod schemas and inferred TypeScript types for Speaktra features. Use when adding or changing contracts that should stay consistent across NestJS, API client, web, and mobile layers.
---

# Speaktra Schema Type Definition

## Overview

Use this skill for work inside `packages/schema` and for keeping contract changes aligned across the monorepo. This is the right place to start whenever a feature changes payload shape, enum values, or validation rules.

Read these files first:

- `packages/schema/src/index.ts`
- the target feature folder in `packages/schema/src`
- the matching Nest DTOs in `apps/api/src/**/dto`
- the matching API client and query files if the contract is already consumed

For contract rules, read [schema-checklist.md](./references/schema-checklist.md).

## Workflow

1. Identify the feature folder in `packages/schema/src/<feature>`.
2. Update the Zod schema first.
3. Export inferred types from the feature `*.type.ts` file.
4. Ensure the feature `index.ts` re-exports the schema and types.
5. Check the Nest DTOs that wrap the schema with `createZodDto`.
6. Update downstream API client, query, web, and mobile code that consumes the contract.

## Rules

- Do not hardcode duplicate TypeScript interfaces in app layers when the type belongs in `packages/schema`.
- Keep create and update variants derived from the main entity schema when possible.
- Keep validation close to the shared schema instead of scattering it across apps.
- Preserve naming consistency across `*.schema.ts`, `*.type.ts`, and `index.ts`.

## One Example

If a feature gains a new optional field, update the base Zod entity schema first, derive the create or update schemas from it, export the inferred types, and only then adjust DTOs and consumers in the API, web, and mobile layers.

## Example Prompt

Use `$speaktra-schema-type-definition` to add or refine a shared schema so the API, client, and app layers stay in sync.
