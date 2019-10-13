import User from '../../../models/user';
import Audit from '../../../models/audit';
import Item from '../../../models/item';

const Mutation = `
  extend type Mutation {
    createAuditItem(userId: String!, itemId: String!, action: String!): Audit
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createAuditItem: async (_, { userId, itemId, action }) => {
      const payload = {
        user: await User.findById(userId),
        item: await Item.findById(itemId),
        action
      };

      return Audit.create(payload)
        .save();
    }
  }
};
