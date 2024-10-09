const Customer = require('../models/CustomerModel');
const bcrypt = require('bcrypt'); // Để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Để tạo token
const { SECRET_KEY } = require('../config');
// Đăng ký khách hàng mới
exports.registerCustomer = async (customerData) => {
    try {
        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(customerData.password, 10);

        // Tạo khách hàng mới
        const newCustomer = new Customer({
            id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            password: hashedPassword, // Lưu mật khẩu đã mã hóa
            created_at: new Date(),
            updated_at: new Date()
        });

        // Lưu khách hàng mới vào cơ sở dữ liệu
        await newCustomer.save();

        return newCustomer;
    } catch (error) {
        throw new Error('Error registering customer: ' + error.message);
    }
};
exports.loginCustomer = async (email, password) => {
  try {
      // Tìm khách hàng theo email
      const customer = await Customer.findOne({ email });

      if (!customer) {
          throw new Error('Customer not found');
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, customer.password);

      if (!isMatch) {
          throw new Error('Invalid password');
      }

      // Tạo token
      const token = jwt.sign({ id: customer._id, email: customer.email }, SECRET_KEY, { expiresIn: '1h' });

      return { token, customer };
  } catch (error) {
      throw new Error('Error logging in customer: ' + error.message);
  }
};