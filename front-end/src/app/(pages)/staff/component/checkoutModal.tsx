import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/app/publics/ma_qr.png"
interface typeCheckout {
  cartItems: {
    id: string;
    product: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  totalQuantity: number;
  onClose: () => void;
}

const CheckoutModal: React.FC<typeCheckout> = ({
  cartItems,
  totalPrice,
  totalQuantity,
  onClose,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    console.log("cartItems trong CheckoutModal:", cartItems);
  }, [cartItems]);

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <div className="fixed inset-0 flex items-stretch justify-end bg-black bg-opacity-50 z-50">
      <div className="bg-white w-3/4 max-w-lg p-6 relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          ✕
        </button>

        <div className="flex items-center border-b border-gray-300 pb-2 mb-4">
          <h2 className="text-center font-itim text-primary-600 font-semibold text-2xl">
            Thanh Toán
          </h2>
          <p className="ml-4 text-gray-600 text-sm text-center">
            {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Bảng sản phẩm */}
        <div className="space-y-4 mb-4 overflow-y-auto h-[24rem]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 ">Sản phẩm</th>
                <th className="py-3 px-3">Giá</th>
                <th className="py-3 px-3 text-nowrap">SL</th>
                <th className="py-3 text-right">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="">
                  <td className="py-3 pr-4">{item.product}</td>
                  <td className="py-3 text-nowrap">
                    {(item.price * 1000).toLocaleString("vi-VN")}
                  </td>
                  <td className="py-3 text-nowrap text-center">x{item.quantity}</td>
                  <td className="py-3 text-right text-nowrap ">
                    {(item.price * item.quantity * 1000).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-300 pt-2 space-y-2">
          <div className="flex justify-between">
            <span>Tổng tiền hàng</span>
            <span>{totalQuantity} sản phẩm</span>
            <span className="text-nowrap">
              {(totalPrice * 1000).toLocaleString("vi-VN")} đ
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Thành tiền</span>
            <span>{(totalPrice * 1000).toLocaleString("vi-VN")} đ</span>
          </div>
        </div>

        <div className="mt-4">
          <p>Phương thức thanh toán</p>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="cash"
                onChange={() => handlePaymentChange("cash")}
              />
              <span>Tiền mặt</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="transfer"
                onChange={() => handlePaymentChange("transfer")}
              />
              <span>Chuyển khoản</span>
            </label>
          </div>
        </div>

        {/* Hiển thị mã QR khi chọn "Chuyển khoản" */}
        {paymentMethod === "transfer" && (
          <div className="mt-4 text-center">
            <p className="text-primary-600 font-semibold">Quét mã QR để thanh toán</p>
            <Image 
              width={500}
              height={400}
              src={logo}
              alt="Mã QR thanh toán"
              className="mx-auto mt-2 w-40 h-40"
            />
            <p className="text-gray-600 text-sm mt-2">Vui lòng quét mã để thanh toán qua ví MoMo.</p>
          </div>
        )}

        <button
          className="w-full mt-4 py-2 bg-[#A05D3A] text-white rounded-lg hover:bg-[#8C4C2F] transition-colors"
          onClick={onClose}
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;