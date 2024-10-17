import { useEffect, useState } from "react";

interface typeCate {
  id: string;
  name: string;
  cate_image: string;
  description: string;
}

interface FetchCategoryResult {
  cate: typeCate[];
  loading: boolean;
  error: string | null; // Hoặc `Error | null` nếu bạn muốn giữ nguyên loại Error
}

export default function useFetchCategory(): FetchCategoryResult {
  const [cate, setCate] = useState<typeCate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3200/categories");

        if (!res.ok) {
          throw new Error("Lỗi khi lấy dữ liệu !!!");
        }

        const result = await res.json();
        setCate(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cate, loading, error }; // Trả về cate, loading và error
}
