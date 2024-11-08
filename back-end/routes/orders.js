const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const orderItemController = require('../controller/OrderItemController');

// Route: Tạo một đơn hàng mới
router.post('/', async (req, res) => {
    try {
        // Lấy dữ liệu từ body của request
        const { 
            customer_id, 
            staff_id, // Thêm trường staff_id cho đơn hàng offline
            order_date, 
            order_status, 
            payment_status, 
            total_amount, 
            total_quantity, 
            shipping_address, 
            payment_method,
            order_type, // Thêm trường order_type để xác định đơn hàng online hoặc offline
            customer_feedback // Thêm trường customer_feedback cho đánh giá của khách hàng
        } = req.body;

        // Gọi controller để tạo đơn hàng
        const newOrder = await orderController.createOrder({
            customer_id, 
            staff_id,
            order_date, 
            order_status, 
            payment_status, 
            total_amount, 
            total_quantity, 
            shipping_address,
            payment_method,
            order_type,
            customer_feedback
        });

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Order created successfully', newOrder });
    } catch (error) {
        // Trả về lỗi nếu có
        res.status(500).json({ error: error.message });
    }
});

// Định nghĩa route để lấy chi tiết đơn hàng
router.get('/:orderId', orderController.getOrderDetail);

// Route để thêm chi tiết đơn hàng
router.post('/:orderId/order-items', orderItemController.addOrderItem);


router.get('/', async (req, res) => {
    try {
        // Gọi controller để lấy danh sách đơn hàng
        const orders = await orderController.getAllOrders();
        
        // Trả về danh sách đơn hàng
        res.status(200).json( orders);
    } catch (error) {
        // Trả về lỗi nếu có
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
