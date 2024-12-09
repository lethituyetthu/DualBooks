const customerService = require('../service/CustomerService ');
const mailer = require('../mailer')
// Xử lý đăng ký khách hàng
exports.registerCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        // Gọi service xử lý logic
        const result = await customerService.registerCustomer(customerData);

        // Trả về phản hồi thành công
        res.status(201).json({ success:true,message: 'Đăng ký thành công. Vui lòng xác minh email.', data: result });
    } catch (error) {
        // Xử lý lỗi từ service
        res.status(error.statusCode || 500).json({ success:false,error: error.message });
    }
};
// Controller xác minh mã
exports.verifyEmailCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        // Log thông tin nhận được từ client
        console.log('Thông tin yêu cầu:', { email, verificationCode });

        // Gọi service để xử lý logic xác minh mã
        const result = await customerService.verifyCodeAndActivateUser(email, verificationCode);

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
exports.verifyEmail = async (req, res) => {
    try {
        const { email } = req.body; // Nhận email từ client

        // Gọi service để kiểm tra email tồn tại trong cơ sở dữ liệu
        const customer = await customerService.findCustomerByEmail(email);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Email không tồn tại.' });
        }

        // Tạo mã OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số

        // Cập nhật OTP và thời gian hết hạn trong cơ sở dữ liệu
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn trong 5 phút
        await customerService.updateOtp(customer._id, otp, otpExpiry);

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
        const customer = await customerService.findCustomerByEmail(email);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Email không tồn tại.' });
        }

        // Kiểm tra OTP và thời gian hết hạn
        if (customer.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Mã OTP không chính xác.' });
        }

        // Kiểm tra thời gian hết hạn của OTP
        if (new Date() > new Date(customer.otpExpiry)) {
            return res.status(400).json({ success: false, message: 'Mã OTP đã hết hạn.' });
        }

        // Nếu OTP hợp lệ, cập nhật trạng thái xác minh email
        customer.isEmailVerified = true;
        customer.otp = undefined; // Xóa OTP sau khi xác minh thành công
        customer.otpExpiry = undefined; // Xóa thời gian hết hạn OTP
        await customer.save();

        // Trả về phản hồi thành công
        res.status(200).json({ success: true, message: 'Xác minh email thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Hàm xử lý yêu cầu đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email và mật khẩu mới là bắt buộc" });
    }
  
    try {
      // Gọi service để thực hiện đặt lại mật khẩu
      const result = await customerService.resetPassword(email, newPassword);
  
      // Trả kết quả cho client
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
      const { token, refreshToken, customer } = await customerService.loginCustomer(email, password);
      res.status(200).json({
         message: 'Login successful',
         token,
         refreshToken,
         customer });
  } catch (error) {
           // Trả lỗi với trường "message" để tương thích với client
    res.status(401).json({ message: error.message });
  }
};
// Cập nhật thông tin khách hàng
exports.updateCustomer = async (customerId, customerData) => {
    try {
        const updatedCustomer = await customerService.updateCustomerStatus(customerId, customerData);
        return updatedCustomer;
    } catch (error) {
        throw new Error('Error updating customer: ' + error.message);
    }
};
// Xóa khách hàng
exports.deleteCustomer = async (customerId) => {
    try {
        const result = await customerService.deleteCustomer(customerId); // Sử dụng service để xóa
        if (!result) {
            console.error('Customer not found with id:', customerId); // Log lỗi nếu không tìm thấy
            throw new Error('Customer not found');
        }
    } catch (error) {
        console.error('Error deleting customer:', error.message); // Log lỗi cụ thể
        throw new Error('Error deleting customer: ' + error.message);
    };
};
// Lấy danh sách toàn bộ khách hàng
exports.getAllCustomers = async () => {
    try {
        const customers = await customerService.getAllCustomers();
        return customers;
    } catch (error) {
        throw new Error('Error fetching customers: ' + error.message);
    }
};

// Lấy thông tin chi tiết của khách hàng theo ID
exports.getCustomerById = async (customerId) => {
    try {
        const customer = await customerService.getCustomerById(customerId);
        return customer;
    } catch (error) {
        throw new Error('Error fetching customer: ' + error.message);
    }
};
// Controller để cập nhật trạng thái khách hàng
exports.updateStatus = async (req, res) => {
    try {
        const customerId = req.params.id;

        // Gọi service để cập nhật trạng thái khách hàng
        const updatedCustomer = await customerService.updateCustomerStatus(customerId);

        res.status(200).json({
            message: 'Status updated successfully',
            customer: updatedCustomer
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Hàm lấy khách hàng theo tên
exports.getByName = async (name) => {
    try {
      // Gọi hàm từ service để lấy khách hàng theo tên
      const customers = await customerService.getByName(name);
      return customers;
    } catch (error) {
      throw new Error('Error fetching customers by name: ' + error.message);
    }
  };
//   / tìm kiếm theo tiêu đề
exports.searchCustomers = async (query) => {
  try {
      const customers = await customerService.searchCustomers(query);
      return customers;
  } catch (error) {
      throw new Error('Error searching customers: ' + error.message);
  }
};