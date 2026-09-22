import { Article, Difficulty, Domain } from "@repo/schema";

/**
 * Dummy reading articles for Business domain
 */
export const READING_ARTICLES: Article[] = [
  {
    _id: "507f1f77bcf86cd799439011",
    title: "Writing Professional Emails",
    type: "Business Communication",
    description: `Professional email writing is a crucial skill in the corporate world. A well-written email can make a strong impression and facilitate effective communication.

Start with a clear subject line that summarizes the purpose of your email. Use a professional greeting such as "Dear Mr. Smith" or "Hello Team."

The body of your email should be concise and focused. State your purpose in the first paragraph, provide necessary details in the middle, and end with a clear call to action.

Always proofread your emails before sending. Check for spelling, grammar, and tone. Remember to be courteous and professional, even in difficult situations.

Close with an appropriate sign-off like "Best regards" or "Sincerely," followed by your name and contact information.`,
    keywords: ["professional", "greeting", "concise", "proofread", "courteous"],
    difficulty: Difficulty.EASY,
    minRead: 5,
    domain: Domain.BUSINESS,
  },
  {
    _id: "507f1f77bcf86cd799439012",
    title: "Effective Team Updates",
    type: "Team Management",
    description: `Regular team updates are essential for keeping everyone aligned and informed. Whether you're leading a small team or managing a large department, effective updates can improve productivity and morale.

Schedule updates at consistent intervals - daily stand-ups, weekly summaries, or monthly reviews work well for different team sizes and project types.

Structure your updates to include: accomplishments since the last update, current priorities, upcoming milestones, and any blockers or challenges.

Encourage team members to share their progress and concerns. Create a safe space for honest communication. Address issues promptly and acknowledge achievements publicly.

Use visual aids when possible - charts, dashboards, or project boards can make information more accessible and easier to digest.`,
    keywords: [
      "aligned",
      "productivity",
      "milestones",
      "blockers",
      "achievements",
    ],
    difficulty: Difficulty.MEDIUM,
    minRead: 7,
    domain: Domain.BUSINESS,
  },
  {
    _id: "507f1f77bcf86cd799439013",
    title: "Conducting Successful Presentations",
    type: "Public Speaking",
    description: `Delivering effective presentations is a valuable professional skill. Whether presenting to colleagues, clients, or executives, preparation and confidence are key.

Begin with a strong opening that captures attention. State your objective clearly so the audience knows what to expect.

Organize your content logically. Use the "rule of three" - people remember information best when grouped in threes. Support your points with data, examples, or stories.

Practice your delivery multiple times. Pay attention to your pace, volume, and body language. Maintain eye contact with your audience and use gestures naturally.

Prepare for questions by anticipating what your audience might ask. It's okay to say "I don't know" - offer to follow up with the information later.

End with a clear summary and call to action. Leave your audience with a memorable takeaway.`,
    keywords: ["objective", "organize", "delivery", "anticipating", "summary"],
    difficulty: Difficulty.HARD,
    minRead: 10,
    domain: Domain.BUSINESS,
  },
];
