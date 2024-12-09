const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_SECRET_KEY } = require('../config'); // Đảm bảo bạn đã định nghĩa SECRET_KEY và REFRESH_SECRET_KEY trong config.js
const Admin = require('../models/AdminModel'); // Đảm bảo bạn đã có model Admin để truy cập

// Middleware xác thực với access_token và refresh_token
const authenticateAdmin = async (req, res, next) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <access_token>"

    // Kiểm tra access_token
    if (!accessToken) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Giải mã access_token
        const decoded = jwt.verify(accessToken, SECRET_KEY);

        // Tìm thông tin admin từ database
        const admin = await Admin.findById(decoded.id);

        // Nếu không tìm thấy admin hoặc chưa xác minh email, trả về lỗi
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }
        if (!admin.isEmailVerified) {
            return res.status(403).json({ error: 'Email not verified. Please verify your email to access this resource.' });
        }

        // Kiểm tra vai trò của người dùng là admin
        if (admin.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        // Gán thông tin admin vào req để sử dụng trong các middleware tiếp theo
        req.admin = admin;

        // Nếu access_token hợp lệ, cho phép tiếp tục
        return next();
    } catch (err) {
        // Nếu access_token không hợp lệ hoặc hết hạn, kiểm tra refresh_token
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(403).json({ error: 'Access denied. No refresh token provided.' });
        }

        try {
            // Giải mã refresh_token
            const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

            // Kiểm tra xem refresh_token có hợp lệ không
            const admin = await Admin.findOne({ _id: decodedRefreshToken.id, refreshToken });

            if (!admin) {
                return res.status(403).json({ error: 'Invalid refresh token.' });
            }

            // Nếu email chưa xác minh, trả về lỗi
            if (!admin.isEmailVerified) {
                return res.status(403).json({ error: 'Email not verified. Please verify your email to access this resource.' });
            }

            // Tạo lại access_token mới
            const newAccessToken = jwt.sign(
                { id: admin._id, email: admin.email, role: admin.role },
                SECRET_KEY,
                { expiresIn: '15m' }
            );

            // Gán access_token mới vào response header hoặc body
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);

            // Cập nhật thông tin admin vào request
            req.admin = { id: admin._id, email: admin.email, role: admin.role };

            // Tiến hành tiếp tục
            return next();
        } catch (err) {
            return res.status(400).json({ error: 'Invalid or expired refresh token' });
        }
    }
};

module.exports = authenticateAdmin;
