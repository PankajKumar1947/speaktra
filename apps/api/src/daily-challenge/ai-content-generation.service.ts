import { Mistral } from '@mistralai/mistralai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateVocabularySchema, Level } from '@repo/schema';
import { DomainDocument } from 'src/domain/entities/domain.entity';
import z from 'zod';

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
            content: `
You are an expert language tutor.

Generate exactly ${count} diverse vocabulary words for the domain "${name}" at the "${level}" level.

Difficulty distribution must strictly be:
- 1 easy
- 2 medium
- 2 hard

Each vocabulary must:
- Include a "word" field (string).
- Include a "difficulty" field with one of these exact lowercase values only: "easy", "medium", "hard".
- Include meaning and example for at least ONE applicable form among:
  - noun
  - verb
  - adjective
  - adverb

Each included form MUST strictly follow this structure:
{
  "meaning": "string",
  "example": "string"
}

Rules:
- Do NOT include domainId.
- Do NOT include extra fields.
- Do NOT include explanations.
- Do NOT return anything except valid JSON.
- At least one form must be present per word.

Return strictly this structure:

{
  "vocabularies": [
    {
      "word": "string",
      "difficulty": "easy" | "medium" | "hard",
      "noun": { "meaning": "string", "example": "string" },
      "verb": { "meaning": "string", "example": "string" },
      "adjective": { "meaning": "string", "example": "string" },
      "adverb": { "meaning": "string", "example": "string" }
    }
  ]
}
`,
          },
        ],
        responseFormat: { type: 'json_object' },
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content || typeof content !== 'string') return [];

      const parsed = JSON.parse(content);
      this.logger.log(
        '----------------------vocabularies parsed------------------',
      );

      const validated = schema.parse(parsed);
      this.logger.log(
        '--------------------vocabularies validated---------------------',
      );

      return validated.vocabularies;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }
}
