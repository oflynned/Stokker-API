import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const DATASET_CHANGED = 'DATASET_CHANGED';

const Subscription = `
  extend type Subscription {
    onItemDataChanged: [Item]
  }
`;

export const subscriptionTypes = () => [Subscription];

export const subscriptionResolvers = {
  Subscription: {
    onItemDataChanged: async () => pubsub.asyncIterator([DATASET_CHANGED])
  }
};
