const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const OrderModel = require('../models/OrderModel'); // Ensure this is correctly imported

// Route: Tạo một đơn hàng mới
router.post('/', async (req, res) => {
    try {
        const { 
           id, customer_id, staff_id, order_date, order_status, payment_status, 
            total_amount, total_quantity, shipping_address, order_type, 
            customer_feedback, payment_method 
        } = req.body;

        // Gọi controller để tạo đơn hàng
        const newOrder = await orderController.createOrder({
            id,
            customer_id, staff_id, order_date, order_status, payment_status, 
            total_amount, total_quantity, shipping_address, order_type, 
            customer_feedback, payment_method
        });

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Order created successfully', data: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route: Lấy danh sách tất cả đơn hàng
router.get('/', async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
