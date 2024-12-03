import { useEffect, useState } from "react";

interface typeCate {
  id: string;
  name: string;
  cate_image: string;
  description: string;
}

export default function useFetchCategory() {
  const [cate, setCate] = useState<typeCate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3200/categories");

        if (!res.ok) {
          throw new Error("Error fetching data!!!");
        }

        const result = await res.json();
        setCate(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addCategory = async (newCategory: FormData) => {
    console.log(newCategory);
    try {
      const res = await fetch("http://localhost:3200/categories", {
        method: "POST",
        body: newCategory, // Gửi trực tiếp FormData
      });
  
      if (!res.ok) {
        throw new Error("Lỗi khi thêm danh mục!");
      }
  
      const addCate = await res.json();
      console.log(addCate);
      setCate((prev) => [...prev, addCate]);

      return addCate
    } catch (error) {
      console.error(error);
    }
  };
  

  const updateCategory = async (id: any, updatedCategory: typeCate) => {
    try {
      const res = await fetch(`http://localhost:3200/categories/${id}`, {
        method: "PUT",
        body: updatedCategory,
      });
      if (!res.ok) {
        throw new Error("Error updating category!");
      }

      const updatedCate = await res.json();
      setCate((prev) =>
        prev.map((cate) => (cate.id === updatedCate.id ? updatedCate : cate))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/categories/${id}`);

      if (!res.ok) {
        throw new Error("Error fetching category by ID!");
      }

      const category = await res.json();
      return category;
    } catch (error) {
      console.error(error);
      return null; // Return null if fetching fails
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3200/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(" lỗi khi xoá sp");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    cate,
    addCategory,
    updateCategory,
    fetchCategoryById,
    deleteCategory,
  };
}
