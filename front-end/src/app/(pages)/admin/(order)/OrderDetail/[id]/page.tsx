"use client";

import { useEffect, useState } from "react";
import useFetchOrders from '@/app/hook/useFetchOrders';
import { useRouter } from "next/navigation";

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params; // Lấy giá trị 'id' từ params
  const { orderDetail, loading, error, fetchOrderDetail } = useFetchOrders();

  useEffect(() => {
    if (id) {
      fetchOrderDetail(id); // Lấy thông tin chi tiết đơn hàng khi có id
    }
  }, [fetchOrderDetail, id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!orderDetail) return <div>Không tìm thấy đơn hàng.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h2>
      
      {/* Thông tin đơn hàng */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Thông tin đơn hàng</h3>
        <p><strong>ID đơn hàng:</strong> {orderDetail.id}</p>
        <p><strong>Loại đơn hàng:</strong> {orderDetail.orderType}</p>
        <p><strong>Ngày đặt hàng:</strong> {new Date(orderDetail.orderDate).toLocaleString()}</p>
        <p><strong>Trạng thái đơn hàng:</strong> {orderDetail.orderStatus}</p>
        <p><strong>Trạng thái thanh toán:</strong> {orderDetail.paymentStatus}</p>
        <p><strong>Địa chỉ giao hàng:</strong> {orderDetail.shippingAddress}</p>
        <p><strong>Tổng tiền:</strong> {orderDetail.totalAmount.toLocaleString()}VND</p>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Chi tiết sản phẩm</h3>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Tên sách</th>
              <th className="border p-2">Số lượng</th>
              <th className="border p-2">Đơn giá</th>
              <th className="border p-2">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.orderItems.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.bookTitle}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.price.toFixed(2)} VND</td>
                <td className="border p-2">{(item.quantity * item.price).toFixed(2)} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phản hồi khách hàng */}
      {orderDetail.customerFeedback && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Phản hồi khách hàng</h3>
          <p>{orderDetail.customerFeedback}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
