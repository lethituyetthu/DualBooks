"use client"; // Xác định đây là Client Component

import React, { useState } from "react";
import useFetchOrders from "@/app/hook/useFetchOrders";
import ShowOrder from "../../component/ShowOrder";

export default function Page() {
  const { orders, loading, error } = useFetchOrders(); // Lấy dữ liệu đơn hàng từ hook
  const [status, setStatus] = useState<string>(""); // Trạng thái đơn hàng
  const [orderType, setOrderType] = useState<string>(""); // Loại đơn hàng (online/offline)
  const [orderDate, setOrderDate] = useState<string>(""); // Ngày đặt hàng

  // Lọc đơn hàng theo trạng thái, loại và ngày
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = !status || order.status.toLowerCase() === status.toLowerCase();
    const matchesType = !orderType || order.type.toLowerCase() === orderType.toLowerCase();
    const matchesDate =
      !orderDate || new Date(order.order_date).toISOString().split("T")[0] === orderDate;

    return matchesStatus && matchesType && matchesDate;
  });

  return (
    <div>
      <main className="flex-grow p-6 bg-[#FBF3E9]">
        <div className="ml-6">
          {/* Thanh tiêu đề (Header) */}
          <header className="mb-6 grid grid-cols-12 gap-4 items-center">
            {/* Cột tiêu đề */}
            <div className="col-span-9">
              <h1 className="text-2xl font-bold text-gray-800">Đơn Hàng</h1>
            </div>

            {/* Bộ lọc */}
            <div className="col-span-3 space-y-2">
              {/* Lọc trạng thái */}
              <select
                className="w-full border rounded-lg p-2 shadow-md focus:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>

              {/* Lọc loại đơn hàng */}
              <select
                className="w-full border rounded-lg p-2 shadow-md focus:outline-none"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option value="">Tất cả loại đơn hàng</option>
                <option value="online">Đơn hàng Online</option>
                <option value="offline">Đơn hàng Offline</option>
              </select>

              {/* Lọc theo ngày */}
              <input
                type="date"
                className="w-full border rounded-lg p-2 shadow-md focus:outline-none"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
          </header>

          {/* Kiểm tra dữ liệu orders */}
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-500">Đã xảy ra lỗi khi tải đơn hàng.</p>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            <table className="w-full table-auto border-separate border-spacing-0 rounded-tl-xl rounded-tr-lg">
              <thead>
                <tr className="bg-[#AF683E] text-left text-white border border-white rounded-tl-lg rounded-tr-lg">
                  <th className="p-4 border border-white text-nowrap">
                    Mã Đơn Hàng
                  </th>
                  <th className="p-4 border border-white">Khách Hàng</th>
                  <th className="p-4 border border-white">Ngày Đặt</th>
                  <th className="p-4 border border-white">Địa Chỉ</th>
                  <th className="p-4 border border-white">Tổng Tiền</th>
                  <th className="p-4 border border-white ">Trạng Thái</th>
                  <th className="p-4 text-right border border-white rounded-tr-lg"></th>
                </tr>
              </thead>
              {/* Component hiển thị danh sách đơn hàng */}
              <ShowOrder orders={filteredOrders} />
            </table>
          ) : (
            <p className="text-center text-gray-500">
              Không tìm thấy đơn hàng phù hợp.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
