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
  const filteredOrders = orders?.filter((order) => {
    const matchesStatus =
      !status || order.order_status.toLowerCase() === status.toLowerCase();
    const matchesType =
      !orderType || order.order_type.toLowerCase() === orderType.toLowerCase();
    const matchesDate =
      !orderDate ||
      new Date(order.order_date).toISOString().split("T")[0] === orderDate;

    return matchesStatus && matchesType && matchesDate;
  });

  // Tính tổng số lượng đơn hàng theo trạng thái
  const orderCountsByStatus = orders?.reduce((acc, order) => {
    const status = order.order_status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Tính tổng số lượng đơn hàng theo loại
  const orderCountsByType = orders?.reduce((acc, order) => {
    const type = order.order_type.toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statuses = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "Chờ xác nhận", label: "Chờ xác nhận" },
    { value: "Đã xác nhận", label: "Đã xác nhận" },
    { value: "Đang giao hàng", label: "Đang giao hàng" },
    { value: "Hoàn thành", label: "Hoàn thành" },
    { value: "Đã hủy", label: "Đã hủy" },
  ];

  return (
    <div>
      <main className="flex-grow p-6 bg-[#FBF3E9]">
        <div className="ml-6">
          {/* Thanh tiêu đề (Header) */}
          <header className="mb-6 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3">
              <h1 className="text-2xl font-bold text-gray-800">Đơn Hàng</h1>
            </div>
            {/* Bộ lọc */}
            <div className="flex flex-wrap items-center gap-4 col-span-9 mt-4 md:mt-0">
              <div className="flex-1">
                <select
                  className="w-full border border-gray-300 rounded-sm p-2 shadow-sm focus:outline-0 focus:ring focus:ring-primary-400"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statuses.map((statusOption) => {
                    // Tính số lượng đơn hàng
                    const count =
                      statusOption.value === ""
                        ? orders?.length || 0 // Nếu là "Tất cả trạng thái", lấy tổng số đơn hàng
                        : orderCountsByStatus?.[statusOption.value] || 0; // Ngược lại lấy theo trạng thái

                    return (
                      <option
                        key={statusOption.value}
                        value={statusOption.value}
                      >
                        {statusOption.label}{" "}
                        ({count})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex-1">
                <select
                  className="w-full border border-gray-300 rounded-sm p-2 shadow-sm focus:outline-none focus:ring focus:ring-[#AF683E]"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="">
                    Tất cả loại đơn hàng ({orders?.length || 0})
                  </option>
                  <option value="online">
                    Đơn hàng Online ({orderCountsByType?.online || 0})
                  </option>
                  <option value="offline">
                    Đơn hàng Offline ({orderCountsByType?.offline || 0})
                  </option>
                </select>
              </div>

              <div className="flex-1">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-sm p-2 shadow-sm focus:outline-none focus:ring focus:ring-[#AF683E]"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
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
                  <th className="p-4 border border-white text-nowrap">Khách Hàng</th>
                  <th className="p-4 border border-white">Ngày Đặt</th>
                  <th className="p-4 border border-white">Địa Chỉ</th>
                  <th className="p-4 border border-white text-nowrap">Tổng Tiền</th>
                  <th className="p-4 border border-white">Trạng Thái</th>
                  <th className="p-4 border border-white "></th>
                </tr>
              </thead>
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
