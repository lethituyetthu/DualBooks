import { useEffect, useState, useCallback } from "react";

import { Books } from "../types/Books";

interface Error {
  message: string;
  _id?: string;
  title?: string;
  author?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
  cover_image?: string;
  created_at: string;
  updated_at: string;
}

export default function useFetchBook() {
  const [detailBook, setDetailBook] = useState<Books | null>(null);
  const [reviews, setReviews] = useState<Books[]>([]);
  const [hotBooks, setHotBooks] = useState<Books[]>([]);
  const [newBooks, setNewBooks] = useState<Books[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Books[]>([]);
  const [lowStock, setLowStock] = useState<Books[]>([]);
  const [books, setBooks] = useState<Books[]>([]);
  const [booksAll, setBooksAll] = useState<Books[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryBook, setCategoryBook] = useState<Books[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resHot = await fetch("http://localhost:3200/books/hot");
        if (!resHot.ok) {
          throw new Error("Lỗi khi lấy sách nổi bật!!!");
        }
        const resultHot = await resHot.json();
        setHotBooks(resultHot);

        const resNew = await fetch("http://localhost:3200/books/new");
        if (!resNew.ok) {
          throw new Error("Lỗi khi lấy sách mới!!!");
        }
        const resultNew = await resNew.json();
        setNewBooks(resultNew);

        //console.log(newBooks)
        const resByFeatured = await fetch(
          "http://localhost:3200/books/featured"
        );
        if (!resByFeatured.ok) {
          throw new Error("Lỗi khi lấy sách mới!!!");
        }
        const resultByFeatured = await resByFeatured.json();
        setFeaturedBooks(resultByFeatured);

        //console.log(featuredBooks)
        // Fetch low-stock data only once
        const resLowStock = await fetch(
          "http://localhost:3200/books/low-stock"
        );
        if (!resLowStock.ok) {
          throw new Error("Lỗi khi lấy sách sắp hết hàng!!!");
        }
        const resultLowStock = await resLowStock.json();
        setLowStock(resultLowStock);

        //console.log(resultLowStock)
        setLowStock(resultLowStock);
        const res = await fetch("http://localhost:3200/books/getAllvisible");
        if (!res.ok) {
          throw new Error("Lỗi khi lấy tất cả dữ liệu sách!!!");
        }
        const result = await res.json();
        //console.log("sp ẩn",result)
        setBooks(result);

        const resAll = await fetch("http://localhost:3200/books");
        if (!resAll.ok) {
          throw new Error("lỗi khi lấy tất cả danh sách sản phẩm");
        }

        const resultAll = await resAll.json();
        setBooksAll(resultAll);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addBooks = async (bookData: FormData) => {
    try {
      const response = await fetch("http://localhost:3200/books", {
        method: "POST",

        body: bookData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const newBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
      return newBook;
    } catch (error) {
      const errorMessage = (error as Error).message; // Casting 'error' to Error
      return { error: errorMessage };
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3200/books/${id}/status`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Lỗi khi xóa sách!");
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const updateBook = async (id: string, bookData: FormData) => {
    try {
      const res = await fetch(`http://localhost:3200/books/${id}`, {
        method: "PUT",
        body: bookData,
      });

      if (!res.ok) {
        throw new Error(" lỗi khi cập nhật dữ liệu");
      }

      const updateBook = await res.json();

      console.log("bản cập nhật", updateBook);
      return updateBook;
    } catch (error) {
      console.error("Error updating the book:", error);
      throw error;
    }
  };
  const fetchDetail = useCallback(async (id: string) => {
    if (!id) return; // Không gọi API nếu không có id
    setLoading(true);
    try {
      console.log(`Fetching details for book ID: ${id}`);
      const res = await fetch(`http://localhost:3200/books/${id}`);
      if (!res.ok) throw new Error("Lỗi khi lấy thông tin chi tiết sản phẩm");

      const result = await res.json();

      // Chỉ cập nhật state khi có thay đổi thực sự
      setDetailBook((prev) =>
        JSON.stringify(prev) !== JSON.stringify(result) ? result : prev
      );
      setReviews((prev) =>
        JSON.stringify(prev) !== JSON.stringify(result.reviews)
          ? result.reviews
          : prev
      );

      return result;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchViews = useCallback(async (id: string) => {
    if (!id) return; // Không gọi API nếu không có id
    try {
      console.log(`Updating views for book ID: ${id}`);
      const res = await fetch(`http://localhost:3200/books/${id}/views`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Lỗi khi tăng lượt xem sản phẩm");
    } catch (error) {
      console.error("Lỗi khi gọi API views:", error);
    }
  }, []);

  // lọc sp theo tên -- admin
  const searchBooksAll = async (term: string) => {
    try {
      const res = await fetch(`http://localhost:3200/books/title/${term}`);
      // Kiểm tra phản hồi từ API
      if (res.ok) {
        // const errorDetails = await res.json(); // Lấy chi tiết lỗi từ phản hồi
        // throw new Error(`Lỗi khi tìm kiếm sách 2: ${errorDetails.message || "Không xác định"}`);
        const result = await res.json();
        setBooksAll(result);
      }
    } catch (error) {
      // Cập nhật lỗi với thông điệp chi tiết
      setError(`Có lỗi xảy ra: ${(error as Error).message}`);
      console.error("Lỗi khi tìm kiếm sách 1:", error); // In lỗi ra console để kiểm tra
    }
  };
  const searchBooks = async (term: string) => {
    try {
      const res = await fetch(`http://localhost:3200/books/title/${term}`);

      // Kiểm tra phản hồi từ API
      if (res.ok) {
        const result = await res.json();
        // Filter books to include only those with status 'visible'
        //console.log(result);
        const visibleBooks = result.filter(
          (book: Books) => book.status === "visible"
        );
        console.log(visibleBooks);

        setBooks(visibleBooks);
        return visibleBooks;
      }
    } catch (error) {
      // Cập nhật lỗi với thông điệp chi tiết
      setError(`Có lỗi xảy ra: ${(error as Error).message}`);
      console.error("Lỗi khi tìm kiếm sách 1:", error); // In lỗi ra console để kiểm tra
    }
  };
  const searchBooksById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/books/${id}`);
      if (res.ok) {
        const result = await res.json();
        setBooks([result]); // Cập nhật `books` chỉ với kết quả tìm kiếm
      } else {
        throw new Error("Không tìm thấy sách với ID này.");
      }
    } catch (error) {
      setError(
        `Có lỗi xảy ra khi tìm kiếm sách theo ID: ${(error as Error).message}`
      );
    }
  };

  const searchBookByCate = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/books/category/${id}`);
      if (res.ok) {
        const result = await res.json();
        // Giả sử `data` là mảng lồng như `[Array(2)]`
        setBooks(result);
        setCategoryBook(result);
        //console.log(categoryBook)
        return result;
        // Cập nhật `books` chỉ với kết quả tìm kiếm
      } else {
        throw new Error("Không tìm thấy sách trong danh mục này.");
      }
    } catch (error) {
      setError(
        `Có lỗi xảy ra khi tìm kiếm sách theo danh mục: ${
          (error as Error).message
        }`
      );
    }
  };
  const fetchProductStock = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3200/books/${productId}`);

      const productData = await response.json();

      console.log(productData.stock);

      return productData.stock;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tồn kho:", error);

      return 0; // Trả về 0 nếu có lỗi
    }
  };
  return {
    lowStock,
    updateBook,
    hotBooks,
    featuredBooks,
    books,
    booksAll,
    newBooks,
    fetchDetail,
    fetchViews,
    reviews,
    detailBook,
    loading,
    error,
    addBooks,
    deleteBook,
    searchBooks,
    searchBooksById,
    searchBooksAll,
    searchBookByCate,
    categoryBook,
    fetchProductStock,
  };
}
