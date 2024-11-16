"use client";

import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useFetchOrders from "@/app/hook/useFetchOrders";
import useFetchCustomer from "@/app/hook/useFetchCustomer";

Chart.register(...registerables);

export default function Dashboard() {
  const { orders } = useFetchOrders();
  const { customers } = useFetchCustomer();

  const [filterDate, setFilterDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const yesterday = useMemo(() => {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    return yesterdayDate.toISOString().split("T")[0];
  }, []);

  const calculateStats = (date, orders, customers) => {
    const ordersOnDate = orders.filter(
      (order) => new Date(order.order_date).toISOString().split("T")[0] === date
    );
    const revenueOnDate = ordersOnDate.reduce(
      (sum, order) => sum + order.total_amount,
      0
    );
    const customersOnDate = customers.filter(
      (customer) =>
        new Date(customer.created_at).toISOString().split("T")[0] === date
    );

    return {
      orders: ordersOnDate.length,
      revenue: revenueOnDate,
      customers: customersOnDate.length,
    };
  };

  const todayStats = useMemo(
    () => calculateStats(today, orders, customers),
    [today, orders, customers]
  );

  const yesterdayStats = useMemo(
    () => calculateStats(yesterday, orders, customers),
    [yesterday, orders, customers]
  );

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total_amount,
    0
  );
  const totalCustomers = customers.length;

  const dailyRevenue = useMemo(() => {
    const revenueByDay = Array(30).fill(0);
    orders.forEach((order) => {
      const day = new Date(order.order_date).getDate();
      if (day >= 1 && day <= 30) {
        revenueByDay[day - 1] += order.total_amount;
      }
    });
    return revenueByDay;
  }, [orders]);

  const filteredData = useMemo(() => {
    if (!filterDate) return dailyRevenue;

    const selectedDay = new Date(filterDate).getDate();
    const filteredRevenue = Array(30).fill(0);

    if (selectedDay >= 1 && selectedDay <= 30) {
      filteredRevenue[selectedDay - 1] = dailyRevenue[selectedDay - 1];
    }

    return filteredRevenue;
  }, [filterDate, dailyRevenue]);

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => ` ${i + 1}`),
    datasets: [
      {
        label: "Doanh Thu (VNĐ)",
        data: filteredData,
        fill: false,
        borderColor: "#954E25",
        backgroundColor: "#954E25",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => ` ${tooltipItems[0].label}`,
          label: (tooltipItem) =>
            `Doanh Thu: ${(tooltipItem.raw * 1000).toLocaleString("vi-VN")} đ`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: "Ngày trong tháng (30 ngày gần nhất)" },
      },
      y: {
        ticks: {
          callback: (value) => `${(value * 1000).toLocaleString("vi-VN")} `,
        },
        title: { display: true, text: "Doanh Thu (VNĐ)" },
      },
    },
  };

  const statsData = [
    {
      label: "Doanh Thu Hôm Nay",
      value: `${todayStats.revenue.toLocaleString("vi-VN")} VNĐ`,
      trend: `Hôm qua: ${yesterdayStats.revenue.toLocaleString("vi-VN")} VNĐ`,
      icon: "💰", // Icon for revenue
    },
    {
      label: "Đơn Hàng Hôm Nay",
      value: `${todayStats.orders} đơn`,
      trend: `Hôm qua: ${yesterdayStats.orders} đơn`,
      icon: "📦", // Icon for orders
    },
    {
      label: "Khách Hàng Hôm Nay",
      value: `${todayStats.customers} khách`,
      trend: `Hôm qua: ${yesterdayStats.customers} khách`,
      icon: "👥", // Icon for customers
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Tổng quan tổng số liệu */}
      <div className="grid grid-cols-3 gap-4 mb-8  p-6 rounded-lg bg-white shadow-md">
        <div>
          <h3 className="text-2xl font-semibold text-primary-300 font-itim">
            Tổng Doanh Thu
          </h3>
          <p className="text-xl font-bold text-primary-600">
            {totalRevenue.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-primary-300 font-itim">
            Tổng Đơn Hàng
          </h3>
          <p className="text-xl font-bold text-primary-600">
            {totalOrders} đơn
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-primary-300 font-itim">
            Tổng Khách Hàng
          </h3>
          <p className="text-xl font-bold text-primary-600">
            {totalCustomers} khách
          </p>
        </div>
      </div>

      {/* Thống kê theo ngày */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between "
          >
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <h3 className="text-lg text-gray-500 font-semibold">
                  {stat.label}
                </h3>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-primary-600">{stat.trend}</p>
              </div>
            </div>
            <span className="text-7xl mr-3 ">{stat.icon}</span>{" "}
            {/* Render icon */}
          </div>
        ))}
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary-600 font-itim">
            Doanh Thu Chi Tiết
          </h2>
          <div className="mb-6 bg-white rounded-sm flex items-center space-x-3">
            <label className="block text-gray-700 font-medium">
              Lọc theo ngày
            </label>
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
    </div>
  );
}
