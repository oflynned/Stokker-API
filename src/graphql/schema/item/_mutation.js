import { createItem, deleteItem, updateItem } from '../../../controllers/itemController';

const Mutation = `
  extend type Mutation {
    createItem(name: String!, quantity: Int!): Item
    modifyItem(_id: String!, name: String, used: Boolean): Item
    deleteItem(_id: String!): Item
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createItem: async (_, args, { user }) => createItem(args, user),
    modifyItem: async (_, { _id, ...props }, { user }) => updateItem(_id, props, user),
    deleteItem: async (_, { _id }, { user }) => deleteItem(_id, user)
  }
};
