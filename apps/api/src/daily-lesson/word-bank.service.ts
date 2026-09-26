import { Injectable } from '@nestjs/common';
import {
  Difficulty,
  DifficultyBank,
  Domain,
  DomainThemes,
  Level,
  SelectedWord,
  WordEntry,
  DailyWordSelection,
} from '@repo/schema';
import { SpeaktraContentService } from '../speaktra-content/speaktra-content.service';

const DAYS_PER_THEME = 7;

type LevelMix = Record<Difficulty, number>;

export const LEVEL_MIX: Record<Level, LevelMix> = {
  [Level.BEGINNER]: {
    [Difficulty.EASY]: 2,
    [Difficulty.MEDIUM]: 2,
    [Difficulty.HARD]: 1,
  },
  [Level.INTERMEDIATE]: {
    [Difficulty.EASY]: 1,
    [Difficulty.MEDIUM]: 2,
    [Difficulty.HARD]: 2,
  },
  [Level.ADVANCED]: {
    [Difficulty.EASY]: 0,
    [Difficulty.MEDIUM]: 2,
    [Difficulty.HARD]: 3,
  },
};

// Desync offsets so tracks sharing the same pool don't serve
// identical medium/hard words on the same sequenceNumber.
const LEVEL_OFFSET: Record<Level, number> = {
  [Level.BEGINNER]: 0,
  [Level.INTERMEDIATE]: 13,
  [Level.ADVANCED]: 29,
};

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
  if (out.length < need) {
    out = out.concat(bucket.slice(0, need - out.length));
  }
  return out;
}

@Injectable()
export class WordBankService {
  private readonly themesCache = new Map<string, string[]>();
  private readonly banksCache = new Map<string, DifficultyBank>();

  constructor(private readonly speaktraContent: SpeaktraContentService) {}

  /** Single source of truth for theme order: word-banks/{domain}/themes.json */
  async getDomainThemes(domain: Domain | string): Promise<string[]> {
    const d = String(domain).toLowerCase();
    const cached = this.themesCache.get(d);
    if (cached) return cached;

    const data = await this.speaktraContent.fetchJson<DomainThemes>(
      `word-banks/${d}/themes.json`,
    );

    if (!data?.themes?.length) {
      throw new Error(`Malformed themes file for ${d}`);
    }

    this.themesCache.set(d, data.themes);
    return data.themes;
  }

  async getDifficultyBank(
    domain: Domain | string,
    difficulty: Difficulty | string,
  ): Promise<DifficultyBank> {
    const d = String(domain).toLowerCase();
    const diff = String(difficulty).toLowerCase();
    const key = `${d}/${diff}`;

    const cached = this.banksCache.get(key);
    if (cached) return cached;

    const data = await this.speaktraContent.fetchJson<DifficultyBank>(
      `word-banks/${d}/${diff}.json`,
    );

    if (!data?.words || typeof data.words !== 'object') {
      throw new Error(`Malformed word bank structure for ${d}/${diff}`);
    }

    this.banksCache.set(key, data);
    return data;
  }

  /**
   * Level-aware check: verifies the themes file plus every difficulty file
   * required by the level mix exist, and every theme has words in each one.
   * Signature kept so existing callers (scheduler) don't change.
   */
  async hasWordBank(
    domain: Domain | string,
    level: Level | string,
  ): Promise<boolean> {
    try {
      const mix = LEVEL_MIX[String(level).toLowerCase() as Level];
      if (!mix) return false;

      const difficulties = (Object.values(Difficulty) as Difficulty[]).filter(
        (diff) => mix[diff] > 0,
      );
      if (difficulties.length === 0) return false;

      const [themes, ...banks] = await Promise.all([
        this.getDomainThemes(domain),
        ...difficulties.map((diff) => this.getDifficultyBank(domain, diff)),
      ]);
      return banks.every((bank) =>
        themes.every((theme) => (bank.words[theme]?.length ?? 0) > 0),
      );
    } catch {
      return false;
    }
  }

  async getDailyWords(
    domain: Domain | string,
    level: Level | string,
    sequenceNumber: number,
  ): Promise<DailyWordSelection> {
    const normalizedLevel = String(level).toLowerCase() as Level;
    const mix = LEVEL_MIX[normalizedLevel];
    if (!mix) {
      throw new Error(`Unknown level "${level}" for ${domain}`);
    }
    if (!Number.isInteger(sequenceNumber) || sequenceNumber < 1) {
      throw new Error(
        `Invalid sequenceNumber "${sequenceNumber}" for ${domain}/${level}`,
      );
    }

    const needed = (Object.values(Difficulty) as Difficulty[]).filter(
      (diff) => mix[diff] > 0,
    );
    const [themes, ...banks] = await Promise.all([
      this.getDomainThemes(domain),
      ...needed.map(async (diff) => ({
        difficulty: diff,
        bank: await this.getDifficultyBank(domain, diff),
      })),
    ]);

    const weekIndex = Math.floor((sequenceNumber - 1) / DAYS_PER_THEME);
    const currentTheme = themes[weekIndex % themes.length]!;
    // How many full rotations through all themes have completed.
    // Shifts each visit's window forward by one week's worth of words so
    // every word in a bucket is eventually served (and appended words
    // get picked up) instead of replaying the same window forever.
    const cycleIndex = Math.floor(weekIndex / themes.length);
    const dayWithinWeek = (sequenceNumber - 1) % DAYS_PER_THEME;
    const offset = LEVEL_OFFSET[normalizedLevel] ?? 0;

    const words: SelectedWord[] = [];
    for (const { difficulty, bank } of banks) {
      const bucket: WordEntry[] = bank.words[currentTheme] ?? [];
      if (bucket.length === 0) {
        throw new Error(
          `No words found for theme "${currentTheme}" in ${domain}/${difficulty}`,
        );
      }
      const need = mix[difficulty];
      const cycleShift = (cycleIndex * need * DAYS_PER_THEME) % bucket.length;
      words.push(
        ...sliceBucket(bucket, need, dayWithinWeek, offset, cycleShift).map(
          (w) => ({
            ...w,
            difficulty,
          }),
        ),
      );
    }

    return { theme: currentTheme, words };
  }
}
