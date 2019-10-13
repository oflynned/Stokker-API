import Item from '../../../models/item';
import Audit from '../../../models/audit';

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
    createItem: async (_, args) => Item.create(args)
      .save(),
    modifyItem: async (_, { _id, ...props }, { user }) => {
      const item = await Item.update(_id, props);
      await Audit.create({
        user,
        item,
        action: 'update',
        changes: props
      })
        .save();

      return item;
    }
  }
};
