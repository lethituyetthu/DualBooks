const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const orderSchema = new Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: function() { return this.order_type === 'online'; } // customer_id chỉ bắt buộc cho đơn hàng online
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Thay đổi ref thành 'Admin' để liên kết với bảng admins
        required: function() { return this.order_type === 'offline'; } // staff_id chỉ bắt buộc cho đơn hàng offline
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    order_status: {
        type: String,
        enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy'],
        default: 'Chờ xác nhận',
        required: true,
    },
    payment_status: {
        type: String,
        enum: ['Chưa thanh toán', 'Đang xử lý thanh toán', 'Đã thanh toán', 'Thanh toán thất bại'],
        default: 'Chưa thanh toán',
        required: true,
    },
    payment_method: { // Trường mới để lưu phương thức thanh toán
        type: String,
        enum: ['Tiền mặt', 'Chuyển khoản'],
        default: 'Tiền mặt', // Mặc định là tiền mặt khi tạo đơn hàng mới
        required: true,
    },
    shipping_address: {
        type: String,
        required: function() { return this.order_type === 'online'; }, // địa chỉ giao hàng chỉ bắt buộc cho đơn hàng online
        default: "Đường số 3, CVPM Quang Trung, Quận 12" // địa chỉ mặc định cho đơn hàng offline
    },
    total_amount: {
        type: Number,
        required: true,
    },
    total_quantity: {  // Trường mới để lưu tổng số lượng đơn hàng
        type: Number,
        required: true,
        default: 0  // Mặc định là 0, có thể cập nhật khi thêm các mặt hàng vào đơn hàng
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    order_type: {
        type: String,
        enum: ['online', 'offline'],
        required: true,
    },
    customer_feedback: {
        type: String,
        default: null, // Trường để lưu đánh giá của khách hàng
    }
  }, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
