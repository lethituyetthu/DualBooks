"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
};

const CheckoutPaymentPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [isAddressVerified, setIsAddressVerified] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);

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

  // Function to handle payment confirmation
  const handlePaymentConfirmation = async () => {
    if (!shippingAddress.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    if (!isAddressVerified) {
      alert("Vui lòng xác thực địa chỉ giao hàng.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.");
      return;
    }

    // const customerId = localStorage.getItem("customerId");
    // if (!customerId) {
    //   alert("Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập.");
    //   return;
    // }
    const customerId = 2;

    // Create order object
    const order = {
      id: Date.now().toString(),
      customer_id: customerId,
      items: cartItems,
      total_amount: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) - discountAmount, // Apply discount
      paymentMethod: selectedPayment,
      shipping_address: shippingAddress,
      status: "Đã thanh toán",
    };

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3200/orders", order);
      console.log("Đơn hàng đã được lưu:", response.data);

      localStorage.setItem("order", JSON.stringify(order));
      setIsPaymentSuccess(true);

      // Clear cart
      localStorage.removeItem("cart");
      setCartItems([]);

      // Redirect to order success page (optional)
      router.push("/order-success");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Lỗi khi gửi đơn hàng:", error.response.data);
      } else {
        console.error("Lỗi không phải từ Axios:", error);
      }
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to navigate back to the cart page
  const handleBackToCart = () => {
    router.push("/customer/cart");
  };

  // Function to verify the address
  const verifyAddress = () => {
    if (shippingAddress.trim() !== "") {
      setIsAddressVerified(true);
      alert("Địa chỉ đã được xác thực.");
    } else {
      alert("Vui lòng nhập địa chỉ hợp lệ.");
      setIsAddressVerified(false);
    }
  };

  // Function to handle discount code input
  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    // Example discount validation: If the code is "DISCOUNT10", apply a 10% discount
    if (discountCode === "DISCOUNT10") {
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const discount = totalAmount * 0.1; // 10% discount
      setDiscountAmount(discount);
      alert("Mã giảm giá đã được áp dụng!");
    } else {
      setDiscountAmount(0);
      alert("Mã giảm giá không hợp lệ.");
    }
  };

  return (
    <div className="max-w-[1200px] m-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {isPaymentSuccess && (
        <div className="p-4 mb-4 bg-green-200 text-green-800 rounded">
          Thanh toán thành công! Cảm ơn bạn đã đặt hàng.
        </div>
      )}

      {/* Column for Shipping Address */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-4">Địa chỉ giao hàng</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600">Địa chỉ thanh toán</p>
          <button className="text-primary" onClick={verifyAddress}>
            Chỉnh sửa
          </button>
        </div>
        <p
          className={`mb-4 ${
            isAddressVerified ? "text-green-500" : "text-red-500"
          }`}
        >
          {isAddressVerified ? "Địa chỉ đã xác thực" : "Chưa xác thực"}
        </p>
        <input
          type="text"
          placeholder="Nhập địa chỉ giao hàng"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        {/* Separator */}
        <hr className="border-gray-300 my-4" />

        {/* Shipping Methods */}
        <div className="border p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Chọn phương thức giao hàng</h3>
          <div className="border-b mb-4 pb-2">
            <h4 className="text-md font-semibold">Giao hàng tiêu chuẩn</h4>
            <p>Nhận vào: 20/10/2024 - 22/10/2024</p>
            <p>Phí: 30,000 đ</p>
          </div>
          <div className="border-b mb-4 pb-2">
            <h4 className="text-md font-semibold">Giao hỏa tốc</h4>
            <p>Nhận vào: 18/10/2024 - 19/10/2024</p>
            <p>Phí: 50,000 đ</p>
          </div>
        </div>
      </div>

      {/* Column for Payment Method Selection */}
      <div>
        <div className="mb-4">
          <Image
            src="http://localhost:3200/uploads/books/1728314472597-447946428.webp"
            alt="Book Cover"
            layout="responsive"
            width={500}
            height={750}
            priority
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-black">Chọn phương thức thanh toán</h2>
          <button className="text-primary">Xem tất cả</button>
        </div>

        {/* Payment Methods */}
        <div className="mb-4">
          <div
            onClick={() => handlePaymentSelection("momo")}
            className={`p-4 border mb-2 ${
              selectedPayment === "momo" ? "border-primary" : "border-gray-300"
            }`}
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
            className={`p-4 border mb-2 ${
              selectedPayment === "zalopay"
                ? "border-primary"
                : "border-gray-300"
            }`}
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
            className={`p-4 border ${
              selectedPayment === "card" ? "border-primary" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === "card"}
              onChange={() => handlePaymentSelection("card")}
              className="mr-2"
            />
            Thẻ tín dụng / Thẻ ghi nợ
          </div>
          <div
            onClick={() => handlePaymentSelection("cod")}
            className={`p-4 border ${
              selectedPayment === "cod" ? "border-primary" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedPayment === "cod"}
              onChange={() => handlePaymentSelection("cod")}
              className="mr-2"
            />
            Thanh toán khi nhận hàng (COD)
          </div>
        </div>
      </div>

      {/* Discount Code Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Mã giảm giá</h3>
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={discountCode}
          onChange={handleDiscountCodeChange}
          className="w-full border p-2 mb-2"
        />
        <button
          onClick={applyDiscount}
          className="bg-primary text-white p-2 rounded"
        >
          Áp dụng
        </button>
      </div>

      {/* Order Summary */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Tổng đơn hàng</h3>
        <ul className="list-none p-0">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>{item.price * item.quantity} đ</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <span className="font-semibold">Tổng cộng:</span>
          <span className="font-semibold">
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) - discountAmount} đ
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBackToCart}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Quay lại giỏ hàng
        </button>
        <button
          onClick={handlePaymentConfirmation}
          className="bg-primary text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
