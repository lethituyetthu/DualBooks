"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFetchOrder from "@/app/hook/useFetchOder";
import OderItem from "../../staff/component/oderItem";
import { useSnackbar } from "notistack";

type CartItem = {
  _id: string;
  title: string;
  price: number; // Giá sản phẩm
  quantity: number; // Số lượng sản phẩm
  cover_image: string; // Ảnh bìa sản phẩm
};

const CheckoutPaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addOrder, addOrderItem } = useFetchOrder();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("Tiền mặt");
  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [shippingFee, setShippingFee] = useState<number>(30);
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [isAddressVerified, setIsAddressVerified] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const customerToken = JSON.parse(
        localStorage.getItem("customer") || "{}"
      );
      setCustomer(customerToken);
      setShippingAddress(customerToken.address || "");
    }
  }, []);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      setCartItems(parsedData.cartItems);
    }
  }, [searchParams]);

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const calculateTotalQuantity = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleShippingMethodChange = (method: string) => {
    setShippingMethod(method);
    setShippingFee(method === "express" ? 50 : 30);
  };

  const verifyAddress = () => {
    if (shippingAddress.trim() !== "") {
      setIsAddressVerified(true);
      enqueueSnackbar("Địa chỉ đã được xác nhận.", {
        variant: "success",
        autoHideDuration: 1500,
      });
    } else {
      alert("Vui lòng nhập địa chỉ hợp lệ.");
      setIsAddressVerified(false);
    }
  };

  const handlePaymentSelection = (method: string) => {
    setSelectedPayment(method);
  };

  const handlePaymentConfirmation = async () => {
    if (!shippingAddress.trim()) {
      enqueueSnackbar("Vui lòng nhập địa chỉ giao hàng.", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }

    if (!isAddressVerified) {
      enqueueSnackbar("Vui lòng xác thực địa chỉ giao hàng.", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }

    if (!shippingMethod) {
      enqueueSnackbar("Vui lòng chọn phương thức vận chuyển.", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.");
      return;
    }
    const totalAmount = calculateTotal() + shippingFee;
    const order = {
      customer_id: customer?.id,
      cartItems,
      total_amount: totalAmount,
      total_quantity: calculateTotalQuantity(),
      payment_method: selectedPayment,
      shipping_address: shippingAddress,
      payment_status: "Chưa thanh toán",
      order_type: "online",
      status: "Chờ xác nhận",
    };

    //console.log("Đơn hàng được gửi:", calculateTotal() + shippingFee);

    try {
      const response = await addOrder(order);
      console.log(response.data);
      const orderId = response.data._id;

      console.log("odr", cartItems);

      for (const item of cartItems) {
        const orderItemData = {
          book_id: item.id,
          quantity: item.quantity,
          price: item.price,
        };
        await addOrderItem(orderId, orderItemData);
      }

      enqueueSnackbar("Thanh toán thành công!", {
        variant: "success",
        autoHideDuration: 1500,
      });
      localStorage.removeItem("cart");
      router.push("/customer");
      setIsPaymentSuccess(true);
    } catch (err) {
      console.error("Tạo đơn hàng thất bại:", err);
    }
  };

  const handleBackToCart = () => {
    router.push("/customer/cart");
  };

  return (
    <>
      <p className="text-center text-3xl py-6 font-bold text-primary-600 font-itim">
        Đơn Hàng Của Bạn
      </p>
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md">
        <div className="p-4 bg-white shadow-lg rounded-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Địa chỉ giao hàng
          </h2>
          {customer && (
            <div className="mb-4 text-gray-600 ">
              <p>
                <strong>Họ tên:</strong> {customer.name}
              </p>
              <p>
                <strong>Email:</strong> {customer.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {customer.phone}
              </p>
            </div>
          )}

          <textarea
            placeholder="Nhập địa chỉ giao hàng"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring focus:ring-primary-300 mb-4"
            rows={3}
          />
          <button
            onClick={verifyAddress}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
          >
            Xác nhận địa chỉ giao hàng
          </button>

          <hr className="my-4 border-gray-200" />

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Phương thức giao hàng
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition-all">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="standard"
                  checked={shippingMethod === "standard"}
                  onChange={() => handleShippingMethodChange("standard")}
                  className="mr-3 accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    Giao hàng tiêu chuẩn
                  </p>
                  <p className="text-sm text-gray-500">Giao từ 3 - 5 ngày</p>
                </div>
              </div>
              <p className="text-gray-700 font-medium">30.000 đ</p>
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition-all">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="express"
                  checked={shippingMethod === "express"}
                  onChange={() => handleShippingMethodChange("express")}
                  className="mr-3 accent-blue-600"
                />
                <div>
                  <p className="font-medium text-gray-800">Giao hàng nhanh</p>
                  <p className="text-sm text-gray-500">Giao từ 1 - 2 ngày</p>
                </div>
              </div>
              <p className="text-gray-700 font-medium">50.000 đ</p>
            </label>
          </div>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-md flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Phương thức thanh toán
            </h2>
            <div className="space-y-4 text-gray-600">
              <label className="block">
                <input
                  type="radio"
                  value="Tiền mặt"
                  checked={selectedPayment === "Tiền mặt"}
                  onChange={() => handlePaymentSelection("Tiền mặt")}
                  className="mr-2"
                />
                Thanh toán khi nhận hàng
              </label>
            </div>

            <hr className="my-4 border-gray-200" />

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tóm tắt đơn hàng
            </h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-600 mb-2"
              >
                <span className="w-[80%]">
                  {item.title} x {item.quantity}
                </span>
                <span className="text-nowrap">
                  {(item.price * item.quantity * 1000).toLocaleString("vi-VN")}{" "}
                  đ
                </span>
              </div>
            ))}

            <div className="flex justify-between mt-4 text-gray-800">
              <strong>Tổng cộng:</strong>
              <strong>
                {((calculateTotal() + shippingFee) * 1000).toLocaleString(
                  "vi-VN"
                )}{" "}
                đ
              </strong>
            </div>

            <div className="flex justify-between mt-4 text-gray-800">
              <strong>Tổng sản phẩm:</strong>
              <strong>{calculateTotalQuantity()}</strong>
            </div>
          </div>

          {/* Nút cố định ở cuối */}
          <div className="mt-6">
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
        </div>
      </div>
    </>
  );
};

export default CheckoutPaymentPage;
