const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// Định nghĩa schema cho OrderItem
const orderItemSchema = new Schema({
  order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
  },
  book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
  },
  quantity: {
      type: Number,
      required: true,
  },
  price: {
      type: Number,
      required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);