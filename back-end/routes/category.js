var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController');
const uploadCategory = require('../middlewares/uploadCategory');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const authenticateAdmin = require('../middlewares/auth');
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
// Endpoint tạo danh mục mới với hình ảnh
// POST /api/categories
router.post('/',authenticateAdmin, uploadCategory.single('cate_image'), async (req, res) => {
  console.log('POST /categories endpoint hit');
  try {
      const categoryData = req.body;

      // Kiểm tra xem có tệp tin hình ảnh được tải lên không
      if (req.file) {
          // Lưu tên file hình ảnh vào trường cate_image
          categoryData.cate_image = req.file.filename;
      } else {
          // Thiết lập hình ảnh mặc định nếu không có tệp tin tải lên
          categoryData.cate_image = 'default.jpg';
      }

      // Gọi controller để tạo danh mục mới
      const newCategory = await categoryController.createCategory(categoryData);

      console.log('Category created successfully:', newCategory);
      res.status(201).json(newCategory);
  } catch (error) {
      console.error('Error creating category:', error.message);
      res.status(500).json({ error: error.message });
  }
});
// Endpoint cập nhật danh mục
// PUT /api/categories/:id
router.put('/:id',authenticateAdmin,
  uploadCategory.single('cate_image'),
  [
      body('name').not().isEmpty().withMessage('Category name is required'),
      body('description').not().isEmpty().withMessage('Category description is required')
  ],
  async (req, res) => {
      // Kiểm tra kết quả của validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          // Nếu có lỗi validation, trả về lỗi cho client
          if (req.file) {
              // Nếu Multer đã tải lên file, xóa file đó để tránh lưu trữ không cần thiết
              fs.unlinkSync(req.file.path);
          }
          return res.status(400).json({ errors: errors.array() });
      }

      try {
          const categoryId = req.params.id;
          const categoryData = req.body;

          // Tìm danh mục hiện tại để lấy tên file hình ảnh cũ
          const currentCategory = await categoryController.findById(categoryId);
          if (!currentCategory) {
              if (req.file) {
                  // Nếu không tìm thấy danh mục với id đã cho, xóa file hình ảnh mới (nếu có)
                  fs.unlinkSync(req.file.path);
              }
              return res.status(404).json({ error: 'Category not found' });
          }

          // Nếu có tệp tin hình ảnh được tải lên, cập nhật trường cate_image
          if (req.file) {
              categoryData.cate_image = req.file.filename;

              // Nếu có tệp tin mới được tải lên và có hình ảnh cũ, xóa hình ảnh cũ
              if (currentCategory.cate_image && currentCategory.cate_image !== 'default.jpg') {
                  const oldImagePath = path.join(__dirname, '..', 'uploads', 'categories', currentCategory.cate_image);
                  if (fs.existsSync(oldImagePath)) {
                      fs.unlinkSync(oldImagePath);
                  }
              }
          }

          // Gọi controller để cập nhật danh mục
          const updatedCategory = await categoryController.updateCategory(categoryId, categoryData);

          res.status(200).json(updatedCategory);
      } catch (error) {
          if (req.file) {
              // Nếu có lỗi, xóa file ảnh vừa tải lên
              fs.unlinkSync(req.file.path);
          }
          res.status(500).json({ error: error.message });
      }
  }
);

// DELETE /api/categories/:id - Xóa một thể loại
router.delete('/:id',authenticateAdmin, async (req, res) => {
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
// Định nghĩa API PATCH để thay đổi trạng thái danh mục
router.patch('/:id/status', categoryController.updateCategoryStatus);


module.exports = router;
