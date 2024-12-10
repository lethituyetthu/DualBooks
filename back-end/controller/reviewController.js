const ReviewModel = require('../models/ReviewModel');
const reviewService = require('../service/reviewService');

exports.createReview = async (reviewData) => {
    try {
        const review = await reviewService.createReview(reviewData);
        return review;
    } catch (error) {
        throw new Error('Lỗi khi tạo bài đánh giá: ' + error.message);
    }
};

exports.addReview = async (req, res) => {
    const { bookId } = req.params;
    const { customer_id, comment, rating } = req.body; // Thông tin đánh giá từ client

    try {
        // Tạo review mới thông qua service
        const newReview = await reviewService.createReview(bookId, customer_id, comment, rating);

        // Cập nhật sách để thêm review vào mảng reviews
        await reviewService.addReviewToBook(bookId, newReview._id);

        // Trả về review vừa tạo
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Lỗi khi thêm bài đánh giá:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};
exports.updateReview = async (req, res) => {
    const { bookId, reviewId } = req.params;
    const { comment, rating } = req.body;
    const customerId = req.customer.id;  // Lấy customer ID từ middleware

    console.log("Khách hàng đã xác thực:", req.customer);  // In ra thông tin khách hàng đã xác thực
    console.log("ID khách hàng trong bài đánh giá:", ReviewModel.customer_id); // In ra customer_id trong bài đánh giá

    try {
        // Lấy bài đánh giá từ cơ sở dữ liệu
        const review = await reviewService.getReviewById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Không tìm thấy bài đánh giá' });
        }

        // Kiểm tra quyền sửa bài đánh giá
        console.log("So sánh customer_id:", review.customer_id.toString(), "với", customerId.toString());
        if (review.customer_id.toString() !== customerId.toString()) {
            return res.status(403).json({ message: 'Không có quyền sửa bài đánh giá này' });
        }

        // Cập nhật bài đánh giá
        const updatedReview = await reviewService.updateReview(reviewId, { comment, rating });

        // Trả về bài đánh giá đã được cập nhật
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Lỗi khi cập nhật bài đánh giá:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật bài đánh giá' });
    }
};
exports.deleteReview = async (req, res) => {
    const { bookId, reviewId, customerId } = req.params; // Lấy customer ID từ middleware

    try {
        // Lấy bài đánh giá từ cơ sở dữ liệu
        const review = await reviewService.getReviewById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Không tìm thấy bài đánh giá' });
        }

        // Kiểm tra quyền xóa bài đánh giá
        if (review.customer_id.toString() !== customerId.toString()) {
            return res.status(403).json({ message: 'Không có quyền xóa bài đánh giá này' });
        }

        // Xóa bài đánh giá
        await reviewService.deleteReview(reviewId);

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Xóa bài đánh giá thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa bài đánh giá:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa bài đánh giá' });
    }
};

