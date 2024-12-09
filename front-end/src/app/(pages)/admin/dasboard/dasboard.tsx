"use client";

import React, { useState, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import useFetchOrders from "@/app/hook/useFetchOrders";
import useFetchCustomer from "@/app/hook/useFetchCustomer";
import TotalStats from "./component/TotalStats";
import DailyStats from "./component/DailyStats";
import RevenueChart from "./component/RevenueChart";

Chart.register(...registerables);

export default function Dashboard() {
  const { orders = [] } = useFetchOrders();
  const { customers = [] } = useFetchCustomer();

  const [filterDate, setFilterDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const yesterday = useMemo(() => {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    return yesterdayDate.toISOString().split("T")[0];
  }, []);

  const calculateStats = (date, orders, customers) => {
    const ordersOnDate =
      orders?.filter(
        (order) =>
          order?.order_date &&
          new Date(order.order_date).toISOString().split("T")[0] === date &&
          order.payment_status === "Đã thanh toán"
      ) || [];
    const revenueOnDate = ordersOnDate.reduce(
      (sum, order) => sum + (order.total_amount || 0),
      0
    );
    const customersOnDate =
      customers?.filter(
        (customer) =>
          customer?.created_at &&
          new Date(customer.created_at).toISOString().split("T")[0] === date
      ) || [];
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
  console.log(orders)
  const totalOrders = orders.length;
  const totalCompletedOrders = orders.filter(
    (order) => order.order_status === "Hoàn thành"
  ).length;
  const totalRevenue = orders
    ?.filter((order) => order.payment_status === "Đã thanh toán")
    .reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalCustomers = customers.length;

  const dailyRevenue = useMemo(() => {
    const revenueByDay = Array(30).fill(0);
    orders
      ?.filter((order) => order.payment_status === "Đã thanh toán")
      .forEach((order) => {
        if (order?.order_date && order?.total_amount) {
          const day = new Date(order.order_date).getDate();
          if (day >= 1 && day <= 30) {
            revenueByDay[day - 1] += order.total_amount;
          }
        }
      });
    return revenueByDay;
  }, [orders]);

  const filteredData = useMemo(() => {
    if (!filterDate) return dailyRevenue;

    const selectedDay = new Date(filterDate).getDate();
    const filteredRevenue = Array(30).fill(0);

    if (selectedDay >= 1 && selectedDay <= 30) {
      filteredRevenue[selectedDay - 1] = dailyRevenue[selectedDay - 1] || 0;
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
      value: `${(todayStats.revenue * 1000).toLocaleString("vi-VN")} VNĐ`,
      trend: `Hôm qua: ${(yesterdayStats.revenue * 1000).toLocaleString(
        "vi-VN"
      )} VNĐ`,
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
      <TotalStats
        totalCompletedOrders={totalCompletedOrders}
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        totalCustomers={totalCustomers}
      />
      <DailyStats statsData={statsData} />
      <RevenueChart
        chartData={chartData}
        chartOptions={chartOptions}
        setFilterDate={setFilterDate}
      />
    </div>
  );
}
