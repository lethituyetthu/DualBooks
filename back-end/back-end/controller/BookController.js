const bookService = require("../service/BookService");
exports.getAll = async () => {
  try {
    const books = await bookService.getAll();
    return books.map((p) => ({
      id: p._id,
      title: p.title,
      author: p.author,     // Thêm trường author
      category: p.category, // Thêm trường category
      categoryID: p.categoryID, // Chuyển đổi ObjectId thành chuỗi
      description: p.description,
      price: p.price,
      stock: p.stock,       // Thêm trường stock
      cover_image: p.cover_image, // Thêm trường cover_image
      created_at: p.created_at,   // Thêm trường created_at
      updated_at: p.updated_at
    }));
  } catch (error) {
    throw error;
  }
  ;
};

// Hàm lấy sách theo thể loại
exports.getByCategory = async (categoryID) => {
  try {
    // Gọi hàm từ service để lấy sách theo thể loại
    const books = await bookService.getByCategoryID(categoryID);
    return books;
  } catch (error) {
    throw new Error('Error fetching books by category: ' + error.message);
  }
};

// Hàm lấy sách theo tác giả
exports.getByAuthor = async (author) => {
  try {
    // Gọi hàm từ service để lấy sách theo tác giả
    const books = await bookService.getByAuthor(author);
    return books;
  } catch (error) {
    throw new Error('Error fetching books by author: ' + error.message);
  }
};
// Hàm lấy sách và sắp xếp theo giá
exports.getAllSortedByPrice = async (sortOrder) => {
  try {
    // Gọi hàm từ service để lấy sách và sắp xếp theo giá
    const books = await bookService.getAllSortedByPrice(sortOrder);
    return books;
  } catch (error) {
    throw new Error('Error fetching books sorted by price: ' + error.message);
  }
};
// Hàm lấy chi tiết sách theo ID
exports.getBookById = async (id) => {
  try {
    const book = await bookService.getBookById(id);
    return book;
  } catch (error) {
    throw new Error('Error fetching book by ID: ' + error.message);
  }
};
// Hàm thêm sách mới
exports.createBook = async (bookData) => {
  try {
    const book = await bookService.createBook(bookData);
    return book;
  } catch (error) {
    throw new Error('Error creating book: ' + error.message);
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
// tìm kiếm sách theo tiêu đề, tác giả, mô tả
exports.searchBooks = async (query) => {
  try {
      const books = await bookService.searchBooks(query);
      return books;
  } catch (error) {
      throw new Error('Error searching books: ' + error.message);
  }
};

// Xử lý API lấy danh sách sản phẩm hot
exports.getHotProducts = async (req, res) => {
  try {
    // Gọi service để lấy danh sách sản phẩm hot
    const products = await bookService.getHotProducts();

    // Trả về kết quả
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Xử lý API lấy danh sách sản phẩm nổi bật
exports.getFeaturedProducts = async (req, res) => {
  try {
    // Gọi service để lấy danh sách sản phẩm nổi bật
    const products = await bookService.getFeaturedProducts();

    // Trả về kết quả
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching featured products: ' + error.message });
  }
};
