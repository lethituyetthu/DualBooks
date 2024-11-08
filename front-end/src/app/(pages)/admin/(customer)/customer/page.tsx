"use client";

import React, { useEffect } from "react";
import ShowCustomer from "../../component/showCustomer"; 
import useFetchCustomer from "@/app/hook/useFetchCustomer";

export default function Page() {
  const { deleteCustomer, fetchCustomers, customers, loading, error } = useFetchCustomer();

  useEffect(() => {
    fetchCustomers(); // Gọi hàm fetch để lấy danh sách khách hàng
  }, []);

  // Hàm xóa khách hàng
  

  return (
    <div className="p-6">
      <header className="mb-6 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold text-gray-800">Khách Hàng</h1>
        </div>
        <div className="col-span-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="w-full border rounded-lg p-2 pl-10 shadow-md focus:outline-none"
            />
            <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </header>

      {/* Bảng dữ liệu khách hàng */}
      <div className="bg-white shadow-md">
        <table className="w-full table-auto border-separate border-spacing-0 rounded-tl-xl rounded-tr-lg">
          <thead>
            <tr className="bg-[#AF683E] text-left text-white border border-white rounded-tl-lg rounded-tr-lg">
              <th className="p-4 border border-white">Khách Hàng</th>
              <th className="p-4 border border-white">Email</th>
              <th className="p-4 border border-white">Số Điện Thoại</th>
              <th className="p-4 border border-white">Địa Chỉ</th>
              <th className="p-4 text-right border border-white rounded-tr-lg"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Đang tải dữ liệu...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="text-center text-red-500 p-4">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && customers.length > 0 && (
              <ShowCustomer customers={customers} deleteCustomer={deleteCustomer} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
