var express = require('express');
var router = express.Router();
const customerController = require('../controller/CustomerController');
const authenticateCustomer = require('../middlewares/authCustomer'); // Import middleware xác thực khách hàng
const authenticateAdmin = require('../middlewares/auth');

// POST /api/customers/register - Đăng ký khách hàng mới
router.post('/register', async (req, res) => {
  const customerData = req.body;

  try {
    const newCustomer = await customerController.registerCustomer(customerData);
    res.status(201).json({
      message: 'Customer registered successfully',
      data: newCustomer
    });
  } catch (error) {
    // Kiểm tra loại lỗi và gửi phản hồi chi tiết
    if (error.name === 'ValidationError') {
      // Nếu lỗi là do validation không thành công (ví dụ: mongoose validation)
      res.status(400).json({
        error: 'Validation Error',
        message: error.message,
        details: error.errors // Gửi thêm chi tiết từng trường bị lỗi (nếu có)
      });
    } else if (error.code === 11000) {
      // Lỗi trùng lặp, ví dụ như email đã tồn tại
      res.status(409).json({
        error: 'Duplicate Error',
        message: 'Email đã tồn tại, vui lòng sử dụng email khác'
      });
    } else {
      // Xử lý lỗi khác (lỗi không xác định hoặc lỗi server)
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }
});

// POST /api/customers/login - Đăng nhập khách hàng
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const result = await customerController.loginCustomer(req, res);
      res.status(200).json(result);
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
});
  // PUT /api/customers/update - Cập nhật thông tin khách hàng
router.put('/update', async (req, res) => { // Sử dụng middleware xác thực
  const { email, name, phone, address } = req.body; // Lấy thông tin từ body

  try {
      const updatedCustomer = await customerController.updateCustomer(req.customer.id, { email, name, phone, address }); // Gọi hàm cập nhật
      res.status(200).json({ message: 'Customer information updated successfully', data: updatedCustomer });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});
  
// DELETE /api/customers/:id - Xóa khách hàng
router.delete('/:id', authenticateCustomer, async (req, res) => {
  const customerId = req.params.id; // Lấy ID khách hàng từ URL

  try {
      await customerController.deleteCustomer(customerId);
      res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
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
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
