const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho bảng Books
const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  cover_image: {
    type: String,
    default: 'default.jpg' // Thiết lập hình ảnh mặc định
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Tham chiếu đến model Category
    required: true
  },
  views: { 
    type: Number, 
    default: 0 
  }, // Số lượt xem
  sales: { 
    type: Number, 
    default: 0 
  }, // Số lượng sản phẩm đã bán
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review' // Tham chiếu đến model Review
  }] // Mảng chứa các ID của các đánh giá
});

// Tạo model từ schema
module.exports = mongoose.model('Book', bookSchema);
