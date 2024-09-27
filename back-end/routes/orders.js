// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');

// Route: Tạo một đơn hàng mới
router.post('/', async (req, res) => {
    try {
        const { id, customer_id, order_date, status, total_amount, shipping_address } = req.body; // Lấy dữ liệu từ body của request
        const newOrder = await orderController.createOrder({ id, customer_id, order_date, status, total_amount, shipping_address }); // Gọi controller để tạo đơn hàng
        res.status(201).json({ message: 'Order created successfully', data: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
