import { useEffect, useState } from "react";
import { set } from "react-hook-form";

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
  
  const [detailBook, setDetailBook] = useState<typeBook|null>(null);
  const [hotBooks, setHotBooks] = useState<typeBook[]>([]);
  const [newBooks, setNewBooks] = useState<typeBook[]>([]);
  const [books, setBooks] = useState<typeBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State để quản lý trạng thái loading
  const [error, setError] = useState<string | null>(null); // State để lưu thông báo lỗi

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


        // fetch sách mới 

        const resNew = await fetch('http://localhost:3200/books/new');
        if (!resNew.ok) {
          throw new Error("Lỗi khi lấy sách nổi bật!!!");
        }
        const resultNew = await resNew.json();
        setNewBooks(resultNew); 

        // Fetch tất cả sách
        const resAll = await fetch('http://localhost:3200/books');
        if (!resAll.ok) {
          throw new Error("Lỗi khi lấy tất cả dữ liệu sách!!!");
        }
        const resultAll = await resAll.json();
        setBooks(resultAll); // Cập nhật danh sách tất cả sách



      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false khi hoàn tất
      }
    };

    fetchData();
  }, []);

  const fetchDetail = async (id:string)=>{
    setLoading(true)

    try {

      const res = await fetch(`http://localhost:3200/books/${id}`)
      
      if(!res.ok){
        throw new Error ("lỗi khi lấy thông tin chi tiết sp")
      }

      const result = await res.json()

      setDetailBook(result);
      
    } catch (error) {

      setError((error as Error).message)
      
    }finally{
      setLoading(false)
    }
  }

  return { hotBooks, books,newBooks,fetchDetail,detailBook, loading, error }; // Trả về tất cả thông tin
}
