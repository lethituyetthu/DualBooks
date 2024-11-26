const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, // Tham chiếu đến ID của sách
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true }, // Tham chiếu đến ID của khách hàng
    comment: { type: String, required: true }, // Nội dung đánh giá
    rating: { type: Number, required: true, min: 1, max: 5 }, // Đánh giá sao từ 1 đến 5
    created_at: { type: Date, default: Date.now } ,// Ngày tạo đánh giá, mặc định là ngày hiện tại
    updated_at: {
        type: Date,
        default: Date.no
      },
});

module.exports = mongoose.model('Review', ReviewSchema);
