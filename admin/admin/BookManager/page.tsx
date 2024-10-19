// src/components/BookManager/Page.tsx

import React from 'react';
import AdminSidebar from '../AdminSidebar';
import { FaSearch } from 'react-icons/fa';
const BookmanagerPage = () => {
    return (
        
        <div className="flex"> {/* Sử dụng flex để sắp xếp các thành phần */}
        <AdminSidebar />
  
        <main className="flex-1 p-6 bg-[#FBF3E9]"> {/* Nội dung chính */}
          {/* Tiêu đề */}
          <header className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Quản Lý Sản Phẩm</h2>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
              Sản phẩm mới
            </button>
          </header>
  
          {/* Thanh tìm kiếm */}
          <div className="mb-4 flex items-center">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
  
          {/* Bảng sản phẩm */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 text-left font-semibold">Tiêu đề</th>
                  <th className="px-4 py-2 text-left font-semibold">Tác giả</th>
                  <th className="px-4 py-2 text-left font-semibold">Danh mục</th>
                  <th className="px-4 py-2 text-left font-semibold">Giá</th>
                  <th className="px-4 py-2 text-left font-semibold">Số lượng</th>
                  <th className="px-4 py-2 text-left font-semibold">Ngày thêm</th>
                  <th className="px-4 py-2 text-left font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {/* Dữ liệu sản phẩm giả định */}
                <tr className="hover:bg-gray-100 transition duration-200">
                  <td className="border px-4 py-2">Sản phẩm A</td>
                  <td className="border px-4 py-2">Tác giả A</td>
                  <td className="border px-4 py-2">Sách</td>
                  <td className="border px-4 py-2">200,000 VND</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">01/01/2024</td>
                  <td className="border px-4 py-2">
                    <button className="mr-2 text-blue-500 hover:underline transition duration-200">Sửa</button>
                    <button className="text-red-500 hover:underline transition duration-200">Xóa</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 transition duration-200">
                  <td className="border px-4 py-2">Sản phẩm B</td>
                  <td className="border px-4 py-2">Tác giả B</td>
                  <td className="border px-4 py-2">Tạp chí</td>
                  <td className="border px-4 py-2">150,000 VND</td>
                  <td className="border px-4 py-2">20</td>
                  <td className="border px-4 py-2">02/01/2024</td>
                  <td className="border px-4 py-2">
                    <button className="mr-2 text-blue-500 hover:underline transition duration-200">Sửa</button>
                    <button className="text-red-500 hover:underline transition duration-200">Xóa</button>
                  </td>
                </tr>
                {/* Có thể thêm nhiều hàng dữ liệu hơn ở đây */}
              </tbody>
            </table>
          </div>
  
          {/* Phân trang */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600">Trang 1/10</div>
            <div>
              <button className="mr-2 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200">Trước</button>
              <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200">Sau</button>
            </div>
          </div>
        </main>
      </div>
    );
};

export default BookmanagerPage;
