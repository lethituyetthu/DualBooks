"use client";

import React, { useEffect, useState } from "react";
import { FaWallet, FaShoppingCart } from "react-icons/fa";
import useFetchBook from "@/app/hook/useFetchBook";
import useFetchOrders from "@/app/hook/useFetchOrders";

const Dashboard = () => {
  const { newBooks, lowStock } = useFetchBook();
  const { fetchOrdersByDate } = useFetchOrders();
  const [todayOrders, setTodayOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderCounts, setOrderCounts] = useState({}); // Đếm số lượng đơn hàng theo trạng thái

  const [statsData, setStatsData] = useState({
    totalAmount: 0,
    orderCount: 0,
  });

  useEffect(() => {
    const fetchTodayOrders = async () => {
      const today = new Date().toISOString().split("T")[0];
      const orders = await fetchOrdersByDate(today);

      if (orders) {
        setTodayOrders(orders);

        // Tính toán thống kê tổng số lượng và doanh thu
        const totalAmount = orders.reduce(
          (sum, order) => sum + order.total_amount,
          0
        );

        const orderCount = orders.length;

        setStatsData({
          totalAmount,
          orderCount,
        });

        // Đếm số lượng đơn hàng theo trạng thái
        const counts = orders.reduce((acc, order) => {
          acc[order.order_status] = (acc[order.order_status] || 0) + 1;
          return acc;
        }, {});
        setOrderCounts(counts);

        // Hiển thị tất cả khi chưa lọc
        setFilteredOrders(orders);
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
    "Đã hủy"
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
      <div className="grid grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Thống kê</h3>
          <div className="h-40 w-full flex items-center justify-center">
            <p>Biểu đồ placeholder</p>
          </div>
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
                    <span className="font-semibold text-nowrap">
                      {book.stock}
                    </span>
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
                  <span>{book.title}</span>
                  <span className="font-semibold text-nowrap">
                    {(book.price * 1000).toLocaleString("vi-VN")} đ
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Daily Orders Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-9">
        <div className="flex justify-between items-center px-10 py-3 ">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Đơn hàng</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status} ({orderCounts[status] || 0}) {/* Hiển thị số lượng */}
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
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    <span>👤</span>
                  </div>
                  <span className="ml-4 font-medium text-gray-700">
                    #...{order.id.slice(-5)}
                  </span>
                </div>

                <span
                  className={` font-medium text-center w-1/6 ${
                    order.order_status === "Hoàn thành"
                      ? "text-green-700 bg-green-100"
                      : order.order_status === "Đã hủy"
                      ? "text-red-700 bg-red-100"
                      : "text-blue-700 bg-blue-100"
                  } py-1 px-2 rounded`}
                >
                  {order.order_status}
                </span>

                <span className="text-gray-600 font-medium text-center w-1/6">
                  {order.customer?.phone || "N/A"}
                </span>

                <span className="text-green-500 font-semibold text-right w-1/6">
                  {(order.total_amount * 1000).toLocaleString("vi-VN") || "0"} đ
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
    </div>
  );
};

export default Dashboard;
