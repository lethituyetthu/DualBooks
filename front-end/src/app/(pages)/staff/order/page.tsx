"use client";
import React, { useEffect, useState } from "react";
import useFetchOrder from "@/app/hook/useFetchOder";
import OderItem from "../component/oderItem";
const OrderManagement = () => {
  const { getAllOrders, orders, loading, error } = useFetchOrder();
  const [filterType, setFilterType] = useState<"all" | "online" | "offline">(
    "all"
  );

  console.log(orders);
  const headers = [
    "Mã Đơn Hàng",
    "Ngày Đặt Hàng",
    "Khách Hàng",
    "Tổng Tiền",
    "Trạng Thái Thanh Toán",
    "Trạng Thái Đơn Hàng",
  ];

  useEffect(() => {
    getAllOrders(); // Fetch all orders on component mount
  }, []);

  // Filter orders based on filterType state
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        if (filterType === "all") return true;
        return order.order_type === filterType;
      })
    : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const filters = [
    { title: "All Orders", type: "all" },
    { title: "Online Orders", type: "online" },
    { title: "Offline Orders", type: "offline" },
  ];
  return (
    <div>
      <div className="mb-4">
        {filters.map((filter) => (
          <button
            key={filter.type}
            onClick={() =>
              setFilterType(filter.type as "all" | "online" | "offline")
            }
            className={`mr-2 p-2 rounded-sm  ${
              filterType === filter.type
                ? "bg-primary-400 text-white"
                : "bg-white"
            }`}
          >
            {filter.title}
          </button>
        ))}
      </div>
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
          {filteredOrders.map((order, index) => (
            <OderItem order={order} index={index} />
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
