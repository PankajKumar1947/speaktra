export class GenerateVocabularyDto {
  domain!: string;
  level!: string;
  count!: number;
  lastVocabularies!: string[];
}

export class GenerateSentencesDto {
  domain!: string;
  level!: string;
  count!: number;
  vocabBasedOn!: string[];
}
