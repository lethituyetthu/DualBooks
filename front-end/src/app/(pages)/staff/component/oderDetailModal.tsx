// components/OrderDetailModal.tsx
import React from "react";

const OrderDetailModal = ({ order, onClose }) => {
  console.log(order);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 max-w-2xl p-8 relative max-h-screen overflow-y-auto rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-600 font-semibold hover:text-gray-900"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-semibold text-primary-400 font-itim mb-6 text-center">Chi tiết Đơn Hàng</h2>
        
        {/* Thông tin cơ bản của đơn hàng */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Mã Đơn Hàng:</strong> {order.id}</p>
          <p><strong>Ngày Đặt Hàng:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Khách Hàng:</strong> {order.customer_id || "N/A"}</p>
          <p><strong>Số lượng: </strong> {order.totalQuantity          }</p>
          <p><strong>Tổng Tiền:</strong> {(order.totalAmount * 1000).toLocaleString("vi-VN") + " đ"}</p>
          <p><strong>Trạng Thái Thanh Toán:</strong> {order.paymentStatus}</p>
          <p><strong>Trạng Thái Đơn Hàng:</strong> {order.orderStatus}</p>
        </div>

        {/* Bảng chi tiết các sản phẩm trong đơn hàng */}
        {order.orderItems && order.orderItems.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Danh Sách Sản Phẩm</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left text-gray-700">Tên Sản Phẩm</th>
                    <th className="border p-3 text-left text-gray-700 text-nowrap">Số Lượng</th>
                    <th className="border p-3 text-left text-gray-700">Đơn giá</th>
                    <th className="border p-3 text-left text-gray-700">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-3">{item.bookTitle}</td>
                      <td className="border p-3">{item.quantity}</td>
                      <td className="border p-3 text-nowrap">{(item.price * 1000).toLocaleString("vi-VN") + " đ"}</td>
                      <td className="border p-3 text-nowrap ">
                      {((item.price * 1000)*item.quantity).toLocaleString("vi-VN") + " đ"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;
