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

export default function useFetchBook() {
  const [hotBooks, setHotBooks] = useState<typeBook[]>([]);
  const [newBooks, setNewBooks] = useState<typeBook[]>([]);
  const [books, setBooks] = useState<typeBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sách nổi bật
        const resHot = await fetch('http://localhost:3200/books/hot');
        if (!resHot.ok) {
          throw new Error("Lỗi khi lấy sách nổi bật!!!");
        }
        const resultHot = await resHot.json();
        setHotBooks(resultHot);

        // Fetch sách mới
        const resNew = await fetch('http://localhost:3200/books/new');
        if (!resNew.ok) {
          throw new Error("Lỗi khi lấy sách mới!!!");
        }
        const resultNew = await resNew.json();
        setNewBooks(resultNew);

        // Fetch tất cả sách
        const resAll = await fetch('http://localhost:3200/books');
        if (!resAll.ok) {
          throw new Error("Lỗi khi lấy tất cả dữ liệu sách!!!");
        }
        const resultAll = await resAll.json();
        setBooks(resultAll);
      } catch (error) {
        if (error instanceof Error) { // Kiểm tra nếu error là một đối tượng Error
          setError(error.message); // Lưu thông báo lỗi
        } else {
          setError("Có lỗi không xác định xảy ra"); // Xử lý trường hợp khác
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { hotBooks, books, newBooks, loading, error };
}
