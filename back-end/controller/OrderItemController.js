const orderItemService = require('../service/OrderItemService');

// Thêm mặt hàng vào đơn hàng
exports.addItemToOrder = async (orderId, itemData) => {
    try {
        const newItem = await orderItemService.addItemToOrder(orderId, itemData); // Gọi service để thêm mặt hàng vào đơn hàng
        return newItem;
    } catch (error) {
        throw new Error('Error adding item to order: ' + error.message);
    }
};
