// service/OrderService.js
const OrderModel = require('../models/OrderModel');
// Tạo một đơn hàng mới
exports.createOrder = async (orderData) => {
    try {
        // Khởi tạo đơn hàng mới với các trường đã cung cấp
        const newOrder = new OrderModel({
            id: orderData.id,
            customer_id: orderData.order_type === 'online' ? orderData.customer_id : undefined, // ID khách hàng cho đơn hàng online
            staff_id: orderData.order_type === 'offline' ? orderData.staff_id : undefined, // ID nhân viên cho đơn hàng offline
            order_date: orderData.order_date || Date.now(), // Ngày đặt hàng, mặc định là ngày hiện tại nếu không có
            order_status: orderData.order_type === 'offline' ? 'Hoàn thành' : (orderData.order_status || 'Chờ xác nhận'), // Trạng thái mặc định cho đơn hàng offline là 'Hoàn thành'
            payment_status: orderData.order_type === 'offline' ? 'Đã thanh toán' : (orderData.payment_status || 'Chưa thanh toán'), // Trạng thái thanh toán mặc định cho đơn hàng offline là 'Đã thanh toán'
            total_amount: orderData.total_amount, // Tổng số tiền
            total_quantity: orderData.total_quantity, // Tổng số lượng
            shipping_address: orderData.shipping_address || "Đường số 3. CVPM Quang Trung, Quận 12", // Địa chỉ giao hàng, mặc định nếu không có
            order_type: orderData.order_type, // Loại đơn hàng: online hoặc offline
            customer_feedback: orderData.customer_feedback, // Đánh giá của khách hàng
            payment_method: orderData.payment_method // Phương thức thanh toán
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await newOrder.save(); 
        return newOrder;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};