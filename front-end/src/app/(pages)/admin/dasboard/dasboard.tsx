"use client";

import React, { useState, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import useFetchOrders from "@/app/hook/useFetchOrders"; // Hook để lấy dữ liệu đơn hàng
import useFetchCustomer from "@/app/hook/useFetchCustomer"; // Hook để lấy dữ liệu khách hàng
import TotalStats from "./component/TotalStats"; // Component hiển thị tổng số liệu (doanh thu, đơn hàng, khách hàng)
import DailyStats from "./component/DailyStats"; // Component hiển thị số liệu hôm nay (so sánh với hôm qua)
import RevenueChart from "./component/RevenueChart"; // Component hiển thị biểu đồ doanh thu chi tiết

Chart.register(...registerables); // Đăng ký các thành phần cần thiết của Chart.js

export default function Dashboard() {
  // Lấy dữ liệu đơn hàng và khách hàng từ các hooks
  const { orders } = useFetchOrders();
  const { customers } = useFetchCustomer();

  const [filterDate, setFilterDate] = useState(""); // State để lưu ngày được chọn trong bộ lọc

  // Lấy ngày hôm nay dưới dạng "YYYY-MM-DD"
  const today = new Date().toISOString().split("T")[0];
  // Tính ngày hôm qua
  const yesterday = useMemo(() => {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    return yesterdayDate.toISOString().split("T")[0];
  }, []);

  // Hàm tính toán thống kê theo ngày
  const calculateStats = (date, orders, customers) => {
    // Lọc đơn hàng theo ngày
    const ordersOnDate = orders.filter(
      (order) => new Date(order.order_date).toISOString().split("T")[0] === date
    );
    // Tính tổng doanh thu trong ngày
    const revenueOnDate = ordersOnDate.reduce(
      (sum, order) => sum + order.total_amount,
      0
    );
    // Lọc khách hàng theo ngày
    const customersOnDate = customers.filter(
      (customer) =>
        new Date(customer.created_at).toISOString().split("T")[0] === date
    );

    // Trả về số liệu thống kê
    return {
      orders: ordersOnDate.length,
      revenue: revenueOnDate,
      customers: customersOnDate.length,
    };
  };

  // Thống kê cho ngày hôm nay
  const todayStats = useMemo(
    () => calculateStats(today, orders, customers),
    [today, orders, customers]
  );

  // Thống kê cho ngày hôm qua
  const yesterdayStats = useMemo(
    () => calculateStats(yesterday, orders, customers),
    [yesterday, orders, customers]
  );

  // Tổng số đơn hàng
  const totalOrders = orders.length;
  // Tổng doanh thu
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total_amount,
    0
  );
  // Tổng số khách hàng
  const totalCustomers = customers.length;

  // Doanh thu theo từng ngày trong 30 ngày gần nhất
  const dailyRevenue = useMemo(() => {
    const revenueByDay = Array(30).fill(0); // Mảng chứa doanh thu cho từng ngày
    orders.forEach((order) => {
      const day = new Date(order.order_date).getDate();
      if (day >= 1 && day <= 30) {
        revenueByDay[day - 1] += order.total_amount;
      }
    });
    return revenueByDay;
  }, [orders]);

  // Dữ liệu doanh thu sau khi áp dụng bộ lọc
  const filteredData = useMemo(() => {
    if (!filterDate) return dailyRevenue;

    const selectedDay = new Date(filterDate).getDate();
    const filteredRevenue = Array(30).fill(0);

    if (selectedDay >= 1 && selectedDay <= 30) {
      filteredRevenue[selectedDay - 1] = dailyRevenue[selectedDay - 1];
    }

    return filteredRevenue;
  }, [filterDate, dailyRevenue]);

  // Cấu hình dữ liệu biểu đồ
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => ` ${i + 1}`), // Nhãn ngày (1 - 30)
    datasets: [
      {
        label: "Doanh Thu (VNĐ)",
        data: filteredData, // Dữ liệu doanh thu
        fill: false,
        borderColor: "#954E25", // Màu viền của biểu đồ
        backgroundColor: "#954E25", // Màu nền của điểm trên biểu đồ
        tension: 0.4, // Độ cong của đường
        pointRadius: 5, // Kích thước điểm
        pointHoverRadius: 8, // Kích thước điểm khi hover
      },
    ],
  };

  // Cấu hình tuỳ chọn biểu đồ
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }, // Hiển thị chú thích
      tooltip: {
        callbacks: {
          title: (tooltipItems) => ` ${tooltipItems[0].label}`, // Tiêu đề tooltip
          label: (tooltipItem) =>
            `Doanh Thu: ${(tooltipItem.raw * 1000).toLocaleString("vi-VN")} đ`, // Nội dung tooltip
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Ẩn lưới trục X
        title: { display: true, text: "Ngày trong tháng (30 ngày gần nhất)" }, // Tiêu đề trục X
      },
      y: {
        ticks: {
          callback: (value) => `${(value * 1000).toLocaleString("vi-VN")} `, // Định dạng tick trục Y
        },
        title: { display: true, text: "Doanh Thu (VNĐ)" }, // Tiêu đề trục Y
      },
    },
  };

  // Dữ liệu thống kê hôm nay (hiển thị với icon và trend so với hôm qua)
  const statsData = [
    {
      label: "Doanh Thu Hôm Nay",
      value: `${(todayStats.revenue * 1000).toLocaleString("vi-VN")} VNĐ`,
      trend: `Hôm qua: ${(yesterdayStats.revenue * 1000).toLocaleString("vi-VN")} VNĐ`,
      icon: "💰",
    },
    {
      label: "Đơn Hàng Hôm Nay",
      value: `${todayStats.orders} đơn`,
      trend: `Hôm qua: ${yesterdayStats.orders} đơn`,
      icon: "📦",
    },
    {
      label: "Khách Hàng Hôm Nay",
      value: `${todayStats.customers} khách`,
      trend: `Hôm qua: ${yesterdayStats.customers} khách`,
      icon: "👥",
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Hiển thị tổng số liệu */}
      <TotalStats
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        totalCustomers={totalCustomers}
      />

      {/* Hiển thị số liệu hôm nay */}
      <DailyStats statsData={statsData} />

      {/* Hiển thị biểu đồ doanh thu */}
      <RevenueChart
        chartData={chartData}
        chartOptions={chartOptions}
        setFilterDate={setFilterDate}
      />
    </div>
  );
}
