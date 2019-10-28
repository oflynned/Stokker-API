const Mutation = `
  extend type Mutation {
    createUser(name: String): User
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createUser: () => {
    }
  }
};
