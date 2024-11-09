"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../hook/useFetchBook"; // Sử dụng hook đã viết
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductPage = () => {
  const { books, loading, error } = useFetchBook(); // Lấy danh sách sách từ hook
  const [minPrice, setMinPrice] = useState<string>(""); // Giá tối thiểu
  const [maxPrice, setMaxPrice] = useState<string>(""); // Giá tối đa
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Sản phẩm đã lọc

  useEffect(() => {
    if (books.length > 0) {
      // Chuyển đổi từ typeBook sang Product
      const mappedProducts = books.map((book) => ({
        id: book.id,
        name: book.title, // Dùng title của book làm name cho product
        price: book.price,
        image: book.cover_image, // Dùng cover_image của book làm image cho product
      }));
      setFilteredProducts(mappedProducts); // Gán danh sách sản phẩm đã chuyển đổi
    }
  }, [books]);

  const handleFilter = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;

    // Lọc sản phẩm dựa trên giá
    const filtered = filteredProducts.filter(
      (product: Product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm đã lọc
  };

  return (
    <div className="max-w-[1200px] m-auto relative">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-lg font-bold mb-4">Nhóm Sản Phẩm</h2>
          <div className="mb-4">
            <label className="block mb-1">Giá tối thiểu:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Giá tối đa:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Lọc sản phẩm
          </button>
        </div>

        {/* Product grid */}
        <div className="w-3/4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const imageUrl = `http://localhost:3200/uploads/books/${product.image}`; // Đường dẫn tới hình ảnh
                  return (
                    <div
                      key={product.id}
                      className="border p-4 flex flex-col items-center justify-between"
                    >
                      <Link href={`/customer/product/${product.id}`} className="text-center"> {/* Chuyển className vào đây */}
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="object-cover mb-4 cursor-pointer"
                        />
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-700 mb-4">Giá: {product.price} VNĐ</p>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p>No products available</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Giỏ hàng icon */}
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProductPage;
