"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../hook/useFetchBook";
import useFetchCategory from "@/app/hook/useFetchCategory";
import Link from "next/link";

const addToWishlist = (product: Product) => {
  const existingFavorites = localStorage.getItem("favorites");
  const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

  // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách yêu thích
  if (!favorites.some((item: Product) => item.id === product.id)) {
    favorites.push(product); // Thêm sản phẩm vào danh sách
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Sản phẩm đã được thêm vào danh sách yêu thích!");
  } else {
    alert("Sản phẩm này đã có trong danh sách yêu thích!");
  }
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
    }
  }, [books]);

  const handleFilter = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;

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
  };

  return (
    <div className="max-w-[1200px] m-auto relative">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4  space-y-6">
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
        </div>

        {/* Product grid */}
        <div className="w-3/4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative border rounded-lg shadow-md p-4 bg-white flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Heart Icon */}
                    <button
                      className="absolute top-3 left-3 bg-white rounded-full p-2 shadow hover:shadow-md transition text-gray-500 hover:text-red-500"
                      onClick={() => addToWishlist(product)} // Function to handle adding to wishlist
                      aria-label="Add to wishlist"
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

                    {/* Product Link */}
                    <Link
                      href={`/customer/product/${product.id}`}
                      className="w-full text-center"
                    >
                      {/* Image */}
                      <div className="w-full overflow-hidden rounded-lg">
                        <Image
                          src={`http://localhost:3200/uploads/books/${product.image}`}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="object-cover mb-4 w-full h-[200px]"
                        />
                      </div>

                      {/* Product Name */}
                      <p className="text-l font-semibold mb-2 line-clamp-2 h-[48px] text-gray-800">
                        {product.name}
                      </p>

                      {/* Author */}
                      <p className="text-sm text-gray-500 mb-2 text-nowrap w-32 truncate mx-auto" >
                        {product.author}
                      </p>

                      {/* Price */}
                      <div className="text-primary-500 text-xl text-primary-400 font-bold">
                        {(product.price * 1000).toLocaleString("vi-VN") + "đ"}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nào.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
