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
}

export default Audit;
