"use client";

import React, { useEffect, useState } from "react";
import useFetchOrders from "@/app/hook/useFetchOrders";
import SidebarOrder from "../component/sidebarOder";
import OderItem from "../component/oderItem";
import OrderDetailModal from "../component/oderDetailModal";

const OrderManagement = () => {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderDetail,
    fetchOrdersByDate,
    fetchOrdersByStatus,
  } = useFetchOrders();

  const [filterType, setFilterType] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearchById = async (orderId) => {
    const result = await fetchOrderDetail(orderId);
    setSelectedOrder(result || null);
  };

  const handleSearchByDate = async (date) => {
    if (date) {
      await fetchOrdersByDate(date);
      setSelectedDate(date);
    }
  };

  const handleSearchByStatus = async (status) => {
    if (status) {
      await fetchOrdersByStatus(status);
      setSelectedStatus(status);
    }
  };

  const headers = [
    "Mã Đơn Hàng",
    "Ngày Đặt Hàng",
    "Khách Hàng",
    "Tổng Tiền",
    "Trạng Thái Thanh Toán",
    "Trạng Thái Đơn Hàng",
  ];

  const filterOrders = () => {
    return orders.filter((order) => {
      const matchesFilterType = filterType === "all" || order.order_type === filterType;
      const matchesSearchId = !searchId || order.id.includes(searchId);
      
      const orderDate = new Date(order.order_date).toISOString().split("T")[0];
      const matchesDate = !selectedDate || orderDate === selectedDate;
      
      const matchesStatus = !selectedStatus || order.order_status === selectedStatus;
      
      return matchesFilterType && matchesSearchId && matchesDate && matchesStatus;
    });
  };

  const filteredOrders = filterOrders();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <SidebarOrder
        searchId={searchId}
        setSearchId={setSearchId}
        onSearchById={handleSearchById}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onFilterByDate={handleSearchByDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onFilterByStatus={handleSearchByStatus}
      />

      <div className="w-3/4 p-6">
        <div className="mb-4">
          <button
            onClick={() => setFilterType("all")}
            className={`mr-2 p-2 rounded-sm ${filterType === "all" ? "bg-primary-400 text-white" : "bg-white"}`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilterType("online")}
            className={`mr-2 p-2 rounded-sm ${filterType === "online" ? "bg-primary-400 text-white" : "bg-white"}`}
          >
            Online Orders
          </button>
          <button
            onClick={() => setFilterType("offline")}
            className={`mr-2 p-2 rounded-sm ${filterType === "offline" ? "bg-primary-400 text-white" : "bg-white"}`}
          >
            Offline Orders
          </button>
        </div>

        {/* Hiển thị thông báo nếu không có đơn hàng nào khớp */}
      {filteredOrders.length === 0 ? (
        <p>Không có đơn hàng trùng với các điều kiện lọc</p>
      ) : (
        <table className="w-full border-collapse border bg-white">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="border p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <OderItem order={order} key={order.id} onClick={() => handleSearchById(order.id)} />
            ))}
          </tbody>
        </table>
      )}

        {selectedOrder && (
          <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
