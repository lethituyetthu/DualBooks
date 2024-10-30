const OrderModel = require('../models/OrderModel');

// Tạo một đơn hàng mới
exports.createOrder = async (orderData) => {
    try {
        const newOrder = new OrderModel({
            customer_id: orderData.customer_id, // ID khách hàng
            order_date: orderData.order_date || Date.now(), // Ngày đặt hàng, mặc định là ngày hiện tại nếu không có
            order_status: orderData.order_status || 'Chờ xác nhận', // Trạng thái đơn hàng, mặc định là 'Chờ xác nhận'
            payment_status: orderData.payment_status || 'Chưa thanh toán', // Trạng thái thanh toán, mặc định là 'Chưa thanh toán'
            total_amount: orderData.total_amount, // Tổng số tiền
            shipping_address: orderData.shipping_address // Địa chỉ giao hàng
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await newOrder.save(); 
        return newOrder;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};
// Lấy toàn bộ danh sách đơn hàng và populate thông tin chi tiết của khách hàng
exports.getAllOrdersWithCustomerDetails = async () => {
    try {
        // Tìm tất cả các đơn hàng và populate thông tin từ bảng Customer
        const orders = await OrderModel.find().populate('customer_id', 'name email address phone');
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};

// Hàm lấy đơn hàng theo ID
exports.getOrderById = async (orderId) => {
    try {
        // Tìm đơn hàng theo ID và populate orderItems cùng với book_id
        return await OrderModel.findById(orderId)
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'book_id', // Populate thông tin của Book
                }
            });
    } catch (error) {
        console.error('Lỗi khi gọi hàm getOrderById:', error);
        throw error; // Ném lại lỗi để controller có thể xử lý
    }
};
// Lấy danh sách toàn bộ đơn hàng
exports.getAllOrders = async () => {
    try {
        // Tìm và trả về toàn bộ danh sách đơn hàng
        const orders = await OrderModel.find().populate('customer_id'); // Tham chiếu tới bảng `Customer`
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};
exports.getOrdersByUpdateDate = async (date) => {
    try {
        // Chuyển đổi ngày thành định dạng ISO cho MongoDB
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // Thêm một ngày để lấy tất cả các bản ghi trong ngày

        // Tìm các đơn hàng có ngày cập nhật trong khoảng từ startDate đến endDate
        const orders = await OrderModel.find({
            updatedAt: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate('customer_id', 'name email address phone');

        return orders;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};
exports.getOrdersByShippingAddress = async (address) => {
    try {
        // Tìm các đơn hàng có địa chỉ nhận chứa địa chỉ đã nhập
        const orders = await OrderModel.find({
            shipping_address: { $regex: address, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
        }).populate('customer_id', 'name email address phone');

        return orders;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};






