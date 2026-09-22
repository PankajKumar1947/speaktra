import { Domain, Level, WordEntry } from '@repo/schema';

export class GenerateVocabDto {
  domain!: Domain;
  level!: Level;
  theme?: string;
  words!: WordEntry[];
}

export class GenerateSentenceDto {
  domain!: Domain;
  level!: Level;
  theme?: string;
  vocabularyWords?: string[];
  count?: number;
}

export class GenerateArticleDto {
  domain!: Domain;
  level!: Level;
  theme?: string;
  vocabularyWords?: string[];
  count?: number;
}

export class FindDailyLessonBySequenceDto {
  domain!: Domain;
  level!: Level;
  sequenceNumber!: number;
}
