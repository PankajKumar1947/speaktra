export const buildVocabularyPrompt = (
  domainName: string,
  level: string,
  count: number,
  lastVocabularies: string[],
) => `
You are an expert language tutor.

Generate exactly ${count} diverse vocabulary words for the domain "${domainName}" at the "${level}" level.

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

Previously generated words (FORBIDDEN LIST - DO NOT USE):
${lastVocabularies.join(', ')}

ULTRA IMPORTANT: 
1. DO NOT REPEAT any of the words from the FORBIDDEN LIST above.
2. Generate COMPLETELY NEW and diverse vocabularies.
3. Adhere strictly to the "${level}" level.
`;
