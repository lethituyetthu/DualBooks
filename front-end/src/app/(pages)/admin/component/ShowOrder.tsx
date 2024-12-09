"use client"; // Đánh dấu file là Client Component
import React from "react";
import Link from "next/link";

import getStatusColor from "@/components/ui/getColorByStatus";
type typeCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
};

type typeOrder = {
  id: string;
  order_date: string;
  order_status: string;
  payment_status: string;
  shipping_address: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  customer?: typeCustomer;
};

// Định nghĩa ShowOrdersProps như đã trình bày ở trên
type ShowOrdersProps = {
  customer: typeCustomer[];
  orders: typeOrder[];
  loading: boolean;
  error: string | null;
  onDelete: (orderId: string) => void;
  onStatusToggle: (orderId: string) => void;
};

// Định dạng thời gian
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};



// Component hiển thị danh sách đơn hàng
export default function ShowOrder({
  orders,
  loading,
  error,
  onDelete,
  onStatusToggle,
}: ShowOrdersProps) {
  // Nếu đang tải dữ liệu
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Nếu có lỗi khi tải dữ liệu
  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center p-4">Hiện tại không có đơn hàng nào.</div>
    );
  }

  
  return (
    <tbody>
      {orders.map((order, index) => (
        <tr
          key={order.id}
          className={`border-b ${
            index % 2 === 0 ? "bg-[#FBF3E9]" : "bg-[#F4DCC8]"
          }`}
        >
          <td className="p-4 border border-white">#...{order.id.slice(-5)}</td>{" "}
          {/* Hiển thị 5 ký tự cuối của Mã Đơn Hàng */}
          <td className="p-4 border border-white">
            {order.customer?.name ? order.customer.name : "Đơn offline"}
          </td>{" "}
          {/* Khách Hàng */}
          <td className="p-4 border border-white">
            {formatDateTime(order.order_date)}
          </td>{" "}
          {/* Ngày Đặt */}
          <td className="p-4 border border-white">
            {order.shipping_address}
          </td>{" "}
          {/* Địa Chỉ */}
          <td className="p-4 border border-white text-nowrap">
            {(order.total_amount * 1000).toLocaleString("vi-VN") + " đ"}{" "}
          </td>{" "}
          {/* Tổng Tiền */}
          <td className="p-4 border border-white text-nowrap">
            <span
              className={`${getStatusColor(
                order.order_status
              )} text-white rounded px-2 py-1 text-xs`}
            >
              {order.order_status}
            </span>
          </td>{" "}
          {/* Trạng Thái */}
          <td className="p-4 text-right text-nowrap">
            <Link href={`/admin/OrderDetail/${order.id}`}>
              <button className="text-blue-500 hover:underline mr-2">
                Xem
              </button>
            </Link>
            <Link href={`/admin/editOrder/${order.id}`}>
              <button className="text-red-500 hover:underline mr-2">Hủy</button>
            </Link>
          </td>{" "}
          {/* Các nút hành động */}
        </tr>
      ))}
    </tbody>
  );
}
