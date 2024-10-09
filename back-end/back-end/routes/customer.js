var express = require('express');
var router = express.Router();
const customerController = require('../controller/CustomerController');


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
  
  

module.exports = router;
