const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
    id: { type: Number},
    name: { type: String, required: true },
    description: {
        type: String,
        required: true
      },
      cate_image: {
        type: String,
        default: 'default.jpg' // Thiết lập hình ảnh mặc định
      },
      status: {
        type: String,
        enum: ['visible', 'hidden'], // Chỉ chấp nhận hai trạng thái: 'visible' (hiện), 'hidden' (ẩn)
        default: 'visible' // Mặc định là 'visible' (hiện)
      },
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null }, // Reference to parent category
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Category', CategorySchema);