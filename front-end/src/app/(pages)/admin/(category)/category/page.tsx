"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useFetchCategory from "@/app/hook/useFetchCategory";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CategoryRow from "../../component/CategoryRow";
import EditCategoryModal from "../../component/EditCategoryModal";

export default function CategoryTable() {
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    description: "",
    cate_image: null,
  });

  const route = useRouter();
  const { cate, deleteCategory, updateCategory  } = useFetchCategory();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa thể loại này?")) {
      await deleteCategory(id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Lỗi khi xóa danh mục", error);
      });
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditFormData({
      id: category.id,
      name: category.name,
      description: category.description,
      cate_image: category.cate_image,
    });
  };

  const handleEditSubmit = async (formDataToSend) => {

    const response = await updateCategory(editFormData.id, formDataToSend);
    
    if (!response) {
      alert("Cập nhật thể loại thành công!");
      setEditingCategory(null);
      route.push("/admin/category");
    } else {
      alert("Lỗi khi cập nhật thể loại!");
    }
  };

  const filteredCategories = cate.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Header and Controls */}
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Thể loại</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm thể loại"
              value={search}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-sm pl-10 pr-4 h-[40px] text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 w-full sm:w-64"
            />
          </div>
          <Link
            href={"/admin/addCate"}
            className="bg-primary-400 hover:bg-primary-300 text-white px-6 py-2 rounded-sm shadow-md transition duration-300"
          >
            Thể loại mới
          </Link>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary-400 text-white">
            <th className="p-4 text-left font-semibold text-nowrap">Hình Ảnh</th>
            <th className="p-4 text-left font-semibold">Thể Loại</th>
            <th className="p-4 text-left font-semibold">Miêu Tả</th>
            <th className="p-4 text-left font-semibold">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                onEditClick={handleEditClick}
                onDeleteClick={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Không tìm thấy thể loại nào phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingCategory && (
        <EditCategoryModal  
          category={editFormData}
          setCategory={setEditFormData}
          onClose={() => setEditingCategory(null)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}
