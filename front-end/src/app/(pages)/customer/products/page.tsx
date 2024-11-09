"use client";
<<<<<<< HEAD

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../hook/useFetchBook"; // Sử dụng hook đã viết
=======
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../hook/useFetchBook";
import useFetchCategory from "@/app/hook/useFetchCategory";
>>>>>>> origin/nhathuy
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
<<<<<<< HEAD
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
=======
  author: string;
}

interface typeBook {
  id: string;
  title: string;
  price: number;
  cover_image: string;
  author: string;
}

interface Category {
  _id?: { $oid?: string };
  name: string;
}

const addToWishlist = (product: Product) => {
  const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  // Check if the product already exists in the wishlist
  const isProductInWishlist = existingWishlist.some(
    (item: Product) => item.id === product.id
  );

  if (isProductInWishlist) {
    alert("Sản phẩm đã có trong danh sách yêu thích!");
    return; // Exit the function if the product is already in the wishlist
  }

  // Add the product to the wishlist array
  const updatedWishlist = [...existingWishlist, product];

  // Save the updated wishlist back to localStorage
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  alert("Sản phẩm đã được thêm vào danh sách yêu thích!");
};



const ProductPage = () => {
  const { books, loading, error } = useFetchBook();
  const { cate: categories }: { cate: Category[] } = useFetchCategory();

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (books.length > 0) {
      const mappedProducts: Product[] = books.map((book: typeBook) => ({
        id: book.id,
        name: book.title,
        price: book.price,
        image: book.cover_image,
        author: book.author,
      }));
      setFilteredProducts(mappedProducts);
>>>>>>> origin/nhathuy
    }
  }, [books]);

  const handleFilter = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;

<<<<<<< HEAD
    // Lọc sản phẩm dựa trên giá
    const filtered = filteredProducts.filter(
      (product: Product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm đã lọc
=======
    const filtered = filteredProducts.filter((product) => {
      return (
        product.price >= min &&
        product.price <= max &&
        product.name.toLowerCase().includes(keyword.toLowerCase()) &&
        product.author.toLowerCase().includes(author.toLowerCase())
      );
    });

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Implement filtering logic for selected category
  };

  const handleShowAll = () => {
    setFilteredProducts(
      books.map((book: typeBook) => ({
        id: book.id,
        name: book.title,
        price: book.price,
        image: book.cover_image,
        author: book.author,
      }))
    );
>>>>>>> origin/nhathuy
  };

  return (
    <div className="max-w-[1200px] m-auto relative">
      <div className="flex">
        {/* Sidebar */}
<<<<<<< HEAD
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
=======
        <div className="w-1/4 p-4 bg-gray-100 space-y-6">
          {/* Category Filter */}
          <div className="border p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Nhóm Sản Phẩm</h2>
              <button onClick={handleShowAll}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500 hover:text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
            {categories.map((category) => {
              const categoryId = category._id?.$oid || "";
              return (
                <div key={categoryId} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={categoryId}
                    name="category"
                    value={categoryId}
                    checked={selectedCategory === categoryId}
                    onChange={() => handleCategoryChange(categoryId)}
                    className="mr-2"
                  />
                  <label htmlFor={categoryId} className="cursor-pointer">
                    {category.name}
                  </label>
                </div>
              );
            })}
          </div>

          {/* Price Filter */}
          <div className="border p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Lọc Giá</h2>
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
            <div className="mb-4">
              <label className="block mb-1">Từ khóa:</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            
            <button
              onClick={handleFilter}
              className="bg-primary-400 hover:bg-primary-300 text-white py-2 px-4 rounded w-full mt-4"
            >
              Lọc sản phẩm
            </button>
          </div>
>>>>>>> origin/nhathuy
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
<<<<<<< HEAD
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
=======
                filteredProducts.map((product) => (
                  <div
                  key={product.id}
                  className="relative border p-4 flex flex-col items-center justify-between"
                >
                  {/* Heart Icon */}
                  <button
                    className="absolute top-2 left-2 text-gray-500 hover:text-red-500"
                    onClick={() => addToWishlist(product)} // Function to handle adding to wishlist
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </button>
                
                  <Link href={`/customer/product/${product.id}`}>
                    <Image
                      src={`http://localhost:3200/uploads/books/${product.image}`}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2" style={{ height: "56px", overflow: "hidden" }}>
                      {product.name}
                    </h3>
                    <p className="text-gray-500" style={{ height: "56px", overflow: "hidden" }}>
                      {product.author}
                    </p>
                    <div className="text-primary-400 text-2xl font-bold mb-4" style={{ height: "56px" }}>
                      {(product.price * 1000).toLocaleString("vi-VN") + "đ"}
                    </div>
                  </Link>
                </div>
                
                ))
              ) : (
                <p>Không có sản phẩm nào.</p>
>>>>>>> origin/nhathuy
              )}
            </div>
          )}
        </div>
      </div>
<<<<<<< HEAD

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
=======
>>>>>>> origin/nhathuy
    </div>
  );
};

export default ProductPage;
