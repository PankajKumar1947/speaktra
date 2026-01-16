import { z } from "zod";
import { DifficultyEnum } from "../common";

// Re-export DifficultyEnum for backward compatibility
export { DifficultyEnum as SpeakingDifficultyEnum };
export type SpeakingDifficulty = z.infer<typeof DifficultyEnum>;
