import { Sentence, Difficulty } from "@repo/schema";

/**
 * Dummy sentence practice data for Corporate domain
 */
export const SENTENCE_PRACTICES: Sentence[] = [
  {
    _id: "507f1f77bcf86cd799439021",
    sentence:
      "I would like to schedule a meeting to discuss the quarterly results.",
    context: "Setting up a business meeting",
    explanation:
      "Common business phrasing used when arranging formal discussions.",
    difficulty: Difficulty.EASY,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439022",
    sentence:
      "We need to align our strategy with the stakeholders' expectations.",
    context: "Strategic planning discussion",
    explanation: "Used in leadership settings to ensure shared direction.",
    difficulty: Difficulty.MEDIUM,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439023",
    sentence: "The project deadline has been moved forward by two weeks.",
    context: "Project timeline update",
    explanation: "Used to communicate changes in deliverable timelines.",
    difficulty: Difficulty.EASY,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439024",
    sentence: "Let's leverage our resources to achieve maximum synergy.",
    context: "Team collaboration",
    explanation: "Advanced corporate phrasing for optimizing team output.",
    difficulty: Difficulty.HARD,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439025",
    sentence: "I'll send you the agenda for tomorrow's board meeting.",
    context: "Meeting preparation",
    explanation: "Standard formal statement regarding meeting outlines.",
    difficulty: Difficulty.EASY,
    domainId: "507f1f77bcf86cd799439001",
  },
];
