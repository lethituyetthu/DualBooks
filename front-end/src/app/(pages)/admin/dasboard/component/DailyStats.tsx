"use client";
//Hiển thị số liệu hôm nay (Doanh thu, Đơn hàng, Khách hàng)
import React from "react";

export default function DailyStats({ statsData }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {statsData.map((stat, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between"
        >
          <div className="flex flex-col justify-between">
            <div className="flex items-center">
              <h3 className="text-lg text-gray-500 font-semibold">{stat.label}</h3>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-primary-600">{stat.trend}</p>
            </div>
          </div>
          <span className="text-7xl mr-3">{stat.icon}</span>
        </div>
      ))}
    </div>
  );
}
