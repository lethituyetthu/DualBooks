const bookService = require("../service/BookService");

// Hàm định dạng sách để tái sử dụng trong nhiều hàm khác
const formatBook = (book) => ({
  id: book._id,
  title: book.title,
  author: book.author,
  category: book.categoryID
    ? {
        id: book.categoryID._id,
        name: book.categoryID.name,
      }
    : null,
  publisher: book.publisherID
    ? {
        id: book.publisherID._id,
        name: book.publisherID.name,
      }
    : null,
  description: book.description,
  price: book.price,
  stock: book.stock,
  cover_image: book.cover_image,
  created_at: book.created_at,
  updated_at: book.updated_at,
});

exports.getAll = async () => {
  try {
    const books = await bookService.getAll();
    return books.map(formatBook); // Định dạng tất cả sách
  } catch (error) {
    throw new Error("Error fetching books: " + error.message);
  }
};
// Hàm thêm sách mới
exports.createBook = async (bookData) => {
  try {
    const book = await bookService.createBook(bookData);
    return book;
  } catch (error) {
    throw new Error("Error creating book: " + error.message);
  }
};

exports.getByCategory = async (categoryID) => {
  try {
    const books = await bookService.getByCategoryID(categoryID);
    return books.map(formatBook); // Định dạng sách theo thể loại
  } catch (error) {
    throw new Error("Error fetching books by category: " + error.message);
  }
};

exports.getByAuthor = async (author) => {
  try {
    const books = await bookService.getByAuthor(author);
    return books.map(formatBook); // Định dạng sách theo tác giả
  } catch (error) {
    throw new Error("Error fetching books by author: " + error.message);
  }
};

exports.getByTitle = async (title) => {
  try {
    const books = await bookService.getByTitle(title);
    return books.map(formatBook); // Định dạng sách theo tiêu đề
  } catch (error) {
    throw new Error("Error fetching books by title: " + error.message);
  }
};

exports.getAllSortedByPrice = async (sortOrder) => {
  try {
    const books = await bookService.getAllSortedByPrice(sortOrder);
    return books.map(formatBook); // Định dạng sách theo giá
  } catch (error) {
    throw new Error("Error fetching books sorted by price: " + error.message);
  }
};

exports.getBookDetailsById = async (id) => {
  try {
    const book = await bookService.getBookDetailsById(id);
    const formattedBook = {
      ...formatBook(book), // Định dạng sách theo cấu trúc chung
      view: book.views,
      sale: book.sales,
      reviews: book.reviews.map((review) => ({
        id: review._id,
        customer_id: review.customer_id,
        comment: review.comment,
        rating: review.rating,
        created_at: review.created_at,
      })),
    };
    return formattedBook;
  } catch (error) {
    throw new Error("Error fetching book details: " + error.message);
  }
};

exports.incrementBookViews = async (id) => {
  try {
    const updatedBook = await bookService.incrementBookViews(id);
    return formatBook(updatedBook); // Định dạng sách sau khi tăng lượt xem
  } catch (error) {
    throw new Error("Error incrementing book views: " + error.message);
  }
};

exports.searchBooks = async (query) => {
  try {
    const books = await bookService.searchBooks(query);
    return books.map(formatBook); // Định dạng sách theo từ khóa tìm kiếm
  } catch (error) {
    throw new Error("Error searching books: " + error.message);
  }
};

exports.getHotProducts = async (req, res) => {
  try {
    const products = await bookService.getHotProducts();
    res.status(200).json(products.map(formatBook)); // Định dạng sản phẩm hot
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching hot products: " + error.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await bookService.getFeaturedProducts();
    res.status(200).json(products.map(formatBook)); // Định dạng sản phẩm nổi bật
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching featured products: " + error.message });
  }
};

exports.getLatestBooks = async (req, res) => {
  try {
    const books = await bookService.getLatestBooks();
    res.status(200).json(books.map(formatBook)); // Định dạng sách mới nhất
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching latest books: " + error.message });
  }
};
// Hàm cập nhật thông tin sách
exports.updateBook = async (id, updatedData) => {
  try {
      const updatedBook = await bookService.updateBook(id, updatedData);
      return updatedBook;
  } catch (error) {
      throw new Error('Error updating book: ' + error.message);
  }
};
// Xóa một cuốn sách
exports.deleteBook = async (id) => {
  try {
      const deletedBook = await bookService.deleteBook(id);
      return deletedBook;
  } catch (error) {
      throw new Error('Error deleting book: ' + error.message);
  }
};