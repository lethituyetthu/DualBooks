import { useEffect, useState } from "react";

interface TypeCate {
  name: string;
  cate_image: string;
  description: string;
}

export default function useFetchCategory() {
  const [cate, setCate] = useState<TypeCate[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch categories from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3200/categories");
      if (!res.ok) {
        throw new Error("Lỗi khi lấy dữ liệu!");
      }
      const result = await res.json();
      setCate(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to add a new category
  const addCategory = async (newCategory:FormData) => {
    try {
      const res = await fetch("http://localhost:3200/categories", {
        method: "POST",
       
        body: newCategory,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

      const newCate = await res.json();
      
      return newCate;

      await fetchData(); 
      // Refetch the categories after successful addition
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Function to delete a category by ID
  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Lỗi khi xóa thể loại!");
      }

      await fetchData(); // Refetch the categories after successful deletion
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to update a category by ID
  const updateCategory = async (id: string, updatedData: Partial<TypeCate>) => {
    try {
      const res = await fetch(`http://localhost:3200/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Lỗi khi cập nhật thể loại!");
      }

      await fetchData(); // Refetch the categories after successful update
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { cate, addCategory, deleteCategory, updateCategory, error };
}
