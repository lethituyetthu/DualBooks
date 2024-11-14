import React from 'react';
import ShowCustomer from '../component/showCustomer'; // Đảm bảo đường dẫn đúng với vị trí của file ShowCustomer

export default function Page() {
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
                />
                <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </header>

          {/* Bảng dữ liệu khách hàng */}
          <ShowCustomer /> {/* Gọi component ShowCustomer tại đây */}

        </div>
      </main>
    </div>
  );
}
