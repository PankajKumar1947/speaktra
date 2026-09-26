/** Converts a word-bank theme slug ("starting_your_medical_shift") into a human-readable label ("Starting Your Medical Shift") for AI prompts. The slug itself stays stored on the lesson. */
export const humanizeTheme = (theme?: string): string | undefined => {
  if (!theme) return undefined;
  return theme
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};
