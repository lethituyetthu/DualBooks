import { useEffect, useState } from "react";

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
}

export default function useFetchBook() {
  const [newBooks, setNewBooks] = useState<typeBook[]>([]);
  // const [hotBooks, setHotBooks] = useState<typeBook[]>([]); // Comment nếu không sử dụng
  const [books, setBooks] = useState<typeBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu sách nổi bật
        const resFeatured = await fetch("http://localhost:3200/books/featured");
        if (!resFeatured.ok) {
          throw new Error("Lỗi khi lấy sách nổi bật!!!");
        }
        const resultFeatured = await resFeatured.json();
        setNewBooks(resultFeatured);

        // Lấy tất cả sách
        const resAll = await fetch("http://localhost:3200/books");
        if (!resAll.ok) {
          throw new Error("Lỗi khi lấy tất cả sách!!!");
        }
        const resultAll = await resAll.json();
        setBooks(resultAll);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { newBooks, books, loading, error };
}
