const Audit = `
  type Audit {
    _id: ID!
    user: User!
    item: Item!
    action: String!
  }
`;

export const types = () => [Audit];

export const typeResolvers = {};
