"use client";
import React, { useState, useEffect } from "react";
import useFetchOrders from "@/app/hook/useFetchOrders";

const OrderHistory = () => {
  const {
    orders,
    loading,
    error,
    fetchOrdersByCustomerId,
    fetchOrderDetail,
    orderDetail,
  } = useFetchOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // Lưu chi tiết đơn hàng
  const [showDetails, setShowDetails] = useState(false); // Điều khiển hiển thị modal
  const handleCancelOrder = (orderId: string) => {
    console.log(`Order ${orderId} has been canceled.`);
  };
  const handleViewDetails = (order: any) => {
    fetchOrderDetail(order.id); // Gọi API để lấy chi tiết đơn hàng
    console.log("Order details fetched:", orders);
    setSelectedOrder(order); // Gán thông tin đơn hàng được chọn
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
  console.log(selectedOrder);
  return (
    <div className="p-4 max-w-[1300px] mx-auto">
      <h2 className="text-center text-3xl font-bold mb-8 text-primary-400 font-itim">
        Lịch sử đơn hàng
      </h2>
      {orders.length === 0 ? (
        <div>Không có đơn hàng nào!</div>
      ) : (
        <table className="table-auto w-full border border-gray-300 rounded-md shadow-lg">
          <thead>
            <tr className="bg-primary-400 text-white">
              <th className="border px-6 py-3 font-medium text-l text-center">
                Mã đơn hàng
              </th>
              <th className="border px-6 py-3 font-medium text-l text-center">Ngày đặt</th>
              <th className="border px-6 py-3 font-medium text-l text-center">
                Trạng thái
              </th>
              <th className="border px-6 py-3 font-medium text-l text-center">
                Tổng số lượng
              </th>
              <th className="border px-6 py-3 font-medium text-l text-center">
                Tổng tiền
              </th>
             
             
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition duration-150`}
              >
                <td className=" text-center border px-6 py-3 text-sm">
                <button
                    className="text-blue-500 hover:text-blue-700 font-medium text-xs"
                    onClick={() => handleViewDetails(order)}
                  >
                    #...{order.id.slice(-5)}
                  </button></td>
                <td className=" text-center border px-6 py-3 text-sm">
                  {new Intl.DateTimeFormat("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(order.order_date))}
                </td>
                <td className=" text-center border px-6 py-3 text-sm flex items-center gap-2">
                  {order.order_status}
                  {order.order_status === "Chờ xác nhận" && (
                    <button
                      className="text-blue-500 hover:text-blue-700 font-medium text-xs"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Hủy đơn
                    </button>
                  )}
                </td>
                <td className=" text-center border px-6 py-3 text-sm">
                  {order.total_quantity}
                </td>
                <td className=" text-center border px-6 py-3 text-sm font-semibold">
                  {order.total_amount.toLocaleString("vi-VN")} VNĐ
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
            <p>
              <strong>Mã đơn hàng:</strong> {orderDetail.id}
            </p>
            <p>
              <strong>Ngày đặt:</strong>{" "}
              {new Intl.DateTimeFormat("vi-VN").format(
                new Date(orderDetail.order_date)
              )}
            </p>
            <p>
              <strong>Trạng thái:</strong> {orderDetail.order_status}
            </p>
            <p>
              <strong>Số lượng:</strong> {orderDetail.total_quantity}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {orderDetail.total_amount.toLocaleString("vi-VN")} VNĐ
            </p>
            <h4 className="mt-4 text-lg font-semibold">Danh sách sản phẩm:</h4>
            <ul>
              {orderDetail.orderItems?.map((item) => (
                <li key={item.id} className="text-sm">
                  {item.bookTitle} - {item.quantity} x{" "}
                  {item.price.toLocaleString("vi-VN")} VNĐ
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
