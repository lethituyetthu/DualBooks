"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useFetchCategory from "@/app/hook/useFetchCategory";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryTable() {
  const [search, setSearch] = useState("");
  const route = useRouter();
  const { cate, deleteCategory } = useFetchCategory();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thể loại này?")) {
      deleteCategory(id);
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
            // Show modal on click
          >
            Thể loại mới
          </Link>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary-400 text-white">
            <th className="p-4 text-left font-semibold">Thể loại</th>
            <th className="p-4 text-left font-semibold">Miêu tả</th>
            <th className="p-4 text-left font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category.id} className="odd:bg-[#FAE6D0]">
                <td className="p-4 border-b">{category.name}</td>
                <td className="p-4 border-b">{category.description}</td>
                <td className="p-4 border-b">
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded-sm mr-2 flex items-center">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="bg-orange-500 text-white p-2 rounded-sm flex items-center"
                      onClick={() => handleDelete(category.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                Không tìm thấy thể loại nào phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
