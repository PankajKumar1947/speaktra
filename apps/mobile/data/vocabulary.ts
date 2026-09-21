import { Vocabulary, Difficulty } from "@repo/schema";

/**
 * Dummy vocabulary words for Corporate domain
 */
export const VOCABULARY_WORDS: Vocabulary[] = [
  {
    _id: "507f1f77bcf86cd799439031",
    word: "Meeting",
    noun: {
      meaning: "A gathering of people for discussion or decision-making",
      example:
        "We have a meeting scheduled at 2 PM to discuss the project timeline.",
    },
    difficulty: Difficulty.EASY,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439032",
    word: "Stakeholder",
    noun: {
      meaning: "A person or group with an interest or concern in a business",
      example:
        "We need to consult all stakeholders before making this decision.",
    },
    difficulty: Difficulty.MEDIUM,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439033",
    word: "Deadline",
    noun: {
      meaning: "The latest time or date by which something should be completed",
      example:
        "The project deadline is next Friday, so we need to work efficiently.",
    },
    difficulty: Difficulty.EASY,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439034",
    word: "Agenda",
    noun: {
      meaning: "A list of items to be discussed at a meeting",
      example: "Please review the agenda before tomorrow's board meeting.",
    },
    difficulty: Difficulty.MEDIUM,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439035",
    word: "Milestone",
    noun: {
      meaning: "A significant stage or event in a project",
      example:
        "Completing the prototype is an important milestone for our team.",
    },
    difficulty: Difficulty.MEDIUM,
    domainId: "507f1f77bcf86cd799439001",
  },
  {
    _id: "507f1f77bcf86cd799439036",
    word: "Synergy",
    noun: {
      meaning:
        "Combined effort producing a greater result than individual efforts",
      example:
        "The synergy between our departments has led to innovative solutions.",
    },
    difficulty: Difficulty.HARD,
    domainId: "507f1f77bcf86cd799439001",
  },
];
