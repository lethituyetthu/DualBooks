"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFethWishList from "../../../hook/useFetchWishlist";
import useAddToCart from "../../../hook/useAddToCard";
import Link from "next/link";
import img from "@/app/publics/banner/1003263114617edaa6d7617f1f23ac93.jpg";

interface Product {
  _id: string;
  name: string;
  title: string;
  price: number;
  cover_image: string;
  author: string;
}

const Favorites = () => {
  const { wishlist, message, handleRemoveFromWishlist } = useFethWishList();
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const updateCartCount = () => {
    const cart = localStorage.getItem("cart");
    const cartData = cart ? JSON.parse(cart) : [];
    setCartCount(cartData.length);
  };

  const addToCart = useAddToCart(updateCartCount);

  useEffect(() => {
    updateCartCount();
  }, [wishlist]);

  const totalPages = Math.ceil(wishlist.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentProducts = wishlist.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className=" min-h-screen">
      <div className="flex items-start">
        <div className="w-full md:w-2/5">
          <Image
            src={img}
            height={1000}
            width={1000}
            alt="banner"
            className="w-full h-auto  object-cover"
          />
        </div>
        <div className="w-full md:w-3/5 pl-10  mx-auto">
          {message && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded shadow-md">
              {message}
            </div>
          )}

          {wishlist.length > 0 ? (
            <>
              <h2 className="text-center font-itim text-3xl font-bold text-primary-400 my-10">
              Sách yêu thích, câu chuyện không thể bỏ qua
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mx-5 ">
                {currentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border p-3 bg-white relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[180px]"
                  >
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="absolute top-1 right-1 text-sm p-1 text-red-500 hover:text-red-900"
                      aria-label="Remove from wishlist"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <Image
                      src={`http://localhost:3200/uploads/books/${product.cover_image}`}
                      alt={product.title}
                      width={400}
                      height={150}
                      className="object-cover mb-4 rounded-md max-h-[150px]"
                    />
                    <Link href={`/customer/product/${product._id}`}>
                      <h3 className="text-sm mb-2 text-center line-clamp-2 h-10 max-w-[90%] mx-auto">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-center line-clamp-2 text-sm h-5">
                      {product.author}
                    </p>
                    <div className="flex justify-between items-center my-1 max-w-[80%] mx-auto">
                      <div className="text-primary-400 text-sm font-bold">
                        {(product.price * 1000).toLocaleString("vi-VN") + "đ"}
                      </div>
                      <button
                        onClick={() => {
                          addToCart(product);
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
                        }}
                        className="bg-primary-400 text-white p-1 rounded-lg hover:bg-primary-300 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center my-10">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-primary-400 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Chưa có sản phẩm yêu thích.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
