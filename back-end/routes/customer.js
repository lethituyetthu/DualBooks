var express = require('express');
var router = express.Router();
const customerController = require('../controller/CustomerController');
const authenticateCustomer = require('../middlewares/authCustomer'); // Import middleware xác thực khách hàng
const authenticateAdmin = require('../middlewares/auth');
<<<<<<< HEAD

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
=======
>>>>>>> origin/nhathuy

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
<<<<<<< HEAD

=======
>>>>>>> origin/nhathuy
// PUT /api/customers/:id - Cập nhật thông tin khách hàng
router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const updatedData = req.body; // Dữ liệu mới để cập nhật

  try {
<<<<<<< HEAD
      const updatedCustomer = await customerController.updateCustomer(customerId, updatedData);
=======
      const updatedCustomer = await customerController.updateCustomerById(customerId, updatedData);
>>>>>>> origin/nhathuy
      if (!updatedCustomer) {
          return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

<<<<<<< HEAD
// PUT /api/customers/:id/status - Chỉnh sửa trạng thái hoạt động của khách hàng
router.put('/:id/status', async (req, res) => {
  const customerId = req.params.id;

  try {
      const updatedCustomer = await customerController.updateCustomer(customerId);
      res.status(200).json({ message: 'Customer status updated successfully', data: updatedCustomer });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// DELETE /api/customers/:id - Xóa khách hàng (chỉ admin được xóa)
router.delete('/:id', async (req, res) => {
=======
  
// DELETE /api/customers/:id - Xóa khách hàng (chỉ admin được xóa)
router.delete('/:id', authenticateAdmin, async (req, res) => {
>>>>>>> origin/nhathuy
  const customerId = req.params.id; // Lấy ID khách hàng từ URL

  try {
      await customerController.deleteCustomer(customerId);
      res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
<<<<<<< HEAD

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

=======
>>>>>>> origin/nhathuy
// GET /api/customers - Lấy danh sách toàn bộ khách hàng
router.get('/', async (req, res) => {
  try {
      const customers = await customerController.getAllCustomers();
      res.status(200).json(customers);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
<<<<<<< HEAD
=======
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

>>>>>>> origin/nhathuy

module.exports = router;
