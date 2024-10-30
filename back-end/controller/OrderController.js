const orderService = require('../service/OrderService');

// Tạo một đơn hàng mới
exports.createOrder = async (orderData) => {
    try {
        // Gọi service để tạo đơn hàng với các dữ liệu từ request body
        const newOrder = await orderService.createOrder(orderData);
        return newOrder; // Trả về dữ liệu của đơn hàng mới tạo
    } catch (error) {
        // Ném lỗi ra nếu có vấn đề xảy ra trong quá trình tạo đơn hàng
        throw new Error('Error creating order: ' + error.message);
    }
};


// Controller để lấy chi tiết đơn hàng
exports.getOrderDetail = async (req, res) => {
    const { orderId } = req.params; // Lấy orderId từ tham số URL
    try {
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Lấy toàn bộ danh sách đơn hàng với thông tin chi tiết của khách hàng
exports.getAllOrders = async (req, res) => {
    try {
        // Gọi service để lấy danh sách đơn hàng và populate thông tin khách hàng
        const orders = await orderService.getAllOrdersWithCustomerDetails();
        
        // Định dạng lại dữ liệu trước khi trả về
        const formattedOrders = orders.map((order) => ({
            id: order._id, // Lấy ObjectId của đơn hàng
            customer: {
                id: order.customer_id._id, // ID khách hàng
                name: order.customer_id.name, // Tên khách hàng
                email: order.customer_id.email, // Email khách hàng
                address: order.customer_id.address, // Địa chỉ khách hàng
                phone: order.customer_id.phone // Số điện thoại khách hàng
            },
            order_date: order.order_date,
            order_status: order.order_status,
            payment_status: order.payment_status,
            shipping_address: order.shipping_address,
            total_amount: order.total_amount,
            created_at: order.createdAt, // Lấy thời gian tạo đơn hàng
            updated_at: order.updatedAt  // Lấy thời gian cập nhật đơn hàng
        }));

        // Trả về danh sách đơn hàng đã được định dạng
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrdersByUpdateDate = async (req, res, date) => {
    try {
        // Gọi service để lấy danh sách đơn hàng theo ngày cập nhật
        const orders = await orderService.getOrdersByUpdateDate(date);
        
        // Kiểm tra xem có đơn hàng nào được tìm thấy hay không
        if (orders.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào được tìm thấy cho ngày đã nhập.' });
        }

        // Định dạng lại dữ liệu trước khi trả về
        const formattedOrders = orders.map((order) => ({
            id: order._id,
            customer: {
                id: order.customer_id._id,
                name: order.customer_id.name,
                email: order.customer_id.email,
                address: order.customer_id.address,
                phone: order.customer_id.phone
            },
            order_date: order.order_date,
            order_status: order.order_status,
            payment_status: order.payment_status,
            shipping_address: order.shipping_address,
            total_amount: order.total_amount,
            created_at: order.createdAt,
            updated_at: order.updatedAt
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrdersByShippingAddress = async (req, res, address) => {
    try {
        // Gọi service để lấy danh sách đơn hàng theo địa chỉ nhận
        const orders = await orderService.getOrdersByShippingAddress(address);
        
        // Kiểm tra xem có đơn hàng nào được tìm thấy hay không
        if (orders.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào được tìm thấy cho địa chỉ đã nhập.' });
        }

        // Định dạng lại dữ liệu trước khi trả về
        const formattedOrders = orders.map((order) => ({
            id: order._id,
            customer: {
                id: order.customer_id._id,
                name: order.customer_id.name,
                email: order.customer_id.email,
                address: order.customer_id.address,
                phone: order.customer_id.phone
            },
            order_date: order.order_date,
            order_status: order.order_status,
            payment_status: order.payment_status,
            shipping_address: order.shipping_address,
            total_amount: order.total_amount,
            created_at: order.createdAt,
            updated_at: order.updatedAt
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


