export const domainQueries = {
  create: {
    key: ["createDomain"],
    endpoint: "/domain",
  },
  findAll: {
    key: ["findAllDomains"],
    endpoint: "/domain",
  },
  findOne: {
    key: ["findOneDomain"],
    endpoint: (id: string) => `/domain/${id}`,
  },
  update: {
    key: ["updateDomain"],
    endpoint: (id: string) => `/domain/${id}`,
  },
  remove: {
    key: ["removeDomain"],
    endpoint: (id: string) => `/domain/${id}`,
  },
} as const;
