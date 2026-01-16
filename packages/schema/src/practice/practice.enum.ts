import { z } from "zod";
import { DifficultyEnum } from "../common";

// Re-export DifficultyEnum for backward compatibility
export { DifficultyEnum as PracticeDifficultyEnum };
export type PracticeDifficulty = z.infer<typeof DifficultyEnum>;
