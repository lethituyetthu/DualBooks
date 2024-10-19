// src/app/admin/dashboard/Dashboard.tsx
"use client"; // Thêm dòng này nếu bạn chưa có
import React from 'react';
import SalesChart from './SalesChart'; // Biểu đồ doanh thu
import AdminSidebar from '../AdminSidebar';
const Dashboard = () => {
  return (
    <div className="flex">
      {/* Thanh điều hướng bên trái */}
      <AdminSidebar />




{/* Nội dung chính */}
<main className="flex-1 p-6 bg-[#FBF3E9]">
  <header className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Trang Quản Trị</h2>
  </header>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
      <h3 className="font-semibold">Khách Hàng</h3>
      <p className="text-xl font-bold">Tổng số lượng: 100</p>
      <div className="flex items-center">
        <span className="mr-2">📈</span> {/* Biểu tượng mũi tên lên */}
        <p className="text-green-400">Tăng: +5% so với hôm qua</p>
      </div>
    </div>

    <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
      <h3 className="font-semibold">Nhân Viên</h3>
      <p className="text-xl font-bold">Tổng số lượng: 20</p>
      <div className="flex items-center">
        <span className="mr-2">📉</span> {/* Biểu tượng mũi tên xuống */}
        <p className="text-red-400">Giảm: -2% so với hôm qua</p>
      </div>
    </div>

    <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
      <h3 className="font-semibold">Đơn Hàng</h3>
      <p className="text-xl font-bold">Tổng số đơn hàng: 50</p>
      <div className="flex items-center">
        <span className="mr-2">📈</span> {/* Biểu tượng mũi tên lên */}
        <p className="text-green-400">Tăng: +10% so với tuần trước</p>
      </div>
    </div>

    <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
      <h3 className="font-semibold">Doanh Thu</h3>
      <p className="text-xl font-bold">Tổng doanh thu: 1,000,000 VND</p>
      <div className="flex items-center">
        <span className="mr-2">📈</span> {/* Biểu tượng mũi tên lên */}
        <p className="text-green-400">Tăng: +8% so với hôm qua</p>
      </div>
    </div>
  </div>

  <div className="mb-6 bg-white shadow-md rounded-lg p-4">
    <h3 className="text-xl font-bold text-gray-800">Doanh Thu Chi Tiết</h3>
    <SalesChart />
  </div>
</main>




    </div>
  );
};

export default Dashboard;
