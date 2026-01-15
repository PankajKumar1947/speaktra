import { VocabularyWord } from "@repo/schema";

/**
 * Dummy vocabulary words for Corporate domain
 */
export const VOCABULARY_WORDS: VocabularyWord[] = [
  {
    id: "vocab_1",
    word: "Meeting",
    definition: "A gathering of people for discussion or decision-making",
    example:
      "We have a meeting scheduled at 2 PM to discuss the project timeline.",
    domain: "Corporate",
    difficulty: "Easy",
    learned: true,
  },
  {
    id: "vocab_2",
    word: "Stakeholder",
    definition: "A person or group with an interest or concern in a business",
    example: "We need to consult all stakeholders before making this decision.",
    domain: "Corporate",
    difficulty: "Medium",
    learned: true,
  },
  {
    id: "vocab_3",
    word: "Deadline",
    definition:
      "The latest time or date by which something should be completed",
    example:
      "The project deadline is next Friday, so we need to work efficiently.",
    domain: "Corporate",
    difficulty: "Easy",
    learned: false,
  },
  {
    id: "vocab_4",
    word: "Agenda",
    definition: "A list of items to be discussed at a meeting",
    example: "Please review the agenda before tomorrow's board meeting.",
    domain: "Corporate",
    difficulty: "Medium",
    learned: false,
  },
  {
    id: "vocab_5",
    word: "Milestone",
    definition: "A significant stage or event in a project",
    example: "Completing the prototype is an important milestone for our team.",
    domain: "Corporate",
    difficulty: "Medium",
    learned: false,
  },
  {
    id: "vocab_6",
    word: "Synergy",
    definition:
      "Combined effort producing a greater result than individual efforts",
    example:
      "The synergy between our departments has led to innovative solutions.",
    domain: "Corporate",
    difficulty: "Hard",
    learned: false,
  },
];
