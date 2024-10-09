const express = require('express');
const router = express.Router();
const orderItemController = require('../controller/OrderItemController');

// Route: Thêm mặt hàng vào đơn hàng
router.post('/:orderId/items', async (req, res) => {
    try {
        const { orderId } = req.params; // Lấy orderId từ URL
        const { book_id, quantity, price } = req.body; // Lấy dữ liệu từ body của request
        const newItem = await orderItemController.addItemToOrder(orderId, { book_id, quantity, price }); // Gọi controller để thêm mặt hàng
        res.status(201).json({ message: 'Item added to order successfully', data: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
