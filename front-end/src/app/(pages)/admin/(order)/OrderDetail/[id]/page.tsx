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
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
  <h2 className="text-3xl font-bold mb-6 text-center text-primary-400 font-itim uppercase">Chi tiết đơn hàng</h2>
  
  {/* Thông tin đơn hàng */}
  <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-600 border-b pb-2 mb-4">Thông tin đơn hàng</h3>
    <div className="space-y-2 text-gray-600">
      <p><strong>ID đơn hàng:</strong> {orderDetail.id}</p>
      <p><strong>Loại đơn hàng:</strong> {orderDetail.orderType}</p>
      <p><strong>Ngày đặt hàng:</strong> {new Date(orderDetail.orderDate).toLocaleString()}</p>
      <p><strong>Trạng thái đơn hàng:</strong> {orderDetail.orderStatus}</p>
      <p><strong>Trạng thái thanh toán:</strong> {orderDetail.paymentStatus}</p>
      <p><strong>Địa chỉ giao hàng:</strong> {orderDetail.shippingAddress}</p>
      <p><strong>Số lượng sản phẩm :</strong> {orderDetail.totalQuantity}</p>
      <p><strong>Tổng tiền:</strong> <span className="text-red-500 font-bold">{(orderDetail.totalAmount * 1000).toLocaleString("vi-VN") + " VND"}</span></p>
    </div>
  </div>

  {/* Thông tin sản phẩm */}
  <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-600 border-b pb-2 mb-4">Chi tiết sản phẩm</h3>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-sm shadow-sm">
        <thead>
          <tr className="bg-primary-400 text-light-100 uppercase text-sm leading-normal">
            <th className="border p-3 text-left">Tên sách</th>
            <th className="border p-3 text-left">Số lượng</th>
            <th className="border p-3 text-left">Đơn giá</th>
            <th className="border p-3 text-left">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.orderItems.map((item) => (
            <tr key={item.id} className="text-gray-600 hover:bg-gray-50 transition">
              <td className="border p-3">{item.bookTitle}</td>
              <td className="border p-3">{item.quantity}</td>
              <td className="border p-3">{(item.price * 1000).toLocaleString("vi-VN") + " đ"} </td>
              <td className="border p-3 font-semibold">{((item.price * 1000)*item.quantity).toLocaleString("vi-VN") + " đ"} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Phản hồi khách hàng */}
  {orderDetail.customerFeedback && (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-gray-600 border-b pb-2 mb-4">Phản hồi khách hàng</h3>
      <p className="text-gray-600 italic bg-gray-100 p-4 rounded-md">{orderDetail.customerFeedback}</p>
    </div>
  )}
</div>

  );
};

export default OrderDetailPage;
