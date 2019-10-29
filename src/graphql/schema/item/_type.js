const Item = `
  type Item {
    _id: ID!
    name: String!
    quantity: Int!
    used: Boolean!
    audits: [Audit]
    archived: Boolean!
  }
`;

export const types = () => [Item];

export const typeResolvers = {};
