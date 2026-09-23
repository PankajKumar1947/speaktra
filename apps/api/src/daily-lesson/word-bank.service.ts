import { Injectable } from '@nestjs/common';
import {
  Domain,
  Level,
  WordBank,
  WordEntry,
  DailyWordSelection,
} from '@repo/schema';
import { SpeaktraContentService } from '../speaktra-content/speaktra-content.service';

@Injectable()
export class WordBankService {
  constructor(private readonly speaktraContent: SpeaktraContentService) {}

  async hasWordBank(
    domain: Domain | string,
    level: Level | string,
  ): Promise<boolean> {
    try {
      const data = await this.speaktraContent.fetchJson<WordBank>(
        `word-banks/${domain}/${level}.json`,
      );
      return Boolean(data?.themes?.length && data?.words);
    } catch {
      return false;
    }
  }

  async getWordBank(
    domain: Domain | string,
    level: Level | string,
  ): Promise<WordBank> {
    const data = await this.speaktraContent.fetchJson<WordBank>(
      `word-banks/${domain}/${level}.json`,
    );

    if (!data?.themes?.length || !data?.words) {
      throw new Error(`Malformed word bank structure for ${domain}/${level}`);
    }

    return data;
  }

  async getDailyWords(
    domain: Domain | string,
    level: Level | string,
    sequenceNumber: number,
  ): Promise<DailyWordSelection> {
    const wordBank = await this.getWordBank(domain, level);

    const DAYS_PER_THEME = 7;
    const WORDS_PER_DAY = 5;

    if (!wordBank.themes?.length) {
      throw new Error(`Word bank has no themes for ${domain}/${level}`);
    }

    const weekIndex = Math.max(
      0,
      Math.floor((sequenceNumber - 1) / DAYS_PER_THEME),
    );
    const themeIndex = weekIndex % wordBank.themes.length;
    const currentTheme = wordBank.themes[themeIndex]!;

    const dayWithinWeek = Math.max(0, (sequenceNumber - 1) % DAYS_PER_THEME);
    const themeWords: WordEntry[] = wordBank.words[currentTheme] || [];

    if (themeWords.length === 0) {
      throw new Error(
        `No words found for theme "${currentTheme}" in ${domain}/${level}`,
      );
    }

    const wordStart = (dayWithinWeek * WORDS_PER_DAY) % themeWords.length;
    let selectedWords = themeWords.slice(wordStart, wordStart + WORDS_PER_DAY);

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
}
