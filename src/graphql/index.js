import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { json as parseJson } from 'body-parser';

import { isDevelopmentEnvironment, isProductionEnvironment } from '../config/environmentConfig';
import schema from './schema';
import User from '../models/user';

const enforceActiveSession = async (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401)
      .json({ error: 'user_not_defined' });
  }

  req.user = await User.findById(userId);
  next();
};

export default (app) => {
  if (isDevelopmentEnvironment()) {
    app.use(
      '/graphiql',
      graphiqlExpress({ endpointURL: '/graphql' })
    );
  }

  app.use(
    '/graphql',
    parseJson(),
    enforceActiveSession,
    graphqlExpress(req => ({
      schema,
      debug: !isProductionEnvironment(),
      context: req
    }))
  );
};
