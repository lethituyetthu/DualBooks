const customerService = require('../service/CustomerService ');

// Đăng ký khách hàng mới
exports.registerCustomer = async (customerData) => {
    try {
        const newCustomer = await customerService.registerCustomer(customerData);
        return newCustomer;
    } catch (error) {
        throw new Error('Error registering customer: ' + error.message);
    }
};
exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
      const { token, customer } = await customerService.loginCustomer(email, password);
      res.status(200).json({ message: 'Login successful', token, customer });
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
};
// Cập nhật thông tin khách hàng
exports.updateCustomer = async (customerId, customerData) => {
    try {
        const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
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