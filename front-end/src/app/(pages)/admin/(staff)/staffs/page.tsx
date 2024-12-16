"use client";
import React, { useState } from "react";
import ProfileCardStaff from "../../component/ProfileCardStaff";
import useFetchAdmin from "@/app/hook/useFetchAdmin";
import Link from "next/link";

const App = () => {
  const { admin } = useFetchAdmin();
  const [roleFilter, setRoleFilter] = useState("All"); // Trạng thái để lọc theo vai trò

  const handleRoleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRoleFilter(e.target.value);
  };

  // Lọc danh sách dựa trên vai trò được chọn
  const filteredAdmins = admin.filter((e) => {
    if (roleFilter === "All") return true; // Hiển thị tất cả nếu chọn "All"
    return e.role === roleFilter;
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-gray-800">Nhân Viên</h1>

        {/* Bộ lọc và ô tìm kiếm */}
        <div className="flex items-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên theo tên..."
            className="border border-gray-300 rounded-sm px-4 h-[40px] text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 w-full sm:w-64"
          />
          <select
            value={roleFilter}
            onChange={handleRoleChange}
            className="border border-gray-300 rounded-sm px-4 w-40 h-[40px] text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="All">Tất cả</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          {/* Nút thêm nhân viên */}
          <Link
            href={"/admin/addStaff"}
            className="bg-primary-400 hover:bg-primary-300 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            Nhân Viên Mới
          </Link>
        </div>
      </div>

      <div className="flex justify-center flex-wrap space-x-4 gap-6 p-10 max-w-[1000px] mx-auto">
        {filteredAdmins.map((e, index) => (
          <ProfileCardStaff
            key={index}
            id={e._id}
            name={e.username}
            role={e.role}
            date={e.created_at}
            email={e.email}
            img={e.user_img}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
