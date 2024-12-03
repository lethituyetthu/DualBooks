"use client";

import getStatusColor from "@/components/ui/getColorByStatus";
import OrderDetailModal from "../../component/oderDetailModal";
import useFetchOrders from "@/app/hook/useFetchOrders";
import { useState } from "react";

const OrdersList = ({
  orders,
  statuses,
  filterStatus,
  setFilterStatus,
  orderCounts,
}) => {
  const { fetchOrderDetail } = useFetchOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(false); // Add loading state for fetching order detail

  const handleSearchById = async (orderId: string) => {
    try {
      setLoadingOrderDetail(true); // Show loading state
      const orderDetail = await fetchOrderDetail(orderId);
      setSelectedOrder(orderDetail); // Set the selected order for modal
    } catch (error) {
      console.error("Error fetching order detail:", error);
      alert("Đã xảy ra lỗi khi lấy chi tiết đơn hàng.");
    } finally {
      setLoadingOrderDetail(false); // Hide loading state
    }
  };

  return (
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
        {orders?.length > 0 ? (
          orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center py-3 px-6 bg-white rounded-lg shadow-md"
            >
              <button
                className="text-blue-700 font-medium text-center w-1/5 hover:underline"
                onClick={() => handleSearchById(order.id)} // Trigger fetching order detail on click
              >
                #...{order.id.slice(-5)}
              </button>
              <span
                className={`font-medium text-white text-center py-1 px-3 rounded w-1/5 ${getStatusColor(
                  order.order_status
                )}`}
              >
                {order.order_status}
              </span>
              <span className="text-gray-600 font-medium text-center w-1/5">
                {order.customer?.phone || "N/A"}
              </span>
              <span className="text-green-500 font-semibold text-center w-1/5">
                {(order.total_amount * 1000).toLocaleString("vi-VN")} đ
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-4">
            Không có đơn hàng cho trạng thái này.
          </li>
        )}
      </ul>

      {/* Loading Spinner for Order Details */}
      {loadingOrderDetail && (
        <div className="text-center mt-4">
          <p className="text-primary-500">Đang tải chi tiết đơn hàng...</p>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersList;
