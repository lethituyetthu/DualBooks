"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../hook/useFetchBook";
import useFetchCategory from "@/app/hook/useFetchCategory";
import useFavoriteBooks from "@/app/hook/useFetchWishlist";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  _id?: string;
  name: string;
  title?: string; // Bổ sung thuộc tính này
  price: number;
  image: string;
  cover_image?: string; // Bổ sung thuộc tính này
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
  id: string;
  name: string;
}

const ProductPage = () => {
  const route = useRouter();
  const { books, loading, error, searchBookByCate, categoryBook } =
    useFetchBook();
  const { cate }: { cate: Category[] } = useFetchCategory();
  const { message, wishlist, addToWishlist } = useFavoriteBooks(); // Sử dụng hàm addToWishlist từ hook
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [author] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Kiểm tra nếu sản phẩm đã có trong wishlist
  const isFavorite = (productId: string) =>
    wishlist.some((item: Product) => item.id === productId);
  useEffect(() => {
    if (books.length > 0) {
      const mappedProducts: Product[] = books.map((book: typeBook) => ({
        id: book.id,
        name: book.title,
        title: book.title, // Cung cấp thuộc tính `title`
        price: book.price,
        image: book.cover_image,
        cover_image: book.cover_image, // Cung cấp thuộc tính `cover_image`
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

  const handleCategoryChange = async (id: string) => {
    try {
      await searchBookByCate(id); // Chờ searchBookByCate hoàn thành
      setFilteredProducts(books); // Sau đó cập nhật filteredProducts
      console.log("ID danh mục:", id);
      console.log("Sách theo danh mục:", categoryBook);
    } catch (error) {
      console.error("Lỗi khi thay đổi danh mục:", error);
    }
  };

  //console.log(cate)
  const handleShowAll = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-[1200px] m-auto relative">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 p-4">
        <a href="/customer" className="hover:text-gray-900">
          Trang chủ
        </a>
        <span>/</span>
        <a href="/customer/products/" className="hover:text-gray-900">
          Sản phẩm
        </a>
        <span>/</span>
        <span className="text font-semibold text-primary-400">
          Danh sách sản phẩm
        </span>
      </nav>
      {/* Thêm thông báo ở đây */}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded shadow-md">
          {message}
        </div>
      )}
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

            {cate.map((category) => {
              return (
                <div key={category.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={category.id}
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={category.id} className="cursor-pointer">
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
                      <p className="text-sm text-gray-500 mb-2 text-nowrap w-32 truncate mx-auto">
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
