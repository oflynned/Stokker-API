import Item from '../models/item';
import Audit from '../models/audit';

export const createItem = async (args, user) => {
  const item = await Item.create(args)
    .save();
  await Audit.create({
    user,
    item,
    action: 'create'
  });
  return item;
};

export const findItems = async ({ _id, ...rest }) => {
  if (_id) {
    return Item.findById(_id);
  }

  return Item.find(rest, {});
};

export const updateItem = async (_id, props, user) => {
  const item = await Item.update(_id, props);
  await Audit.create({
    user,
    item,
    action: 'update',
    changes: props
  })
    .save();

  return item;
};

export const deleteItem = async (_id, user) => {
  const item = await Item.findById(_id);
  await Audit.create({
    user,
    item,
    action: 'delete'
  });
  return Item.update(_id, { archived: true });
};
