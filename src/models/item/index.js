import { Document } from 'marpat';

import schema from './schema';

class Item extends Document {
  constructor() {
    super();
    this.schema(schema);
  }

  static async findById(_id) {
    return Item.findOne({ _id });
  }

  static async update(_id, properties) {
    return Item.findOneAndUpdate({ _id }, properties, {});
  }

  async createdAt() {
    return this._id.getTimestamp()
      .getTime();
  }
}

export default Item;
