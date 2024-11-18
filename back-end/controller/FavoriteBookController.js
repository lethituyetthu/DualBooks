const favoriteBooksService = require('../service/FavoriteBookService');

// Add a book to the user's favorites
const addFavorite = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const favorite = await favoriteBooksService.addFavoriteBook(userId, bookId);
    res.status(200).json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a book from the user's favorites
const removeFavorite = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const favorite = await favoriteBooksService.removeFavoriteBook(userId, bookId);
    res.status(200).json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all favorite books for a user
const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const books = await favoriteBooksService.getFavoriteBooks(userId);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
};