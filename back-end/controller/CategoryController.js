const CategoryModel = require('../models/CategoryModel');
const categoryService = require('../service/CategoryService');
exports.getAll = async (req, res) => {
    try {
      // Gọi service để lấy danh sách thể loại
      const categories = await categoryService.getAll();
  
      // Map qua từng category và định dạng lại dữ liệu trước khi trả về
    return categories.map((c) => ({
        id: c._id,              // Sử dụng _id làm id
        name: c.name,           // Tên thể loại
        description: c.description,
        cate_image: c.cate_image,

        parent_id: c.parent_id,  // ID của thể loại cha (nếu có)
      }));
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
  };
// Lấy chi tiết thể loại theo ID
exports.findById = async (id) => {
    try {
        const category = await categoryService.findById(id); // Gọi service để tìm thể loại theo ID
        return category;
    } catch (error) {
        throw new Error('Error fetching category by id: ' + error.message);
    }
};
// Tạo một thể loại mới
exports.createCategory = async (categoryData) => {
    try {
        const category = await categoryService.createCategory(categoryData);
        return category;
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
};
// Hàm cập nhật danh mục
exports.updateCategory = async (id, categoryData) => {
    try {
        const updatedCategory = await categoryService.updateCategory(id, categoryData);
        return updatedCategory;
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};
 
 exports.deleteCategory = async (id) => {
    await categoryService.deleteCategory(id);
  };