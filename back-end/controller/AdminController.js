const adminService = require('../service/AdminService');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken'); // Để tạo token
const { SECRET_KEY,REFRESH_SECRET_KEY } = require('../config');
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
    console.log('Req from body:',req.body);
    

    try {
        const { token, refreshToken, admin } = await adminService.loginAdmin(email, password);
        res.status(200).json({ message: 'Login successful', token,  refreshToken, admin });
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
exports.verifyEmail = async (req, res) => {
    try {
        const { email } = req.body; // Nhận email từ client

        // Gọi service để kiểm tra email tồn tại trong cơ sở dữ liệu
        const admin = await adminService.findAdminByEmail(email);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Email không tồn tại.' });
        }

        // Tạo mã OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số

        // Cập nhật OTP và thời gian hết hạn trong cơ sở dữ liệu
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn trong 5 phút
        await adminService.updateOtp(admin._id, otp, otpExpiry);

        // Gửi OTP qua email
        await mailer.sendOtpEmail(email, otp);

        // Trả về phản hồi thành công
        res.status(200).json({ success: true, message: 'Mã OTP đã được gửi qua email.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body; // Nhận email và OTP từ client

        // Kiểm tra email tồn tại trong cơ sở dữ liệu
        const admin = await adminService.findAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Email không tồn tại.' });
        }

        // Kiểm tra OTP và thời gian hết hạn
        if (admin.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Mã OTP không chính xác.' });
        }

        if (new Date() > new Date(admin.otpExpiry)) {
            return res.status(400).json({ success: false, message: 'Mã OTP đã hết hạn.' });
        }
 // Tạo token
 const token = jwt.sign(
    { id: admin._id, email: admin.email }, 
    SECRET_KEY,
     { expiresIn: '5h' });
        const tokenExpiry = new Date(Date.now() + 5 * 60 * 60 * 1000); // Thời gian hết hạn token

        await adminService.updateToken(admin._id, token, tokenExpiry);

       // Gửi email với token và link đặt lại mật khẩu
       await mailer.sendTokenEmails(
        email,
        token, 
    );


        // Trả về phản hồi thành công
        res.status(200).json({ success: true, message: 'Token đã được gửi qua email.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Hàm xử lý yêu cầu đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    if (!token || !newPassword) {
        return res.status(400).json({ message: "Token và mật khẩu mới là bắt buộc" });
    }
  
    try {
        // Kiểm tra và giải mã token
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email; // Lấy email từ decoded token

        // Gọi service để thực hiện đặt lại mật khẩu
        const result = await adminService.resetPassword(email, newPassword);

        // Trả kết quả cho client
        return res.status(200).json(result);
    } catch (error) {
        // Xử lý lỗi nếu token không hợp lệ hoặc gặp lỗi khác
        return res.status(500).json({ message: error.message || 'Đã có lỗi xảy ra khi đặt lại mật khẩu' });
    }
};

