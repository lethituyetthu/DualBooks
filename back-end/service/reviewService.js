const ReviewModel = require('../models/ReviewModel'); // Đảm bảo bạn đã định nghĩa model Review
const bookModel = require('../models/BookModel');

exports.createReview = async (reviewData) => {
    try {
        // Tạo một đối tượng mới từ model Review
        const newReview = new ReviewModel(reviewData);
        // Lưu đánh giá mới vào cơ sở dữ liệu
        const savedReview = await newReview.save();
        return savedReview;
    } catch (error) {
        throw new Error('Error creating review: ' + error.message);
    }
};
exports.createReview = async (bookId, customer_id, comment, rating) => {
    try {
        // Tạo review mới
        const newReview = new ReviewModel({
            book_id: bookId,
            customer_id,
            comment,
            rating,
            created_at: new Date(),
        });

        // Lưu review vào cơ sở dữ liệu
        await newReview.save();

        // Trả về review mới
        return newReview;
    } catch (error) {
        console.error('Lỗi khi tạo review:', error);
        throw error;
    }
};

exports.addReviewToBook = async (bookId, reviewId) => {
    try {
        // Cập nhật sách để thêm review vào mảng reviews
        await bookModel.findByIdAndUpdate(bookId, {
            $push: { reviews: reviewId }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật sách:', error);
        throw error;
    }
};
exports.getReviewById = async (reviewId) => {
    try {
        const review = await ReviewModel.findById(reviewId); // Lấy bài đánh giá từ DB
        if (!review) {
            throw new Error('Review not found'); // Nếu không tìm thấy
        }
        return review; // Trả về bài đánh giá
    } catch (error) {
        throw new Error('Error fetching review: ' + error.message);
    }
};

exports.updateReview = async (reviewId, updateData) => {
    try {
        const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, updateData, { new: true });
        if (!updatedReview) {
            throw new Error('Review not found or update failed'); // Nếu không tìm thấy hoặc cập nhật thất bại
        }
        return updatedReview;
    } catch (error) {
        throw new Error('Error updating review: ' + error.message);
    }
};
exports.deleteReview = async (reviewId) => {
    try {
        // Xóa bài đánh giá từ cơ sở dữ liệu
        const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            throw new Error('Không thể xóa bài đánh giá, bài đánh giá không tồn tại');
        }
        return deletedReview; // Trả về bài đánh giá đã bị xóa
    } catch (error) {
        throw new Error('Lỗi khi xóa bài đánh giá: ' + error.message);
    }
};