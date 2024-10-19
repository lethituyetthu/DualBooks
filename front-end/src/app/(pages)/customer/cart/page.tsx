"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Correct router import

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
  category: string;
};

// Excluded categories for discount application
const excludedCategories = [
  "Ngoại Văn",
  "Manga",
  "Phiếu Quà Tặng",
  "Sách Giáo Khoa",
  "Máy Tính",
  "Giấy Photo",
];

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const shippingFee = 30;

  const router = useRouter(); // Initialize useRouter

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Check if the cart contains any excluded items for discounts
  const hasExcludedItems = () => {
    return cartItems.some((item) =>
      excludedCategories.includes(item.category)
    );
  };

  // Tính tổng tiền hàng
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Tính tổng tiền cuối cùng
  const calculateGrandTotal = () => {
    const total = calculateTotal();
    return total - discountAmount + shippingFee;
  };

  // Áp dụng mã giảm giá dựa trên điều kiện
  const applyDiscountCode = () => {
    const total = calculateTotal();
    if (hasExcludedItems()) {
      setDiscountAmount(0); // Không áp dụng giảm giá cho các danh mục bị loại trừ
    } else {
      if (discountCode === "DISCOUNT10" && total >= 130000) {
        setDiscountAmount(10000); // Giảm 10,000 VNĐ
      } else if (discountCode === "DISCOUNT20" && total >= 280000) {
        setDiscountAmount(20000); // Giảm 20,000 VNĐ
      } else if (discountCode === "DISCOUNT50" && total >= 550000) {
        setDiscountAmount(50000); // Giảm 50,000 VNĐ
      } else if (discountCode === "DISCOUNT100" && total >= 1100000) {
        setDiscountAmount(100000); // Giảm 100,000 VNĐ
      } else {
        setDiscountAmount(0); // Không có mã hợp lệ
      }
    }
  };

  // Xử lý khi thay đổi số lượng sản phẩm
  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Xử lý khi xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Toggle discount details visibility
  const toggleDiscountDetails = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  // Navigate back to product listing page
  const goToProductPage = () => {
    router.push("/customer/products"); // Navigate to your product page
  };

  // Navigate to the payment page when "Đặt hàng" is clicked
  const handlePlaceOrder = () => {
    router.push("/customer/checkout"); // Navigate to the payment page
  };

  return (
    <div className="max-w-[1200px] m-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột bên trái: Sản phẩm trong giỏ hàng */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={`/uploads/books/${item.cover_image}`}
                    alt={item.title}
                    width={80}
                    height={100}
                    className="object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p>{(item.price * 1000).toLocaleString("vi-VN")} đ</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded-l"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded-r"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cột bên phải: Thông tin đơn hàng */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
          <div className="border-b border-gray-300 pb-4">
            <p>Thành tiền: {(calculateTotal() * 1000).toLocaleString("vi-VN")} đ</p>
            <p>Phí giao hàng: {(shippingFee * 1000).toLocaleString("vi-VN")} đ</p>
            <p>Giảm giá: {(discountAmount * 1000).toLocaleString("vi-VN")} đ</p>
          </div>
          <div className="border-t border-gray-300 pt-4 mb-4">
            <p className="text-lg font-semibold">
              Tổng tiền: {(calculateGrandTotal() * 1000).toLocaleString("vi-VN")} đ
            </p>
          </div>

          {/* Mã giảm giá */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
              className="border p-2 flex-grow"
            />
            <button
              onClick={applyDiscountCode}
              className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700"
            >
              Áp dụng
            </button>
          </div>

          {/* Nút xem chi tiết mã giảm giá */}
          <button
            onClick={toggleDiscountDetails}
            className="w-full bg-gray-200 text-black px-6 py-2 rounded-lg mb-4"
          >
            {isDetailVisible ? "Ẩn chi tiết mã giảm giá" : "Xem chi tiết mã giảm giá"}
          </button>
          {isDetailVisible && (
            <div className="border p-4 bg-gray-100">
              <p>Mã giảm giá:</p>
              <ul>
                <li>Giảm 10,000 đ cho đơn hàng từ 130,000 đ</li>
                <li>Giảm 20,000 đ cho đơn hàng từ 280,000 đ</li>
                <li>Giảm 50,000 đ cho đơn hàng từ 550,000 đ</li>
                <li>Giảm 100,000 đ cho đơn hàng từ 1,100,000 đ</li>
              </ul>
              <p>Điều kiện: Không áp dụng cho Ngoại Văn, Manga, v.v.</p>
            </div>
          )}

          {/* Nút quay về trang sản phẩm */}
          <button
            onClick={goToProductPage}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Quay về trang sản phẩm
          </button>

          {/* Nút đặt hàng */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 mt-4"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
