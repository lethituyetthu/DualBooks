const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Để mã hóa mật khẩu

const Schema = mongoose.Schema;

// Định nghĩa schema cho bảng Admins
const AdminSchema = new Schema({

    username: { 
        type: String, 
        required: true, 
        unique: true, // Đảm bảo username là duy nhất
        trim: true // Loại bỏ khoảng trắng đầu và cuối
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Đảm bảo email là duy nhất
        trim: true,
        lowercase: true // Chuyển email thành chữ thường
    },
    password: { 
        type: String, 
        required: true 
    },
    user_img: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true,
        enum: ['admin', 'staff'],
        default: 'staff' // Thiết lập mặc định là 'staff'
    },
    refreshToken: { type: String }, // Lưu refresh_token
    otp: { type: String },
    otpExpiry: { type: Date },
    token: { type: String },
    tokenExpiry: { type: Date },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
    
});

// Middleware trước khi lưu để mã hóa mật khẩu
AdminSchema.pre('save', async function(next) {
    try {
        // Chỉ mã hóa mật khẩu nếu nó đã được thay đổi hoặc là mới
        if (!this.isModified('password')) {
            return next();
        }

        // Tạo salt
        const salt = await bcrypt.genSalt(10);
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Gán lại mật khẩu đã mã hóa
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Phương thức để so sánh mật khẩu khi đăng nhập
// Hàm so sánh mật khẩu
AdminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
};

// Tạo model từ schema
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
