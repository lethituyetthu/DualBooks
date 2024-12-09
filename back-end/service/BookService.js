const bookModel = require('../models/BookModel');
const categoryModel = require('../models/CategoryModel');
const reviewModel = require('../models/ReviewModel')
const fs = require('fs');
const path = require('path');
exports.getAll = async () => {
  try {
    // Truy vấn cơ sở dữ liệu, chỉ lấy danh mục có trạng thái "visible"
    const books = await bookModel.find()
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = books.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
    throw new Error("Error fetching books: " + error.message);
  }
};

exports.getAllvisible = async () => {
  try {
    // Truy vấn cơ sở dữ liệu, chỉ lấy danh mục có trạng thái "visible"
    const books = await bookModel.find({ status: "visible" })
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = books.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
    console.error("Error in bookService.getAllvisible:", error.message);
    throw new Error("Error fetching books: " + error.message);
  }
};
// Hàm lọc sách theo thể loại
exports.getByCategoryID = async function (categoryID) {
  try {
      // Tìm sách theo thể loại
      const books = await bookModel.find({ categoryID })
       .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = books.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
      throw new Error('Error fetching books by category: ' + error.message);
  }
};
// Hàm lọc sách theo tác giả
exports.getByAuthor = async function (author) {
  try {
      // Tìm sách theo tác giả
      const books = await bookModel.find({ author: author })
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = books.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
      throw new Error('Error fetching books by author: ' + error.message);
  }
};
// Hàm getByTitle để tìm sách theo tên
exports.getByTitle = async function (title) {
  try {
      // Thêm \ trước dấu ngoặc để đảm bảo các ký tự đặc biệt không gây lỗi
      const regexTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
      const books = await bookModel.find({
          title: { $regex: new RegExp(regexTitle, 'i') }
      })
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = books.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
      throw new Error('Error fetching books by title: ' + error.message);
  }
};

// Hàm lấy sách và sắp xếp theo giá
exports.getAllSortedByPrice = async function (sortOrder = 'asc') {
  try {
    // Xác định thứ tự sắp xếp
    const sort = sortOrder === 'asc' ? 1 : -1;

    // Tìm tất cả sách và sắp xếp theo giá
    const books = await bookModel.find().sort({ price: sort })
     .populate({
      path: "categoryID", // Tham chiếu danh mục
      match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
      select: "name", // Chỉ lấy trường tên
    })
    .populate("publisherID", "name"); // Populate nhà xuất bản

  // Lọc sách không có danh mục hợp lệ
  const filteredBooks = books.filter((book) => book.categoryID !== null);

  return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
    throw new Error('Error fetching books sorted by price: ' + error.message);
  }
};
exports.getBookDetailsById = async (id) => {
  try {
    // Tìm sách theo id và populate thông tin về category, publisher, và reviews
    const book = await bookModel.findById(id)
      .populate('categoryID', 'name')  // Populate thông tin danh mục
      .populate('publisherID', 'name')  // Populate thông tin nhà xuất bản
      .populate({
        path: 'reviews',
        populate: {
          path: 'customer_id',  // Lấy thông tin customer từ customer_id trong reviews
          select: 'name'  // Chỉ lấy trường name của khách hàng
        }
      }) // Populate thông tin reviews
      .exec();

    if (!book) {
      throw new Error('Book not found');
    }

    // Trả về dữ liệu sách đã populate
    return book;
  } catch (error) {
    throw new Error('Error fetching book details: ' + error.message);
  }
};
exports.incrementBookViews = async (id) => {
  try {
    // Tìm sách theo id
    const book = await bookModel.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    // Tăng số lượt xem lên 1
    book.views += 1;
    await book.save();

    return { id: book._id, views: book.views };  // Trả về id và số lượt xem mới
  } catch (error) {
    throw new Error('Error incrementing book views: ' + error.message);
  }
};
// Hàm tạo sách mới
exports.createBook = async function (bookData) {
  try {
    const newBook = new bookModel(bookData);
    const savedBook = await newBook.save();
    return savedBook;
  } catch (error) {
    throw new Error('Error creating book: ' + error.message);
  }
};
// Hàm cập nhật thông tin sách
exports.updateBook = async function (id, updatedData) {
  try {
      // Nếu cover_image được cung cấp và khác với hình ảnh hiện tại, xử lý việc xóa hình ảnh cũ
      if (updatedData.cover_image) {
          // Tìm sách hiện tại để lấy tên file hình ảnh cũ
          const currentBook = await bookModel.findById(id);
          if (!currentBook) {
              throw new Error('Book not found');
          }

          // Nếu hình ảnh cũ không phải là hình ảnh mặc định, xóa nó
          if (currentBook.cover_image && currentBook.cover_image !== 'default.jpg') {
              const oldImagePath = path.join(__dirname, '../uploads/books', currentBook.cover_image);
              if (fs.existsSync(oldImagePath)) {
                  fs.unlinkSync(oldImagePath);
              }
          }
      }

      // Cập nhật trường 'updated_at' để ghi nhận thời gian cập nhật
      updatedData.updated_at = Date.now();

      // Cập nhật sách trong cơ sở dữ liệu
      const updatedBook = await bookModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
      console.log('Updated book:', updatedBook);
      return updatedBook;
  } catch (error) {
      throw new Error('Error updating book: ' + error.message);
  }
};

//{//////////////////////////////////////////////
  //=======Tổ hợp phục vụ xóa/ ẩn sách========//
  exports.getBookById = async (id) => {
    try {
      return await bookModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching book: ' + error.message);
    }
  };
  
  // Cập nhật trạng thái sách
  exports.updateBookStatus = async (id, status) => {
    try {
      return await bookModel.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Trả về sách đã cập nhật
      );
    } catch (error) {
      throw new Error('Error updating book status: ' + error.message);
    }
  };
  // Xóa một cuốn sách
  exports.deleteBook = async function (id) {
    try {
        const deletedBook = await bookModel.findByIdAndDelete(id);
        return deletedBook;
    } catch (error) {
        throw new Error('Error deleting book: ' + error.message);
    }
  };
  //=======Tổ hợp phục vụ xóa/ ẩn sách========//
  //////////////////////////////////////////////////////////         }

// tìm kiếm sách theo tiêu đề, tác giả, mô tả
exports.searchBooks = async function (query) {
  try {
      const books = await bookModel.find({
          $or: [
              { title: { $regex: query, $options: 'i' } },
              { author: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
          ]
      })
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = books.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
  } catch (error) {
      throw new Error('Error searching books: ' + error.message);
  }
};
// Hàm lấy danh sách sản phẩm hot
exports.getHotProducts = async () => {
  try {
    // Lấy danh sách sản phẩm theo lượt xem giảm dần hoặc số lượng bán hàng giảm dần
    const hotProducts = await bookModel.find({ status: "visible" })
      .sort({ views: -1 }) // Hoặc sử dụng .sort({ sales: -1 }) tùy vào yêu cầu
      .limit(10)// Giới hạn số lượng sản phẩm hot được trả về
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = hotProducts.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
    // return hotProducts;
  } catch (error) {
    throw new Error('Error fetching hot products: ' + error.message);
  }
};

// Hàm lấy danh sách sản phẩm nổi bật
exports.getFeaturedProducts = async () => {
  try {
    // Lấy danh sách sản phẩm theo số lượng bán giảm dần
    const featuredProducts = await bookModel.find({})
      .sort({ sales: -1 }) // Sắp xếp theo số lượng bán giảm dần
      .limit(10)// Giới hạn số lượng sản phẩm nổi bật được trả về
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = featuredProducts.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
    // return featuredProducts;
  } catch (error) {
    throw new Error('Error fetching featured products: ' + error.message);
  }
};
// Hàm lấy danh sách 5 cuốn sách mới nhất
exports.getLatestBooks = async () => {
  try {
    // Lấy danh sách sách theo ngày tạo mới nhất
    const latestBooks = await bookModel.find({ status: "visible" })
      .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo giảm dần (mới nhất lên trước)
      .limit(5) // Giới hạn kết quả trả về 5 cuốn sách
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name"); // Populate nhà xuất bản

    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = latestBooks.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc
    // return latestBooks;
  } catch (error) {
    throw new Error('Error fetching latest books: ' + error.message);
  }
};
//SERVICE
exports.getLowStockBooks = async () => {
  try {
    // Truy vấn để lấy 5 sản phẩm có số lượng tồn kho ít nhất
    const lowStockBooks = await bookModel.find({ stock: { $lt: 5 }, status: "visible" })  // Lọc các sách có stock < 5
      .populate({
        path: "categoryID", // Tham chiếu danh mục
        match: { status: "visible" }, // Chỉ lấy danh mục có trạng thái visible
        select: "name", // Chỉ lấy trường tên
      })
      .populate("publisherID", "name")// Populate nhà xuất bản
      .sort({ stock: 1 })  // Sắp xếp theo stock tăng dần
    // Lọc sách không có danh mục hợp lệ
    const filteredBooks = lowStockBooks.filter((book) => book.categoryID !== null);

    return filteredBooks; // Trả về danh sách sách đã lọc

    // return lowStockBooks;
  } catch (error) {
    throw new Error('Error fetching low stock books: ' + error.message);
  }
};
exports.getOrdersByCustomerId = async (customerId) => {
  try {
      // Tìm các đơn hàng theo ID khách hàng
      const orders = await OrderModel.find({
          customer_id: customerId // Tìm theo customer_id
      }).populate('customer_id', 'name email address phone'); // Lấy thông tin khách hàng
      return orders; // Trả về danh sách đơn hàng
  } catch (error) {
      throw new Error('Error fetching orders: ' + error.message); // Xử lý lỗi
  }
};

