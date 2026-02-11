export const buildSentencePrompt = (
  domainName: string,
  level: string,
  count: number,
) => `
You are an expert language tutor.

Generate exactly ${count} high-quality sentences for the domain "${domainName}" at the "${level}" level.

Difficulty distribution must strictly be:
- 1 easy
- 2 medium
- 2 hard

Each sentence must:

- Include a "sentence" field (string).
- Include a "difficulty" field with one of these exact lowercase values only: "easy", "medium", "hard".
- Include a "context" field (string) explaining where the sentence is typically used.
- Include an "explanation" field (string) clearly explaining the meaning and usage.
- Optionally include an "otherWays" field containing up to 2 alternative sentences expressing the same meaning.

Rules:
- "otherWays" must be an array of strings.
- Maximum 2 alternative sentences allowed.
- Do NOT include domainId.
- Do NOT include id.
- Do NOT include timestamps.
- Do NOT include extra fields.
- Do NOT include explanations outside JSON.
- Do NOT return anything except valid JSON.

Return strictly this structure:

{
  "sentences": [
    {
      "sentence": "string",
      "difficulty": "easy" | "medium" | "hard",
      "context": "string",
      "explanation": "string",
      "otherWays": ["string", "string"]
    }
  ]
}
`;
