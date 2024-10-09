// service/OrderService.js
const OrderModel = require('../models/OrderModel');
// Tạo một đơn hàng mới
exports.createOrder = async (orderData) => {
    try {
        const newOrder = new OrderModel({
            id: orderData.id,
            customer_id: orderData.customer_id,
            order_date: orderData.order_date || Date.now(),
            status: orderData.status || 'Đang xử lý',
            total_amount: orderData.total_amount,
            shipping_address: orderData.shipping_address,
        });
        await newOrder.save(); // Lưu vào cơ sở dữ liệu
        return newOrder;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};
