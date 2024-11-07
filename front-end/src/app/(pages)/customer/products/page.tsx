"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../hook/useFetchBook";
import useFetchCategory from "@/app/hook/useFetchCategory";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  author: string;
}

interface typeBook {
  id: string;
  title: string;
  price: number;
  cover_image: string;
  author: string;
  categoryID: string; // assuming each book has a category ID
}

interface Category {
  _id?: { $oid?: string };
  name: string;
}

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
        categoryID: book.categoryID, // added categoryID to each product
      }));
      setFilteredProducts(mappedProducts);
    }
  }, [books]);

  const handleFilter = () => {
    // Lấy giá trị tối thiểu và tối đa, chuyển thành bội số của 1000
    const min = Math.ceil((parseInt(minPrice) || 0) / 1000) * 1000; // Làm tròn lên bội số của 1000
    const max = Math.floor((parseInt(maxPrice) || Infinity) / 1000) * 1000; // Làm tròn xuống bội số của 1000
  
    // Lọc sản phẩm theo giá và các điều kiện khác
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

    if (categoryId) {
      // Filter books by the selected category
      const filteredByCategory = books.filter(
        (book: typeBook) => book.categoryID === categoryId
      );
      setFilteredProducts(
        filteredByCategory.map((book: typeBook) => ({
          id: book.id,
          name: book.title,
          price: book.price,
          image: book.cover_image,
          author: book.author,
        }))
      );
    } else {
      // If no category is selected, show all products
      setFilteredProducts(
        books.map((book: typeBook) => ({
          id: book.id,
          name: book.title,
          price: book.price,
          image: book.cover_image,
          author: book.author,
        }))
      );
    }
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
      onChange={(e) => {
        // Đảm bảo nhập giá trị là bội số của 1000
        const value = Math.ceil(parseInt(e.target.value || "0") / 1000) * 1000;
        setMinPrice(value.toString());
      }}
      className="border rounded p-2 w-full"
    />
  </div>
  <div className="mb-4">
    <label className="block mb-1">Giá tối đa:</label>
    <input
      type="number"
      value={maxPrice}
      onChange={(e) => {
        // Đảm bảo nhập giá trị là bội số của 1000
        const value = Math.floor(parseInt(e.target.value || "Infinity") / 1000) * 1000;
        setMaxPrice(value.toString());
      }}
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
            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 flex flex-col items-center justify-between"
                  >
                    <Link href={`/customer/product/${product.id}`}>
                      <Image
                        src={`http://localhost:3200/uploads/books/${product.image}`}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="object-cover mb-4"
                      />
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ height: "56px", overflow: "hidden" }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-gray-500"
                        style={{ height: "56px", overflow: "hidden" }}
                      >
                        {product.author}
                      </p>
                      <div
                        className="text-primary-400 text-2xl font-bold mb-4"
                        style={{ height: "56px" }}
                      >
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
