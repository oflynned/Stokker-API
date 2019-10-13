import Audit from '../../../models/audit';

const Query = `
  extend type Query {
    findAudit(_id: String!): Audit
    findAudits: [Audit]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findAudit: async (_, { _id }) => Audit.findById(_id),
    findAudits: async () => Audit.find()
  }
};
