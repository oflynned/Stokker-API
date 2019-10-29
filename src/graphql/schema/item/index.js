import { typeResolvers, types } from './_type';
import { queryResolvers, queryTypes } from './_query';
import { mutationResolvers, mutationTypes } from './_mutation';
import { subscriptionResolvers, subscriptionTypes } from './_subscription';

export default {
  types: () => [types, queryTypes, mutationTypes, subscriptionTypes],
  resolvers: Object.assign(queryResolvers, mutationResolvers, subscriptionResolvers, typeResolvers),
};
