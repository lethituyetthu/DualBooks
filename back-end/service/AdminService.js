const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_SECRET_KEY } = require('../config');
// Hàm đăng ký admin mới
exports.registerAdmin = async (adminData) => {
    try {
        // Kiểm tra xem có trường nào không được điền
        const requiredFields = ['username', 'email', 'password', 'user_img', 'role'];
        for (const field of requiredFields) {
            if (!adminData[field]) {
                throw new Error(`Bạn chưa nhập  "${field}" .`);
            }
        }

        // Kiểm tra xem email hoặc username đã tồn tại chưa
        const existingAdmin = await Admin.findOne({ 
            $or: [{ email: adminData.email }, { username: adminData.username }]
        });

        if (existingAdmin) {
            throw new Error('Tên người dùng và mật khẩu đã tồn tại');
        }

  
        // Kiểm tra quy tắc đặt mật khẩu
        const passwordRegex = /^[A-Za-z\d]{6}$/; // Chính xác 6 ký tự, chỉ cho phép chữ cái và số
        if (!passwordRegex.test(adminData.password)) {
            throw new Error('Mật khẩu phải dài chính xác 6 ký tự và chỉ chứa chữ cái và số');
        }

        // Tạo admin mới (mật khẩu sẽ được mã hóa bởi middleware pre-save)
        const newAdmin = new Admin({
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
// Hàm xử lý đăng nhập admin
exports.loginAccessAdmin = async (email, password) => {
    try {
        // Tìm admin theo email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            throw new Error('Admin not found');
        }
   // Kiểm tra xem email đã được xác minh chưa
   if (!admin.isEmailVerified) {
    throw new Error('Email chưa được xác minh. Vui lòng kiểm tra email của bạn.');
}
        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // Tạo access_token và refresh_token
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            SECRET_KEY,
            { expiresIn: '15m' } // Access token có thời gian sống ngắn (15 phút)
        );

        const refreshToken = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            REFRESH_SECRET_KEY,
            { expiresIn: '7d' } // Refresh token có thời gian sống dài hơn (7 ngày)
        );

        // Lưu refresh_token vào cơ sở dữ liệu (nếu cần thiết)
        admin.refreshToken = refreshToken;
        await admin.save();

        // Trả về token và admin thông tin
        return { token, refreshToken, admin };
    } catch (error) {
        throw new Error('Error during login: ' + error.message);
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
// Service: Lấy thông tin chi tiết của một admin
exports.getAdminById = async (id) => {
    try {
        const admin = await Admin.findById(id).select('-password'); // Loại bỏ trường mật khẩu khỏi kết quả
        return admin;
    } catch (error) {
        throw new Error('Error fetching admin: ' + error.message);
    }
};


exports.updateAdmin = async (id, updateData) => {
    try {
        // Kiểm tra xem admin có tồn tại không
        const admin = await Admin.findById(id);
        if (!admin) {
            throw new Error('Admin không tồn tại');
        }

        // Nếu có cập nhật mật khẩu, mã hóa lại mật khẩu
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        // Cập nhật admin với dữ liệu mới
        Object.assign(admin, updateData);
        admin.updated_at = new Date(); // Cập nhật thời gian cập nhật

        await admin.save();
        return admin;
    } catch (error) {
        throw new Error('Error updating admin: ' + error.message);
    }
};
// Hàm xóa admin theo ID trong service
exports.deleteAdmin = async (adminId) => {
    try {
        // Tìm và xóa admin theo ID
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        return deletedAdmin; // Trả về admin đã xóa (nếu có)
    } catch (error) {
        throw new Error('Error deleting admin: ' + error.message);
    }
};
// Hàm lọc admin theo role
exports.getByRole = async function (role) {
    try {
        const admins = await Admin.find({ role: role }); // Tìm admin theo role
        return admins;
    } catch (error) {
        throw new Error('Error fetching admins by role: ' + error.message);
    }
};

// Hàm lấy danh sách người dùng theo tên
exports.getAdminsByName = async (name) => {
    try {
        // Thêm \ trước dấu ngoặc để đảm bảo các ký tự đặc biệt không gây lỗi
        const regexName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const admins = await Admin.find({ username: { $regex: regexName, $options: 'i' } }); // Tìm kiếm không phân biệt chữ hoa chữ thường
        return admins;
    } catch (error) {
        throw new Error('Error fetching admins: ' + error.message);
    }
};

