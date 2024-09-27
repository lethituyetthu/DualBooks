const categoryModel = require('../models/CategoryModel');
exports.getAll = async ()=>{
    //select * form categorys
    const categories = await categoryModel.find({});
    return categories;
}
exports.findById = async (id) => {
    const category = await categoryModel.findById( id );
    return category;
  };
 exports.create = async (name) =>{
    const model = new categoryModel({name});const categoryModel = require('../models/CategoryModel');
    exports.getAll = async ()=>{
        try {
            const categories = await categoryModel.find({});
            return categories;
        } catch (error) {
            throw new Error('Error fetching categories: ' + error.message);
        }
    };
    // Tìm thể loại theo ID
    exports.findById = async (id) => {
        try {
            const category = await categoryModel.findById(id); // Dùng phương thức findById của mongoose
            return category;
        } catch (error) {
            throw new Error('Error fetching category by id: ' + error.message);
        }
    };
    // Tạo một thể loại mới
    exports.createCategory = async (categoryData) => {
        try {
            const newCategory = new categoryModel({
                id:categoryData.id,
                name: categoryData.name,
                parent_id: categoryData.parent_id || null,
            });
            await newCategory.save(); // Lưu vào cơ sở dữ liệu
            return newCategory;
        } catch (error) {
            throw new Error('Error creating category: ' + error.message);
        }
    };
    // Cập nhật thông tin của một thể loại
    exports.updateCategory = async (id, updateData) => {
        try {
            // Tìm và cập nhật thể loại theo ID
            const updatedCategory = await categoryModel.findByIdAndUpdate(
                id,
                { $set: updateData, updated_at: new Date() }, // Cập nhật thông tin và thời gian cập nhật
                { new: true, runValidators: true } // `new: true` để trả về tài liệu đã cập nhật, `runValidators: true` để kiểm tra validation
            );
    
            return updatedCategory;
        } catch (error) {
            throw new Error('Error updating category: ' + error.message);
        }
    }; 
    exports.deleteCategory = async (id) => {
        try {
            const deletedCategory = await categoryModel.findByIdAndDelete(id);
            return deletedCategory;
        } catch (error) {
            throw new Error('Error deleting category: ' + error.message);
        }
    };
    await model.save();
    return model;
 } 
 exports.update = async (id,name) =>{
    const model = await categoryModel.findByIdAndUpdate(id,
        {name});
    return model;
 }  
 exports.delete = async (id) => {
    await categoryModel.deleteOne( {_id:id} );
  };