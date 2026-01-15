import { z } from "zod";

/**
 * Difficulty level enum for speaking scenarios
 */
export const SpeakingDifficultyEnum = z.enum(["Easy", "Medium", "Hard"]);

export type SpeakingDifficulty = z.infer<typeof SpeakingDifficultyEnum>;
