const mongoose = require('mongoose');
const favoriteBooksService = require('../service/FavoriteBookService');
// Hàm xử lý việc thêm sách vào danh sách yêu thích
exports.addFavorite = async (req, res) => {
  const { userId, bookId } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!userId || !bookId) {
    return res.status(400).json({ message: 'userId và bookId là bắt buộc.' });
  }

  try {
    // Gọi đến service để xử lý việc thêm sách vào danh sách yêu thích
    const favorite = await favoriteBooksService.addFavoriteBook(userId, bookId);
    return res.status(200).json(favorite); // Trả về danh sách yêu thích đã cập nhật
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Remove a book from the user's favorites
exports.removeFavorite = async (req, res) => {
  const { userId, bookId } = req.body;  // Nhận thông tin từ request body
  console.log('Request body:', req.body);

  if (!userId || !bookId) {
    return res.status(400).json({ error: 'User ID and Book ID are required' });
  }

  // Chuyển đổi userId và bookId thành ObjectId (sử dụng 'new' để khởi tạo ObjectId)
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const bookObjectId = new mongoose.Types.ObjectId(bookId);

  try {
    // Gọi service với ObjectId đã chuyển đổi
    const updatedFavorites = await favoriteBooksService.removeFavoriteBook(userObjectId, bookObjectId);

    // Trả về danh sách yêu thích sau khi xóa
    res.status(200).json({
      message: 'Book removed from favorites successfully',
      updatedFavorites
    });
  } catch (error) {
    console.error('Error removing favorite book:', error.message);
    res.status(500).json({
      error: 'Error removing favorite book',
      message: error.message,
      stack: error.stack // Để dễ dàng tìm nguyên nhân từ server
    });
  }
};

exports.getFavorites = async (req, res) => {
  const { userId } = req.params;  // Nhận userId từ params

  try {
    const favoriteBooks = await favoriteBooksService.getFavorites(userId);

    // Trả về danh sách sách yêu thích của người dùng
    res.status(200).json({
      message: 'Favorite books fetched successfully',
      favoriteBooks
    });
  } catch (error) {
    console.error('Error fetching favorite books:', error.message);
    res.status(500).json({ error: error.message });
  }
};