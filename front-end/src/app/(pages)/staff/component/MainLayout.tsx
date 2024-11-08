"use client";

import React from "react";
import useFetchBook from "../../../hook/useFetchBook";

//import Image from "next/image";

const BookStoreLayout: React.FC = () => {
  const { books, loading, error } = useFetchBook();
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to truncate book title
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#FBF3E9]">
      {/* Main content */}
      <div className="flex flex-1">
        
        {/* canh lề trái */}
        <div className="w-3/5 p-3 bg-[#FBF3E9]"></div>
        {/* <div className="mt-4 bg-[#F4D7B5] p-4 rounded-lg items-center justify-between items-center">
            <p className="font-bold">Tổng tiền sản phẩm</p>
            <p>{cartItems.length} món</p>
            <p className="font-semibold">{totalPrice.toLocaleString()}₫</p>
          </div> */}
        {/* canh lề phải */}
        <div className="w-[500px] bg-white p-3 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Mã sản phẩm"
            className="w-full p-2 mb-4 rounded border border-gray-300"
          />

          {/* chia ô thành 3x3 */}
          <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[470px]">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-50 p-2 rounded-lg shadow-md flex items-center space-x-3"
              >
                <img
                  src={book.cover_image}
                  alt="description"
  width={500}
  height={300}
  formats={['image/webp']}
                  className="w-16 h-24 object-cover rounded"
                />
                <div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg ">
                <p className="text-sm font-semibold mt-2">
                  {truncateTitle(book.title, 20)}
                </p>
                <p className="text-sm font-bold text-red-500">
                  {book.price.toLocaleString()}₫
                </p>
            </div>
                </div>
              </div>
            ))}
          </div>

          {/* thanh toán */}
          

          <button className="w-full mt-4 py-2 bg-[#A05D3A] text-white rounded-lg hover:bg-[#8C4C2F]">
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookStoreLayout;

