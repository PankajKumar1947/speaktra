export const vocabularyQueries = {
  create: {
    key: ["createVocabulary"],
    endpoint: "/vocabulary",
  },
  findAll: {
    key: ["findAllVocabularies"],
    endpoint: "/vocabulary",
  },
  findByDomain: {
    key: ["findVocabulariesByDomain"],
    endpoint: (domainId: string) => `/vocabulary/domain/${domainId}`,
  },
  findOne: {
    key: ["findOneVocabulary"],
    endpoint: (id: string) => `/vocabulary/${id}`,
  },
  update: {
    key: ["updateVocabulary"],
    endpoint: (id: string) => `/vocabulary/${id}`,
  },
  remove: {
    key: ["removeVocabulary"],
    endpoint: (id: string) => `/vocabulary/${id}`,
  },
};
