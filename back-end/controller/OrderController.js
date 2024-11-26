const orderService = require('../service/OrderService');
const customerService = require('../service/CustomerService ');
// Hàm định dạng đơn hàng
const formatOrder = (order) => {
    return {
      id: order._id,
      order_type: order.order_type,
      staff_id: order.staff_id,
      order_date: order.order_date,
      order_status: order.order_status,
      payment_status: order.payment_status,
      shipping_address: order.shipping_address,
      total_amount: order.total_amount,
      total_quantity: order.total_quantity,
      customer_feedback: order.customer_feedback,
      orderItems: order.orderItems.map(item => ({
        id: item._id,
        bookId: item.book_id._id,
        bookTitle: item.book_id.title,
        quantity: item.quantity,
        price: item.price
      }))
    };
  };
  
  // Hàm định dạng dữ liệu khách hàng (nếu có)
  const formatCustomer = (customer) => {
    return {
      id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    };
  };
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



// Controller để lấy chi tiết đơn hàng
exports.getOrderDetail = async (req, res) => {
    const { orderId } = req.params; // Lấy orderId từ tham số URL
    try {
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
       // Định dạng dữ liệu đơn hàng ban đầu
    const formattedOrder = formatOrder(order);
        // Kiểm tra nếu là đơn hàng trực tuyến, bổ sung thông tin khách hàng
        if (order.order_type === 'online' && order.customer_id) {
            const customer = await orderService.getCustomerById(order.customer_id);
            if (customer) {
                formattedOrder.customerInfo = formatCustomer(customer);
            } else {
                return res.status(404).json({ message: 'Customer not found' });
            }
        }

        res.json(formattedOrder);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Lấy toàn bộ danh sách đơn hàng với thông tin chi tiết của khách hàng
exports.getAllOrders = async () => {
    try {
        // Gọi service để lấy danh sách đơn hàng
        const orders = await orderService.getAllOrders(); // Gọi hàm từ service

        // Định dạng lại dữ liệu trước khi trả về
        const formattedOrders = orders.map((order) => {
            const baseOrder = {
                id: order._id,
                order_date: order.order_date,
                order_type: order.order_type,
                order_status: order.order_status,
                payment_status: order.payment_status,
                shipping_address: order.shipping_address || "Địa chỉ cửa hàng", // Địa chỉ mặc định
                total_amount: order.total_amount,
                total_quantity: order.total_quantity,
                created_at: order.createdAt,
                updated_at: order.updatedAt
            };

            // Nếu đơn hàng là trực tuyến, bổ sung thông tin khách hàng
            if (order.order_type === 'online' && order.customer_id) {
                return {
                    ...baseOrder,
                    customer: {
                        id: order.customer_id._id,
                        name: order.customer_id.name,
                        email: order.customer_id.email,
                        address: order.customer_id.address,
                        phone: order.customer_id.phone
                    }
                };
            }

            return baseOrder; // Trả về đơn hàng cơ bản cho đơn hàng ngoại tuyến
        });

        return formattedOrders; // Trả về danh sách đơn hàng đã được định dạng
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
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
         const formattedOrders = orders.map((order) => {
            const baseOrder = {
                id: order._id,
                order_date: order.order_date,
                order_type: order.order_type,
                order_status: order.order_status,
                payment_status: order.payment_status,
                shipping_address: order.shipping_address || "Địa chỉ cửa hàng", // Địa chỉ mặc định
                total_amount: order.total_amount,
                total_quantity: order.total_quantity,
                created_at: order.createdAt,
                updated_at: order.updatedAt
            };

            // Nếu đơn hàng là trực tuyến, bổ sung thông tin khách hàng
            if (order.order_type === 'online' && order.customer_id) {
                return {
                    ...baseOrder,
                    customer: {
                        id: order.customer_id._id,
                        name: order.customer_id.name,
                        email: order.customer_id.email,
                        address: order.customer_id.address,
                        phone: order.customer_id.phone
                    }
                };
            }

            return baseOrder; // Trả về đơn hàng cơ bản cho đơn hàng ngoại tuyến
        });

        // return formattedOrders; // Trả về danh sách đơn hàng đã được định dạng
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
        const formattedOrders = orders.map((order) => {
            const baseOrder = {
                id: order._id,
                order_date: order.order_date,
                order_type: order.order_type,
                order_status: order.order_status,
                payment_status: order.payment_status,
                shipping_address: order.shipping_address || "Địa chỉ cửa hàng", // Địa chỉ mặc định
                total_amount: order.total_amount,
                total_quantity: order.total_quantity,
                created_at: order.createdAt,
                updated_at: order.updatedAt
            };

            // Nếu đơn hàng là trực tuyến, bổ sung thông tin khách hàng
            if (order.order_type === 'online' && order.customer_id) {
                return {
                    ...baseOrder,
                    customer: {
                        id: order.customer_id._id,
                        name: order.customer_id.name,
                        email: order.customer_id.email,
                        address: order.customer_id.address,
                        phone: order.customer_id.phone
                    }
                };
            }

            return baseOrder; // Trả về đơn hàng cơ bản cho đơn hàng ngoại tuyến
        });

        // return formattedOrders; // Trả về danh sách đơn hàng đã được định dạng
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrdersByStatus = async (status) => {
    try {
        // Gọi service để lấy danh sách đơn hàng theo trạng thái
        const orders = await orderService.getOrdersByStatus(status);

        // Kiểm tra xem có đơn hàng nào không
        if (orders.length === 0) {
            throw new Error('Không tìm thấy đơn hàng nào với trạng thái này.');
        }

      // Định dạng lại dữ liệu trước khi trả về
      const formattedOrders = orders.map((order) => {
        const baseOrder = {
            id: order._id,
            order_date: order.order_date,
            order_type: order.order_type,
            order_status: order.order_status,
            payment_status: order.payment_status,
            shipping_address: order.shipping_address || "Địa chỉ cửa hàng", // Địa chỉ mặc định
            total_amount: order.total_amount,
            total_quantity: order.total_quantity,
            created_at: order.createdAt,
            updated_at: order.updatedAt
        };

        // Nếu đơn hàng là trực tuyến, bổ sung thông tin khách hàng
        if (order.order_type === 'online' && order.customer_id) {
            return {
                ...baseOrder,
                customer: {
                    id: order.customer_id._id,
                    name: order.customer_id.name,
                    email: order.customer_id.email,
                    address: order.customer_id.address,
                    phone: order.customer_id.phone
                }
            };
        }

        return baseOrder; // Trả về đơn hàng cơ bản cho đơn hàng ngoại tuyến
    });

    return formattedOrders; // Trả về danh sách đơn hàng đã được định dạng
} catch (error) {
    throw new Error('Error fetching orders: ' + error.message);
}
};

// Controller để xóa đơn hàng theo orderId
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params; // Lấy orderId từ tham số URL
    try {
        // Gọi service để xóa đơn hàng
        const deletedOrder = await orderService.deleteOrder(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.cancelOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Gọi hàm từ service để hủy đơn hàng
        const updatedOrder = await orderService.cancelOrder(orderId);
        res.status(200).json({
            message: 'Order has been cancelled successfully',
            data: updatedOrder
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.confirmOrder = async (req, res) => {
    const { orderId } = req.params; // Lấy orderId từ URL

    try {
        // Gọi service để xác nhận đơn hàng
        const updatedOrder = await orderService.confirmOrder(orderId);

        // Trả về kết quả
        res.status(200).json({
            message: 'Order has been confirmed successfully',
            data: updatedOrder,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
// Controller: Lọc đơn hàng theo ID khách hàng
exports.getOrdersByCustomerId = async (req, res, customerId) => {
    try {
        // Gọi service để lấy danh sách đơn hàng theo ID khách hàng
        const orders = await orderService.getOrdersByCustomerId(customerId);
        
        // Kiểm tra danh sách đơn hàng
        if (orders.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào được tìm thấy cho khách hàng này.' });
        }
        // Định dạng lại dữ liệu đơn hàng trước khi trả về
        const formattedOrders = orders.map((order) => ({
            id: order._id,
            order_date: order.order_date,
            order_status: order.order_status,
            payment_status: order.payment_status,
            shipping_address: order.shipping_address,
            total_amount: order.total_amount,
            total_quantity: order.total_quantity,
            orderItems: order.orderItems.map(item => ({
                id: item._id,
                bookId: item.book_id._id,
                bookTitle: item.book_id.title, // Ví dụ trường title từ book_id
                quantity: item.quantity,
                price: item.price
            })) ,// Nếu cần chi tiết sản phẩm
            created_at: order.createdAt,
            updated_at: order.updatedAt
        }));
        res.status(200).json(formattedOrders); // Trả về danh sách đơn hàng
    } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi
    }
};




