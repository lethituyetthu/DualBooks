const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Đảm bảo email là duy nhất
    password: { type: String, required: true }, // Trường mật khẩu
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }, // Trạng thái hoạt động của khách hàng
    refreshToken: { type: String }, // Lưu refresh_token
    isEmailVerified: {
        type: Boolean,
        default: false, // Chưa xác minh email
    },
    verificationCode: {
        type: String,
        required: false, // Chưa cần mã xác nhận khi tạo
    },
    verificationCodeExpiry: {
        type: Date,
        required: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
// Tạo chỉ mục tìm kiếm văn bản cho trường `name` (để cải thiện hiệu suất tìm kiếm theo tên)
CustomerSchema.index({ name: 'text' });
module.exports = mongoose.model('Customer', CustomerSchema);
