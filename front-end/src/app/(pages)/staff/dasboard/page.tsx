"use client";

import React, { useEffect, useState } from "react";
import { FaWallet, FaShoppingCart } from "react-icons/fa";
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
import RevenueChart from "./component/RevenueChart";
import ProductsList from "./component/ProductsList";
import OrdersList from "./component/OrdersList";
import StatsCard from "./component/StatsCard";
import { SnackbarProvider } from "notistack";

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
  const { fetchOrdersByDate, orders, fetchOrdersByStatus } = useFetchOrders();
  const [todayOrders, setTodayOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Chờ xác nhận");
  const [orderCounts, setOrderCounts] = useState({});
  const [offlineTotalAmount, setOfflineTotalAmount] = useState(0);
  const [onlineTotalAmount, setOnlineTotalAmount] = useState(0);
  const [chartLabels, setChartLabels] = useState([]);
  const [statsData, setStatsData] = useState({
    totalAmount: 0,
    orderCount: 0,
  });
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);

  // Tính doanh thu hàng tuần
  const doanh_thu_7day = async (fetchOrdersByDate) => {
    // Tạo danh sách 7 ngày gần nhất
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return date.toISOString().split("T")[0]; // Định dạng yyyy-mm-dd
    }).reverse(); // Đảo ngược để ngày gần nhất ở cuối

    console.log("7 ngày gần nhất:", last7Days);

    // Tính doanh thu từng ngày bằng cách gọi fetchOrdersByDate
    const revenueByDay = await Promise.all(
      last7Days.map(async (day) => {
        const dayOrders = (await fetchOrdersByDate(day)) || []; // Lấy dữ liệu từng ngày

        const completedOrders = dayOrders.filter(
          (order) => order.payment_status === "Đã thanh toán"
        );

        return completedOrders.reduce(
          (sum, order) => sum + (order.total_amount || 0),
          0
        ); // Tính tổng doanh thu
      })
    );

    return { revenueByDay, last7Days };
  };

  // Lấy dữ liệu đơn hàng trong ngày
  useEffect(() => {
    const fetchOrdersData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const todayOrders = (await fetchOrdersByDate(today)) || []; // Đảm bảo không null
      setTodayOrders(todayOrders);
  
      if (todayOrders.length === 0) {
        // Nếu không có đơn hàng, đặt giá trị mặc định
        setStatsData({ totalAmount: 0, orderCount: 0 });
        setWeeklyRevenue(Array(7).fill(0)); // Doanh thu 7 ngày = 0
        setOfflineTotalAmount(0);
        setOnlineTotalAmount(0);
        setOrderCounts({ "Tất cả": 0 });
        setFilteredOrders([]);
        setChartLabels(Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(new Date().getDate() - i);
          return date.toISOString().split("T")[0];
        }).reverse());
        return;
      }
  
      // Các xử lý khác nếu có đơn hàng
      const completedOrders = todayOrders?.filter(
        (order) => order.order_status === "Hoàn thành"
      );
      const totalAmountToday = completedOrders
        .filter((order) => order.payment_status === "Đã thanh toán")
        .reduce((sum, order) => sum + (order.total_amount || 0), 0);
  
      const orderCountToday = todayOrders.length;
      setStatsData({ totalAmount: totalAmountToday, orderCount: orderCountToday });
  
      const { revenueByDay, last7Days } = await doanh_thu_7day(fetchOrdersByDate);
      setWeeklyRevenue(revenueByDay);
      setChartLabels(last7Days);
  
      const offlineAmount = todayOrders
        .filter((order) => order.order_type === "offline")
        .reduce((sum, order) => sum + (order.total_amount || 0), 0);
      setOfflineTotalAmount(offlineAmount);
  
      const onlineAmount = todayOrders
        .filter(
          (order) =>
            order.order_type === "online" &&
            order.payment_status === "Đã thanh toán"
        )
        .reduce((sum, order) => sum + (order.total_amount || 0), 0);
      setOnlineTotalAmount(onlineAmount);
  
      const counts = todayOrders.reduce((acc, order) => {
        acc[order.order_status] = (acc[order.order_status] || 0) + 1;
        return acc;
      }, {});
      counts["Tất cả"] = todayOrders?.length;
      setOrderCounts(counts);
  
      const filtered = todayOrders.filter(
        (order) => order.order_status === "Chờ xác nhận"
      );
      setFilteredOrders(filtered);
    };
  
    fetchOrdersData();
  }, [fetchOrdersByDate]);
  
  // Lọc đơn hàng theo trạng thái
  useEffect(() => {
    if (filterStatus === "Tất cả") {
      setFilteredOrders(todayOrders);
    } else {
      const filtered = todayOrders?.filter(
        (order) => order.order_status === filterStatus
      );
      setFilteredOrders(filtered);
    }
  }, [filterStatus, todayOrders]);

  // Dữ liệu biểu đồ doanh thu
  const chartData = {
    labels: chartLabels.map((date) => {
      const [year, month, day] = date.split("-"); // Đảm bảo lấy đúng thứ tự
      return `${day}/${month}`; // Định dạng ngày/tháng
    }),
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: weeklyRevenue.map((amount) => amount * 1000), // Giữ nguyên giá trị
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
      title: { display: true, text: "Thống kê doanh thu 7 ngày gần nhất" },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => `Ngày: ${tooltipItems[0].label}`,
          label: (tooltipItem) =>
            `Doanh Thu: ${tooltipItem.raw.toLocaleString("vi-VN")} đ`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: "Ngày (7 ngày gần nhất)" },
      },
      y: {
        ticks: {
          callback: (value) => `${value.toLocaleString("vi-VN")} đ`,
        },
        title: { display: true, text: "Doanh Thu (VNĐ)" },
      },
    },
  };

  const stats = [
    {
      id: 1,
      title: "Doanh thu tại cửa hàng",
      amount: `${(offlineTotalAmount * 1000).toLocaleString("vi-VN")} đ`,
    },

    {
      id: 2,
      title: "Doanh thu online",
      amount: `${(onlineTotalAmount * 1000).toLocaleString("vi-VN")} đ`,
    },
    {
      id: 3,
      title: "Tổng doanh thu",
      amount: `${(statsData.totalAmount * 1000).toLocaleString("vi-VN")} đ/ ${
        statsData.orderCount || 0
      } đơn`,
    }
  ];

  const statuses = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Hoàn thành",
    "Đã hủy",
  ];

  // console.log(filteredOrders);
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>

    <div className="min-h-screen bg-light-100 p-6 max-w-[1300px] mx-auto">
      <div className="grid grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            amount={stat.amount}
            icon={stat.icon}
          />
        ))}
      </div>

      <OrdersList
        orders={filteredOrders}
        statuses={statuses}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        orderCounts={orderCounts}
      />

      <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="col-span-2 ">
          <RevenueChart chartData={chartData} chartOptions={chartOptions} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <ProductsList
            title="Sản phẩm sắp hết hàng"
            products={lowStock}
            renderDetails={(product) => product.stock}
          />
          <ProductsList
            title="Sản phẩm mới"
            products={newBooks}
            renderDetails={(product) =>
              `${(product.price * 1000).toLocaleString("vi-VN")} đ`
            }
          />
        </div>
      </div>
    </div>
    </SnackbarProvider>
  );
};

export default Dashboard;
