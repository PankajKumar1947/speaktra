import { z } from "zod";

/**
 * Difficulty level enum for practice content
 */
export const PracticeDifficultyEnum = z.enum(["Easy", "Medium", "Hard"]);

export type PracticeDifficulty = z.infer<typeof PracticeDifficultyEnum>;
