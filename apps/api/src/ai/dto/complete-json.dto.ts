export class CompleteJSONDto {
  systemPrompt!: string;
  userPrompt?: string;
  jsonSchema?: Record<string, unknown>;
  model?: string;
  temperature?: number;
}
