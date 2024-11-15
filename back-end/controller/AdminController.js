const adminService = require('../service/AdminService');

// Hàm đăng ký admin mới
exports.registerAdmin = async (req, res) => {
    try {
        const adminData = req.body;

// Kiểm tra xem có tệp tin ảnh được tải lên không
    if (!req.file) {
            return res.status(400).json({ error: 'User image is required' });
        }

        // Thêm tên file ảnh vào dữ liệu admin
        adminData.user_img = req.file.filename;

        const newAdmin = await adminService.registerAdmin(adminData);
        res.status(201).json({ message: 'Admin registered successfully/ Đăng ký thành công', data: newAdmin });
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
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller: Lấy thông tin chi tiết của một admin
exports.getAdminById = async (req, res) => {
    try {
        const admin = await adminService.getAdminById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
        }
        res.status(200).json( admin );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    const adminId = req.params.id;
    const updateData = req.body;

    // Kiểm tra nếu có file ảnh mới trong request
    if (req.file) {
        updateData.user_img = req.file.filename; // Cập nhật ảnh mới
    }

    try {
        const updatedAdmin = await adminService.updateAdmin(adminId, updateData);
        res.status(200).json({ message: 'Admin updated successfully', data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hàm xóa admin (controller)
exports.deleteAdmin = async (req, res) => {
    const adminId = req.params.id;

    try {
        // Gọi hàm trong service để thực hiện việc xóa admin
        const deletedAdmin = await adminService.deleteAdmin(adminId);

        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Không tìm thấy admin với ID này' });
        }

        res.status(200).json({ message: 'Xóa admin thành công', data: deletedAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Hàm lọc admin theo role
exports.getByRole = async (req, res) => {
    try {
        const role = req.query.role; // Lấy giá trị role từ query string
        if (!role) {
            return res.status(400).json({ error: 'Role is required' }); // Kiểm tra xem role có được cung cấp không
        }
        const admins = await adminService.getByRole(role); // Gọi hàm từ service
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Hàm lấy danh sách người dùng theo tên
exports.getAdminsByName = async (req, res) => {
    try {
        const { name } = req.params; // Lấy tên từ URL parameters
        const admins = await adminService.getAdminsByName(name);
        res.status(200).json(admins );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


