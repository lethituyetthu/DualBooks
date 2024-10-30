const bookModel = require('../models/BookModel');
const categoryModel = require('../models/CategoryModel');
const fs = require('fs');
const path = require('path');


exports.getAll = async () => {
  try {
    // Tìm tất cả các sách và populate thông tin từ bảng Category và Publisher
    const books = await bookModel.find()
      .populate('categoryID', 'name') // Populate danh mục
      .populate('publisherID', 'name'); // Populate nhà xuất bản

    return books;
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
};
// Hàm lọc sách theo thể loại
exports.getByCategoryID = async function (categoryID) {
  try {
      // Tìm sách theo thể loại
      const books = await bookModel.find({ categoryID });
      return books;
  } catch (error) {
      throw new Error('Error fetching books by category: ' + error.message);
  }
};
// Hàm lọc sách theo tác giả
exports.getByAuthor = async function (author) {
  try {
      // Tìm sách theo tác giả
      const books = await bookModel.find({ author: author });
      return books;
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
      });
      return books;
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
    const books = await bookModel.find().sort({ price: sort });
    return books;
  } catch (error) {
    throw new Error('Error fetching books sorted by price: ' + error.message);
  }
};
// Hàm tìm sách theo ID
exports.getBookById = async function (id) {
  try {
    const book = await bookModel.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw new Error('Error fetching book by ID: ' + error.message);
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
// Xóa một cuốn sách
exports.deleteBook = async function (id) {
  try {
      const deletedBook = await bookModel.findByIdAndDelete(id);
      return deletedBook;
  } catch (error) {
      throw new Error('Error deleting book: ' + error.message);
  }
};
// tìm kiếm sách theo tiêu đề, tác giả, mô tả
exports.searchBooks = async function (query) {
  try {
      const books = await bookModel.find({
          $or: [
              { title: { $regex: query, $options: 'i' } },
          
          ]
      });
      return books;
  } catch (error) {
      throw new Error('Error searching books: ' + error.message);
  }
};
// Hàm lấy danh sách sản phẩm hot
exports.getHotProducts = async () => {
  try {
    // Lấy danh sách sản phẩm theo lượt xem giảm dần hoặc số lượng bán hàng giảm dần
    const hotProducts = await bookModel.find({})
      .sort({ views: -1 }) // Hoặc sử dụng .sort({ sales: -1 }) tùy vào yêu cầu
      .limit(10); // Giới hạn số lượng sản phẩm hot được trả về

    return hotProducts;
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
      .limit(10); // Giới hạn số lượng sản phẩm nổi bật được trả về

    return featuredProducts;
  } catch (error) {
    throw new Error('Error fetching featured products: ' + error.message);
  }
};
// Hàm lấy danh sách 5 cuốn sách mới nhất
exports.getLatestBooks = async () => {
  try {
    // Lấy danh sách sách theo ngày tạo mới nhất
    const latestBooks = await bookModel.find({})
      .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo giảm dần (mới nhất lên trước)
      .limit(5); // Giới hạn kết quả trả về 5 cuốn sách

    return latestBooks;
  } catch (error) {
    throw new Error('Error fetching latest books: ' + error.message);
  }
};
