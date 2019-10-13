const schema = {
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  }
};

export default schema;
