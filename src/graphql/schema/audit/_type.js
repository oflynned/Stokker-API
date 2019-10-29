const Audit = `
  scalar JSON

  type Audit {
    _id: ID!
    user: User!
    item: Item!
    action: String!
    changes: JSON
  }
`;

export const types = () => [Audit];

export const typeResolvers = {};
