const categoryModel = require('../models/CategoryModel');

// Lấy tất cả danh mục
exports.getAll = async () => {
    try {
        const categories = await categoryModel.find({});
        return categories;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};
// Lấy tất cả danh mục có trạng thái visible
exports.getAllvisible = async () => {
    try {
        const categories = await categoryModel.find({ status: 'visible' });
        return categories;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};

// Tìm danh mục theo ID
exports.findById = async (id) => {
    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error('Error fetching category by id: ' + error.message);
    }
};

// Tạo một danh mục mới
exports.createCategory = async (categoryData) => {
    try {
        const newCategory = new categoryModel(categoryData);
        const savedCategory = await newCategory.save();
        return savedCategory;
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
};

// Cập nhật danh mục
exports.updateCategory = async (id, categoryData) => {
    try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, categoryData, { new: true });
        if (!updatedCategory) {
            throw new Error('Category not found');
        }
        return updatedCategory;
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};

// Xóa danh mục
exports.deleteCategory = async (id) => {
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error('Category not found');
        }
        return deletedCategory;
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};

// Xóa danh mục (Phiên bản khác nếu cần)
exports.delete = async (id) => {
    await categoryModel.deleteOne({ _id: id });
};
exports.toggleCategoryStatus = async (id) => {
    try {
      // Tìm danh mục theo ID
      const category = await categoryModel.findById(id);
  
      if (!category) {
        return null;  // Nếu không tìm thấy danh mục, trả về null
      }
  
      // Lật trạng thái của danh mục (visible <=> hidden)
      category.status = category.status === 'visible' ? 'hidden' : 'visible';
  
      // Cập nhật danh mục trong cơ sở dữ liệu
      const updatedCategory = await category.save();
  
      return updatedCategory;
    } catch (error) {
      throw new Error('Error toggling category status: ' + error.message);
    }
  };