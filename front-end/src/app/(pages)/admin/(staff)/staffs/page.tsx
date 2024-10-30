"use client";
import React from "react";
import ProfileCardStaff from "../../component/ProfileCardStaff";
import useFetchAdmin from "@/app/hook/useFetchAdmin";
import Link from "next/link";
const App = () => {
  const { admin } = useFetchAdmin();
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nhân Viên</h1>
        <div className="flex items-center">
          {/* Ô tìm kiếm sản phẩm */}
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên theo tên..."
            className="border border-gray-300 rounded px-4 py-2 mr-4"
            /* value={searchTerm}
            onChange={handleSearchChange} */ // Hàm xử lý thay đổi khi người dùng nhập
          />
          <Link
            href={"/admin/addStaff"}
            className="bg-primary-400 hover:bg-primary-300 text-white px-4 py-2 rounded"
          >
            Nhân Viên Mới 
          </Link>
        </div>
      </div>
      <div className="flex justify-center space-x-4 p-10">
        {admin.map((e, index) => (
          <ProfileCardStaff
            key={index}
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
