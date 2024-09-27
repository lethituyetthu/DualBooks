// controller/OrderController.js
const orderService = require('../service/OrderService');

// Tạo một đơn hàng mới
exports.createOrder = async (orderData) => {
    try {
        const newOrder = await orderService.createOrder(orderData); // Gọi service để tạo đơn hàng
        return newOrder;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};
