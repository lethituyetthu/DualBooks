const FavoriteBooks = require('../models/Favoritebooks');
const Book = require('../models/BookModel'); // Assuming Book model exists

// Add book to favorite
const addFavoriteBook = async (userId, bookId) => {
  try {
    const favorite = await FavoriteBooks.findOne({ userId });

    if (favorite) {
      // Check if the book is already in the favorite list
      if (favorite.books.includes(bookId)) {
        throw new Error('Book is already in your favorites');
      }

      favorite.books.push(bookId);
      await favorite.save();
      return favorite;
    } else {
      const newFavorite = new FavoriteBooks({
        userId,
        books: [bookId]
      });
      await newFavorite.save();
      return newFavorite;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove book from favorite
const removeFavoriteBook = async (userId, bookId) => {
  try {
    const favorite = await FavoriteBooks.findOne({ userId });
    if (!favorite) throw new Error('No favorite books found for this user');

    // Remove the book from the favorite list
    favorite.books = favorite.books.filter(book => book.toString() !== bookId);
    await favorite.save();
    return favorite;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all favorite books for a user
const getFavoriteBooks = async (userId) => {
  try {
    const favorite = await FavoriteBooks.findOne({ userId }).populate('books');
    if (!favorite) return [];
    return favorite.books;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  addFavoriteBook,
  removeFavoriteBook,
  getFavoriteBooks
};