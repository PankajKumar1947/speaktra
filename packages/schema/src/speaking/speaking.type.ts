import type { SpeakingDifficulty } from "./speaking.enum";

/**
 * Speaking Scenario Type
 */
export interface SpeakingScenario {
  id: string;
  title: string;
  description: string;
  prompt: string;
  domain: string;
  difficulty: SpeakingDifficulty;
  suggestedDuration: number; // in seconds
}

/**
 * Speaking Recording Type
 */
export interface SpeakingRecording {
  id: string;
  scenarioId: string;
  duration: number; // in seconds
  recordedAt: Date;
  transcription?: string;
}

/**
 * Speaking Feedback Type
 */
export interface SpeakingFeedback {
  id: string;
  recordingId: string;
  fluencyScore: number;
  pronunciationScore: number;
  grammarScore: number;
  overallScore: number;
  suggestions: string[];
  strengths: string[];
  areasToImprove: string[];
}
