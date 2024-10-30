const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: {
        type: String,
        required: true
      },
      cate_image: {
        type: String,
        default: 'default.jpg' // Thiết lập hình ảnh mặc định
      },
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null }, // Reference to parent category
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Category', CategorySchema);