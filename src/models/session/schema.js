import User from '../user';

const schema = {
  sessionId: {
    type: String,
    required: true
  },
  user: {
    type: User,
    required: true
  },
  expiryTime: {
    type: Number,
    required: true
  }
};

export default schema;
