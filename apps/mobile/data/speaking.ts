import { SpeakingScenario, SpeakingFeedback } from "@repo/schema";

/**
 * Dummy speaking scenarios for Corporate domain
 */
export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: "speak_1",
    title: "Describe Your Last Meeting",
    description: "Practice describing a recent business meeting you attended",
    prompt:
      "Tell me about the last important meeting you attended. What was discussed? Who participated? What decisions were made?",
    domain: "Corporate",
    difficulty: "Medium",
    suggestedDuration: 120, // 2 minutes
  },
  {
    id: "speak_2",
    title: "Introduce Yourself",
    description: "Professional self-introduction for networking",
    prompt:
      "Introduce yourself as if you were meeting a new colleague or client. Include your role, responsibilities, and what you enjoy about your work.",
    domain: "Corporate",
    difficulty: "Easy",
    suggestedDuration: 90,
  },
  {
    id: "speak_3",
    title: "Project Status Update",
    description: "Provide a status update on a current project",
    prompt:
      "Give a brief status update on a project you're working on. Mention progress, challenges, and next steps.",
    domain: "Corporate",
    difficulty: "Medium",
    suggestedDuration: 120,
  },
  {
    id: "speak_4",
    title: "Handling Difficult Conversations",
    description: "Practice addressing a challenging workplace situation",
    prompt:
      "Describe how you would handle a situation where a deadline needs to be extended. Explain the situation to your manager.",
    domain: "Corporate",
    difficulty: "Hard",
    suggestedDuration: 150,
  },
];

/**
 * Dummy speaking feedback
 */
export const DUMMY_FEEDBACK: SpeakingFeedback = {
  id: "feedback_1",
  recordingId: "recording_1",
  fluencyScore: 78,
  pronunciationScore: 82,
  grammarScore: 75,
  overallScore: 78,
  strengths: [
    "Clear pronunciation of key business terms",
    "Good pace and natural rhythm",
    "Confident delivery",
  ],
  suggestions: [
    "Use more transitional phrases (however, therefore, moreover)",
    'Practice pronouncing "particularly" and "specifically"',
    "Try to speak in complete sentences without pauses",
  ],
  areasToImprove: [
    "Grammar: Subject-verb agreement",
    "Vocabulary: Use more varied business terminology",
    'Fluency: Reduce filler words like "um" and "uh"',
  ],
};
