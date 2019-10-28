import uuid from 'uuid';
import Session from '../models/session';

export const checkSessionBySessionId = async (sessionId) => {
  const activeSessions = await Session.findActiveSessionsBySessionId(sessionId);
  if (activeSessions.length === 0) {
    throw new Error('invalid_session');
  }

  // a session has been active within the last 8 hours
  // the ttl of this session should be extended
  const { _id } = activeSessions[0];
  return Session.extendSessionExpiry(_id);
};

export const requestSessionByUser = async (user) => {
  // old sessions should be cleaned up as necessary
  await Session.cleanExpiredUserSessions();

  const rawSessionId = uuid();
  const session = await Session.create({
    user,
    sessionId: rawSessionId
  })
    .save();

  // it's possible to be logged in with multiple sessions
  // therefore a new session should be created as requested
  // old expired sessions should be cleaned up however as the original key for them is gone
  return {
    session,
    rawSessionId
  };
};

// the session id is only provided on a valid transfer of credentials
// therefore it should be relatively safe to trust this temporary token
export const killSession = async user => Session.cleanUserSessions(user);
