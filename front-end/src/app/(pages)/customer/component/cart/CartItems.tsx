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
      <div className="text-center text-gray-600">
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-96 overflow-hidden overflow-y-auto">
      {cartItems?.map((item) => (
        <div
          key={item.id}
          className="flex items-center bg-white shadow rounded-lg p-4"
        >
          <Image
            src={`http://localhost:3200/uploads/books/${item.cover_image}`}
            alt={item.title}
            width={100}
            height={150}
            className="rounded-lg"
          />
          <div className="ml-4 flex-grow">
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-gray-500 mt-1">
              Giá: {(item.price * 1000).toLocaleString("vi-VN")} đ
            </p>
            <div className="mt-3 flex items-center">
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
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => onRemoveItem(item.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
