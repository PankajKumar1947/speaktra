export const contactQueries = {
  create: {
    key: ["createContactMessage"],
    endpoint: "/contact",
  },
  findAll: {
    key: ["findAllContactMessages"],
    endpoint: "/contact",
  },
} as const;
