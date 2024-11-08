"use client"; // Thêm dòng này để đánh dấu đây là Client Component
import React, { useState } from 'react';
import useFetchCustomer from "@/app/hook/useFetchCustomer"; // Đảm bảo import hook lấy dữ liệu khách hàng
import { debounce } from 'lodash'; // Import debounce từ lodash
import ShowCustomer from '../../component/showCustomer';
const CustomerList = () => {
  const { customers, loading, error, searchCustomersByName } = useFetchCustomer();
  const [searchTerm, setSearchTerm] = useState(""); // Lưu trữ từ khóa tìm kiếm
  // Hàm xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim()) {
      debouncedSearch(term); // Gọi hàm debouncedSearch
    } else {
      searchCustomersByName(""); // Nếu không có từ khóa, gọi lại hàm fetchCustomers
    }
  };

  // Định nghĩa hàm debounce
  const debouncedSearch = debounce((term: string) => {
    searchCustomersByName(term); // Gọi hàm tìm kiếm sau một khoảng thời gian
  }, 500); // 500ms (nửa giây) là thời gian trì hoãn trước khi gọi tìm kiếm
if (loading) return <p>Loading...</p>;
if (error) return <p>Error loading books!</p>;
  return (
    <div>
      {/* Nội dung chính */}
      <main className="flex-grow p-6 bg-[#FBF3E9]">
        <div className="ml-6"> {/* Thêm margin-left cho div bao bọc */}
          
          {/* Thanh tiêu đề (Header) */}
          <header className="mb-6 grid grid-cols-12 gap-4 items-center">
            {/* Cột tiêu đề chiếm 20% */}
            <div className="col-span-2">
              <h1 className="text-2xl font-bold text-gray-800">Khách Hàng</h1>
            </div>
            
            {/* Cột ô tìm kiếm chiếm 80% */}
            <div className="col-span-10">
            <div className="relative">
      <input
        type="text"
        placeholder="Tìm kiếm khách hàng..."
        className="w-full border rounded-lg p-2 pl-10 shadow-md focus:outline-none"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"></i>
    </div>
             </div>
          </header>

        {/* Bảng dữ liệu khách hàng */}
        <ShowCustomer customers={customers} />

        </div>
      </main>
    </div>
  );
}

export default CustomerList;