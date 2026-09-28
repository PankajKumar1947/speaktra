import { SelectedWord } from '@repo/schema';
import { humanizeTheme } from './theme.util';

export interface BuildVocabularyPromptParams {
  domainName: string;
  level: string;
  theme?: string;
  words: SelectedWord[];
}

export const buildVocabularyPrompt = ({
  domainName,
  level,
  theme,
  words,
}: BuildVocabularyPromptParams) => {
  const themeLabel = humanizeTheme(theme);
  return `
You are an expert language and communication tutor.

Your task is to ENRICH the following curated list of ${words.length} vocabulary words for the domain "${domainName}"${themeLabel ? ` (Theme: "${themeLabel}")` : ''} at the "${level}" proficiency level.

Here are the target words from the word bank (difficulty is preset — keep it as-is):
${words.map((w, index) => `${index + 1}. "${w.word}" [${w.difficulty}] — Base concept: ${w.meaning}`).join('\n')}

For EACH of the ${words.length} words listed above:
1. Keep the EXACT given word. Do NOT invent, substitute, or omit any word.
2. Keep the given "difficulty" EXACTLY as listed. Do NOT reassign it.
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
};
