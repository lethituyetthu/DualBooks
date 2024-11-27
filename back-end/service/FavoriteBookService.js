const mongoose = require('mongoose');
const FavoriteBooks = require('../models/FavoriteBooksModel');
const Book = require('../models/BookModel'); // Nếu cần sử dụng Book trong logic


// Thêm sách vào danh sách yêu thích
exports.addFavoriteBook = async (userId, bookId) => {
  try {
    // Tìm kiếm danh sách yêu thích của người dùng
    const favorite = await FavoriteBooks.findOne({ userId });

    if (favorite) {
      // Kiểm tra xem sách đã có trong danh sách yêu thích chưa
      if (favorite.books.includes(bookId)) {
        throw new Error('Sách này đã có trong danh sách yêu thích.');
      }

      // Thêm sách vào danh sách yêu thích và lưu lại
      favorite.books.push(bookId);
      await favorite.save();
      return favorite;
    } else {
      // Nếu không có danh sách yêu thích, tạo mới và thêm sách vào
      const newFavorite = new FavoriteBooks({
        userId,
        books: [bookId],
      });
      await newFavorite.save();
      return newFavorite;
    }
  } catch (error) {
    throw new Error(error.message); // Ném lỗi nếu có vấn đề
  }
};

// Remove book from favorite
exports.removeFavoriteBook = async (userObjectId, bookObjectId) => {
  try {
    const updatedFavorites = await FavoriteBooks.findOneAndUpdate(
      { userId: userObjectId },  // Tìm theo userObjectId đã chuyển đổi
      { $pull: { books: bookObjectId } },  // Loại bỏ sách khỏi mảng books
      { new: true }
    ).populate('books');  // Đảm bảo rằng sách được liên kết đúng với model 'Book'
    
    // Nếu không tìm thấy danh sách yêu thích của người dùng
    if (!updatedFavorites) {
      throw new Error('Favorite list not found for the user');
    }

    return updatedFavorites; // Trả về danh sách yêu thích sau khi cập nhật
  } catch (error) {
    throw new Error('Error removing favorite book: ' + error.message);
  }
};

exports.getFavorites = async (userId) => {
  try {
    // Tìm danh sách yêu thích của người dùng
    const favoriteBooks = await FavoriteBooks.findOne({ userId })
      .populate('books')  // Populate thông tin sách từ mảng 'books'
      .populate('userId', 'name email')  // Populate thông tin người dùng
      .exec();

    if (!favoriteBooks) {
      throw new Error('No favorite books found for the user');
    }

    return favoriteBooks;  // Trả về danh sách sách yêu thích
  } catch (error) {
    throw new Error('Error fetching favorite books: ' + error.message);
  }
};

