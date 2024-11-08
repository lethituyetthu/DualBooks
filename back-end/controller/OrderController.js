// controller/OrderController.js
const orderService = require('../service/OrderService');

// Tạo một đơn hàng mới
exports.createOrder = async (orderData) => {
    try {
        // Kiểm tra và xác thực dữ liệu đầu vào (nếu cần)
        const { order_type } = orderData;

        // Nếu order_type là 'offline', đảm bảo staff_id được cung cấp và đặt trạng thái mặc định
        if (order_type === 'offline') {
            if (!orderData.staff_id) {
                throw new Error('Staff ID is required for offline orders.');
            }
            // Thiết lập trạng thái đơn hàng và trạng thái thanh toán cho đơn hàng offline
            orderData.order_status = 'Hoàn thành';
            orderData.payment_status = 'Đã thanh toán';
        }

        // Nếu order_type là 'online', đảm bảo customer_id và shipping_address được cung cấp
        if (order_type === 'online') {
            if (!orderData.customer_id) {
                throw new Error('Customer ID is required for online orders.');
            }
            // Nếu không có địa chỉ giao hàng, sử dụng địa chỉ mặc định
            if (!orderData.shipping_address) {
                orderData.shipping_address = "Đường số 3. CVPM Quang Trung, Quận 12"; // Địa chỉ mặc định
            }
        }

        // Gọi service để tạo đơn hàng với các dữ liệu từ request body
        const newOrder = await orderService.createOrder(orderData);
        return newOrder; // Trả về dữ liệu của đơn hàng mới tạo
    } catch (error) {
        // Ném lỗi ra nếu có vấn đề xảy ra trong quá trình tạo đơn hàng
        throw new Error('Error creating order: ' + error.message);
    }
};
