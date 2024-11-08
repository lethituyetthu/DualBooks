"use client";

import React, { useState } from "react";
import Image from "next/image";
import useFetchBook from "@/app/hook/useFetchBook";
import CartItem from "./component/cartItem";

const Staff: React.FC = () => {
  const { books, loading, error } = useFetchBook();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product: "Sống để kể lại những anh hùng",
      quantity: 1,
      price: 250000,
    },
    {
      id: 2,
      product: "Sống để kể lại những anh hùng",
      quantity: 1,
      price: 250000,
    },
    {
      id: 3,
      product: "Sống để kể lại những anh hùng",
      quantity: 1,
      price: 250000,
    },
    {
      id: 4,
      product: "Sống để kể lại những anh hùng",
      quantity: 1,
      price: 250000,
    },
    {
      id: 5,
      product: "Sống để kể lại những anh hùng",
      quantity: 1,
      price: 250000,
    },
  ]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-600">Error: {error}</div>
    );
  }

  // Function to truncate book title
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div className="min-h-screen flex  bg-light-50">
      <div className="w-4/5 p-3 ">
        <div className=" bg-white p-6 rounded-lg shadow-md">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              product={item.product}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
          <div className="flex justify-between mt-6 font-semibold">
            <span>Tổng tiền sản phẩm:</span>
            <span>
              {totalQuantity} {totalQuantity === 1 ? "sản phẩm" : "sản phẩm"}
            </span>
            <span>{totalPrice.toLocaleString()} đ</span>
          </div>
        </div>
      </div>

      <div className=" bg-white p-5 rounded-md shadow-lg">
        <input
          type="text"
          placeholder="Nhập mã sản phẩm"
          className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A05D3A]"
        />

        <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[60%]">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-50 p-2 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <Image
                src={`http://localhost:3200/uploads/books/${book.cover_image}`}
                alt={book.title}
                width={500}
                height={300}
                className="w-32 h-48 object-cover rounded mb-2"
              />
              <p className="text-sm  text-center h-10">
                {truncateTitle(book.title, 20)}
              </p>
              <p className="text-sm text-primary-700 fo">
                {(book.price * 1000).toLocaleString("vi-VN") + "đ"}
              </p>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 bg-[#A05D3A] text-white rounded-lg hover:bg-[#8C4C2F] transition-colors">
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default Staff;
