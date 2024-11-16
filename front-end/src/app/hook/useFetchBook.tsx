import { useEffect, useState } from "react";

import { Books } from "../types/Books";

interface Error {
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
  const [hotBooks, setHotBooks] = useState<Books[]>([]);
  const [newBooks, setNewBooks] = useState<Books[]>([]);
  const [books, setBooks] = useState<Books[]>([]);
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

        const resAll = await fetch("http://localhost:3200/books");
        if (!resAll.ok) {
          throw new Error("Lỗi khi lấy tất cả dữ liệu sách!!!");
        }
        const resultAll = await resAll.json();
        setBooks(resultAll);
      } catch (error) {
        setError(error.message);
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
      return { error: error.message };
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3200/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Lỗi khi xóa sách!");
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      setError(error.message);
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

      console.log(updateBook);

      return updateBook;
    } catch (error) {
      console.error("Error updating the book:", error);
      throw error;
    }
  };
  const fetchDetail = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3200/books/${id}`);
      /*   if (!res.ok) {
        throw new Error("Lỗi khi lấy thông tin chi tiết sản phẩm");
      } */
      const result = await res.json();
      setDetailBook(result);
      return result;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (term: string) => {
    try {
      const res = await fetch(
        `http://localhost:3200/books/title/${term}`
      );

      // Kiểm tra phản hồi từ API
      if (res.ok) {
        // const errorDetails = await res.json(); // Lấy chi tiết lỗi từ phản hồi
        // throw new Error(`Lỗi khi tìm kiếm sách 2: ${errorDetails.message || "Không xác định"}`);
        const result = await res.json();
        setBooks(result);
      }
    } catch (error) {
      // Cập nhật lỗi với thông điệp chi tiết
      setError(`Có lỗi xảy ra: ${error.message}`);
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
      setError(`Có lỗi xảy ra khi tìm kiếm sách theo ID: ${error.message}`);
    }
  };

  const searchBookByCate = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/books/category/${id}`);
      if (res.ok) {
        const result = await res.json();
        // Giả sử `data` là mảng lồng như `[Array(2)]`
        const flatData = Array.isArray(result[0]) ? result.flat() : result;
        setCategoryBook([flatData]); // Cập nhật `books` chỉ với kết quả tìm kiếm
      } else {
        throw new Error("Không tìm thấy sách trong danh mục này.");
      }
    } catch (error) {
      setError(
        `Có lỗi xảy ra khi tìm kiếm sách theo danh mục: ${error.message}`
      );
    }
  };

  return {
    updateBook,
    hotBooks,
    books,
    newBooks,
    fetchDetail,
    detailBook,
    loading,
    error,
    addBooks,
    deleteBook,
    searchBooks,
    searchBooksById,
    searchBookByCate,
    categoryBook,
  };
}
