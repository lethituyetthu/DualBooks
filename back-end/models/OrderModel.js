const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const orderSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer', // Tham chiếu đến bảng khách hàng
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    order_status: {
      type: String,
      enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy'],
      default: 'Chờ xác nhận',
      required: true, // NOT NULL
    },
    payment_status: {
      type: String,
      enum: ['Chưa thanh toán', 'Đang xử lý thanh toán', 'Đã thanh toán', 'Thanh toán thất bại'],
      default: 'Chưa thanh toán',
      required: true, // NOT NULL
    },
    shipping_address: {
      type: String,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Order', orderSchema);