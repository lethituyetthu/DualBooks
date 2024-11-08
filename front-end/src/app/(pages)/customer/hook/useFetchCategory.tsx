import { useEffect, useState } from "react";

interface typeCate {
  id: string;
  name: string;
  cate_image: string;
  description: string;
}

export default function useFetchCategory() {
  const [cate, setCate] = useState<typeCate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // Bắt đầu loading
        const res = await fetch("http://localhost:3200/categories");

        if (!res.ok) {
          throw new Error("Lỗi khi lấy dữ liệu !!!");
        }

        const result = await res.json();
        setCate(result);
      } catch (err) {
        if (err instanceof Error) {  // Kiểm tra nếu err là đối tượng Error
          setError(err.message);  // Bắt lỗi nếu có
        } else {
          setError("Có lỗi không xác định xảy ra");  // Trường hợp không phải Error
        }
      } finally {
        setLoading(false);  // Dừng loading sau khi fetch xong
      }
    };

    fetchData();
  }, []);

  return { cate, loading, error };
}
