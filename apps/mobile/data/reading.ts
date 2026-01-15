import { ReadingArticle } from "@repo/schema";

/**
 * Dummy reading articles for Corporate domain
 */
export const READING_ARTICLES: ReadingArticle[] = [
  {
    id: "read_1",
    title: "Writing Professional Emails",
    category: "Business Communication",
    content: `Professional email writing is a crucial skill in the corporate world. A well-written email can make a strong impression and facilitate effective communication.

Start with a clear subject line that summarizes the purpose of your email. Use a professional greeting such as "Dear Mr. Smith" or "Hello Team."

The body of your email should be concise and focused. State your purpose in the first paragraph, provide necessary details in the middle, and end with a clear call to action.

Always proofread your emails before sending. Check for spelling, grammar, and tone. Remember to be courteous and professional, even in difficult situations.

Close with an appropriate sign-off like "Best regards" or "Sincerely," followed by your name and contact information.`,
    keyVocabulary: [
      "professional",
      "greeting",
      "concise",
      "proofread",
      "courteous",
    ],
    difficulty: "Easy",
    estimatedMinutes: 5,
    completed: true,
  },
  {
    id: "read_2",
    title: "Effective Team Updates",
    category: "Team Management",
    content: `Regular team updates are essential for keeping everyone aligned and informed. Whether you're leading a small team or managing a large department, effective updates can improve productivity and morale.

Schedule updates at consistent intervals - daily stand-ups, weekly summaries, or monthly reviews work well for different team sizes and project types.

Structure your updates to include: accomplishments since the last update, current priorities, upcoming milestones, and any blockers or challenges.

Encourage team members to share their progress and concerns. Create a safe space for honest communication. Address issues promptly and acknowledge achievements publicly.

Use visual aids when possible - charts, dashboards, or project boards can make information more accessible and easier to digest.`,
    keyVocabulary: [
      "aligned",
      "productivity",
      "milestones",
      "blockers",
      "achievements",
    ],
    difficulty: "Medium",
    estimatedMinutes: 7,
    completed: false,
  },
  {
    id: "read_3",
    title: "Conducting Successful Presentations",
    category: "Public Speaking",
    content: `Delivering effective presentations is a valuable professional skill. Whether presenting to colleagues, clients, or executives, preparation and confidence are key.

Begin with a strong opening that captures attention. State your objective clearly so the audience knows what to expect.

Organize your content logically. Use the "rule of three" - people remember information best when grouped in threes. Support your points with data, examples, or stories.

Practice your delivery multiple times. Pay attention to your pace, volume, and body language. Maintain eye contact with your audience and use gestures naturally.

Prepare for questions by anticipating what your audience might ask. It's okay to say "I don't know" - offer to follow up with the information later.

End with a clear summary and call to action. Leave your audience with a memorable takeaway.`,
    keyVocabulary: [
      "objective",
      "organize",
      "delivery",
      "anticipating",
      "summary",
    ],
    difficulty: "Hard",
    estimatedMinutes: 10,
    completed: false,
  },
];
