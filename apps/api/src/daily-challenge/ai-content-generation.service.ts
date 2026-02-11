import { Mistral } from '@mistralai/mistralai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateSentenceSchema,
  CreateVocabularySchema,
  Level,
} from '@repo/schema';
import { DomainDocument } from 'src/domain/entities/domain.entity';
import z from 'zod';
import { buildVocabularyPrompt } from './ai-prompts/vocabulary.prompt';
import { buildSentencePrompt } from './ai-prompts/sentence.prompt';

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

  async generateVocabularies(
    domain: DomainDocument,
    level: Level,
    count: number = 5,
  ) {
    const { _id, name } = domain;
    console.log('domain Id', _id);

    const schema = z.object({
      vocabularies: z.array(CreateVocabularySchema.omit({ domainId: true })),
    });

    try {
      const response = await this.mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: buildVocabularyPrompt(name, level, count),
          },
        ],
        responseFormat: { type: 'json_object' },
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

  async generateSentences(
    domain: DomainDocument,
    level: Level,
    count: number = 5,
  ) {
    const { _id, name } = domain;
    console.log('domain Id', _id);

    const schema = z.object({
      sentences: z.array(CreateSentenceSchema.omit({ domainId: true })),
    });

    try {
      const response = await this.mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: buildSentencePrompt(name, level, count),
          },
        ],
        responseFormat: { type: 'json_object' },
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
}
