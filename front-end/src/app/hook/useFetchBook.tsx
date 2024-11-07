import { useEffect, useState, useCallback } from "react";

// Cập nhật typeBook trong useFetchBook.ts
export interface typeBook {
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
  sales: number;  // Thêm dòng này nếu dữ liệu sales tồn tại cho mỗi sách
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
        // Fetch hot books
        const resHot = await fetch('http://localhost:3200/books/hot');
        if (!resHot.ok) throw new Error("Error fetching hot books");
        const resultHot = await resHot.json();
        setHotBooks(resultHot);

        // Fetch new books
        const resNew = await fetch('http://localhost:3200/books/new');
        if (!resNew.ok) throw new Error("Error fetching new books");
        const resultNew = await resNew.json();
        setNewBooks(resultNew);

        // Fetch all books
        const resAll = await fetch('http://localhost:3200/books');
        if (!resAll.ok) throw new Error("Error fetching all books");
        const resultAll = await resAll.json();
        setBooks(resultAll);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchDetail = useCallback(async (id: string) => {
    setLoading(true);
    setDetailBook(null); // Reset detailBook on fetch
    setError(null); // Reset error on fetch
    try {
      const res = await fetch(`http://localhost:3200/books/${id}`);
      if (!res.ok) throw new Error("Error fetching book details");
      const result = await res.json();
      setDetailBook(result);
    } catch (error) {
      console.error("Error fetching book details:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { hotBooks, books, newBooks, fetchDetail, detailBook, loading, error };
}
