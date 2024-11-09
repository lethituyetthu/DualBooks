const CategoryModel = require('../models/CategoryModel');
const categoryService = require('../service/CategoryService');

// Lấy tất cả danh mục
exports.getAll = async (req, res) => {
    try {
        // Gọi service để lấy danh sách danh mục
        const categories = await categoryService.getAll();

        // Map qua từng danh mục và định dạng lại dữ liệu trước khi trả về
        return categories.map((c) => ({
            id: c._id,              // Sử dụng _id làm id
            name: c.name,           // Tên danh mục
            description: c.description,
            cate_image: c.cate_image,
            parent_id: c.parent_id,  // ID của danh mục cha (nếu có)
        }));
    } catch (error) {
        throw new Error('Lỗi khi lấy danh mục: ' + error.message);
    }
};

// Lấy chi tiết danh mục theo ID
exports.findById = async (id) => {
    try {
        const category = await categoryService.findById(id); // Gọi service để tìm danh mục theo ID
        if (!category) {
            throw new Error(`Không tìm thấy danh mục với id: ${id}`);
        }
        return category;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh mục theo id: ' + error.message);
    }
};

// Tạo một danh mục mới
exports.createCategory = async (categoryData) => {
    try {
        const category = await categoryService.createCategory(categoryData);
        return category;
    } catch (error) {
        throw new Error('Lỗi khi tạo danh mục: ' + error.message);
    }
};

// Cập nhật danh mục
exports.updateCategory = async (id, categoryData) => {
    try {
        const updatedCategory = await categoryService.updateCategory(id, categoryData);
        if (!updatedCategory) {
            throw new Error(`Không tìm thấy danh mục để cập nhật với id: ${id}`);
        }
        return updatedCategory;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật danh mục: ' + error.message);
    }
};

// Xóa danh mục
exports.deleteCategory = async (id) => {
    try {
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) {
            throw new Error(`Không tìm thấy danh mục để xóa với id: ${id}`);
        }
        return deletedCategory;
    } catch (error) {
        throw new Error('Lỗi khi xóa danh mục: ' + error.message);
    }
};
