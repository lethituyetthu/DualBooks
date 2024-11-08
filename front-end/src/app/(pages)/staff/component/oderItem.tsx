// OderItem.tsx
import React from "react";

interface OderItemProps {
  order: {
    id: string;
    order_date: string;
    customer_id: string | null;
    total_amount: number;
    payment_status: string;
    order_status: string;
  };
}

const OderItem: React.FC<OderItemProps> = ({ order }) => {
  return (
    <tr>
      <td className="border p-4 text-blue-500 cursor-pointer">{order.id}</td>
      <td className="border p-4">
        {new Date(order.order_date).toLocaleDateString()}
      </td>
      <td className="border p-4">{order.customer_id || "N/A"}</td>
      <td className="border p-4">
        {(order.total_amount * 1000).toLocaleString("vi-VN") + "đ"}
      </td>
      <td className="border p-4">
        <span className="flex items-center space-x-2">
          <span
            className={`w-3 h-3 ${
              order.payment_status === "Đã thanh toán"
                ? "bg-green-500"
                : "bg-red-500"
            } rounded-full`}
          ></span>
          <span>{order.payment_status}</span>
        </span>
      </td>
      <td className="border p-4">
        <span
          className={`px-3 py-1 text-sm font-medium ${
            order.order_status === "Hoàn thành"
              ? "text-green-700 bg-green-100"
              : order.order_status === "Đã hủy"
              ? "text-red-700 bg-red-100"
              : "text-blue-700 bg-blue-100"
          } rounded-full`}
        >
          {order.order_status}
        </span>
      </td>
    </tr>
  );
};

export default OderItem;
