import { useEffect, useState } from "react";

interface typeProduct {
  id: string;
  name: string;
  product_image: string;
  description: string;
}

export default function useFetchNewProducts() {
  const [products, setProducts] = useState<typeProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3200/books"); // URL lấy dữ liệu từ API sách

      if (!res.ok) {
        throw new Error("Lỗi khi lấy dữ liệu sản phẩm !!!");
      }

      const result = await res.json();

      setProducts(result);
    };

    fetchData();
  }, []);

  return { products };
}
