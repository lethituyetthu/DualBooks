const adminService = require('../service/AdminService');

// Hàm đăng ký admin mới
exports.registerAdmin = async (req, res) => {
    try {
        const adminData = req.body;

        // Kiểm tra xem có tệp tin ảnh được tải lên không
        if (!req.file) {
            return res.status(400).json({ error: 'hình ảnh không thể bỏ trống' });
        }

        adminData.user_img = req.file.filename;

        const newAdmin = await adminService.registerAdmin(adminData);
        res.status(201).json({ message: 'nhân viên mới', data: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hàm đăng nhập admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, admin } = await adminService.loginAdmin(email, password);
        res.status(200).json({ message: 'Login successful', token, admin });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
// **Hàm mới: Lấy tất cả admin**
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json( admins );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
