// File: middlewares/authCustomer.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Đảm bảo SECRET_KEY được định nghĩa đúng trong config.js

const authenticateCustomer = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Gán thông tin khách hàng vào req để sử dụng trong các middleware tiếp theo
        req.customer = decoded;  // Gán thông tin customer từ token vào req.customer

        // In ra thông tin để kiểm tra (debug)
        console.log("Decoded customer information:", req.customer);

        next(); // Chuyển sang middleware tiếp theo hoặc controller
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' }); // Nếu token không hợp lệ
    }
};

module.exports = authenticateCustomer;



