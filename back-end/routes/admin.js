const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController');
const uploadAdmin = require('../middlewares/uploadAdmin'); // Import middleware Multer
const authenticateAdmin = require('../middlewares/auth'); // Import middleware xác thực

// Endpoint đăng ký admin mới
// POST /api/admins/register
router.post('/register', uploadAdmin.single('user_img'), async (req, res) => {
    try {
        await adminController.registerAdmin(req, res);
    } catch (error) {
        console.error('Lỗi khi đăng ký admin:', error);  // Log chi tiết lỗi ra console
        res.status(500).json({
            error: error.message,  // Gửi thông điệp lỗi đến client
            stack: error.stack,    // Gửi thêm stack trace (nếu cần chi tiết)
            code: error.code || 'SERVER_ERROR', // Gửi mã lỗi nếu có
        });
    }
});


// Endpoint đăng nhập admin
// POST /api/admins/login
router.post('/login', async (req, res) => {
    try {
        await adminController.loginAdmin(req, res);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
// **Endpoint mới: Lấy danh sách tất cả admin (Chỉ dành cho admin đã đăng nhập)**
// GET /api/admins
router.get('/', async (req, res) => {
    try {
        await adminController.getAllAdmins(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
