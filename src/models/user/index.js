import { Document } from 'marpat';

import schema from './schema';

class User extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return User.findOne({ _id });
  }
}

export default User;
