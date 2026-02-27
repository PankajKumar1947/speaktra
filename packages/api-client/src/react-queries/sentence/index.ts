export const sentenceQueries = {
  create: {
    key: ["createSentence"],
    endpoint: "/sentence",
  },
  findAll: {
    key: ["findAllSentences"],
    endpoint: "/sentence",
  },
  findByDomain: {
    key: ["findSentencesByDomain"],
    endpoint: (domainId: string) => `/sentence/domain/${domainId}`,
  },
  findOne: {
    key: ["findOneSentence"],
    endpoint: (id: string) => `/sentence/${id}`,
  },
  update: {
    key: ["updateSentence"],
    endpoint: (id: string) => `/sentence/${id}`,
  },
  remove: {
    key: ["removeSentence"],
    endpoint: (id: string) => `/sentence/${id}`,
  },
};
