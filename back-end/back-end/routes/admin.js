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
        res.status(500).json({ error: error.message });
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
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        await adminController.getAllAdmins(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
