const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Định nghĩa schema cho OrderItem
const orderItemSchema = new Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId, // Liên kết với bảng Order
    ref: 'Order',
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId, // Liên kết với bảng Book
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
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('OrderItem', orderItemSchema);