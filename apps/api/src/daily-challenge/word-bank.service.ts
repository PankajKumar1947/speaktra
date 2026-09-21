import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Domain,
  Level,
  WordBank,
  WordEntry,
  DailyWordSelection,
} from '@repo/schema';

interface CacheEntry {
  data: WordBank;
  cachedAt: number;
}

@Injectable()
export class WordBankService {
  private readonly logger = new Logger(WordBankService.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly ttlMs = 1000 * 60 * 60 * 24; // 24 hours

  constructor(private readonly configService: ConfigService) {}

  /**
   * Loads and caches the WordBank JSON for a given domain and level
   */
  async getWordBank(
    domain: Domain | string,
    level: Level | string,
  ): Promise<WordBank> {
    const cacheKey = `${domain}:${level}`.toLowerCase();
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.cachedAt < this.ttlMs) {
      return cached.data;
    }

    const cdnBase = this.configService
      .get<string>('CONTENT_CDN_BASE_URL', 'https://cdn.jsdelivr.net/gh')
      .replace(/\/+$/, '');
    const owner = this.configService.get<string>(
      'CONTENT_REPO_OWNER',
      'PankajKumar1947',
    );
    const repo = this.configService.get<string>(
      'CONTENT_REPO_NAME',
      'speaktra-content',
    );
    const ref = this.configService.get<string>('CONTENT_REPO_REF', 'main');

    const url = `${cdnBase}/${owner}/${repo}@${ref}/word-banks/${domain}/${level}.json`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = (await res.json()) as WordBank;
      if (!data || !Array.isArray(data.themes) || !data.words) {
        throw new Error('Invalid WordBank JSON structure');
      }

      this.cache.set(cacheKey, { data, cachedAt: Date.now() });
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch word bank from CDN for ${cacheKey} (${url})`,
        error,
      );

      // Return stale cache if available
      if (cached) {
        this.logger.warn(`Serving stale cache for ${cacheKey}`);
        return cached.data;
      }

      throw error;
    }
  }

  /**
   * Computes the deterministic 5-word selection for a given daily challenge sequence number
   */
  async getDailyWords(
    domain: Domain | string,
    level: Level | string,
    sequenceNumber: number,
  ): Promise<DailyWordSelection> {
    const wordBank = await this.getWordBank(domain, level);

    const DAYS_PER_THEME = 7;
    const WORDS_PER_DAY = 5;

    if (!wordBank.themes || wordBank.themes.length === 0) {
      throw new Error(`Word bank has no themes for ${domain}/${level}`);
    }

    // Which week are we on? (0-based)
    const weekIndex = Math.max(
      0,
      Math.floor((sequenceNumber - 1) / DAYS_PER_THEME),
    );

    // Which theme? Loops back when all themes exhausted
    const themeIndex = weekIndex % wordBank.themes.length;
    const currentTheme = wordBank.themes[themeIndex]!;

    // Which day within the current week? (0–6)
    const dayWithinWeek = Math.max(0, (sequenceNumber - 1) % DAYS_PER_THEME);

    const themeWords: WordEntry[] = wordBank.words[currentTheme] || [];
    if (themeWords.length === 0) {
      throw new Error(
        `No words found for theme "${currentTheme}" in ${domain}/${level}`,
      );
    }

    // Slice 5 words for today, looping within theme if it runs short
    const wordStart = (dayWithinWeek * WORDS_PER_DAY) % themeWords.length;
    let selectedWords = themeWords.slice(wordStart, wordStart + WORDS_PER_DAY);

    // If slice wraps around due to short length
    if (
      selectedWords.length < WORDS_PER_DAY &&
      themeWords.length >= WORDS_PER_DAY
    ) {
      const remainingNeeded = WORDS_PER_DAY - selectedWords.length;
      selectedWords = selectedWords.concat(
        themeWords.slice(0, remainingNeeded),
      );
    }

    return {
      theme: currentTheme,
      words: selectedWords,
    };
  }

  /**
   * Invalidate cache (useful for webhook sync or manual refresh)
   */
  clearCache(domain?: Domain | string, level?: Level | string): void {
    if (domain && level) {
      this.cache.delete(`${domain}:${level}`.toLowerCase());
    } else {
      this.cache.clear();
    }
  }
}
