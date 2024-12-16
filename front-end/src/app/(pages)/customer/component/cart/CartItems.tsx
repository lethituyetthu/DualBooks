import React from "react";
import Image from "next/image";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  cover_image: string;
};

interface CartItemListProps {
  cartItems: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItems: React.FC<CartItemListProps> = ({
  cartItems,
  onQuantityChange,
  onRemoveItem,
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="text-center text-gray-600 min-h-96">
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-96 overflow-hidden overflow-y-auto">
      {cartItems?.map((item) => (
        <div
          key={item.id}
          className="flex items-center bg-white shadow rounded-lg p-4 space-x-4"
        >
          {/* Cột 1: Hiển thị hình ảnh */}
      <div className="flex-shrink-0">
        <Image
          src={`http://localhost:3200/uploads/books/${item.cover_image}`}
          alt={item.title}
          width={100}
          height={150}
          className="rounded-lg"
        />
      </div>
            {/* Cột 2: Hiển thị tên và giá */}
      <div className="flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
        <p className="text-gray-500 mt-1">
          Giá: {(item.price * 1000).toLocaleString("vi-VN")} đ
        </p>
      </div>

      {/* Cột 3: Hiển thị tổ hợp nút thay đổi số lượng */}
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-l"
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="border px-4 py-1">{item.quantity}</span>
        <button
          className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-r"
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
         {/* Cột 4: Hiển thị tổng giá tiền cho sản phẩm */}
      <div className="text-lg font-semibold text-gray-700">
        {(item.price * 1000 * item.quantity).toLocaleString("vi-VN")} đ
      </div>

      {/* Nút Xóa */}
      <button
        className="ml-4 text-red-500 hover:text-red-700"
        onClick={() => onRemoveItem(item.id)}
      >
        Xóa
      </button>
    </div>
      ))}
    </div>
  );
};

export default CartItems;
