// controllers/orderItemController.js
const orderItemService = require('../service/OrderItemService');


exports.addOrderItem = async (req, res) => {
    const { orderId } = req.params;
    const { book_id, quantity, price } = req.body;

    try {
        // Tạo OrderItem mới và giảm số lượng tồn kho
        const newOrderItem = await orderItemService.createOrderItem(orderId, book_id, quantity, price);

        // Cập nhật Order để thêm OrderItem vào mảng orderItems
        await orderItemService.addOrderItemToOrder(orderId, newOrderItem._id);

        res.status(201).json(newOrderItem); // Trả về OrderItem mới
    } catch (error) {
        console.error('Lỗi khi thêm OrderItem:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
