import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mistral } from '@mistralai/mistralai';
import { CompleteJSONDto } from './dto/complete-json.dto';

type PromptTemplate = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

@Injectable()
export class AIService {
  private readonly client: Mistral;
  private readonly logger = new Logger(AIService.name);
  private readonly defaultModel: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('MISTRAL_API_KEY');
    this.client = new Mistral({ apiKey });
    this.defaultModel =
      this.configService.get<string>('MISTRAL_MODEL') || 'open-mistral-7b';
  }

  getClient(): Mistral {
    return this.client;
  }

  // Structured JSON completion helper
  async completeJson(completeJSONDto: CompleteJSONDto): Promise<unknown> {
    const messages: PromptTemplate[] = [
      {
        role: 'system',
        content: completeJSONDto.systemPrompt,
      },
    ];

    if (completeJSONDto.userPrompt) {
      messages.push({
        role: 'user',
        content: completeJSONDto.userPrompt,
      });
    }

    const responseFormat = completeJSONDto.jsonSchema
      ? {
          type: 'json_schema' as const,
          jsonSchema: {
            name: 'response',
            schemaDefinition: completeJSONDto.jsonSchema,
          },
        }
      : {
          type: 'json_object' as const,
        };

    const response = await this.client.chat.complete({
      model: completeJSONDto.model || this.defaultModel,
      messages,
      responseFormat,
      temperature: completeJSONDto.temperature || 0.7,
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new Error('Empty response from AI');
    }

    return JSON.parse(content) as unknown;
  }
}
