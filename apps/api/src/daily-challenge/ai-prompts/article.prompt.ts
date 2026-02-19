export const buildArticlePrompt = (domainName: string, level: string) => `
You are an expert professional content writer and language tutor.

Generate exactly 3 high-quality articles for the domain "${domainName}" at the "${level}" level.

Difficulty distribution must strictly be:
- 1 easy
- 1 medium
- 1 hard

For each article:

- Create a relevant "type" field based on the content itself.
  Examples of types:
  - "concept explanation"
  - "practical guide"
  - "case study"
  - "professional communication"
  - "strategy analysis"
  - "best practices"
  - "problem solving"
  - "industry insight"

The type must be short (2–4 words) and clearly reflect the nature of the article.

Each article must include:

- "title": string
- "type": string (content-based)
- "difficulty": "easy" | "medium" | "hard"
- "minRead": positive number (estimated reading time in minutes)
- "description": well-structured Markdown content
- Optional "keywords": array of relevant vocabulary words (max 8)

Markdown requirements for "description":
- Use headings (## or ###)
- Use bullet points where appropriate
- Use short paragraphs
- Structure content clearly
- No markdown code fences
- No explanations outside JSON

Rules:
- Do NOT include id.
- Do NOT include domainId.
- Do NOT include timestamps.
- Do NOT include extra fields.
- Do NOT return anything except valid JSON.

Return strictly this structure:

{
  "articles": [
    {
      "title": "string",
      "type": "string",
      "difficulty": "easy" | "medium" | "hard",
      "minRead": number,
      "keywords": ["string"],
      "description": "markdown formatted string"
    }
  ]
}
`;
