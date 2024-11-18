import React from "react";

type OrderSummaryProps = {
  cartItems: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  shippingFee: number;
  calculateTotal: () => number;
  calculateTotalQuantity: () => number;
  handlePaymentConfirmation: () => void;
  handleBackToCart: () => void;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  shippingFee,
  calculateTotal,
  calculateTotalQuantity,
  handlePaymentConfirmation,
  handleBackToCart,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between text-gray-600 mb-2">
          <span className="w-[80%]">
            {item.title} x {item.quantity}
          </span>
          <span className="text-nowrap">
            {(item.price * item.quantity * 1000).toLocaleString("vi-VN")} đ
          </span>
        </div>
      ))}

      <div className="flex justify-between mt-4 text-gray-800">
        <strong>Tổng cộng:</strong>
        <strong>
          {((calculateTotal() + shippingFee) * 1000).toLocaleString("vi-VN")} đ
        </strong>
      </div>

      <div className="flex justify-between mt-4 text-gray-800">
        <strong>Tổng sản phẩm:</strong>
        <strong>{calculateTotalQuantity()}</strong>
      </div>

      <button
        onClick={handlePaymentConfirmation}
        className="w-full mt-4 bg-primary-400 text-white py-2 rounded-md shadow hover:bg-primary-500 transition"
      >
        Xác nhận thanh toán
      </button>

      <button
        onClick={handleBackToCart}
        className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded-md shadow hover:bg-gray-300 transition"
      >
        Quay lại giỏ hàng
      </button>
    </div>
  );
};

export default OrderSummary;
