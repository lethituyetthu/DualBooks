
import { useEffect, useState } from "react";

interface typeCate {
  id: string;
  name: string;
  cate_image:string;
  description: string;
}


export default function useFetchCategory() {
  const [cate, setCate] = useState<typeCate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3200/categories");

      if (!res.ok) {
        throw new Error("lỗi khi lấy dữ liệu !!!");
      }

      const result = await res.json();

      setCate(result);
    };

    fetchData();
  }, []);

  return {cate};
}
