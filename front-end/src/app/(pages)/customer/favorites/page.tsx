"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  author: string;
}

const Favorites = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("favorites") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleAddToWishlist = (product: Product) => {
    const isProductInWishlist = wishlist.some((item) => item.id === product.id);

    if (isProductInWishlist) {
      setMessage("Sản phẩm đã có trong yêu thích.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      setMessage("Sản phẩm đã được thêm vào yêu thích.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    setMessage("Sản phẩm đã được xóa khỏi yêu thích.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-[1200px] m-auto px-4 py-6">
      <h1 className="text-center text-3xl font-bold mb-8 text-primary-400 font-itim">Sản phẩm yêu thích</h1>

      {/* Display notification message */}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded shadow-md">
          {message}
        </div>
      )}

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border p-3 relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[280px]"
            >
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
                aria-label="Remove from wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                  <path
                    fillRule="evenodd"
                    d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Image
                src={`http://localhost:3200/uploads/books/${product.image}`}
                alt={product.name}
                width={280}
                height={180}
                className="object-cover mb-4 rounded-md"
              />
              <h3
                className="text-lg font-semibold mb-2 text-center"
                style={{ height: "56px", overflow: "hidden" }}
              >
                {product.name}
              </h3>
              <p
                className="text-gray-500 mb-2 text-center"
                style={{ height: "56px", overflow: "hidden" }}
              >
                {product.author}
              </p>
              <div className="flex justify-center mb-4">
                <div className="text-primary-400 text-2xl font-bold">
                  {(product.price * 1000).toLocaleString("vi-VN") + "đ"}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="bg-transparent border border-primary-600 hover:bg-primary-300 hover:text-light-100 text-primary-600 px-6 py-2 rounded"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Chưa có sản phẩm yêu thích.</p>
      )}
    </div>
  );
};

export default Favorites;
