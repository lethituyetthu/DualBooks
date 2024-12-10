const adminService = require('../service/AdminService');
const mailer = require('../mailer');

// // Hàm đăng ký admin mới
// exports.registerAdmin = async (req, res) => {
//     try {
//         const adminData = req.body;

// // Kiểm tra xem có tệp tin ảnh được tải lên không
//     if (!req.file) {
//             return res.status(400).json({ error: 'User image is required' });
//         }

//         // Thêm tên file ảnh vào dữ liệu admin
//         adminData.user_img = req.file.filename;

//         const newAdmin = await adminService.registerAdmin(adminData);
//         res.status(201).json({ message: 'Admin registered successfully/ Đăng ký thành công', data: newAdmin });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.registerAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        
        // Kiểm tra thông tin đầu vào
        if (!req.file) {
            return res.status(400).json({ error: 'Ảnh người dùng là bắt buộc' });
        }

        // Thêm ảnh vào dữ liệu đăng ký
        adminData.user_img = req.file.filename;

        // Kiểm tra các trường bắt buộc
        const requiredFields = ['username', 'email', 'password', 'user_img'];
        for (const field of requiredFields) {
            if (!adminData[field]) {
                return res.status(400).json({ error: `Trường "${field}" là bắt buộc` });
            }
        }

        // Tạo mã xác nhận và gửi email
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Mã xác nhận 6 chữ số
        await mailer.sendVerificationEmail(adminData.email, verificationCode);

        // Lưu mã xác nhận tạm thời (có thể lưu trong Redis hoặc cơ sở dữ liệu)
        adminData.verificationCode = verificationCode;

        // Lưu thông tin người dùng vào cơ sở dữ liệu (chưa lưu trừ khi xác minh email thành công)
        const newAdmin = await adminService.registerAdmin(adminData);

        res.status(201).json({ message: 'Đăng ký thành công, vui lòng kiểm tra email của bạn để xác nhận' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller xác minh mã
exports.verifyEmailCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        // Log thông tin nhận được từ client
        console.log('Thông tin yêu cầu:', { email, verificationCode });

        // Gọi service để xử lý logic xác minh mã
        const result = await adminService.verifyCodeAndActivateUser(email, verificationCode);

        // Kiểm tra kết quả và phản hồi lại client
        if (!result.success) {
            console.log('Kết quả xác minh:', result); // Log kết quả xác minh
            return res.status(result.status).json({ error: result.message });
        }

        console.log('Xác minh thành công, email đã được xác nhận');
        res.status(200).json({ message: 'Xác minh email thành công' });
    } catch (error) {
        console.error('Lỗi trong quá trình xác minh:', error);
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

// Hàm đăng nhập admin
exports.loginAccessAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Gọi service để xử lý logic đăng nhập
        const {token, refreshToken, admin } = await adminService.loginAccessAdmin(email, password);

        // Trả về thông tin đăng nhập thành công
        res.status(200).json({
            message: 'Login successful',
            token,
            refreshToken,
            admin,
        });
    } catch (error) {
        // Trả về lỗi nếu có
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


