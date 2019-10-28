import { validateUserHeader, verifyUserCredentials } from '../controllers/userController';
import { checkSessionBySessionId } from '../controllers/sessionController';

import Session from '../models/session';
import User from '../models/user';

const checkHeaderAuthValidity = (req) => {
  const { authorization } = req.headers;
  if (authorization === undefined || authorization === null || !authorization.includes('Basic')) {
    throw new Error('bad_request');
  }

  const credentials = decodeHeaderAuthentication(authorization);
  Object.assign(req.headers, credentials);
  return validateUserHeader(req.headers);
};

const checkHeaderSessionValidity = async (req) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId === undefined || sessionId === null) {
    throw new Error('bad_request');
  }
  const sessions = await Session.findActiveSessionsBySessionId(sessionId);
  if (sessions.length === 0) {
    throw new Error('session_not_valid');
  }

  // update the session expiry time
  await checkSessionBySessionId(sessionId);
  // also assign the assigned for the session to the request
  req.user = sessions[0].user;
};

const doesAccountExist = ({ headers: { email } }) => User.findByEmail(email);

const verifyAccountCredentials = ({ headers: { email, password: passwordAttempt } }) =>
  verifyUserCredentials(email, passwordAttempt);

export const decodeHeaderAuthentication = (auth) => {
  const rawEncoding = auth.replace('Basic ', '');
  const credentials = Buffer.from(rawEncoding, 'base64')
    .toString('ascii')
    .split(':');
  return {
    email: credentials[0],
    password: credentials.slice(1)
      .join(':')
  };
};

// a user provides credentials in exchange for a session id
// if a user doesn't have a valid session, a new one is created
export const enforceRequiredUserCredentials = async (req, res, next) => {
  try {
    await checkHeaderAuthValidity(req);
    await doesAccountExist(req);
    req.user = await verifyAccountCredentials(req);
    next();
  } catch (err) {
    switch (err.message) {
      default:
      case 'bad_request':
        res.status(400)
          .send({ error: err.message });
        break;
      case 'bad_credentials':
        res.status(401)
          .send({ error: err.message });
        break;
      case 'user_does_not_exist':
        res.status(404)
          .send({ error: err.message });
        break;
    }
  }
};

// the user must provide a session id to exchange for a server-side user object
// a session provided here should also have its TTL extended as activity has been announced
export const enforceRequiredValidSessionId = async (req, res, next) => {
  try {
    await checkHeaderSessionValidity(req);
    next();
  } catch (err) {
    switch (err.message) {
      default:
      case 'bad_request':
        res.status(400)
          .send({ error: err.message });
        break;
      case 'session_not_valid':
        res.status(401)
          .send({ error: err.message });
        break;
      case 'user_does_not_exist':
        res.status(404)
          .send({ error: err.message });
        break;
    }
  }
};
