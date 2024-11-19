const Customer = require('../models/CustomerModel');
const bcrypt = require('bcrypt'); // Để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Để tạo token
const { SECRET_KEY } = require('../config');

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

// Đăng ký khách hàng mới
exports.registerCustomer = async (customerData) => {
    try {
        // Kiểm tra định dạng email
        if (!isValidEmail(customerData.email)) {
            throw new Error('Email không hợp lệ.');
        }

        // Kiểm tra định dạng số điện thoại
        if (!isValidPhone(customerData.phone)) {
            throw new Error('Số điện thoại phải gồm 10 chữ số.');
        }

        // Kiểm tra xem email hoặc số điện thoại đã được sử dụng chưa
        const existingCustomer = await Customer.findOne({
            $or: [{ email: customerData.email }, { phone: customerData.phone }]
        });

        if (existingCustomer) {
            throw new Error('Email hoặc số điện thoại đã được sử dụng.');
        }

        // Kiểm tra độ dài mật khẩu và ký tự hợp lệ
        const passwordRegex = /^[a-zA-Z0-9]{6}$/; // Mật khẩu chỉ gồm 6 ký tự chữ hoặc số
        if (!passwordRegex.test(customerData.password)) {
            throw new Error('Mật khẩu phải gồm 6 ký tự, chỉ bao gồm chữ cái và số.');
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(customerData.password, 10);

        // Tạo khách hàng mới
        const newCustomer = new Customer({
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

// Đăng nhập khách hàng
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
            throw new Error('sai mật khẩu');
        }

        // Tạo token
        const token = jwt.sign({ id: customer._id, email: customer.email }, SECRET_KEY, { expiresIn: '1h' });

        return { token, customer };
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
        const result = await Customer.findByIdAndDelete(customerId); // Sử dụng findByIdAndDelete để xóa khách hàng theo ID
        if (!result) {
            throw new Error('Customer not found'); // Nếu không tìm thấy khách hàng
        }
    } catch (error) {
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
