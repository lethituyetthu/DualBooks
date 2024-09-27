const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Đảm bảo bạn có file config.js với SECRET_KEY

// Hàm đăng ký admin mới
exports.registerAdmin = async (adminData) => {
    try {
        // Kiểm tra xem email hoặc username đã tồn tại chưa
        const existingAdmin = await Admin.findOne({ 
            $or: [{ email: adminData.email }, { username: adminData.username }, { id: adminData.id }]
        });

        if (existingAdmin) {
            throw new Error('Admin with given email, username, or id already exists');
        }

        // Tạo admin mới (mật khẩu sẽ được mã hóa bởi middleware pre-save)
        const newAdmin = new Admin({
            id: adminData.id,
            username: adminData.username,
            email: adminData.email,
            password: adminData.password, // Mật khẩu chưa mã hóa
            user_img: adminData.user_img, // Tên file ảnh đã được lưu
            role: adminData.role || 'admin',
            created_at: new Date(),
            updated_at: new Date()
        });

        // Lưu admin mới vào cơ sở dữ liệu
        await newAdmin.save();

        return newAdmin;
    } catch (error) {
        throw new Error('Error registering admin: ' + error.message);
    }
};

// Hàm đăng nhập admin
exports.loginAdmin = async (email, password) => {
    try {
        // Tìm admin theo email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            throw new Error('Admin not found');
        }

        // Kiểm tra mật khẩu
        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // Tạo token
        const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });

        return { token, admin };
    } catch (error) {
        throw new Error('Error logging in admin: ' + error.message);
    }
};
// **Hàm mới: Lấy tất cả admin**
exports.getAllAdmins = async () => {
    try {
        const admins = await Admin.find().select('-password'); // Loại bỏ trường mật khẩu khỏi kết quả
        return admins;
    } catch (error) {
        throw new Error('Error fetching admins: ' + error.message);
    }
};