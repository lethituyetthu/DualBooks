const mongoose = require('mongoose');

const favoriteBooksSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Customer',  // Assuming Customer is your user model
      required: true
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',  // Assuming Book is your product model
        required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('FavoriteBooks', favoriteBooksSchema);