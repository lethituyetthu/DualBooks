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