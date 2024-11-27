const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteBooksSchema = new mongoose.Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',  // Assuming Customer is your user model
      required: true
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',  // Assuming Book is your product model
        required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('FavoriteBooks', favoriteBooksSchema);