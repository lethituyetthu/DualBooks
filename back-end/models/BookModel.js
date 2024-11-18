const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho bảng Books
const bookSchema = new mongoose.Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Category', // Tham chiếu đến model Category
    required: true
  },
  publisherID: {
    type: Schema.Types.ObjectId,
    ref: 'Publisher', // Tham chiếu đến model Publisher
  
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
