"use client";
import React, { useState, useEffect } from "react";
import useFetchOrders from "@/app/hook/useFetchOrders";
import Image from "next/image";
import { SnackbarProvider, useSnackbar } from "notistack";

const OrderHistory = () => {
  const {
    orders,
    loading,
    error,
    fetchOrdersByCustomerId,
    fetchOrderDetail,
    cancelOrder,
    completeOrder,
  } = useFetchOrders();
  const { enqueueSnackbar } = useSnackbar(); // Hook để hiển thị thông báo

  const [orderDetail, setOrderDetail] = useState<any>(null); // State lưu chi tiết đơn hàng
  const [showDetails, setShowDetails] = useState(false); // Điều khiển hiển thị modal

  // Xử lý hủy đơn hàng
  const handleCancelOrder = async (orderId: string) => {
    try {
      const result = await cancelOrder(orderId);
      console.log(result);
      enqueueSnackbar(`Đơn hàng ${orderId} đã được hủy thành công!`, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 3000,
      });
      setShowDetails(false); // Đóng modal sau khi hủy đơn
    } catch (error) {
      // Hiển thị thông báo lỗi
      enqueueSnackbar(`Hủy đơn hàng thất bại: ${(error as Error).message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 3000,
      });
    }
  };

  // Xử lý hoàn thành đơn hàng
  const handleCompleteOrder = async (orderId: string) => {
    try {
      const a = await completeOrder(orderId);
      console.log(a);
      // Hiển thị thông báo thành công
      enqueueSnackbar(`Đơn hàng ${orderId} đã hoàn thành!`, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 3000,
      });
      setShowDetails(false); // Đóng modal sau khi hủy đơn
    } catch (error) {
      // Hiển thị thông báo lỗi
      enqueueSnackbar(`Hủy đơn hàng thất bại: ${(error as Error).message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 3000,
      });
    }
  };

  // Xử lý hiển thị chi tiết đơn hàng
  const handleViewDetails = async (order: any) => {
    try {
      const detail = await fetchOrderDetail(order.id);
      setOrderDetail(detail); // Lấy chi tiết đơn hàng
      setShowDetails(true); // Hiển thị modal chi tiết
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  // Lấy danh sách đơn hàng khi component mount
  useEffect(() => {
    const customerData = localStorage.getItem("customer");
    if (customerData) {
      const { id: customerId } = JSON.parse(customerData);
      fetchOrdersByCustomerId(customerId); // Lấy danh sách đơn hàng của khách hàng
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
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <div className="container mx-auto p-6 max-w-[1000px]">
        {/* Tiêu đề */}
        <h2 className="text-center text-3xl font-bold text-primary-400 font-itim mb-8">
          Lịch sử đơn hàng
        </h2>

        {/* Nếu không có đơn hàng */}
        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-500">
            Không có đơn hàng nào!
          </div>
        ) : (
          <div className="overflow-x-auto  p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className=" border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  {/* Mã đơn hàng */}
                  <div className=" flex items-center justify-between mb-3">
                    <button className=" text-gray-600 transition-colors duration-300 text-sm">
                      Đơn hàng: #{order.id.slice(-10)}
                    </button>
                    <div className="flex items-center justify-between w-60">
                      {/* Ngày đặt hàng */}
                      <div className="text-sm text-gray-600 ">
                        {new Intl.DateTimeFormat("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(new Date(order.order_date))}
                      </div>
                      {"||"}
                      {/* Trạng thái đơn hàng */}
                      <span
                        className={`${
                          order.order_status === "Hoàn thành"
                            ? "text-green-600"
                            : order.order_status === "Chờ xác nhận"
                            ? "text-blue-600"
                            : "text-red-600"
                        } font-medium`}
                      >
                        {order.order_status}
                      </span>
                    </div>
                  </div>

                  {/* Hiển thị sản phẩm trong đơn hàng */}
                  {order.orderItems && order.orderItems.length > 0 && (
                    <div className="text-sm text-gray-700 mt-2">
                      <ul className="list-disc pl-5">
                        {order.orderItems.slice(0, 1).map((item, idx) => (
                          <li
                            key={idx}
                            className="mb-4 flex items-center space-x-4"
                          >
                            {/* Hiển thị ảnh sản phẩm */}
                            <Image
                              width={100}
                              height={200}
                              src={`http://localhost:3200/uploads/books/${item.bookImg}`}
                              alt={"ảnh sp"}
                              className="w-16 h-16 object-cover rounded-md"
                            />

                            {/* Thông tin chi tiết sản phẩm */}
                            <div>
                              <span className="font-semibold">
                                {item.bookTitle}
                              </span>{" "}
                              <br></br>x{item.quantity} -{" "}
                              {(
                                item.price *
                                item.quantity *
                                1000
                              ).toLocaleString("vi-VN")}{" "}
                              VNĐ
                            </div>
                          </li>
                        ))}
                        {order.orderItems.length > 1 && (
                          <div className="text-black">
                            <button
                              onClick={() => handleViewDetails(order)}
                              className=" transition-colors duration-300 font-bold"
                            >
                              ...
                            </button>
                          </div>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {/* Tổng tiền */}
                    <div className="text-l mb-3 text-primary-600">
                      <strong className="font-bold text-black">
                        Tổng tiền:
                      </strong>{" "}
                      {(order.total_amount * 1000).toLocaleString("vi-VN")}
                    </div>

                    {/* Trạng thái */}
                    <div className="text-sm mb-3">
                      {order.order_status !== "Đang giao hàng" && (
                        <button
                          className="bg-red-500 hover:bg-red-700 rounded-sm px-5 py-2 text-white font-medium transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={order.order_status !== "Chờ xác nhận"} // Điều kiện vô hiệu hóa
                        >
                          Hủy đơn
                        </button>
                      )}
                      {order.order_status === "Đang giao hàng" && (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 rounded-sm px-5 py-2 text-white font-medium transition-colors duration-300 "
                          onClick={() => handleCompleteOrder(order.id)}
                          // Điều kiện vô hiệu hóa
                        >
                          Đã nhận hàng
                        </button>
                      )}
                      <button
                        className="ml-2 bg-white border rounded-sm px-5 py-2 text-black font-medium transition-colors duration-300 "
                        onClick={() => handleViewDetails(order)}
                        // Điều kiện vô hiệu hóa
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal chi tiết đơn hàng */}
        {showDetails && orderDetail && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transition-transform transform ease-in-out duration-300">
              {/* Tiêu đề và trạng thái đơn hàng */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-primary-400">
                  Chi tiết đơn hàng
                </h3>
                <span className={`${
                          orderDetail.order_status === "Hoàn thành"
                            ? "text-green-600"
                            : orderDetail.order_status === "Chờ xác nhận"
                            ? "text-blue-600"
                            : "text-red-600"
                        } font-medium`}>
                  {orderDetail.order_status}
                </span>
              </div>

              {/* Thông tin đơn hàng */}
              <div className="mb-6 flex justify-between space-x-8 text-sm text-gray-700">
                {/* Thông tin người nhận */}
                <div className="flex flex-col space-y-2 w-1/2">
                  <strong className="font-bold">Thông tin người nhận:</strong>
                  <p>{orderDetail.customerInfo.name}</p>
                  <p>{orderDetail.customerInfo.phone}</p>
                  <p>{orderDetail.shipping_address}</p>
                </div>

                {/* Thông tin đơn hàng */}
                <div className="flex flex-col space-y-2 w-1/2">
                  <strong className="font-bold">Thông tin đơn hàng:</strong>

                  <p>
                    <strong className="font-medium">Mã đơn hàng:</strong> #
                    {orderDetail.id.slice(0, 10)}
                  </p>
                  <p>
                    <strong className="font-medium">Ngày đặt:</strong>{" "}
                    {new Intl.DateTimeFormat("vi-VN").format(
                      new Date(orderDetail.order_date)
                    )}
                  </p>
                  <p className="font-bold">
                    <strong className="font-medium">Tổng tiền:</strong>{" "}
                    {(orderDetail.total_amount * 1000).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </p>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <h4 className="text-lg font-semibold mb-3 text-gray-800">
                Danh sách sản phẩm:
              </h4>
              <ul className="space-y-4">
                {orderDetail.orderItems?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-4 text-sm text-gray-700"
                  >
                    {/* Hình ảnh sản phẩm */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        width={100}
                        height={200}
                        src={`http://localhost:3200/uploads/books/${item.bookImg}`}
                        alt={"ảnh sp"}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{item.bookTitle}</span>
                      <p className="text-primary-600">
                        {item.quantity} x{" "}
                        {(item.price * 1000).toLocaleString("vi-VN")} VNĐ
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Nút Đóng */}
              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
                  onClick={() => setShowDetails(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SnackbarProvider>
  );
};

export default OrderHistory;
