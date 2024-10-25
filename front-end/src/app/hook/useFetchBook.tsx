import { useEffect, useState } from "react";

interface typeBook {
  id: string;
  title: string;
  author: string;
  categoryID: string;
  description: string;
  price: number;
  stock: number;
  cover_image: string;
  created_at: string;
  updated_at: string;
}

interface Error {
  id?: string;
  title?: string;
  author?: string;
  categoryID?: string;
  description?: string;
  price?: number;
  stock?: number;
  cover_image?: string;
  created_at: string;
  updated_at: string;
}

export default function useFetchBook() {
  const [detailBook, setDetailBook] = useState<typeBook | null>(null);
  const [hotBooks, setHotBooks] = useState<typeBook[]>([]);
  const [newBooks, setNewBooks] = useState<typeBook[]>([]);
  const [books, setBooks] = useState<typeBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      if (!res.ok) {
        throw new Error("Lỗi khi lấy thông tin chi tiết sản phẩm");
      }
      const result = await res.json();
      setDetailBook(result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (term: string) => {
    
  
    try {
      const res = await fetch(`http://localhost:3200/books/search?query=${term}`);
      
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
    searchBooks
  };
}
