//Hiển thị biểu đồ doanh thu với bộ lọc ngày
"use client";

import React from "react";
import { Line } from "react-chartjs-2";

export default function RevenueChart({ chartData, chartOptions, setFilterDate }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary-600 font-itim">
          Doanh Thu Chi Tiết
        </h2>
        <div className="mb-6 bg-white rounded-sm flex items-center space-x-3">
          <label className="block text-gray-700 font-medium">Lọc theo ngày</label>
          <input
            type="date"
            className="px-3 py-2 border rounded focus:outline-none"
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>
      <div className="relative h-72">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
