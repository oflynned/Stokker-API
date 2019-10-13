const User = `
  type User {
    _id: ID!
    name: String!
    actions: [Audit]
  }
`;

export const types = () => [User];

export const typeResolvers = {};
