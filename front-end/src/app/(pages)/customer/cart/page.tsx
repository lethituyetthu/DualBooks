"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItems from "../component/cart/CartItems";
import useFetchBook from "@/app/hook/useFetchBook";
import useHandlePlaceOrder from "@/app/hook/useHandlePlaceOrder";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
  category: string;
};

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Trạng thái lưu danh sách sản phẩm trong giỏ hàng

  const router = useRouter(); // Router để điều hướng giữa các trang

  // Hàm tải dữ liệu giỏ hàng từ localStorage khi component được render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Hàm tính tổng tiền của giỏ hàng
  const calculateTotal = () => {
    return (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) *
      1000
    );
  };

  // Hàm tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Hàm trả về tổng tiền đã được tính toán
  const totalPrice = () => {
    return calculateTotal();
  };

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems); // Cập nhật lại giỏ hàng
    localStorage.setItem("cart", JSON.stringify(updatedItems)); // Lưu lại giỏ hàng trong localStorage
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems); // Cập nhật lại giỏ hàng
    localStorage.setItem("cart", JSON.stringify(updatedItems)); // Lưu lại giỏ hàng trong localStorage
  };

  // Hàm điều hướng sang trang sản phẩm (nếu cần)
  const goToProductPage = () => {
    router.push(`/customer/product`);
    
  };

  // Hàm xử lý khi đặt hàng
  const handlePlaceOrder = useHandlePlaceOrder(cartItems, totalQuantity(), totalPrice())


  return (
    <div className="max-w-5xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-600 font-itim">
        Giỏ hàng
      </h2>

      <div>
        {/* Hiển thị danh sách sản phẩm trong giỏ hàng */}
        <CartItems
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
        />

        {/* Thanh điều hướng và thông tin tổng quát */}
        <div className="p-4 rounded-sm mt-4 flex justify-between bg-primary-400 text-light-50 items-center">
          <button
            onClick={goToProductPage}
            className="text-light-100 px-4 py-2 rounded hover:text-gray-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.25 19.5L3.75 12m0 0l6.5-7.5M3.75 12h16.5"
              />
            </svg>
            Quay lại
          </button>
          <p>
            Tổng tiền:
            <strong> {totalPrice().toLocaleString("vi-VN")} đ</strong>
          </p>
          <p>
            Tổng số lượng sản phẩm: <strong>{totalQuantity()}</strong>
          </p>
          <button
            onClick={handlePlaceOrder}
            className="bg-light-50 text-primary-600 px-10 py-2 rounded hover:bg-light-500"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
