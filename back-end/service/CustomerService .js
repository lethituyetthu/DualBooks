const Customer = require('../models/CustomerModel');
const bcrypt = require('bcrypt'); // Để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Để tạo token
const mailer = require('../mailer');
const { SECRET_KEY,REFRESH_SECRET_KEY } = require('../config');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode; // Gán mã lỗi HTTP
    }
}
// Hàm kiểm tra định dạng email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Hàm kiểm tra định dạng số điện thoại
const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Số điện thoại phải là 10 chữ số
    return phoneRegex.test(phone);
};


// Đăng ký khách hàng
exports.registerCustomer = async (customerData) => {
    try {
        // Kiểm tra định dạng email
        if (!isValidEmail(customerData.email)) {
            throw new AppError('Email không hợp lệ.', 400);
        }

        // Kiểm tra định dạng số điện thoại
        if (!isValidPhone(customerData.phone)) {
            throw new AppError('Số điện thoại phải gồm 10 chữ số.', 400);
        }

          // Kiểm tra xem email hoặc số điện thoại đã tồn tại
          const existingCustomer = await Customer.findOne({
            $or: [{ email: customerData.email }, { phone: customerData.phone }]
        });

        // Nếu khách hàng đã tồn tại, thông báo lỗi cụ thể
        if (existingCustomer) {
            if (existingCustomer.email === customerData.email) {
                throw new AppError('Email đã được sử dụng.', 409);  // Nếu email đã tồn tại
            }
            if (existingCustomer.phone === customerData.phone) {
                throw new AppError('Số điện thoại đã được sử dụng.', 409);  // Nếu số điện thoại đã tồn tại
            }
        }

        // Kiểm tra mật khẩu
        const passwordRegex = /^[a-zA-Z0-9]{6}$/; // Mật khẩu chỉ gồm 6 ký tự chữ hoặc số
        if (!passwordRegex.test(customerData.password)) {
            throw new AppError('Mật khẩu phải gồm 6 ký tự, chỉ bao gồm chữ cái và số.', 400);
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(customerData.password, 10);

        // Tạo mã xác minh
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Mã 6 chữ số
        const verificationCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // Hết hạn sau 24 giờ

        // Gửi email xác minh
        await mailer.sendVerificationEmail(customerData.email, verificationCode);

        // Tạo khách hàng mới
        const newCustomer = new Customer({
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpiry,
            isEmailVerified: false,
            updated_at: new Date()
        });

        // Lưu vào cơ sở dữ liệu
        await newCustomer.save();

        return {
            name: newCustomer.name,
            email: newCustomer.email,
            phone: newCustomer.phone,
            address: newCustomer.address
        };
    } catch (error) {
        // Ném lỗi lên tầng controller
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Lỗi máy chủ. Vui lòng thử lại sau.', 500);
    }
};
// Service xác minh mã và kích hoạt người dùng
exports.verifyCodeAndActivateUser = async (email, verificationCode) => {
    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const customer = await Customer.findOne({ email });

        // Log thông tin người dùng tìm thấy
        console.log('Tìm thấy người dùng:', customer);

        if (!customer) {
            console.log('Không tìm thấy người dùng với email:', email);
            return { success: false, status: 404, message: 'Không tìm thấy người dùng' };
        }

        // Kiểm tra mã xác nhận
        console.log('Mã xác nhận trong CSDL:', customer.verificationCode);
        console.log('Mã xác nhận từ yêu cầu:', verificationCode);

        if (customer.verificationCode !== verificationCode) {
            return { success: false, status: 400, message: 'Mã xác nhận không đúng' };
        }
        // Kiểm tra xem mã xác minh đã hết hạn chưa
        const currentTime = new Date();
        if (currentTime > new Date(customer.verificationCodeExpiry)) {
            return { success: false, status: 400, message: 'Mã xác minh đã hết hạn' };
        }

        // Cập nhật trạng thái đã xác minh email
        customer.isEmailVerified = true;
        await customer.save();

        // Log dữ liệu admin sau khi lưu
        console.log('Dữ liệu admin sau khi cập nhật:', customer);

        return { success: true }; // Trả về kết quả thành công
    } catch (error) {
        console.error('Lỗi xác minh mã:', error);
        throw new Error('Lỗi xác minh mã: ' + error.message);
    }
};
exports.findCustomerByEmail = async (email) => {
    // Tìm khách hàng theo email
    return await Customer.findOne({ email });
};

exports.updateOtp = async (customerId, otp, otpExpiry) => {
    // Cập nhật OTP và thời gian hết hạn cho khách hàng
    return await Customer.findByIdAndUpdate(customerId, {
        otp,
        otpExpiry
    }, { new: true });
};
// Hàm cập nhật mật khẩu cho khách hàng
exports.resetPassword = async (email, newPassword) => {
    try {
      // Kiểm tra xem khách hàng có tồn tại không
      const customer = await Customer.findOne({ email });
      if (!customer) {
        throw new Error('Khách hàng không tồn tại');
      }
  
      // Mã hóa mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Cập nhật mật khẩu mới
      customer.password = hashedPassword;
      await customer.save();
  
      return { success: true, message: 'Mật khẩu đã được đặt lại thành công!' };
    } catch (error) {
      throw new Error(error.message || 'Đã có lỗi xảy ra khi đặt lại mật khẩu');
    }
  };
// Đăng nhập khách hàng
exports.loginCustomer = async (email, password) => {
    try {
        // Tìm khách hàng theo email
        const customer = await Customer.findOne({ email });

        if (!customer) {
            throw new Error('Customer not found');
        }
         // Kiểm tra xem email đã được xác minh chưa
        if (!customer.isEmailVerified)
        {
            throw new Error
         ('Email chưa được xác minh. Vui lòng kiểm tra email của bạn.');
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new Error('sai mật khẩu');
        }

        // Tạo token
        const token = jwt.sign(
            { id: customer._id, email: customer.email }, 
            SECRET_KEY,
             { expiresIn: '15m' });
        const refreshToken = jwt.sign(
            { id: customer._id, email: customer.email }, 
            REFRESH_SECRET_KEY,
            { expiresIn: '7d' } // Refresh token có thời gian sống dài hơn (7 ngày)
            );  
              // Lưu refresh_token vào cơ sở dữ liệu (nếu cần thiết)
        customer.refreshToken = refreshToken;
        await customer.save();   

        return { token,refreshToken, customer };
    } catch (error) {
        throw new Error('Error logging in customer: ' + error.message);
    }
};

// Cập nhật thông tin chi tiết của khách hàng theo ID
exports.updateCustomerById = async (customerId, updatedData) => {
    try {
        // Tìm và cập nhật khách hàng với dữ liệu mới
        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });

        if (!updatedCustomer) {
            throw new Error('Customer not found');
        }

        return updatedCustomer;
    } catch (error) {
        throw new Error('Error updating customer: ' + error.message);
    }
};

// Xóa khách hàng
exports.deleteCustomer = async (customerId) => {
    try {
        // Kiểm tra sự tồn tại của khách hàng
        const customer = await Customer.findById(customerId);
        
        if (!customer) {
            throw new Error('Customer not found');
        }

        // Xóa khách hàng khỏi cơ sở dữ liệu
        const result = await Customer.findByIdAndDelete(customerId);
        
        if (!result) {
            throw new Error('Error deleting customer');
        }

        return result; // Trả về kết quả xóa thành công

    } catch (error) {
        console.error('Error in service:', error.message);
        throw new Error('Error deleting customer: ' + error.message);
    }
};

// Lấy danh sách toàn bộ khách hàng
exports.getAllCustomers = async () => {
    try {
        const customers = await Customer.find({});
        return customers;
    } catch (error) {
        throw new Error('Error fetching customers: ' + error.message);
    }
};

// Lấy thông tin chi tiết của khách hàng theo ID
exports.getCustomerById = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    } catch (error) {
        throw new Error('Error fetching customer: ' + error.message);
    }
};

// Tìm kiếm khách hàng theo tên
exports.searchCustomers = async function (query) {
    try {
        // Tìm kiếm theo tên khách hàng, không liên quan đến _id
        const customers = await Customer.find({
            name: { $regex: query, $options: 'i' }  // Tìm kiếm tên theo query với lựa chọn không phân biệt chữ hoa/thường
        });

        return customers;
    } catch (error) {
        throw new Error('Error searching customers: ' + error.message);
    }
};

// Cập nhật trạng thái của khách hàng (active/blocked)
exports.updateCustomerStatus = async (customerId) => {
    // Tìm khách hàng theo ID
    const customer = await Customer.findById(customerId);
    
    if (!customer) {
        throw new Error('Customer not found');
    }

    // Kiểm tra trạng thái hiện tại của khách hàng
    if (customer.status === 'blocked') {
        customer.status = 'active'; // Chuyển từ 'blocked' sang 'active'
    } else if (customer.status === 'active') {
        customer.status = 'blocked'; // Chuyển từ 'active' sang 'blocked'
    }

    // Lưu thay đổi
    await customer.save();

    return customer;
};

// Hàm lọc khách hàng theo tên
exports.getByName = async function (name) {
    try {
        // Tìm khách hàng theo tên
        // Thêm \ trước dấu ngoặc để đảm bảo các ký tự đặc biệt không gây lỗi
        const regexName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        const customers = await Customer.find({ name: new RegExp(regexName, 'i') }); // Sử dụng RegExp để tìm kiếm không phân biệt chữ hoa chữ thường
        return customers;
    } catch (error) {
        throw new Error('Error fetching customers by name: ' + error.message);
    }
};
