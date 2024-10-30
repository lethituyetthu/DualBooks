const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const orderItemController = require('../controller/OrderItemController');
// Route: Tạo một đơn hàng mới
router.post('/', async (req, res) => {
    try {
        // Lấy dữ liệu từ body của request
        const { customer_id, order_date, order_status, payment_status, total_amount, shipping_address } = req.body;

        // Gọi controller để tạo đơn hàng
        const newOrder = await orderController.createOrder({
            customer_id, 
            order_date, 
            order_status, 
            payment_status, 
            total_amount, 
            shipping_address
        });

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Order created successfully', data: newOrder });
    } catch (error) {
        // Trả về lỗi nếu có
        res.status(500).json({ error: error.message });
    }
});

// Định nghĩa route để lấy chi tiết đơn hàng
router.get('/:orderId', orderController.getOrderDetail);
// Route để thêm chi tiết đơn hàng
router.post('/:orderId/order-items', orderItemController.addOrderItem);
// Route: Lấy danh sách toàn bộ đơn hàng
router.get('/', async (req, res) => {
    try {
        // Gọi controller để lấy danh sách đơn hàng
        await orderController.getAllOrders(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route: Lọc đơn hàng theo ngày cập nhật
router.get('/filter-by-date/:date', async (req, res) => {
    try {
        const { date } = req.params;
        await orderController.getOrdersByUpdateDate(req, res, date);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route: Lọc đơn hàng theo địa chỉ nhận
router.get('/filter-by-address/:address', async (req, res) => {
    try {
        const { address } = req.params;
        await orderController.getOrdersByShippingAddress(req, res, address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
