import { WordEntry } from '@repo/schema';

export interface BuildVocabularyPromptParams {
  domainName: string;
  level: string;
  theme?: string;
  words: WordEntry[];
}

export const buildVocabularyPrompt = ({
  domainName,
  level,
  theme,
  words,
}: BuildVocabularyPromptParams) => `
You are an expert language and communication tutor.

Your task is to ENRICH the following curated list of ${words.length} vocabulary words for the domain "${domainName}"${theme ? ` (Theme: "${theme}")` : ''} at the "${level}" proficiency level.

Here are the target words from the word bank:
${words.map((w, index) => `${index + 1}. "${w.word}" — Base concept: ${w.meaning}`).join('\n')}

For EACH of the ${words.length} words listed above:
1. Keep the EXACT given word. Do NOT invent, substitute, or omit any word.
2. Assign an appropriate "difficulty" strictly from: "easy" | "medium" | "hard" relative to the "${level}" level.
3. Provide domain-specific meaning and an authentic workplace/academic example sentence for at least ONE applicable grammatical form among:
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
- You must return exactly ${words.length} vocabulary entries corresponding 1-to-1 with the provided words.
- All example sentences must feel natural and relevant to the "${domainName}" domain context.
- Do NOT include domain or extra metadata fields.
- Do NOT return markdown or explanations outside the JSON response.
`;
