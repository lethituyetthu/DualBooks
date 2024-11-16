const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
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
    
});
module.exports = mongoose.model('Category', CategorySchema);