import { Mistral } from '@mistralai/mistralai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateArticleSchema,
  CreateSentenceSchema,
  CreateVocabularySchema,
  Level,
} from '@repo/schema';
import { DomainDocument } from 'src/domain/entities/domain.entity';
import z from 'zod';
import { buildVocabularyPrompt } from './ai-prompts/vocabulary.prompt';
import { buildSentencePrompt } from './ai-prompts/sentence.prompt';
import { buildArticlePrompt } from './ai-prompts/article.prompt';
import {
  GenerateSentencesDto,
  GenerateVocabularyDto,
} from './dto/ai-content-generation.dto';

@Injectable()
export class AIContentGenerationService {
  private mistral: Mistral;
  private readonly logger = new Logger(AIContentGenerationService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('MISTRAL_API_KEY');
    if (!apiKey) {
      this.logger.error('MISTRAL_API_KEY is not set');
      throw new Error('MISTRAL_API_KEY is not set');
    }
    this.mistral = new Mistral({ apiKey });
  }

  async generateVocabularies(dto: GenerateVocabularyDto) {
    const { domain, level, count, lastVocabularies } = dto;

    const schema = z.object({
      vocabularies: z.array(CreateVocabularySchema.omit({ domainId: true })),
    });

    this.logger.log(
      `Generating ${count} vocabularies for domain: ${domain}, level: ${level}. Skipping ${lastVocabularies.length} previous words.`,
    );

    try {
      const response = await this.mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: `${buildVocabularyPrompt(domain, level, count, lastVocabularies)}`,
          },
        ],
        responseFormat: { type: 'json_object' },
        temperature: 0.7, // Slightly lower temperature for better instruction following
        frequencyPenalty: 0.8, // Increased frequency penalty to discourage repetition
        presencePenalty: 0.5, // Increased presence penalty
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content || typeof content !== 'string') return [];

      const parsed = JSON.parse(content);
      this.logger.log('--------------vocabularies parsed');

      const validated = schema.parse(parsed);
      this.logger.log('-------------vocabularies validated');

      return validated.vocabularies;
    } catch (error) {
      this.logger.error('Error generating vocabularies:');
      this.logger.error(error);
      return [];
    }
  }

  async generateSentences(dto: GenerateSentencesDto) {
    const { domain, level, count, vocabBasedOn } = dto;

    const schema = z.object({
      sentences: z.array(CreateSentenceSchema.omit({ domainId: true })),
    });

    try {
      const response = await this.mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: buildSentencePrompt(domain, level, count),
          },
          {
            role: 'system',
            content: `ULTRA IMPORTANT: 
              1. Generate exactly ${count} sentences, each designed to showcase one of the vocabulary words provided below.
              2. Each sentence MUST naturally incorporate at least one of the target words.
              3. Ensure all provided words are covered across the generated sentences.
              4. Make the sentences meaningful and grammatically correct within the context of "${domain}".
              5. Scale the difficulty appropriately for the "${level}" level.
              
              Target Vocabulary: ${vocabBasedOn.join(', ')}.`,
          },
        ],
        responseFormat: { type: 'json_object' },
        temperature: 0.8,
        frequencyPenalty: 0.3,
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content || typeof content !== 'string') return [];

      const parsed = JSON.parse(content);
      this.logger.log('--------------sentences parsed');

      const validated = schema.parse(parsed);
      this.logger.log('-------------sentences validated');

      return validated.sentences;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async generateArticles(domain: DomainDocument, level: Level) {
    const { _id, name } = domain;
    console.log('domain Id', _id);

    const schema = z.object({
      articles: z.array(CreateArticleSchema.omit({ domainId: true })),
    });

    try {
      const response = await this.mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: buildArticlePrompt(name, level),
          },
        ],
        responseFormat: { type: 'json_object' },
        temperature: 0.8,
        frequencyPenalty: 0.3,
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content || typeof content !== 'string') return [];

      const parsed = JSON.parse(content);
      this.logger.log('--------------articles parsed');

      const validated = schema.parse(parsed);
      this.logger.log('-------------articles validated');

      return validated.articles;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }
}
