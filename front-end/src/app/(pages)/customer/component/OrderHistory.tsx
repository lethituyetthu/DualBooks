"use client";

import React, { useState, useEffect } from "react";
import useFetchOrders from "@/app/hook/useFetchOrders";

const OrderHistory: React.FC = () => {
  const { orders, loading, error, fetchOrdersByCustomerId, fetchOrderDetail, orderDetail } = useFetchOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // Lưu chi tiết đơn hàng
  const [showDetails, setShowDetails] = useState(false); // Điều khiển hiển thị modal

  const handleCancelOrder = (orderId: string) => {
    console.log(`Order ${orderId} has been canceled.`);
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order); // Gán thông tin đơn hàng được chọn
    fetchOrderDetail(order.id); // Gọi API để lấy chi tiết đơn hàng
    setShowDetails(true); // Hiển thị modal chi tiết
  };

  useEffect(() => {
    const customerData = localStorage.getItem("customer");
    if (customerData) {
      const { id: customerId } = JSON.parse(customerData);
      fetchOrdersByCustomerId(customerId);
    } else {
      console.error("Không tìm thấy thông tin khách hàng trong localStorage");
    }
  }, [fetchOrdersByCustomerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-bold mb-8 text-primary-400 font-itim">Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <div>Không có đơn hàng nào!</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Mã đơn hàng</th>
              <th className="border px-4 py-2">Ngày đặt</th>
              <th className="border px-4 py-2">Trạng thái</th>
              <th className="border px-4 py-2">Tổng số lượng</th>
              <th className="border px-4 py-2">Tổng tiền</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">
                  {new Intl.DateTimeFormat("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(order.order_date))}
                </td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  {order.order_status}
                  {order.order_status === "Chờ xác nhận" && (
                    <button
                      className="text-primary-300"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Hủy đơn
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2">{order.total_quantity}</td>
                <td className="border px-4 py-2">
                  {order.total_amount.toLocaleString("vi-VN")} VNĐ
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-primary-400"
                    onClick={() => handleViewDetails(order)}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal chi tiết đơn hàng */}
      {showDetails && orderDetail && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-2xl">
      <h3 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h3>
      <p><strong>Mã đơn hàng:</strong> {orderDetail.id}</p>
      <p><strong>Ngày đặt:</strong> {new Intl.DateTimeFormat("vi-VN").format(new Date(orderDetail.orderDate))}</p>
      <p><strong>Trạng thái:</strong> {orderDetail.orderStatus}</p>
      <p><strong>Số lượng:</strong> {orderDetail.totalQuantity}</p>
      <p><strong>Tổng tiền:</strong> {orderDetail.totalAmount.toLocaleString("vi-VN")} VNĐ</p>
      <h4 className="mt-4 text-lg font-semibold">Danh sách sản phẩm:</h4>
      <ul>
        {orderDetail.orderItems.map((item) => (
          <li key={item.id} className="text-sm">
            {item.bookTitle} - {item.quantity} x {item.price.toLocaleString("vi-VN")} VNĐ
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
          onClick={() => setShowDetails(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default OrderHistory;
