export const buildArticlePrompt = (
  domainName: string,
  level: string,
  vocabularyWords?: string[],
) => {
  const hasVocab = vocabularyWords && vocabularyWords.length > 0;
  const keywordsInstruction = hasVocab
    ? `Array of target vocabulary words used in the description. Choose from these target words: [${vocabularyWords.join(', ')}].`
    : `Array of relevant vocabulary words used in the description (max 8).`;

  return `
You are an expert professional business writer and language tutor.

Generate exactly 3 professional communication templates (emails, Slack/Teams updates, reports, memos, or project updates) for the domain "${domainName}" at the "${level}" level.

Difficulty distribution must strictly be:
- 1 easy (e.g., short team update, simple request)
- 1 medium (e.g., client email, project update, meeting summary)
- 1 hard (e.g., proposal outline, difficult situation resolution, customer escalation response)

For each article:
- "title": A descriptive title of the communication task (e.g., "Drafting a Project Update Email")
- "type": A short label reflecting the type of communication (e.g., "email template", "Slack update", "project report", "business proposal")
- "difficulty": "easy" | "medium" | "hard"
- "minRead": positive number (estimated reading time in minutes)
- "keywords": ${keywordsInstruction}
- "description": well-structured Markdown content containing:
  1. **Scenario**: A brief 1-2 sentence context of why this communication is written.
  2. **Template**: The actual email/message draft. Use standard email fields like "Subject: ..." and "Hi Team, ...".
  3. **Key Phrases**: Highlight 2-3 useful professional idioms or business phrases used in the template.

Markdown requirements for "description":
- Use headings (## or ###)
- Use bullet points where appropriate
- Use short paragraphs
- Structure content clearly
- No markdown code fences (do NOT use \`\`\`json or \`\`\`markdown inside the description string)
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
};
