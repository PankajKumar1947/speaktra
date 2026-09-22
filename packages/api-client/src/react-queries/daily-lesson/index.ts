export const dailyLessonQueries = {
  getForUser: {
    key: ["daily-lesson"],
    endpoint: "/daily-lesson/user",
  },
  getVocabularies: {
    key: ["vocabularies"],
    endpoint: (dailyLessonId: string) =>
      `/daily-lesson/${dailyLessonId}/vocabularies`,
  },
  getSentences: {
    key: ["sentences"],
    endpoint: (dailyLessonId: string) =>
      `/daily-lesson/${dailyLessonId}/sentences`,
  },
  getArticles: {
    key: ["articles"],
    endpoint: (dailyLessonId: string) =>
      `/daily-lesson/${dailyLessonId}/articles`,
  },
};
