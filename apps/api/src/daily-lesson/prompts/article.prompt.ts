import { humanizeTheme } from './theme.util';

export interface BuildArticlePromptParams {
  domainName: string;
  level: string;
  theme?: string;
  vocabularyWords?: string[];
  count?: number;
}

export const buildArticlePrompt = ({
  domainName,
  level,
  theme,
  vocabularyWords = [],
  count = 3,
}: BuildArticlePromptParams) => {
  const themeLabel = humanizeTheme(theme);
  const vocabInstruction =
    vocabularyWords.length > 0
      ? `Naturally integrate some of these target words: [${vocabularyWords.join(', ')}].`
      : '';

  return `
You are an expert professional writer and communication coach.

Generate exactly ${count} professional workplace/academic communication templates (emails, updates, memos, or proposals) for the domain "${domainName}"${themeLabel ? ` (Theme: "${themeLabel}")` : ''} at the "${level}" proficiency level.
${vocabInstruction}

Difficulty distribution:
- 1 easy (e.g., short update, simple request)
- 1 medium (e.g., client communication, meeting recap, status report)
- 1 hard (e.g., strategic proposal, escalation resolution, formal inquiry)

For each article:
- "title": A concise descriptive title of the communication task (e.g., "Drafting a Milestone Update")
- "type": Communication format label (e.g., "email template", "Slack update", "project report", "memo")
- "difficulty": "easy" | "medium" | "hard"
- "minRead": Estimated reading time in minutes (number)
- "keywords": Array of relevant key vocabulary words used in the text
- "description": Well-structured Markdown content containing:
  1. **Scenario**: 1-2 sentences setting the real-world context.
  2. **Template**: The actual draft with standard greeting, clear body, and sign-off.
  3. **Key Phrases**: 2-3 highlighted professional expressions from the text.

Rules:
- Do NOT include domain or id.
- Do NOT return markdown or explanations outside the JSON response.
`;
};
