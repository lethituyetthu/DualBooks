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
router.get('/', async (req, res) => {
    try {
        await adminController.getAllAdmins(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route: Cập nhật thông tin admin qua id
router.put('/update/:id',  uploadAdmin.single('user_img'), async (req, res) => {
    try {
        await adminController.updateAdmin(req, res); // Gọi controller cập nhật
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route: Xóa admin theo ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await adminController.deleteAdmin(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Endpoint lọc admin theo role
router.get('/filter', adminController.getByRole);

// GET /api/admins/username/<tên>
// Endpoint lọc người dùng theo tên
router.get('/username/:name', async (req, res) => {
    try {
        const { name } = req.params; // Lấy tên từ URL parameters
        await adminController.getAdminsByName(req, res, name);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
