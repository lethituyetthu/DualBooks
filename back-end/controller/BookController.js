const bookService = require("../service/BookService");

exports.getAll = async () => {
  try {
    const books = await bookService.getAll();

    // Định dạng dữ liệu trước khi trả về
    const formattedBooks = books.map((book) => ({
      id: book._id, 
      title: book.title,
      author: book.author,
      category: book.categoryID ? {
          id: book.categoryID._id, // ID danh mục
          name: book.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: book.publisherID ? {
          id: book.publisherID._id, // ID nhà xuất bản
          name: book.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: book.description,
      price: book.price,
      stock: book.stock,
      cover_image: book.cover_image,
      created_at: book.created_at,   // Thêm trường created_at
      updated_at: book.updated_at
    }));

    // Trả về danh sách sách đã được định dạng
    return formattedBooks; // Đảm bảo trả về danh sách đã định dạng
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
};



// Hàm lấy sách theo thể loại
exports.getByCategory = async (categoryID) => {
  try {
    // Gọi hàm từ service để lấy sách theo thể loại
    const books = await bookService.getByCategoryID(categoryID);
     // Định dạng dữ liệu trước khi trả về
     const formattedBooks = books.map((book) => ({
      id: book._id, // ObjectId của sách
      title: book.title,
      author: book.author,
      category: book.categoryID ? {
          id: book.categoryID._id, // ID danh mục
          name: book.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: book.publisherID ? {
          id: book.publisherID._id, // ID nhà xuất bản
          name: book.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: book.description,
      price: book.price,
      stock: book.stock,
      cover_image: book.cover_image,
      created_at: book.created_at,   // Thêm trường created_at
      updated_at: book.updated_at
    }));

    // Trả về danh sách sách đã được định dạng
    return formattedBooks; // Đảm bảo trả về danh sách đã định dạng
  } catch (error) {
    throw new Error('Error fetching books by category: ' + error.message);
  }
};

// Hàm lấy sách theo tác giả
exports.getByAuthor = async (author) => {
  try {
    // Gọi hàm từ service để lấy sách theo tác giả
    const books = await bookService.getByAuthor(author);
    // Định dạng dữ liệu trước khi trả về
    const formattedBooks = books.map((book) => ({
      id: book._id, // ObjectId của sách
      title: book.title,
      author: book.author,
      category: book.categoryID ? {
          id: book.categoryID._id, // ID danh mục
          name: book.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: book.publisherID ? {
          id: book.publisherID._id, // ID nhà xuất bản
          name: book.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: book.description,
      price: book.price,
      stock: book.stock,
      cover_image: book.cover_image,
      created_at: book.created_at,   // Thêm trường created_at
      updated_at: book.updated_at
    }));

    // Trả về danh sách sách đã được định dạng
    return formattedBooks; // Đảm bảo trả về danh sách đã định dạng
  } catch (error) {
    throw new Error('Error fetching books by author: ' + error.message);
  }
};
// Định nghĩa hàm getByTitle để lấy sách theo tên
exports.getByTitle = async (title) => {
  try {
    // Gọi hàm từ service để lấy sách theo tên từ database
    const books = await bookService.getByTitle(title);
  // Định dạng dữ liệu trước khi trả về
  const formattedBooks = books.map((book) => ({
    id: book._id, // ObjectId của sách
    title: book.title,
    author: book.author,
    category: book.categoryID ? {
        id: book.categoryID._id, // ID danh mục
        name: book.categoryID.name // Tên danh mục
    } : null, // Nếu không có categoryID, trả về null
    publisher: book.publisherID ? {
        id: book.publisherID._id, // ID nhà xuất bản
        name: book.publisherID.name // Tên nhà xuất bản
    } : null, // Nếu không có publisherID, trả về null
    description: book.description,
    price: book.price,
    stock: book.stock,
    cover_image: book.cover_image,
    created_at: book.created_at,   // Thêm trường created_at
    updated_at: book.updated_at
  }));

  // Trả về danh sách sách đã được định dạng
  return formattedBooks; // Đảm bảo trả về danh sách đã định dạng
  } catch (error) {
    // Ném lỗi nếu xảy ra vấn đề trong quá trình lấy sách
    throw new Error('Error fetching books by title: ' + error.message);
  }
};
// Hàm lấy sách và sắp xếp theo giá
exports.getAllSortedByPrice = async (sortOrder) => {
  try {
    // Gọi hàm từ service để lấy sách và sắp xếp theo giá
    const books = await bookService.getAllSortedByPrice(sortOrder);
     // Định dạng dữ liệu trước khi trả về
     const formattedBooks = books.map((book) => ({
      id: book._id, // ObjectId của sách
      title: book.title,
      author: book.author,
      category: book.categoryID ? {
          id: book.categoryID._id, // ID danh mục
          name: book.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: book.publisherID ? {
          id: book.publisherID._id, // ID nhà xuất bản
          name: book.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: book.description,
      price: book.price,
      stock: book.stock,
      cover_image: book.cover_image,
      created_at: book.created_at,   // Thêm trường created_at
      updated_at: book.updated_at
    }));

    // Trả về danh sách sách đã được định dạng
    return formattedBooks; // Đảm bảo trả về danh sách đã định dạng
  } catch (error) {
    throw new Error('Error fetching books sorted by price: ' + error.message);
  }
};
// Hàm lấy chi tiết sách theo ID
exports.getBookDetailsById = async (id) => {
  try {
    const book = await bookService.getBookDetailsById (id);
    // Định dạng dữ liệu trước khi trả về
    const formattedBook = {
      id: book._id,
      title: book.title,
      author: book.author,
      category: book.categoryID ? {
        id: book.categoryID._id,
        name: book.categoryID.name
      } : null,
      publisher: book.publisherID ? {
        id: book.publisherID._id,
        name: book.publisherID.name
      } : null,
      description: book.description,
      price: book.price,
      stock: book.stock,
      views:book.views,
      sales:book.sales,
      cover_image: book.cover_image,
      created_at: book.created_at,
      updated_at: book.updated_at,
      reviews: book.reviews.map((review) => ({
        id: review._id,
        customer_id: review.customer_id,
        comment: review.comment,
        rating: review.rating,
        created_at: review.created_at
      }))
    };

    return formattedBook;
  } catch (error) {
    throw new Error('Error fetching book details: ' + error.message);
  }
};
exports.incrementBookViews = async (id) => {
  try {
    // Gọi service để tăng số lượt xem
    const updatedBook = await bookService.incrementBookViews(id);
    return updatedBook;
  } catch (error) {
    throw new Error('Error incrementing book views: ' + error.message);
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
      // Định dạng dữ liệu trước khi trả về
    const formattedBooks = books.map((book) => ({
      id: book._id, // ObjectId của sách
      title: book.title,
      author: book.author,
      category: book.categoryID ? {
          id: book.categoryID._id, // ID danh mục
          name: book.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: book.publisherID ? {
          id: book.publisherID._id, // ID nhà xuất bản
          name: book.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: book.description,
      price: book.price,
      stock: book.stock,
      cover_image: book.cover_image,
      created_at: book.created_at,   // Thêm trường created_at
      updated_at: book.updated_at
    }));

    // Trả về danh sách sách đã được định dạng
    return formattedBooks; // Đảm bảo trả về danh sách đã định dạng
  } catch (error) {
      throw new Error('Error searching books: ' + error.message);
  }
};

// Xử lý API lấy danh sách sản phẩm hot
exports.getHotProducts = async (req, res) => {
  try {
    // Gọi service để lấy danh sách sản phẩm hot
    const products = await bookService.getHotProducts();

    // Định dạng dữ liệu sản phẩm trước khi trả về
    const formattedProducts = products.map((product) => ({
      id: product._id, // ObjectId của sản phẩm
      title: product.title,
      author: product.author,
      category: product.categoryID ? {
          id: product.categoryID._id, // ID danh mục
          name: product.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: product.publisherID ? {
          id: product.publisherID._id, // ID nhà xuất bản
          name: product.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: product.description,
      price: product.price,
      stock: product.stock,
      cover_image: product.cover_image,
      created_at: product.created_at,   // Thêm trường created_at
      updated_at: product.updated_at
    }));

    // Trả về danh sách sản phẩm đã được định dạng
    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xử lý API lấy danh sách sản phẩm nổi bật
exports.getFeaturedProducts = async (req, res) => {
  try {
    // Gọi service để lấy danh sách sản phẩm nổi bật
    const products = await bookService.getFeaturedProducts();

     // Định dạng dữ liệu sản phẩm trước khi trả về
     const formattedProducts = products.map((product) => ({
      id: product._id, // ObjectId của sản phẩm
      title: product.title,
      author: product.author,
      category: product.categoryID ? {
          id: product.categoryID._id, // ID danh mục
          name: product.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: product.publisherID ? {
          id: product.publisherID._id, // ID nhà xuất bản
          name: product.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: product.description,
      price: product.price,
      stock: product.stock,
      cover_image: product.cover_image,
      created_at: product.created_at,   // Thêm trường created_at
      updated_at: product.updated_at
    }));

    // Trả về danh sách sản phẩm đã được định dạng
    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching featured products: ' + error.message });
  }
};
// Xử lý API lấy danh sách sách mới nhất
exports.getLatestBooks = async (req, res) => {
  try {
    // Gọi service để lấy danh sách sách mới nhất
    const products = await bookService.getLatestBooks();

    // Định dạng dữ liệu sản phẩm trước khi trả về
    const formattedProducts = products.map((product) => ({
      id: product._id, // ObjectId của sản phẩm
      title: product.title,
      author: product.author,
      category: product.categoryID ? {
          id: product.categoryID._id, // ID danh mục
          name: product.categoryID.name // Tên danh mục
      } : null, // Nếu không có categoryID, trả về null
      publisher: product.publisherID ? {
          id: product.publisherID._id, // ID nhà xuất bản
          name: product.publisherID.name // Tên nhà xuất bản
      } : null, // Nếu không có publisherID, trả về null
      description: product.description,
      price: product.price,
      stock: product.stock,
      cover_image: product.cover_image,
      created_at: product.created_at,   // Thêm trường created_at
      updated_at: product.updated_at
    }));

    // Trả về danh sách sản phẩm đã được định dạng
    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching latest books: ' + error.message });
  }
};
