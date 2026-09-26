# Daily Lesson — Word Bank Plan

## Overview

Word banks live in the **`speaktra-content`** repo (served via CDN, fetched by `SpeaktraContentService.fetchJson()`), **not** in `apps/api`.

Each domain stores **one file per difficulty** (`easy` / `medium` / `hard`) plus a `themes.json` holding the theme order. `Level` is a **mix ratio** applied at selection time:

- beginner: **2 easy + 2 medium + 1 hard**
- intermediate: **1 easy + 2 medium + 2 hard**
- advanced: **0 easy + 2 medium + 3 hard**

The AI's role is **enrichment only** (forms, examples). Difficulty always comes from the filename a word was loaded from.

---

## Goals

- Single source of truth per word (one bucket per difficulty)
- Single source of truth for theme order (`themes.json` per domain)
- Thematic cohesion — each day's 5 words come from the same theme
- Deterministic delivery — given `(domain, level, sequenceNumber)`, words are predictable
- Append-only — safe to extend without breaking history
- Small files, focused diffs — ~30–80 KB per file, parallel generation per difficulty

---

## Architecture (speaktra-content repo)

```
speaktra-content/
  word-banks/
    medical/
      themes.json     ← { themes: [...] } — single source of truth for order
      easy.json       ← { words: { theme: [{word, meaning}] } }
      medium.json     ← { words: {...} }
      hard.json       ← { words: {...} }
    technology/
      themes.json
      easy.json
      medium.json
      hard.json
    business/
      ...
```

Four files per `Domain` enum value: `word-banks/{domain}/themes.json` + `word-banks/{domain}/{difficulty}.json`.

API fetch paths (themes once + only the difficulty files the level mix needs):

```
word-banks/${domain}/themes.json
word-banks/${domain}/easy.json
word-banks/${domain}/medium.json
word-banks/${domain}/hard.json
```

Fetch count per generation: themes (1, cached) + beginner 3 / intermediate 3 / advanced 2 difficulty files. `WordBankService` caches per `domain` (themes) and per `domain/difficulty` (banks).

---

## Word Bank JSON Structure

Theme order lives in exactly one place — `word-banks/{domain}/themes.json`. Each difficulty file holds only a `words` map keyed by those themes. New words are always **appended** to a theme's array — never inserted mid-array. New themes are appended to `themes.json` **and** added as keys in all three difficulty files.

`word-banks/medical/themes.json`:

```json
{ "themes": ["anatomy", "pharmacology", "diagnostics"] }
```

`word-banks/medical/easy.json`:

```json
{
  "words": {
    "anatomy": [
      { "word": "fever", "meaning": "abnormally high body temperature" },
      { "word": "wound", "meaning": "an injury to the skin or tissue" }
    ],
    "pharmacology": [ ... ]
  }
}
```

`word-banks/medical/medium.json` / `hard.json`: same shape, e.g. `medium/anatomy` holds `suture`, `ligament`; `hard/anatomy` holds `idiopathic`, `thrombocytopenia`.

**Rules:**

- `themes.json` order = rotation order — fixed, never shuffled, never reordered. Append new themes at the end **and** add matching keys to all three difficulty files.
- Difficulty is implicit from the filename, attached by the API as `difficulty` on selection.
- No duplicate `word` (case-insensitive) within a difficulty file, across the three difficulty files, or across themes within a domain.
- Each entry is `{ word: string, meaning: string }`.
- To add words: append to the end of the theme's array in the relevant difficulty file. Safe — no index shift.
- File size guide: ~1,000 entries ≈ 65–120 KB minified (~150–200 KB pretty-printed). Per-file sizes stay well under that (see minimums below).

---

## Level Mix

```ts
export const LEVEL_MIX = {
  beginner: { easy: 2, medium: 2, hard: 1 },
  intermediate: { easy: 1, medium: 2, hard: 2 },
  advanced: { easy: 0, medium: 2, hard: 3 },
} as const;
```

Total is always 5 words/day. All 5 come from the **same theme** (looked up in each difficulty file by the slug from `themes.json`).

---

## Word Counts Per Theme (minimums)

One theme is served for a full 7-day block. Weekly take per bucket = 7 days × max daily take across levels:

| File (`{domain}/`) | Daily take (beginner / intermediate / advanced) | Per-week max | Min (repeat-free week) | Standard |
| ------------------ | ----------------------------------------------- | ------------ | ---------------------- | -------- |
| `easy.json`        | 2 / 1 / 0                                       | 14           | **14**                 | 35       |
| `medium.json`      | 2 / 2 / 2                                       | 14           | **14**                 | 35       |
| `hard.json`        | 1 / 2 / 3                                       | 21           | **21**                 | 35       |

Content standard is **35 words per theme per file**. Below the minimum, words repeat within the same week. Windows shift forward each full rotation (see selection logic), so every word is eventually served — oversized buckets are waste, not variety.

---

## Selection Logic (API `WordBankService`)

```ts
const DAYS_PER_THEME = 7;

const LEVEL_OFFSET = { beginner: 0, intermediate: 13, advanced: 29 };
// offsets desync tracks sharing the same pool so
// beginner-day-1 and advanced-day-1 don't serve identical medium/hard words

function sliceBucket(
  bucket: WordEntry[],
  need: number,
  dayWithinWeek: number,
  levelOffset: number,
  cycleShift: number,
): WordEntry[] {
  if (need === 0) return [];
  const start =
    (cycleShift + dayWithinWeek * need + levelOffset) % bucket.length;
  let out = bucket.slice(start, start + need);
  if (out.length < need) out = out.concat(bucket.slice(0, need - out.length)); // wrap
  return out;
}

// per day:
// 1. Load themes.json (cached per domain) + only the difficulty files in LEVEL_MIX[level].
// 2. Resolve theme + slices:
const weekIndex = Math.floor((sequenceNumber - 1) / DAYS_PER_THEME);
const currentTheme = themes[weekIndex % themes.length]!;
const cycleIndex = Math.floor(weekIndex / themes.length); // full rotations completed
const dayWithinWeek = (sequenceNumber - 1) % DAYS_PER_THEME;
const mix = LEVEL_MIX[level];
// per bucket: cycleShift = (cycleIndex * mix[bucket] * DAYS_PER_THEME) % bucket.length
// shifts each revisit window forward one week's worth → full coverage over rotations,
// appended words get picked up, no word is dead weight.

const offset = LEVEL_OFFSET[level];
const words = [
  ...sliceBucket(
    easyBank.words[currentTheme] ?? [],
    mix.easy,
    dayWithinWeek,
    offset,
    cycleShiftFor("easy"),
  ).map((w) => ({ ...w, difficulty: "easy" })),
  ...sliceBucket(
    mediumBank.words[currentTheme] ?? [],
    mix.medium,
    dayWithinWeek,
    offset,
    cycleShiftFor("medium"),
  ).map((w) => ({ ...w, difficulty: "medium" })),
  ...sliceBucket(
    hardBank.words[currentTheme] ?? [],
    mix.hard,
    dayWithinWeek,
    offset,
    cycleShiftFor("hard"),
  ).map((w) => ({ ...w, difficulty: "hard" })),
];
// words.length === 5, all same theme
```

- No extra DB state — `sequenceNumber` (already on `DailyLesson`) drives everything.
- Theme exhaustion loops via `% themes.length`; bucket exhaustion wraps within the bucket.
- Returned words carry preset `difficulty` from the source filename — the vocab prompt keeps it as-is and `generateVocab` forces it on save.
- Missing theme key or empty bucket in any required file → throw (content bug, fail generation loudly).

### Schema types (`@repo/schema`)

```ts
interface WordEntry {
  word: string;
  meaning: string;
}

interface SelectedWord extends WordEntry {
  difficulty: Difficulty; // from source filename, forced on save
}

interface DomainThemes {
  themes: string[]; // word-banks/{domain}/themes.json — single source of truth
}

interface DifficultyBank {
  words: Record<string, WordEntry[]>; // word-banks/{domain}/{difficulty}.json
}

interface DailyWordSelection {
  theme: string;
  words: SelectedWord[]; // length 5, all same theme
}
```

---

## API Implementation

### `apps/api/src/daily-lesson/word-bank.service.ts`

- `getDomainThemes(domain)` — fetch `word-banks/${domain}/themes.json`, cache per `domain`.
- `getDifficultyBank(domain, difficulty)` — fetch words-only `word-banks/${domain}/${difficulty}.json`, cache per `domain/difficulty`.
- `hasWordBank(domain, level)` — verify themes file + every theme non-empty in each mix-required bank.
- `getDailyWords(domain, level, sequenceNumber)` — load themes + mix-required banks in parallel, implement mix + offset + cycle-shift logic from above.

### `apps/api/src/daily-lesson/prompts/vocab.prompt.ts`

- Input `SelectedWord[]` carries preset `difficulty`. Prompt lists it and instructs: **"Keep the given difficulty as-is. Do NOT reassign."**

### Generation pipeline (`daily-lesson.inngest.ts` / service)

- `getDailyWords` → `generateVocab` (bank difficulty forced on save, off-list words dropped) → sentences → articles → save lesson with `currentTheme`.

---

## Word Bank Generation Script (for speaktra-content)

### `scripts/generate-word-bank.ts` (run manually, commit output to speaktra-content)

- For each `Domain` in `[medical, technology, business]` (initial set), for each `Difficulty` in `[easy, medium, hard]`:
  1. Generate ordered `themes` array once per domain → write `word-banks/{domain}/themes.json`.
  2. Generate per-theme word arrays meeting the minimums above → `word-banks/{domain}/{difficulty}.json` (words-only).
  3. Validate: every difficulty file's `words` keys match `themes.json` exactly; no cross-file or cross-theme duplicates (case-insensitive); all meanings present and domain-specific; files parse against `DomainThemes` / `DifficultyBank` schemas.
- Output: `word-banks/{domain}/themes.json` + three words files per domain.
- Uses Mistral (one job per difficulty, retryable independently); human review before commit.

**Themes per domain (example — medical, in rotation order):**

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

Difficulty calibration: `easy` = high-frequency / concrete, `medium` = professional working vocabulary, `hard` = low-frequency jargon / abstract.

---

## Versioning

- Append-only within each theme array and within `themes.json`. Cycle-shifted windows pick new words up on the next rotation — no index shift.
- Never reorder or delete existing entries in place. Restructuring themes means publishing a new versioned set of files.

---

## Verification Plan

### Content validation (speaktra-content CI)

- `themes.json` validates against `DomainThemes` (non-empty); each difficulty file validates against `DifficultyBank` with `words` keys matching `themes.json` exactly, minimums met.
- No duplicates: lint script checks case-insensitive `word` uniqueness per domain across all three files.
- Spot-check: 7 consecutive days of each level share one theme; day 8 changes theme.

### API checks

- `WordBankService` unit test: `(medical, beginner, seq=1)` loads 3 files, returns 2 easy + 2 medium + 1 hard, all with `difficulty` set, same theme.
- Unit test: `(medical, intermediate, seq=1)` loads 3 files, returns 1/2/2; `(medical, advanced, seq=1)` returns 0/2/3.
- Unit test: missing theme key in a difficulty file throws with file name.
- Unit test: beginner-day-1 vs advanced-day-1 medium/hard words differ (offset works).
- Unit test: wrap-around when `dayWithinWeek * need` exceeds bucket length.
- End-to-end: trigger generation for `medical × [beginner, intermediate, advanced]` × 8 days → correct themes, no duplicates within a week, vocab `difficulty` matches source file.

---

## Open Questions

1. Launch domains: `medical`, `technology`, `business` — confirmed.
2. Beginner mix `2-2-1` is challenging (60% non-easy) — keep, or soften week 1 to `3-1-1`? Currently keeping `2-2-1` on the assumption users are professionals, not true English beginners.
3. Mobile onboarding domain list — out of scope for content repo; API exposes `Domain` enum values with display labels.
4. Expose theme to user? e.g. _"This week's theme: Anatomy — Day 3 of 7"_ — include `currentTheme` + `dayInWeek` in daily lesson response (recommended yes).
