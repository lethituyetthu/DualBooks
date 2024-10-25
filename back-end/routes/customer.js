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
      res.status(201).json({ message: 'Customer registered successfully', data: newCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
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
// PUT /api/customers/:id - Cập nhật thông tin khách hàng
router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const updatedData = req.body; // Dữ liệu mới để cập nhật

  try {
      const updatedCustomer = await customerController.updateCustomerById(customerId, updatedData);
      if (!updatedCustomer) {
          return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

  
// DELETE /api/customers/:id - Xóa khách hàng (chỉ admin được xóa)
router.delete('/:id', async (req, res) => {
  const customerId = req.params.id; // Lấy ID khách hàng từ URL

  try {
      await customerController.deleteCustomer(customerId);
      res.status(200).json({ message: 'xoá khách hàng thành công' });
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
router.get('/:id' , async (req, res) => {
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
// API chỉnh sửa trạng thái hoạt động của khách hàng
router.put('/status/:id', authenticateAdmin, async (req, res) => {
  try {
      const customerId = req.params.id; // Lấy ID khách hàng từ URL
      const { status } = req.body; // Lấy trạng thái mới từ body của request

      // Gọi controller để cập nhật trạng thái khách hàng
      const updatedCustomer = await customerController.updateCustomerStatus(customerId, status);
      res.status(200).json({ message: 'Customer status updated successfully', updatedCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
