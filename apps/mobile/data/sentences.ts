import { SentencePractice } from "@repo/schema";

/**
 * Dummy sentence practice data for Corporate domain
 */
export const SENTENCE_PRACTICES: SentencePractice[] = [
  {
    id: "sent_1",
    sentence:
      "I would like to schedule a meeting to discuss the quarterly results.",
    context: "Setting up a business meeting",
    domain: "Corporate",
    difficulty: "Easy",
    completed: true,
  },
  {
    id: "sent_2",
    sentence:
      "We need to align our strategy with the stakeholders' expectations.",
    context: "Strategic planning discussion",
    domain: "Corporate",
    difficulty: "Medium",
    completed: false,
  },
  {
    id: "sent_3",
    sentence: "The project deadline has been moved forward by two weeks.",
    context: "Project timeline update",
    domain: "Corporate",
    difficulty: "Easy",
    completed: false,
  },
  {
    id: "sent_4",
    sentence: "Let's leverage our resources to achieve maximum synergy.",
    context: "Team collaboration",
    domain: "Corporate",
    difficulty: "Hard",
    completed: false,
  },
  {
    id: "sent_5",
    sentence: "I'll send you the agenda for tomorrow's board meeting.",
    context: "Meeting preparation",
    domain: "Corporate",
    difficulty: "Easy",
    completed: true,
  },
];
