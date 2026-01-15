import type { PracticeDifficulty } from "./practice.enum";

/**
 * Vocabulary Word Type
 */
export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  domain: string;
  difficulty: PracticeDifficulty;
  learned: boolean;
}

/**
 * Sentence Practice Type
 */
export interface SentencePractice {
  id: string;
  sentence: string;
  translation?: string;
  context: string;
  domain: string;
  difficulty: PracticeDifficulty;
  completed: boolean;
}

/**
 * Reading Article Type
 */
export interface ReadingArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  keyVocabulary: string[];
  difficulty: PracticeDifficulty;
  estimatedMinutes: number;
  completed: boolean;
}
