var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController');

// Routers for API
// Get products listing
// http://localhost:3000/categories
router.get('/', async function(req, res, next) {
    console.log('GET /categories endpoint hit');
    try {
      // Gọi controller để lấy dữ liệu
      const result = await categoryController.getAll(req, res);

      // Kiểm tra kết quả và trả về response
      if (result && result.length > 0) {
          console.log('Category fetched successfully:', result); // Log khi lấy dữ liệu thành công
          res.status(200).json(result); // Trả về dữ liệu JSON
      } else {
          console.log('No category found'); // Log khi không có danh mục
          res.status(404).json({ error: 'No categories found' });
      }
  } catch (error) {
      // Log lỗi và trả về thông báo lỗi
      console.error('Error fetching categories:', error.message);
      res.status(500).json({ error: error.message });
  }
});
// GET /categories/:id - Lấy chi tiết sản phẩm theo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const category = await categoryController.findById(id);
      if (category) {
        res.status(200).json({ data: category });
      } else {
        res.status(404).json({ error: `No category found with id: ${id}` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Route: Tạo một thể loại mới
router.post('/', async (req, res) => {
  try {
      const { id, name, parent_id } = req.body; // Lấy dữ liệu từ body của request
      const newCategory = await categoryController.createCategory({ id, name, parent_id }); // Gọi controller để thêm thể loại
      res.status(201).json({ message: 'Category created successfully', data: newCategory });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
// PUT /api/categories/:id - Cập nhật thông tin của một thể loại
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Dữ liệu cần cập nhật

  try {
      const updatedCategory = await categoryController.updateCategory(id, updateData);
      if (updatedCategory) {
          res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });
      } else {
          res.status(404).json({ error: `No category found with id: ${id}` });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
// DELETE /api/categories/:id - Xóa một thể loại
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedCategory = await categoryController.deleteCategory(id);
      if (deletedCategory) {
          res.status(200).json({ message: 'Category deleted successfully', data: deletedCategory });
      } else {
          res.status(404).json({ error: `No category found with id: ${id}` });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
