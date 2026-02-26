export const userQueries = {
  create: {
    key: ["createUser"],
    endpoint: "/users",
  },
  findAll: {
    key: ["findAllUsers"],
    endpoint: "/users",
  },
  findOne: {
    key: ["findOneUser"],
    endpoint: (id: string) => `/users/${id}`,
  },
  update: {
    key: ["updateUser"],
    endpoint: (id: string) => `/users/${id}`,
  },
  remove: {
    key: ["removeUser"],
    endpoint: (id: string) => `/users/${id}`,
  },
  completeOnboarding: {
    key: ["completeOnboarding"],
    endpoint: "/users/onboarding/complete",
  },
} as const;
