import { findItems } from '../../../controllers/itemController';

const Query = `
  extend type Query {
    findItems(_id: ID, name: String, used: Boolean): [Item]
    findUnarchivedItems: [Item]
    findUnusedItems: [Item]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findItems: async (_, args) => findItems(args),
    findUnarchivedItems: async () => findItems({ archived: false }),
    findUnusedItems: async () => findItems({ used: false })
  }
};
