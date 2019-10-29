import User from '../user';
import Item from '../item';

export const actions = [
  'create', 'read', 'update', 'delete'
];

const schema = {
  user: {
    type: User,
    required: true
  },
  item: {
    type: Item,
    required: true
  },
  action: {
    type: String,
    choices: actions,
    required: true
  },
  changes: {
    type: Object
  }
};

export default schema;
