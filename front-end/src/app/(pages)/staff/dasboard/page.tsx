"use client";

import React, { useEffect, useState } from "react";
import { FaWallet, FaShoppingCart } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import useFetchBook from "@/app/hook/useFetchBook";
import useFetchOrders from "@/app/hook/useFetchOrders";

// Đăng ký ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { newBooks, lowStock } = useFetchBook();
  const { fetchOrdersByDate } = useFetchOrders();

  const [todayOrders, setTodayOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [orderCounts, setOrderCounts] = useState({});
  const [statsData, setStatsData] = useState({
    totalAmount: 0,
    orderCount: 0,
  });
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);

  // Tính doanh thu hàng tuần
  const calculateWeeklyRevenue = (orders) => {
    const revenueByDay = Array(7).fill(0); // 7 ngày trong tuần
    orders.forEach((order) => {
      const orderDate = new Date(order.created_at);
      const dayOfWeek = orderDate.getDay(); // Chủ Nhật = 0, Thứ Hai = 1, ...
      revenueByDay[dayOfWeek] += order.total_amount;
    });
    return revenueByDay;
  };

  // Lấy dữ liệu đơn hàng trong ngày
  useEffect(() => {
    const fetchTodayOrders = async () => {
      const today = new Date().toISOString().split("T")[0];
      const orders = await fetchOrdersByDate(today);

      if (orders) {
        setTodayOrders(orders);

        // Tổng doanh thu và số lượng đơn hàng
        const totalAmount = orders.reduce(
          (sum, order) => sum + order.total_amount,
          0
        );
        const orderCount = orders.length;

        setStatsData({ totalAmount, orderCount });

        // Doanh thu hàng tuần
        const weeklyRevenueData = calculateWeeklyRevenue(orders);
        setWeeklyRevenue(weeklyRevenueData);

        // Số lượng đơn hàng theo trạng thái
        const counts = orders.reduce((acc, order) => {
          acc[order.order_status] = (acc[order.order_status] || 0) + 1;
          return acc;
        }, {});
        setOrderCounts(counts);

        setFilteredOrders(orders); // Hiển thị tất cả khi chưa lọc
      }
    };
    fetchTodayOrders();
  }, [fetchOrdersByDate]);

  // Lọc đơn hàng theo trạng thái
  useEffect(() => {
    if (filterStatus === "Tất cả") {
      setFilteredOrders(todayOrders);
    } else {
      const filtered = todayOrders.filter(
        (order) => order.order_status === filterStatus
      );
      setFilteredOrders(filtered);
    }
  }, [filterStatus, todayOrders]);

  // Dữ liệu biểu đồ doanh thu
  const chartData = {
    labels: [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: weeklyRevenue.map((amount) => amount * 1000), // Đổi sang VNĐ
        backgroundColor: "#AF683E",
        borderColor: "#AF683E",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Thống kê doanh thu mỗi tuần" },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 200000, // Khoảng cách giữa các mốc
          callback: (value) =>
            `${(value).toLocaleString("vi-VN")} đ`, // Định dạng thành đơn vị VNĐ
        },
        beginAtZero: true, // Bắt đầu từ 0
      },
    },
  };
  

  const stats = [
    {
      id: 3,
      title: "Tổng tiền",
      amount: `${(statsData.totalAmount * 1000).toLocaleString("vi-VN")} đ`,
      icon: <FaWallet className="text-4xl text-primary-400" />,
    },
    {
      id: 4,
      title: "Đơn hàng",
      amount: statsData.orderCount,
      icon: <FaShoppingCart className="text-4xl text-primary-400" />,
    },
  ];

  const statuses = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Hoàn thành",
    "Đã hủy",
  ];

  return (
    <div className="min-h-screen bg-light-100 p-6 max-w-[1300px] mx-auto">
      {/* Header Section */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between text-left space-x-4"
          >
            <div>
              <p className="text-sm font-semibold text-gray-600">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-primary-500">
                {stat.amount}
              </p>
            </div>
            <div className="text-primary-500 text-4xl flex-shrink-0">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Orders Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-9">
        <div className="flex justify-between items-center px-10 py-3">
          <h3 className="text-lg font-semibold text-gray-700">Đơn hàng</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status} ({orderCounts[status] || 0})
              </option>
            ))}
          </select>
        </div>

        <ul className="space-y-4 px-10 h-80 overflow-y-auto">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center py-2 px-4 bg-white rounded-md shadow mb-2"
              >
                <span className="text-gray-700 font-medium">
                  #...{order.id.slice(-5)}
                </span>
                <span
                  className={`font-medium text-center ${
                    order.order_status === "Hoàn thành"
                      ? "text-green-700 bg-green-100"
                      : order.order_status === "Đã hủy"
                      ? "text-red-700 bg-red-100"
                      : "text-blue-700 bg-blue-100"
                  } py-1 px-2 rounded`}
                >
                  {order.order_status}
                </span>
                <span className="text-gray-600 font-medium">
                  {order.customer?.phone || "N/A"}
                </span>
                <span className="text-green-500 font-semibold">
                  {(order.total_amount * 1000).toLocaleString("vi-VN")} đ
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center">
              Không có đơn hàng cho trạng thái này.
            </li>
          )}
        </ul>
      </div>
      <div className="mt-9 grid grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Thống kê doanh thu
          </h3>

          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Low Stock Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Sản phẩm sắp hết hàng
            </h3>
            <ul className="space-y-4">
              {lowStock.length > 0 ? (
                lowStock.map((book) => (
                  <li key={book.id} className="flex justify-between">
                    <span>{book.title}</span>
                    <span className="font-semibold">{book.stock}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">
                  Không có sách sắp hết hàng.
                </li>
              )}
            </ul>
          </div>

          {/* New Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Sản phẩm mới
            </h3>
            <ul className="space-y-4">
              {newBooks.map((book) => (
                <li key={book.id} className="flex justify-between">
                  <span className="">{book.title}</span>
                  <span className="text-nowrap font-semibold">
                    {(book.price * 1000).toLocaleString("vi-VN")} đ
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
