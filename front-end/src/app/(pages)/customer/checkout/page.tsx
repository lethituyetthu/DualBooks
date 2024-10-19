"use client";

import { useState, useEffect } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
};

const CheckoutPaymentPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Function to handle payment method selection
  const handlePaymentSelection = (method: string) => {
    setSelectedPayment(method);
  };

  return (
    <div className="max-w-[1200px] m-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Cột bên trái: Địa chỉ giao hàng */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-4">Địa chỉ giao hàng</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600">Địa chỉ thanh toán</p>
          <button className="text-primary">Chỉnh sửa</button>
        </div>
        <p className="text-red-500 mb-4">Chưa xác thực</p>
        <input
          type="text"
          placeholder="Nhập địa chỉ giao hàng"
          className="w-full border p-2 mb-4"
        />

        {/* Ngăn cách */}
        <hr className="border-gray-300 my-4" />

        {/* Phương thức giao hàng */}
        <div className="border p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Chọn phương thức giao hàng</h3>

          {/* Giao hàng tiêu chuẩn */}
          <div className="border-b mb-4 pb-2">
            <h4 className="text-md font-semibold">Giao hàng tiêu chuẩn</h4>
            <p>Nhận vào: 20/10/2024 - 22/10/2024</p>
            <p>Phí: 30,000 đ</p>
          </div>

          {/* Giao hỏa tốc */}
          <div className="border-b mb-4 pb-2">
            <h4 className="text-md font-semibold">Giao hỏa tốc</h4>
            <p>Nhận vào: 18/10/2024 - 19/10/2024</p>
            <p>Phí: 50,000 đ</p>
          </div>
        </div>
      </div>

      {/* Cột bên phải: Chọn phương thức thanh toán */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-black">Chọn phương thức thanh toán</h2>
          <button className="text-primary">Xem tất cả</button>
        </div>

        {/* Các phương thức thanh toán */}
        <div className="mb-4">
          <div
            onClick={() => handlePaymentSelection("momo")}
            className={`p-4 border mb-2 ${selectedPayment === "momo" ? "border-primary" : "border-gray-300"}`}
          >
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={selectedPayment === "momo"}
              onChange={() => handlePaymentSelection("momo")}
              className="mr-2"
            />
            Ví MoMo
          </div>
          <div
            onClick={() => handlePaymentSelection("zalopay")}
            className={`p-4 border mb-2 ${selectedPayment === "zalopay" ? "border-primary" : "border-gray-300"}`}
          >
            <input
              type="radio"
              name="payment"
              value="zalopay"
              checked={selectedPayment === "zalopay"}
              onChange={() => handlePaymentSelection("zalopay")}
              className="mr-2"
            />
            Ví ZaloPay
          </div>
          <div
            onClick={() => handlePaymentSelection("card")}
            className={`p-4 border ${selectedPayment === "card" ? "border-primary" : "border-gray-300"}`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === "card"}
              onChange={() => handlePaymentSelection("card")}
              className="mr-2"
            />
            Thẻ tín dụng / Ghi nợ
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold">Thông tin đơn hàng</h3>

          {/* Hiển thị sản phẩm trong giỏ hàng */}
          {cartItems.length > 0 ? (
            <div className="mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.title} x {item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</span>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có sản phẩm nào trong giỏ hàng.</p>
          )}

          {/* Nút áp dụng mã giảm giá */}
          <div className="flex items-center mt-4 mb-4">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              className="border p-2 flex-grow"
            />
            <button className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700">
              Áp dụng
            </button>
          </div>

          {/* Nút đặt hàng */}
          <button
            className="w-full bg-[#743D1D] text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Xác Nhận Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
