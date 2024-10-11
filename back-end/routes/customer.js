var express = require("express");
var router = express.Router();
const customerController = require("../controller/CustomerController");
const authenticateCustomer = require("../middlewares/authCustomer"); // Import middleware xác thực khách hàng

// POST /api/customers/register - Đăng ký khách hàng mới
router.post("/register", async (req, res) => {
  const customerData = req.body;

  try {
    const newCustomer = await customerController.registerCustomer(customerData);
    res
      .status(201)
      .json({ message: "Customer registered successfully", data: newCustomer });
    console.log("đanwg ký thành công");
  } catch (error) {
    console.error("Đăng ký thất bại:", error);  // Log toàn bộ lỗi chi tiết
    if (error.name === 'ValidationError') {
        res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else if (error.code === 11000) {
        res.status(409).json({ error: 'Email already exists', details: error.keyValue });
    } else {
        res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
    }
}
});
// POST /api/customers/login - Đăng nhập khách hàng
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await customerController.loginCustomer(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
// PUT /api/customers/update - Cập nhật thông tin khách hàng

router.put("/update", authenticateCustomer, async (req, res) => {
  // Sử dụng middleware xác thực
  const { email, name, phone, address } = req.body; // Lấy thông tin từ body

  try {
    const updatedCustomer = await customerController.updateCustomer(
      req.customer.id,
      { email, name, phone, address }
    ); // Gọi hàm cập nhật
    res
      .status(200)
      .json({
        message: "Customer information updated successfully",
        data: updatedCustomer,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/customers/:id - Xóa khách hàng
router.delete("/:id", authenticateCustomer, async (req, res) => {
  const customerId = req.params.id; // Lấy ID khách hàng từ URL

  try {
    await customerController.deleteCustomer(customerId);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
