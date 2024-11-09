const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
<<<<<<< HEAD
const orderItemController = require('../controller/OrderItemController');
=======
const OrderModel = require('../models/OrderModel'); // Ensure this is correctly imported
>>>>>>> origin/nhathuy

// Route: Tạo một đơn hàng mới
router.post('/', async (req, res) => {
    try {
        const { 
<<<<<<< HEAD
            customer_id, staff_id, order_date, order_status, payment_status, 
=======
           id, customer_id, staff_id, order_date, order_status, payment_status, 
>>>>>>> origin/nhathuy
            total_amount, total_quantity, shipping_address, order_type, 
            customer_feedback, payment_method 
        } = req.body;

        // Gọi controller để tạo đơn hàng
        const newOrder = await orderController.createOrder({
<<<<<<< HEAD
=======
            id,
>>>>>>> origin/nhathuy
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

<<<<<<< HEAD
// Route để lấy danh sách tất cả đơn hàng
router.get('/', async (req, res) => {
    try {
        const orders = await orderController.getAllOrders();
        res.status(200).json({
            message: 'Retrieved all orders successfully',
            data: orders
        });
=======
// Route: Lấy danh sách tất cả đơn hàng
router.get('/', async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json({ data: orders });
>>>>>>> origin/nhathuy
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
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
// Route: Lọc đơn hàng theo trạng thái
router.get('/filter-by-status/:status', async (req, res) => {
    try {
       // Giải mã tham số trạng thái từ URL
       const status = decodeURIComponent(req.params.status);

       // Lấy đơn hàng theo trạng thái
       const orders = await orderController.getOrdersByStatus(status);

       res.status(200).json({
           message: `Retrieved orders with status ${status}`,
           data: orders
       });
   } catch (error) {
       // Trả về lỗi nếu có
       res.status(500).json({ error: error.message });
   }
});


// Route để thêm chi tiết đơn hàng
router.post('/:orderId/order-items', orderItemController.addOrderItem);

// Route để xóa đơn hàng theo orderId
router.delete('/:orderId', orderController.deleteOrder);

// Định nghĩa route để lấy chi tiết đơn hàng
router.get('/:orderId', orderController.getOrderDetail);

=======
>>>>>>> origin/nhathuy
module.exports = router;
