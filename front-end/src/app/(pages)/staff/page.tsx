"use client";

import React, { useEffect, useState } from "react";
import OrdersList from "./dasboard/component/OrdersList";
import useFetchOrders from "@/app/hook/useFetchOrders";

export default function Staff() {
  const { orders } = useFetchOrders();

  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Lọc đơn hàng chỉ có trạng thái "Chờ xác nhận"
    const pendingOrders = orders.filter(
      (order) => order.order_status === "Chờ xác nhận"
    );
    setFilteredOrders(pendingOrders);
  }, [orders]);

  const orderCounts = filteredOrders.length;

  console.log(orderCounts);
  return (
    <div className="max-w-[1300px] mx-auto h-[618px] pt-16">
      
      <OrdersList
        orders={filteredOrders}
        filterStatus="Chờ xác nhận"
        setFilterStatus={() => {}}
        orderCounts={{ "Chờ xác nhận": orderCounts }}
        statuses={["Chờ xác nhận"]}
      />
    </div>
  );
}
