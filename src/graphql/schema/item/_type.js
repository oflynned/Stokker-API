const Item = `
  type Item {
    _id: ID!
    name: String!
    quantity: Int!
    used: Boolean!
    createdAt: String!
  }
`;

export const types = () => [Item];

export const typeResolvers = {};
