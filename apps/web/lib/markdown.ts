/**
 * Normalizes Markdown before rendering.
 *
 * AI-generated articles sometimes wrap a whole template in a plain ``` fence
 * that itself contains a language-tagged fence. CommonMark treats the inner
 * opener as content, so the outer fence is redundant — drop it and let the
 * inner blocks render normally.
 */
export function normalizeMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const fenceIndexes = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => /^\s*```(\S*)\s*$/.test(line));

  if (fenceIndexes.length < 4) {
    return markdown;
  }

  const first = fenceIndexes[0];
  const last = fenceIndexes[fenceIndexes.length - 1];

  if (!first || !last) {
    return markdown;
  }

  const isPlainFence = (line: string) => /^\s*```\s*$/.test(line);
  const hasNestedLanguageFence = fenceIndexes
    .slice(1, -1)
    .some(({ line }) => /^\s*```[^\s`]+\s*$/.test(line));

  if (
    !isPlainFence(first.line) ||
    !isPlainFence(last.line) ||
    !hasNestedLanguageFence
  ) {
    return markdown;
  }

  return lines
    .filter((_, index) => index !== first.index && index !== last.index)
    .join("\n");
}
