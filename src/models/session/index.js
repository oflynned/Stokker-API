import { Document } from 'marpat';
import Schema from './schema';

import { generateHmacFromToken } from '../../common/hashing';

export const SESSION_TTL = 30 * 24 * 60 * 60 * 1000;

class Session extends Document {
  constructor() {
    super();
    this.schema(Schema);
  }

  static async findActiveSessionsBySessionId(rawSessionId) {
    const sessionHash = await generateHmacFromToken(rawSessionId);
    return Session.find({
      sessionId: sessionHash,
      expiryTime: { $gt: Date.now() }
    }, {});
  }

  static async findActiveSessionsByUserId(user) {
    return Session.find({
      user: user._id,
      expiryTime: { $gt: Date.now() }
    }, {});
  }

  static async findSessionsByUser(user) {
    return Session.find({ user: user._id }, {});
  }

  static async extendSessionExpiry(user) {
    return Session.findOneAndUpdate(
      { user: user._id },
      { expiryTime: Date.now() + SESSION_TTL },
      {}
    );
  }

  static async cleanExpiredUserSessions() {
    return Session.deleteMany({ expiryTime: { $lt: Date.now() } });
  }

  static async cleanUserSessions(user) {
    return Session.deleteMany({ user: user._id });
  }

  static async delete(sessionId) {
    return Session.deleteMany({ sessionId });
  }

  async hashSessionId() {
    this.sessionId = await generateHmacFromToken(this.sessionId);
  }

  async preValidate() {
    await this.hashSessionId();
    this.expiryTime = Date.now() + SESSION_TTL;
  }
}

export default Session;
