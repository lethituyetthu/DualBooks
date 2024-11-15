'use client';  // Thêm dòng này để xác định đây là Client Component

import React, { useState } from 'react';
import useFetchOrders from '@/app/hook/useFetchOrders';
import ShowOrder from '../../component/ShowOrder'; 

export default function Page() {
  const { orders, loading, error, fetchOrdersByStatus } = useFetchOrders();
  const [status, setStatus] = useState<string>('');
  // Hàm xử lý thay đổi trạng thái từ select
    const handleStatusChange =  (event: React.ChangeEvent<HTMLSelectElement>)  => {
      const selectedStatus = event.target.value;
      console.log(selectedStatus)

      
      if (selectedStatus.trim()) {
        fetchOrdersByStatus(selectedStatus);
      } else {
       
        fetchOrdersByStatus(""); 
      }
    };


  return (
    <div>
        <main className="flex-grow p-6 bg-[#FBF3E9]">
        <div className="ml-6"> {/* Thêm margin-left cho div bao bọc */}
          
          {/* Thanh tiêu đề (Header) */}
          <header className="mb-6 grid grid-cols-12 gap-4 items-center">
            {/* Cột tiêu đề chiếm 20% */}
            <div className="col-span-9">
              <h1 className="text-2xl font-bold text-gray-800">Đơn Hàng</h1>
            </div>
            
            {/* Cột chọn lọc trạng thái chiếm 80% */}
            <div className="col-span-3">
            <select
        className="w-full border rounded-lg p-2 shadow-md focus:outline-none"
        value={status}
        onChange={handleStatusChange}
      >
         <option value="">Tất cả trạng thái</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
      </select>
        </div>
          </header>
          <table className="w-full table-auto border-separate border-spacing-0 rounded-tl-xl rounded-tr-lg">
      <thead>
        <tr className="bg-[#AF683E] text-left text-white border border-white rounded-tl-lg rounded-tr-lg">
          <th className="p-4 border border-white text-nowrap">Mã Đơn Hàng</th>
          <th className="p-4 border border-white">Khách Hàng</th>
          <th className="p-4 border border-white">Ngày Đặt</th>
          <th className="p-4 border border-white">Địa Chỉ</th>
          <th className="p-4 border border-white">Tổng Tiền</th>
          <th className="p-4 border border-white text-nowrap">Trạng Thái</th>
          <th className="p-4 text-right border border-white rounded-tr-lg"></th>
        </tr>
      </thead>

      <ShowOrder orders={orders} />
      
    </table>

        </div>
      </main>
      
    </div>
   
  );
}
