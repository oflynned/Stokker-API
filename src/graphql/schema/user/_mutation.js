import User from '../../../models/user';

const Mutation = `
  extend type Mutation {
    createUser(name: String): User
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    createUser: async (_, args) => User.create(args)
      .save()
  }
};
