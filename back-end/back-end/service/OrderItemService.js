const OrderItemModel = require('../models/OrderItemModel');

// Thêm mặt hàng vào đơn hàng
exports.addItemToOrder = async (orderId, itemData) => {
    try {
        const newItem = new OrderItemModel({
            order_id: orderId, // Gán orderId vào order_id
            book_id: itemData.book_id,
            quantity: itemData.quantity,
            price: itemData.price
        });
        await newItem.save(); // Lưu mặt hàng vào cơ sở dữ liệu
        return newItem;
    } catch (error) {
        throw new Error('Error adding item to order: ' + error.message);
    }
};
