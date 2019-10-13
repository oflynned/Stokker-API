import Item from '../../../models/item';

const Query = `
  extend type Query {
    findItem(name: String): Item
    findRemainingItems: [Item]
    findUsedItems: [Item]
    findItems(name: String, quantity: Int, used: Boolean): [Item]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findItem: async (_, { name }) => Item.find({ name }, {}),
    findUsedItems: async () => Item.find({ used: true }, {}),
    findRemainingItems: async (_, args) => Item.find({
      ...args,
      used: false
    }, {}),
    findItems: async () => Item.find({}, {})
  }
};
