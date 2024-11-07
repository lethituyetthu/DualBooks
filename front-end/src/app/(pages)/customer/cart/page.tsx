"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [shippingMethod, setShippingMethod] = useState<string>("standard"); // Standard or express shipping
  const [shippingFee, setShippingFee] = useState<number>(30000); // Initial shipping fee
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
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

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Apply discount code based on conditions
  const applyDiscountCode = () => {
    const total = calculateTotal();
    let discount = 0;

    if (hasExcludedItems()) {
      discount = 0; // No discount applied for excluded categories
    } else {
      // Giảm giá theo mã
      if (discountCode === "DISCOUNT10" && total >= 130000) {
        discount = 10000; // Giảm 10,000 VND
      } else if (discountCode === "DISCOUNT20" && total >= 280000) {
        discount = 20000; // Giảm 20,000 VND
      } else if (discountCode === "DISCOUNT50" && total >= 550000) {
        discount = 50000; // Giảm 50,000 VND
      } else if (discountCode === "DISCOUNT100" && total >= 1100000) {
        discount = 100000; // Giảm 100,000 VND
      } else {
        discount = 0; // Mã không hợp lệ
      }
    }

    // Cập nhật giảm giá
    setDiscountAmount(discount);
  };

  // Calculate grand total including shipping and discount
  const calculateGrandTotal = () => {
    const total = calculateTotal();
    return total - discountAmount + shippingFee; // Tổng tiền - Giảm giá + Phí giao hàng
  };

  // Handle shipping method change
  const handleShippingMethodChange = (method: string) => {
    setShippingMethod(method);
    // Set shipping fee based on the chosen method
    const fee = method === "express" ? 50000 : 30000; // Example fees
    setShippingFee(fee);
  };

  // Handle quantity change for items in the cart
  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    applyDiscountCode(); // Cập nhật lại giảm giá khi thay đổi số lượng
  };

  // Handle removing items from the cart
  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    applyDiscountCode(); // Cập nhật lại giảm giá khi xóa sản phẩm
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
        {/* Left column: Products in the cart */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={`http://localhost:3200/uploads/books/${item.cover_image}`} // Corrected line
                    alt={item.title}
                    width={200}  // Width size
                    height={300} // Height size
                    className="object-cover mb-4" 
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

        {/* Right column: Order information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
          <div className="border-b border-gray-300 pb-4">
            <p>Thành tiền: {(calculateTotal() * 1000).toLocaleString("vi-VN")} đ</p>
            <p>Phí giao hàng: {shippingFee.toLocaleString("vi-VN")} đ</p>
            <p>Giảm giá: {(discountAmount * 1000).toLocaleString("vi-VN")} đ</p>
          </div>
          <div className="border-t border-gray-300 pt-4 mb-4">
            <p className="text-lg font-semibold">
              Tổng tiền: {calculateGrandTotal().toLocaleString("vi-VN")} đ
            </p>
          </div>

          {/* Shipping method selection */}
          <div className="mb-4">
            <h3 className="font-semibold">Chọn phương thức giao hàng:</h3>
            <label>
              <input
                type="radio"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={() => handleShippingMethodChange("standard")}
                className="mr-2"
              />
              Giao hàng tiêu chuẩn (30,000 đ)
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="express"
                checked={shippingMethod === "express"}
                onChange={() => handleShippingMethodChange("express")}
                className="mr-2"
              />
              Giao hàng nhanh (50,000 đ)
            </label>
          </div>

          {/* Discount code input */}
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

          <button
            onClick={toggleDiscountDetails}
            className="text-blue-500 hover:underline"
          >
            {isDetailVisible ? "Ẩn chi tiết giảm giá" : "Xem chi tiết giảm giá"}
          </button>

          {/* Discount details */}
          {isDetailVisible && (
            <div className="mt-4 p-4 border border-gray-300">
              <p>Mã giảm giá:</p>
              <ul>
                <li>DISCOUNT10: Giảm 10,000 đ cho đơn hàng từ 130,000 đ</li>
                <li>DISCOUNT20: Giảm 20,000 đ cho đơn hàng từ 280,000 đ</li>
                <li>DISCOUNT50: Giảm 50,000 đ cho đơn hàng từ 550,000 đ</li>
                <li>DISCOUNT100: Giảm 100,000 đ cho đơn hàng từ 1,100,000 đ</li>
              </ul>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={goToProductPage}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Quay lại
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
