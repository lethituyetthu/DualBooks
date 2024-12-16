var express = require('express');
var router = express.Router();
const customerController = require('../controller/CustomerController');
const authenticateCustomer = require('../middlewares/authCustomer'); // Import middleware xác thực khách hàng
const authenticateAdmin = require('../middlewares/auth');

// API tìm kiếm khách hàng theo tên
router.get('/name/:name', async (req, res) => {
  const name = req.params.name;
  try {
      const result = await customerController.getByName(name);
      if (result.length > 0) {
          res.status(200).json(result);
      } else {
          res.status(404).json({ error: `No customers found for name ${name}` });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// API tìm kiếm khách hàng theo query
router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
      const result = await customerController.searchCustomers(query);
      if (result.length > 0) {
          res.status(200).json(result);
      } else {
          res.status(404).json({ message: 'No customers found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// API đăng ký khách hàng mới
router.post('/register', customerController.registerCustomer);
// API xác minh mã
router.post('/verify', async (req, res) => {
    try {
        console.log('Nhận yêu cầu xác minh:', req.body); // Log toàn bộ dữ liệu yêu cầu
        await customerController.verifyEmailCode(req, res); // Gọi controller để xác minh mã
    } catch (error) {
        console.error('Lỗi trong API xác minh mã:', error);
        res.status(500).json({ error: error.message });
    }
});
// API xác minh email
router.post('/verify-email', customerController.verifyEmail);
// API xác thực OTP
router.post('/verify-otp', customerController.verifyOtp);
// Định nghĩa route API cho đặt lại mật khẩu
router.post('/reset-password', customerController.resetPassword);

// POST /api/customers/login - Đăng nhập khách hàng
router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

  try {
      const result = await customerController.loginCustomer(req, res);
      res.status(200).json(result);
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
});

// PUT /api/customers/:id - Cập nhật thông tin khách hàng
router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const updatedData = req.body; // Dữ liệu mới để cập nhật

  try {
      const updatedCustomer = await customerController.updateCustomer(customerId, updatedData);
      if (!updatedCustomer) {
          return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// PUT /api/customers/:id/status - Chỉnh sửa trạng thái hoạt động của khách hàng
router.put('/:id/status', async (req, res) => {
  const customerId = req.params.id;

  try {
      const updatedCustomer = await customerController.updateStatus(customerId);
      res.status(200).json({ message: 'Customer status updated successfully', data: updatedCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// DELETE /api/customers/:id - Xóa khách hàng (chỉ admin được xóa)
router.delete('/:id', async (req, res) => {
  const customerId = req.params.id; // Lấy ID khách hàng từ URL
        
  try {
      await customerController.deleteCustomer(customerId);
      res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// GET /api/customers/:id - Lấy thông tin chi tiết của khách hàng
router.get('/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
      const customer = await customerController.getCustomerById(customerId);
      if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu:', error);
      res.status(500).json({ error: error.message });
  }
});

// GET /api/customers - Lấy danh sách toàn bộ khách hàng
router.get('/', async (req, res) => {
  try {
      const customers = await customerController.getAllCustomers();
      res.status(200).json(customers);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
