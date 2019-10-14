const User = `
  type User {
    _id: ID!
    name: String!
    audits: [Audit]
  }
`;

export const types = () => [User];

export const typeResolvers = {};
