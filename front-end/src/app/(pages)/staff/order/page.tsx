import React from "react";

const OrderManagement = () => {

  const headers = [
    "Mã Đơn Hàng",
    "Ngày Đặt Hàng",
    "Khách Hàng",
    "Tổng Tiền",
    "Trạng Thái Thanh Toán",
    "Trạng Thái Đơn Hàng"
  ];

  const orders = [
    {
      orderId: "#AHAQ68",
      date: "23/09/2022",
      customerName: "Jacob Marcus",
      total: "520.000đ",
      paymentStatus: {
        text: "Đã Thanh Toán",
        color: "bg-green-500"
      },
      orderStatus: {
        text: "Hoàn Thành",
        bgColor: "bg-green-100",
        textColor: "text-green-700"
      }
    },
    {
      orderId: "#BHRZ52",
      date: "24/09/2022",
      customerName: "Sarah Connor",
      total: "430.000đ",
      paymentStatus: {
        text: "Chưa Thanh Toán",
        color: "bg-purple-500"
      },
      orderStatus: {
        text: "Đã Gửi",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700"
      }
    },
    {
      orderId: "#TXP12A",
      date: "25/09/2022",
      customerName: "John Doe",
      total: "300.000đ",
      paymentStatus: {
        text: "Đã Huỷ",
        color: "bg-red-500"
      },
      orderStatus: {
        text: "Đã Huỷ",
        bgColor: "bg-red-100",
        textColor: "text-red-700"
      }}
    // Add more orders as needed
  ];
  return (
        <table className="w-full border-collapse border bg-white">
          <thead>
            <tr>
              {headers.map((header, index) => (
            <th key={index} className="border p-4">
              {header}
            </th>
          ))}
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => (
          <tr key={index}>
            <td className="border p-4 text-blue-500 cursor-pointer">
              {order.orderId}
            </td>
            <td className="border p-4">{order.date}</td>
            <td className="border p-4">{order.customerName}</td>
            <td className="border p-4">{order.total}</td>
            <td className="border p-4">
              <span className="flex items-center space-x-2">
                <span className={`w-3 h-3 ${order.paymentStatus.color} rounded-full`}></span>
                <span>{order.paymentStatus.text}</span>
              </span>
            </td>
            <td className="border p-4">
              <span className={`px-3 py-1 text-sm font-medium ${order.orderStatus.textColor} ${order.orderStatus.bgColor} rounded-full`}>
                {order.orderStatus.text}
              </span>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
  );
};

export default OrderManagement;
