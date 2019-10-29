import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { json as parseJson } from 'body-parser';

import { isDevelopmentEnvironment, isProductionEnvironment } from '../config/environmentConfig';
import schema from './schema';
import Session from '../models/session';

const enforceActiveSession = async (req, res, next) => {
  const sessionToken = req.headers['x-session-id'];
  if (!sessionToken) {
    return res.status(401)
      .json({ error: 'invalid_session' });
  }

  const sessions = await Session.findActiveSessionsBySessionId(sessionToken);
  req.user = sessions[0].user;
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
