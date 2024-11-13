import { useEffect, useState, useCallback } from "react";

// Định nghĩa type cho Book
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
  sales: number;  // Nếu dữ liệu sales có tồn tại
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
        const resHot = await fetch('http://localhost:3200/books/hot');
        if (!resHot.ok) throw new Error("Lỗi khi tải danh sách sách hot");
        const resultHot = await resHot.json();
        setHotBooks(resultHot);

        const resNew = await fetch('http://localhost:3200/books/new');
        if (!resNew.ok) throw new Error("Lỗi khi tải danh sách sách mới");
        const resultNew = await resNew.json();
        setNewBooks(resultNew);

        const resAll = await fetch('http://localhost:3200/books');
        if (!resAll.ok) throw new Error("Lỗi khi tải toàn bộ sách");
        const resultAll = await resAll.json();
        setBooks(resultAll);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchDetail = useCallback(async (id: string) => {
    setLoading(true);
    setDetailBook(null);
    setError(null);
    try {
      // Gọi API để lấy chi tiết sách
      const res = await fetch(`http://localhost:3200/books/${id}`);
      if (!res.ok) throw new Error("Lỗi khi tải chi tiết sách");
      const result = await res.json();
      setDetailBook(result);

      // Gọi API để tăng số lượt xem
      await fetch(`http://localhost:3200/books/${id}/increase-view`, {
        method: 'POST',
      });
    } catch (error) {
      console.error("Lỗi khi tải chi tiết sách hoặc tăng số lượt xem:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { hotBooks, books, newBooks, fetchDetail, detailBook, loading, error };
}
