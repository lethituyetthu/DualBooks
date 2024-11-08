// services/orderItemService.js
const OrderItem = require('../models/OrderItemModel');
const OrderModel = require('../models/OrderModel');


exports.createOrderItem = async (orderId, book_id, quantity, price) => {
    try {
        // Tạo OrderItem mới
        const newOrderItem = new OrderItem({
            order_id: orderId,
            book_id,
            quantity,
            price,
        });

        // Lưu OrderItem vào cơ sở dữ liệu
        await newOrderItem.save();

        // Cập nhật total_amount trong Order
        const order = await OrderModel.findById(orderId);
        if (order) {
            order.total_amount += price * quantity; // Cập nhật trường total_amount
            await order.save(); // Lưu lại đơn hàng đã được cập nhật
        }

        // Trả về OrderItem mới được tạo
        return newOrderItem;
    } catch (error) {
        console.error('Lỗi khi tạo OrderItem:', error);
        throw error; // Ném lại lỗi để controller có thể xử lý
    }
};

exports.addOrderItemToOrder = async (orderId, orderItemId) => {
    try {
        // Cập nhật Order để thêm OrderItem vào mảng orderItems
        await OrderModel.findByIdAndUpdate(orderId, {
            $push: { orderItems: orderItemId }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật Order:', error);
        throw error; // Ném lại lỗi để controller có thể xử lý
    }
};
