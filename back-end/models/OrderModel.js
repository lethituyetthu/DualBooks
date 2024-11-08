const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,  // Đảm bảo giá trị id là duy nhất
        default: function() {
            return Math.floor(Math.random() * 1000000);  // Tạo một giá trị id ngẫu nhiên, có thể thay đổi logic này để phù hợp
        }
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: function() { return this.order_type === 'online'; }
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: function() { return this.order_type === 'offline'; }
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
    payment_method: {
        type: String,
        enum: ['Tiền mặt', 'Chuyển khoản'],
        default: 'Tiền mặt',
        required: true,
    },
    shipping_address: {
        type: String,
        required: function() { return this.order_type === 'online'; },
        default: "Đường số 3, CVPM Quang Trung, Quận 12"
    },
    total_amount: {
        type: Number,
        required: true,
    },
    total_quantity: {
        type: Number,
        required: true,
        default: 0
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
        default: null,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
