import { Document } from 'marpat';

import schema from './schema';

class Audit extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return Audit.findOne({ _id });
  }

  static async findByItem(item) {
    return Audit.find({ item }, {});
  }

  static async findByUser(user) {
    return Audit.find({ user }, {});
  }
}

export default Audit;
