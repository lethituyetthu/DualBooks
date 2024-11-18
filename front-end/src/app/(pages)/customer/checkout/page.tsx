"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const customerToken = JSON.parse(
        localStorage.getItem("customer") || "{}"
      );
      setCustomer(customerToken);
    }
  }, []);
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


  // "Error creating order: Error creating order: E11000 duplicate key error collection: DATN.orders index: id_1 dup key: { id: null }"
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

    // Create order object
    const order = {
      customer_id: customer.id,
      items: cartItems,
      total_amount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      paymentMethod: selectedPayment,
      shippingAddress,
      order_type:"online",
      status: "Đã thanh toán", // Adjust this status as needed
    };

    console.log("Đơn hàng sẽ được gửi đến API:", order);

    try {
      // Send order to API using fetch
      const response = await fetch("http://localhost:3200/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi đơn hàng.");
      }

      const responseData = await response.json();
      console.log("Đơn hàng đã được lưu:", responseData);

      // Save order in localStorage
      localStorage.setItem("order", JSON.stringify(order));

      // Show success message
      setIsPaymentSuccess(true);

      // Optional: Clear cart here
      localStorage.removeItem("cart");
      setCartItems([]);

      // Redirect to order success page (optional)
      // router.push('/order-success'); // Uncomment this line if you have an order success page
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
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
          <button className="text-primary" onClick={verifyAddress}>Chỉnh sửa</button>
        </div>
        <p className={`mb-4 ${isAddressVerified ? 'text-green-500' : 'text-red-500'}`}>
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
            Thanh toán khi nhận hàng
          </div>
        </div>

        {/* Order Information */}
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold">Thông tin đơn hàng</h3>

          {/* Display cart items */}
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

          {/* Discount Code Input */}
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            className="w-full border p-2 mb-4"
          />

          <div className="flex justify-between items-center">
            <span>Tổng cộng:</span>
            <span>
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString("vi-VN")} đ
            </span>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePaymentConfirmation}
            className="w-full py-3 bg-primary text-white rounded mt-4"
          >
            Đặt hàng
          </button>
          <div>
          <button onClick={handleBackToCart}>Quay lại giỏ hàng</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
