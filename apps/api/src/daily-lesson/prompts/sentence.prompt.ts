export interface BuildSentencePromptParams {
  domainName: string;
  level: string;
  theme?: string;
  vocabularyWords?: string[];
  count?: number;
}

export const buildSentencePrompt = ({
  domainName,
  level,
  theme,
  vocabularyWords = [],
  count = 5,
}: BuildSentencePromptParams) => {
  const vocabInstruction =
    vocabularyWords.length > 0
      ? `Naturally integrate and reinforce these target words where appropriate: [${vocabularyWords.join(', ')}].`
      : '';

  return `
You are an expert language and communication tutor.

Generate exactly ${count} professional, authentic practice sentences for the domain "${domainName}"${theme ? ` (Theme: "${theme}")` : ''} at the "${level}" proficiency level.
${vocabInstruction}

Difficulty distribution:
- 1 easy
- 2 medium
- 2 hard

Each sentence must:
- Include a "sentence" field (string).
- Include a "difficulty" field with one of these exact lowercase values only: "easy", "medium", "hard".
- Include a "context" field (string) explaining where or when the sentence is typically used in a real setting.
- Include an "explanation" field (string) clearly explaining the meaning, grammar, or usage nuance.
- Optionally include an "otherWays" field with up to 2 alternative natural phrasings.

Rules:
- Do NOT include domain or id.
- Do NOT return markdown or explanations outside the JSON response.
`;
};
