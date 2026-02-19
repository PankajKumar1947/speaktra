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

    try {
      const response = await this.mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: buildVocabularyPrompt(domain, level, count),
          },
          {
            role: 'system',
            content: `Previously generated words: ${lastVocabularies.join(', ')}.               
              ULTRA IMPORTANT: 
              1. Do NOT repeat any of the words listed above.
              2. Generate COMPLETELY NEW vocabularies.
              3. Scale the difficulty appropriately for the "${level}" level.`,
          },
        ],
        responseFormat: { type: 'json_object' },
        temperature: 1,
        frequencyPenalty: 0.5,
        presencePenalty: 0.2,
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content || typeof content !== 'string') return [];

      const parsed = JSON.parse(content);
      this.logger.log('--------------vocabularies parsed');

      const validated = schema.parse(parsed);
      this.logger.log('-------------vocabularies validated');

      return validated.vocabularies;
    } catch (error) {
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
              1. Generate sentences using ONLY the words provided below.
              2. Do NOT use any other words.
              3. Use each word AT LEAST once.
              4. Make the sentences meaningful and grammatically correct.
              5. Scale the difficulty appropriately for the "${level}" level.
              
              Words to use: ${vocabBasedOn.join(', ')}.`,
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
