// File: middlewares/authCustomer.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Đảm bảo bạn đã định nghĩa SECRET_KEY trong config.js

// Middleware xác thực khách hàng
const authenticateCustomer = (req, res, next) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Gán thông tin khách hàng vào req để sử dụng trong các middleware tiếp theo
        req.customer = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateCustomer;
