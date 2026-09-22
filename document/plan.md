# Daily Challenge — Word Bank Refactor Plan

## Overview

Replace the dynamic AI-based vocabulary selection with a **curated JSON word bank** approach.  
Domain is no longer a DB entity — it becomes a **typed enum** shared across the monorepo via `@repo/schema`.  
The AI's role shrinks to **enrichment only** (meaning, examples, difficulty) — word selection is deterministic and controlled.

---

## Goals

- Unique, non-repeating vocabulary per domain × level combination
- Thematic cohesion — each daily challenge's 5 words come from the same theme
- Deterministic delivery — given a `sequenceNumber`, the words are always predictable
- No DB overhead for domain management
- Append-only word bank — safe to extend without breaking history

---

## Architecture

```
packages/schema/
  src/common/common.enum.ts     ← ADD: Domain enum here (alongside Level, Difficulty)

apps/api/src/daily-challenge/
  word-banks/
    medical/
      beginner.json             ← { themes: [...], words: { theme: [{word, meaning}] } }
      intermediate.json
      advanced.json
    technology/
      beginner.json
      ...
    business/
      ...
  word-bank.service.ts          ← NEW: loads, caches, slices window
  scripts/
    generate-word-bank.ts       ← ONE-TIME: generates word bank JSONs via Mistral
```

---

## Word Bank JSON Structure

Each file is a **theme-keyed object** with an ordered `themes` array and a `words` map.  
Themes rotate **weekly** (7 days per theme).  
New words are always **appended** to a theme's array — never inserted mid-array.

```json
{
  "themes": ["anatomy", "pharmacology", "diagnostics", "procedures", "symptoms"],
  "words": {
    "anatomy": [
      { "word": "suture",    "meaning": "a stitch used to close a wound" },
      { "word": "femur",     "meaning": "the longest bone in the human body" },
      { "word": "cortex",    "meaning": "the outer layer of an organ or structure" },
      { "word": "ligament",  "meaning": "fibrous tissue connecting bones" },
      { "word": "tendon",    "meaning": "cord connecting muscle to bone" }
      // ... 70+ total words per theme
    ],
    "pharmacology": [ ... ],
    "diagnostics":  [ ... ]
  }
}
```

**Rules:**

- Each theme must have **minimum 35 words** (7 days × 5 words = 1 full weekly cycle)
- Ideal is **70–105 words** per theme → 2–3 full rotations before any word repeats
- Theme order in the `themes` array is the rotation order — fixed, never shuffled
- To add words: append to the theme's array. Safe — no index shift.

---

## Weekly Theme Rotation Logic

```ts
const DAYS_PER_THEME = 7;
const WORDS_PER_DAY = 5;

// Which week are we on? (0-based)
const weekIndex = Math.floor((sequenceNumber - 1) / DAYS_PER_THEME);

// Which theme? Loops back when all themes exhausted
const themeIndex = weekIndex % wordBank.themes.length;
const currentTheme = wordBank.themes[themeIndex];

// Which day within the current week? (0–6)
const dayWithinWeek = (sequenceNumber - 1) % DAYS_PER_THEME;

// Slice 5 words for today, looping within theme if it runs short
const themeWords = wordBank.words[currentTheme];
const wordStart = (dayWithinWeek * WORDS_PER_DAY) % themeWords.length;
const words = themeWords.slice(wordStart, wordStart + WORDS_PER_DAY);
```

**How it flows:**

| Sequence # | Week                  | Theme (Medical example) | Words used        |
| ---------- | --------------------- | ----------------------- | ----------------- |
| 1–7        | Week 1                | anatomy                 | words[0–34]       |
| 8–14       | Week 2                | pharmacology            | words[0–34]       |
| 15–21      | Week 3                | diagnostics             | words[0–34]       |
| ...        | ...                   | ...                     | ...               |
| N          | After all themes done | loops → anatomy again   | words[0–34] again |

- No extra DB state — `sequenceNumber` (already on `DailyChallenge`) drives everything
- Theme exhaustion = automatic loop via `% themes.length`
- Word exhaustion within a theme = automatic loop via `% themeWords.length`
- At 10 themes × 7 days = **70 days** before the same theme is seen again

---

## Domain Enum (replaces Domain DB collection)

### Location: `packages/schema/src/common/common.enum.ts`

```ts
// ADD to existing common.enum.ts
export enum Domain {
  MEDICAL = "medical",
  TECHNOLOGY = "technology",
  BUSINESS = "business",
  LAW = "law",
  EDUCATION = "education",
  FINANCE = "finance",
  SCIENCE = "science",
  // add more as needed
}

export const DomainEnum = z.nativeEnum(Domain); // for zod validation
```

- Same pattern as existing `Level`, `Difficulty`, `Goal` enums
- Shared across API and mobile via `@repo/schema`
- Word bank folder name = `Domain` enum value (e.g., `Domain.MEDICAL` → `word-banks/medical/`)

---

## Changes Required

### 1. `packages/schema` — Add Domain enum

#### [MODIFY] `common.enum.ts`

- Add `Domain` enum
- Add `DomainEnum` zod schema
- Remove dependency on dynamic domain DB schema

#### [DELETE] `packages/schema/src/domain/` _(entire folder)_

- `domain.schema.ts` — no longer needed
- `domain.type.ts` — no longer needed
- `domain/index.ts` — no longer needed

#### [MODIFY] `packages/schema/src/index.ts`

- Remove `export * from "./domain"`

---

### 2. `apps/api` — Remove Domain module

#### [DELETE] `apps/api/src/domain/` _(entire module folder)_

- `domain.service.ts`
- `domain.controller.ts`
- `domain.module.ts`
- `domain/entities/domain.entity.ts`
- `domain/dto/`

#### [MODIFY] `apps/api/src/app.module.ts`

- Remove `DomainModule` import

---

### 3. `apps/api` — Update User entity

#### [MODIFY] `apps/api/src/users/entities/user.entity.ts`

- Change `domain` field: `ObjectId ref: 'Domain'` → `String enum: Domain`

```ts
// Before
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: false })
domain?: string;

// After
@Prop({ required: false, type: String, enum: Domain })
domain?: Domain;
```

---

### 4. `apps/api` — Update DailyChallenge entity

#### [MODIFY] `apps/api/src/daily-challenge/entities/daily-challenge.entity.ts`

- Change `domain` field: `ObjectId ref: 'Domain'` → `String enum: Domain`

```ts
// Before
@Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Domain' })
domain!: mongoose.Types.ObjectId;

// After
@Prop({ required: true, type: String, enum: Domain })
domain!: Domain;
```

---

### 5. `apps/api` — Daily Challenge module refactor

#### [MODIFY] `daily-challenge.module.ts`

- Remove `DomainService`, `DomainEntity` from imports/providers
- Add `WordBankService` as provider

#### [NEW] `word-bank.service.ts`

Core responsibilities:

- Load word bank JSON at startup, cache in memory (`Map<string, WordBankFile>`)
- Expose `getWordsForDay(domain: Domain, level: Level, sequenceNumber: number): WordBankEntry[]`
- Also expose `getCurrentTheme(domain, level, sequenceNumber): string` for the API response
- Weekly rotation logic lives here

```ts
interface WordBankEntry {
  word: string;
  meaning: string;
}

interface WordBankFile {
  themes: string[];
  words: Record<string, WordBankEntry[]>;
}
```

#### [MODIFY] `daily-challenge.service.ts`

- Replace `domainService.findAll()` loop with `Object.values(Domain)`
- Replace `vocabularyService.getLastNVocabularies()` + AI word generation  
  with `wordBankService.getWordsForDay(domain, level, sequenceNumber)`
- AI call now receives: `word + meaning` → enriches with `difficulty`, `noun/verb/adj/adv forms`, `examples`
- Include `currentTheme` in the daily challenge response

#### [MODIFY] `ai-content-generation.service.ts`

- `generateVocabularies()` signature changes:
  - **Input**: `{ words: WordBankEntry[], domain, level }` (no more forbidden list)
  - **Output**: same enriched vocabulary structure
- Prompt becomes enrichment-focused, not open-ended generation

#### [MODIFY] `ai-prompts/vocabulary.prompt.ts`

- Rewrite prompt: "Given these words and their base meanings, enrich each with difficulty, and at least one form (noun/verb/adjective/adverb) with meaning and example"

---

### 6. One-time Word Bank Generation Script

#### [NEW] `scripts/generate-word-bank.ts`

- For each `Domain × Level` combination, call Mistral to generate the word bank JSON
- Output: writes to `word-banks/{domain}/{level}.json`
- Run once manually → review output → commit to repo
- Each theme must have **at least 70 words** (2 full weekly rotations)

**Domains to generate for (initial set):**

- `medical` × `[beginner, intermediate, advanced]`
- `technology` × `[beginner, intermediate, advanced]`
- `business` × `[beginner, intermediate, advanced]`

**Themes per domain (example — Medical, in rotation order):**

| Order | Theme            | Description                      |
| ----- | ---------------- | -------------------------------- |
| 1     | `anatomy`        | Body parts and structures        |
| 2     | `pharmacology`   | Drugs and medications            |
| 3     | `diagnostics`    | Tests and examinations           |
| 4     | `procedures`     | Medical procedures and surgeries |
| 5     | `symptoms`       | Signs and symptoms of illness    |
| 6     | `nutrition`      | Diet and health                  |
| 7     | `psychology`     | Mental health                    |
| 8     | `emergency`      | Emergency and critical care      |
| 9     | `pathology`      | Disease and disorders            |
| 10    | `rehabilitation` | Recovery and therapy             |

With 10 themes: same theme repeats every **70 days**. At 70 words/theme: same word repeats every **70 days**.

---

### 7. DB Migration (existing data)

> [!WARNING]
> Existing `User.domain` and `DailyChallenge.domain` fields are MongoDB ObjectIds referencing the `Domain` collection.
> After this change they will be plain strings (Domain enum values).
> A one-time migration script is needed.

#### [NEW] `scripts/migrate-domain-objectid-to-enum.ts`

- For each user: lookup `domain` ObjectId → find domain name → map to `Domain` enum value → update user
- For each daily challenge: same lookup and update
- Drop `Domain` collection after migration

---

## Word Bank Versioning (Future-proof)

When extending a theme's word list:

- **Always append** new words to the end of a theme's array — never insert mid-array
- New words will naturally be consumed when the rotation cycles back to that theme
- For major restructuring of themes: create `beginner.v2.json` and track active version per domain/level

---

## Verification Plan

### After Schema Changes

- `@repo/schema` builds without errors: `yarn build` in `packages/schema`
- `Domain` enum importable in API and mobile: `import { Domain } from '@repo/schema'`

### After API Changes

- API compiles: `yarn build` in `apps/api`
- `WordBankService` unit test: verify window returns correct 5 words for given `sequenceNumber`
- `WordBankService` unit test: verify theme rotates correctly every 7 days
- `POST /daily-challenge/generate` still works end-to-end
- `GET /daily-challenge/:id` returns populated vocabularies, sentences, articles + `currentTheme`

### Manual Checks

- Run word bank generation script → verify JSON files look correct
- Generate 7 consecutive daily challenges → verify all 7 days share the same theme
- Generate day 8 → verify theme changes
- Verify no duplicate words appear within a week's challenges

---

## Open Questions

1. **Which domains to launch with?** Suggested: `medical`, `technology`, `business` — confirm?
2. **Themes per domain** — should these be defined in code (config file) or only in the JSON `themes` array?
3. **Mobile onboarding** — currently fetches domain list from `GET /domain`. After this change, where does the domain list + display labels come from?
   - Static config in mobile (hardcoded from `Domain` enum)
   - New `GET /domain/list` endpoint that returns `Domain` enum values with display labels
4. **Expose theme to user?** e.g. _"This week's theme: Anatomy 🫀 — Day 3 of 7"_ — include `currentTheme` + `dayInWeek` in the daily challenge response?
5. **Migration timing** — should migration run before or alongside deployment of this change?
