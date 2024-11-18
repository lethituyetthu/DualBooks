const express = require('express');
const router = express.Router();
const favoriteBooksController = require('../controller/FavoriteBookController');

// Endpoint to add a book to favorites
router.post('/add', favoriteBooksController.addFavorite);

// Endpoint to remove a book from favorites
router.post('/remove', favoriteBooksController.removeFavorite);

// Endpoint to get all favorite books for a user
router.get('/:userId', favoriteBooksController.getFavorites);

module.exports = router;