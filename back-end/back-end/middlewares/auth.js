// File: middlewares/auth.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Đảm bảo bạn đã định nghĩa SECRET_KEY trong config.js

// Middleware xác thực và ủy quyền admin
const authenticateAdmin = (req, res, next) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Kiểm tra vai trò
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        // Gán thông tin admin vào req để sử dụng trong các middleware tiếp theo
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateAdmin;
