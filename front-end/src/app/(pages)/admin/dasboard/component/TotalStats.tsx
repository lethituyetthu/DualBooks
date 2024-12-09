"use client";

import React from "react";

//Hiển thị tổng số liệu (Doanh thu, Đơn hàng, Khách hàng)
export default function TotalStats({ totalRevenue, totalOrders, totalCustomers ,totalCompletedOrders}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-lg bg-white shadow-md">
      <div>
        <h3 className="text-2xl font-semibold text-primary-300 font-itim">
          Tổng Doanh Thu
        </h3>
        <p className="text-xl font-bold text-primary-600">
          {(totalRevenue * 1000).toLocaleString("vi-VN")} VNĐ
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-primary-300 font-itim">
          Tổng Đơn Hàng
        </h3>
        <p className="text-xl font-bold text-primary-600">{totalCompletedOrders} / {totalOrders} đơn</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-primary-300 font-itim">
          Tổng Khách Hàng
        </h3>
        <p className="text-xl font-bold text-primary-600">{totalCustomers} khách</p>
      </div>
    </div>
  );
}
