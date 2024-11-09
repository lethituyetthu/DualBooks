const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cate_image: { type: String, default: 'default.jpg' }, // Thiết lập hình ảnh mặc định
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null }, // Tham chiếu đến danh mục cha
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
<<<<<<< HEAD
module.exports = mongoose.model('Category', CategorySchema);
=======

// Middleware để cập nhật `updated_at` trước khi lưu
CategorySchema.pre('findOneAndUpdate', function(next) {
    this.set({ updated_at: Date.now() });
    next();
});

module.exports = mongoose.model('Category', CategorySchema);
>>>>>>> origin/nhathuy
