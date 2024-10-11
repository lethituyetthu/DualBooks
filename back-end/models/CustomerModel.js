const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Đảm bảo email là duy nhất
    password: { type: String, required: true }, // Trường mật khẩu
    phone: { type: String, required: true },
    address: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);
