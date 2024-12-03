  import React from "react";
  import { useSnackbar } from 'notistack';
  import useFetchOrders from "@/app/hook/useFetchOrders";

  const OrderDetailModal = ({ order, onClose }) => {
    const { confirmOrder, deliverOrder } = useFetchOrders();
    const { enqueueSnackbar } = useSnackbar();  // Hook để hiển thị thông báo

    const handleConfirmOrder = async (orderId: string) => {
      try {
        await confirmOrder(orderId);
        // Hiển thị thông báo thành công
        enqueueSnackbar(`Đơn hàng ${orderId} đã được xác nhận thành công!`, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          autoHideDuration: 3000,
        });
        onClose(); // Đóng modal sau khi xác nhận
      } catch (error) {
        // Hiển thị thông báo lỗi
        enqueueSnackbar(`Xác nhận đơn hàng thất bại: ${(error as Error).message}`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          autoHideDuration: 3000,
        });
      }
    };

    const handleDeliverOrder = async (orderId: string) => {
      try {
        await deliverOrder(orderId);
        // Hiển thị thông báo thành công
        enqueueSnackbar(`Đơn hàng ${orderId} đã xác nhận giao hàng thành công!`, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          autoHideDuration: 3000,
        });
        onClose(); // Đóng modal sau khi xác nhận
      } catch (error) {
        // Hiển thị thông báo lỗi
        enqueueSnackbar(`Xác nhận giao hàng thất bại: ${(error as Error).message}`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          autoHideDuration: 3000,
        });
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-11/12 max-w-2xl p-8 relative max-h-screen overflow-y-auto rounded-lg shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary-600 font-semibold hover:text-gray-900"
          >
            ✕
          </button>

          <h2 className="text-3xl font-semibold text-primary-400 font-itim mb-6 text-center">
            Chi tiết Đơn Hàng
          </h2>

          {/* Thông tin cơ bản của đơn hàng */}
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Mã Đơn Hàng:</strong> {order.id}
            </p>
            <p>
              <strong>Ngày Đặt Hàng:</strong>{" "}
              {new Date(order.order_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Số lượng: </strong> {order.total_quantity}
            </p>
            <p>
              <strong>Tổng Tiền:</strong>{" "}
              {(order.total_amount * 1000).toLocaleString("vi-VN") + " đ"}
            </p>
            <p>
              <strong>Trạng Thái Thanh Toán:</strong> {order.payment_status}
            </p>
            <p>
              <strong>Trạng Thái Đơn Hàng:</strong> {order.order_status}
            </p>
            <p>
              <strong>Đơn Hàng:</strong> {order.order_type}
            </p>

            {/* Nút xác nhận đơn hàng */}
            {order.order_status === "Chờ xác nhận" && (
              <button
                onClick={() => handleConfirmOrder(order.id)}
                className="mt-4 bg-primary-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md transition-all duration-200"
              >
                Xác nhận đơn hàng
              </button>
            )}

            {order.order_status === "Đã xác nhận" && (
              <button
              onClick={() => handleDeliverOrder(order.id)}
                className="mt-4 bg-primary-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md transition-all duration-200"
              >
                Giao hàng
              </button>
            )}
          </div>

          {/* Thông tin khách hàng */}
          {order.customerInfo && (
            <div className="mt-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Thông Tin Khách Hàng
              </h3>
              <p>
                <strong>Họ tên:</strong> {order.customerInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customerInfo.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.customerInfo.phone}
              </p>
              {order.customerInfo.address && (
                <p>
                  <strong>Địa chỉ:</strong> {order.customerInfo.address}
                </p>
              )}
            </div>
          )}

          {/* Bảng chi tiết các sản phẩm trong đơn hàng */}
          {order.orderItems && order.orderItems.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Danh Sách Sản Phẩm
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-3 text-left text-gray-700">
                        Tên Sản Phẩm
                      </th>
                      <th className="border p-3 text-left text-gray-700 text-nowrap">
                        Số Lượng
                      </th>
                      <th className="border p-3 text-left text-gray-700">
                        Đơn giá
                      </th>
                      <th className="border p-3 text-left text-gray-700">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border p-3">{item.bookTitle}</td>
                        <td className="border p-3">{item.quantity}</td>
                        <td className="border p-3 text-nowrap">
                          {(item.price * 1000).toLocaleString("vi-VN") + " đ"}
                        </td>
                        <td className="border p-3 text-nowrap ">
                          {(item.price * 1000 * item.quantity).toLocaleString(
                            "vi-VN"
                          ) + " đ"}
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
