import User from '../../../models/user';

const Query = `
  extend type Query {
    findUser(email: String!): User
    findUsers: [User]
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    findUser: async () => User.find({}, {}),
    findUsers: async () => User.find({}, {})
  }
};
