"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

// Define the Category interface
interface Category {
  id: string;
  name: string;
  cate_image: string | null;
  description: string;
}

// Custom hook to fetch categories
const useFetchCategory = () => {
  const [cate, setCate] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3200/categories");
        setCate(response.data);
        console.log("Fetched categories:", response.data);
      } catch (error) {
        console.error(error);
        setError("Không thể lấy danh mục.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { cate, setCate, loading, error };
};

// CategoryImage component to handle fallback image
const CategoryImage: React.FC<{ imageUrl: string; altText: string }> = ({ imageUrl, altText }) => {
  const [src, setSrc] = useState(imageUrl);

  return (
    <Image
      src={src.startsWith("http") ? src : "/default-image.jpg"} // use fallback if invalid URL
      alt={altText}
      width={50}
      height={50}
      className="object-cover"
      onError={() => setSrc("/default-image.jpg")}
    />
  );
};

const DanhMucPage: React.FC = () => {
  const { cate, setCate, loading, error } = useFetchCategory();
  const [newCategory, setNewCategory] = useState<{ name: string; image: File | null; description: string }>({
    name: "",
    image: null,
    description: "",
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        setActionLoading(true);
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3200/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedCategories = cate.filter((category) => category.id !== id);
        setCate(updatedCategories);
      } catch (error) {
        console.error(error);
        alert("Không thể xóa danh mục");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleAddCategory = async () => {
    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("name", newCategory.name);
      if (newCategory.image) {
        formData.append("cate_image", newCategory.image);
      }
      formData.append("description", newCategory.description);

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:3200/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCate([...cate, response.data]);
      setNewCategory({ name: "", image: null, description: "" });
      setIsFormVisible(false);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, image: null, description: category.description });
    setIsFormVisible(true);
  };

  const handleUpdateCategory = async () => {
    if (editingCategory && editingCategory.id) {
      try {
        setActionLoading(true);
        const formData = new FormData();
        formData.append("name", newCategory.name);
        if (newCategory.image) {
          formData.append("cate_image", newCategory.image);
        }
        formData.append("description", newCategory.description);

        const token = localStorage.getItem("token");

        await axios.put(`http://localhost:3200/categories/${editingCategory.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const updatedCategories = cate.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: newCategory.name, description: newCategory.description }
            : category
        );
        setCate(updatedCategories);
        setEditingCategory(null);
        setNewCategory({ name: "", image: null, description: "" });
        setIsFormVisible(false);
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Không thể cập nhật danh mục");
      } finally {
        setActionLoading(false);
      }
    } else {
      console.error("Category ID is missing.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Chỉ chấp nhận ảnh định dạng JPEG hoặc PNG");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước ảnh không được vượt quá 5MB");
        return;
      }
      setNewCategory({ ...newCategory, image: file });
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setNewCategory({ name: "", image: null, description: "" });
      setEditingCategory(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Danh Mục</h1>
      <button onClick={toggleFormVisibility} className="bg-green-500 text-white px-3 py-1 rounded mb-4">
        {isFormVisible ? "Ẩn Form" : "Thêm Danh Mục"}
      </button>

      {isFormVisible && (
        <div className="mb-6">
          <h2 className="text-2xl mb-2">{editingCategory ? "Sửa Danh Mục" : "Thêm Danh Mục"}</h2>
          <input
            type="text"
            name="name"
            placeholder="Tên danh mục"
            value={newCategory.name}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            value={newCategory.description}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2 w-full"
          />
          {editingCategory ? (
            <button onClick={handleUpdateCategory} disabled={actionLoading} className="bg-blue-500 text-white px-3 py-1 rounded">
              {actionLoading ? "Đang xử lý..." : "Cập Nhật Danh Mục"}
            </button>
          ) : (
            <button onClick={handleAddCategory} disabled={actionLoading} className="bg-green-500 text-white px-3 py-1 rounded">
              {actionLoading ? "Đang xử lý..." : "Thêm Danh Mục"}
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">STT</th>
              <th className="py-2 px-4 border-b">Danh Mục</th>
              <th className="py-2 px-4 border-b">Hình Ảnh</th>
              <th className="py-2 px-4 border-b">Mô Tả</th>
              <th className="py-2 px-4 border-b">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {cate.map((category, index) => (
              <tr key={category.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">
                  <CategoryImage imageUrl={`http://localhost:3200/uploads/categories/${category.cate_image}`} altText={category.name} />
                </td>
                <td className="py-2 px-4 border-b">{category.description}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEditCategory(category)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={actionLoading}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    {actionLoading ? "Đang xử lý..." : "Xóa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DanhMucPage;
