export const articleQueries = {
  create: {
    key: ["createArticle"],
    endpoint: "/article",
  },
  findAll: {
    key: ["findAllArticles"],
    endpoint: "/article",
  },
  findByDomain: {
    key: ["findArticlesByDomain"],
    endpoint: (domainId: string) => `/article/domain/${domainId}`,
  },
  findByType: {
    key: ["findArticlesByType"],
    endpoint: (type: string) => `/article/type/${type}`,
  },
  findOne: {
    key: ["findOneArticle"],
    endpoint: (id: string) => `/article/${id}`,
  },
  update: {
    key: ["updateArticle"],
    endpoint: (id: string) => `/article/${id}`,
  },
  remove: {
    key: ["removeArticle"],
    endpoint: (id: string) => `/article/${id}`,
  },
};
