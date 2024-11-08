import React from "react";

export default function SidebarOrder() {
  const statusOptions = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Hoàn thành",
    "Đã hủy",
  ];

  return (
    <aside className="w-1/4 p-6  border-r">
      {/* Order ID */}
      <div className="mb-6 bg-white p-5 rounded-sm">
        <label className="block text-gray-700 font-medium mb-2">
          Mã đơn hàng
        </label>
        <input
          type="text"
          placeholder="Nhập mã đơn hàng"
          className="w-full px-3 py-2 border rounded focus:outline-none"
        />
      </div>

      {/* Date Picker */}
      <div className="mb-6 bg-white rounded-sm p-5">
        <label className="block text-gray-700 font-medium mb-2">
          Thời gian
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded focus:outline-none"
        />
      </div>

      {/* Status Filter */}
      <div className="mb-6 bg-white rounded-sm p-5">
        <label className="block text-gray-700 font-medium mb-2">
          Trạng thái
        </label>
        <div className="space-y-2">
          {statusOptions.map((status, index) => (
            <label key={index} className="flex items-center">
              <input type="radio" name="status" className="mr-2" />
              {status}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
