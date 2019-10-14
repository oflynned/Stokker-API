import { Document } from 'marpat';

import schema from './schema';
import Audit from '../audit';

class User extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return User.findOne({ _id });
  }

  async audits() {
    console.log(this);
    return Audit.findByUser(this._id);
  }
}

export default User;
