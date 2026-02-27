export const dailyChallengeQueries = {
  getForUser: {
    key: ["daily-challenge"],
    endpoint: "/daily-challenge/user",
  },
  getVocabularies: {
    key: ["vocabularies"],
    endpoint: (dailyChallengeId: string) =>
      `/daily-challenge/${dailyChallengeId}/vocabularies`,
  },
  getSentences: {
    key: ["sentences"],
    endpoint: (dailyChallengeId: string) =>
      `/daily-challenge/${dailyChallengeId}/sentences`,
  },
  getArticles: {
    key: ["articles"],
    endpoint: (dailyChallengeId: string) =>
      `/daily-challenge/${dailyChallengeId}/articles`,
  },
};
