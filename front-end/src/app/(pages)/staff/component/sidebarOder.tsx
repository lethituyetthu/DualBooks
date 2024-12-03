"use client";

import React from "react";

export default function SidebarOrder({
  searchId,
  setSearchId,
  onSearchById,
  selectedDate,
  setSelectedDate,
  onFilterByDate,
  selectedStatus,
  setSelectedStatus,
  onFilterByStatus,
}) {
  const statusOptions = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Hoàn thành",
    "Đã hủy",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId) onSearchById(searchId);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onFilterByStatus(status);
  };

  return (
    <aside className="w-1/4 p-6 border-r">
      {/* Bộ lọc trạng thái đơn hàng */}
      <div className="mb-6 bg-white p-5 rounded-sm">
        <label className="block text-gray-700 font-medium mb-2">Trạng thái</label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-full p-2 border rounded focus:outline-none"
        >
          <option value="">Tất cả trạng thái</option>
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      {/* Tìm kiếm theo ID */}
      <form onSubmit={handleSearchSubmit}>
        <div className="mb-6 bg-white p-5 rounded-sm">
          <label className="block text-gray-700 font-medium mb-2">Mã đơn hàng</label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Nhập mã đơn hàng"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
      </form>

      {/* Lọc theo ngày */}
      <div className="mb-6 bg-white p-5 rounded-sm">
        <label className="block text-gray-700 font-medium mb-2">Lọc theo ngày</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none"
        />
        
      </div>

      
    </aside>
  );
}
