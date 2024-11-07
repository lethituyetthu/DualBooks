// models/OrderModel.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Order ID
    customer_id: { type: String, required: true }, // Customer ID
    order_date: { type: Date, default: Date.now }, // Date of the order
    status: { type: String, default: 'Đang xử lý' }, // Order status
    total_amount: { type: Number, required: true }, // Total order amount
    shipping_address: { type: String, required: true } // Shipping address
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
