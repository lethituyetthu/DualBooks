"use client";

import useFetchBook from "@/app/hook/useFetchBook";
import useFetchCategory from "@/app/hook/useFetchCategory";
import Product from "../../component/product";
import Link from "next/link";
import { useState } from "react";
import SearchProduct from "@/components/ui/searchProduct_byName";

const ProductList = () => {
  const { booksAll, loading, error, searchBooksAll } = useFetchBook();
  const { cate } = useFetchCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({
    category: "asc",
    price: "asc",
    quantity: "asc",
    time: "asc",
  });

  // Định dạng thời gian
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Hàm xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    searchBooksAll(term);
  };

  // Hàm sắp xếp sản phẩm theo từng cột
  const handleSort = (column: string) => {
    const newOrder = sortOrder[column] === "asc" ? "desc" : "asc";
    setSortOrder((prev) => ({
      ...prev,
      [column]: newOrder,
    }));

    // Sắp xếp danh sách sản phẩm
    booksAll.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (newOrder === "asc") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else {
        if (valueA < valueB) return 1;
        if (valueA > valueB) return -1;
      }
      return 0;
    });
  };

  const renderSortIcon = (column: string) => {
    if (sortOrder[column] === "asc") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 ml-2 text-white font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 15l-7.5-7.5L4.5 15"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 ml-2 text-white font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 9l-7.5 7.5L4.5 9"
          />
        </svg>
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sản Phẩm</h1>
        <div className="flex items-center">
          {/* Ô tìm kiếm sản phẩm */}
          <SearchProduct
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <Link
            href={"/admin/addPro"}
            className="bg-primary-400 hover:bg-primary-300 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            Sản Phẩm Mới
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-primary-400 text-light-50">
            <tr>
              <th className="px-6 py-4 text-nowrap">Hình ảnh</th>
              <th className="px-6 py-4 text-nowrap">Tiêu đề</th>
              <th className="px-6 py-4 text-nowrap">Tác giả</th>
              <th className="px-6 py-4 text-nowrap">Danh mục</th>
              <th className="px-6 py-4 text-nowrap">
                Giá
                <button className="text-white" onClick={() => handleSort("price")}>
                  {renderSortIcon("price")}
                </button>
              </th>
              <th className="px-6 py-4 text-nowrap">
                Tồn kho
                <button onClick={() => handleSort("stock")}>
                  {renderSortIcon("stock")}
                </button>
              </th>
              <th className="px-6 py-4 text-nowrap">
                Thời gian
                <button onClick={() => handleSort("updated_at")}>
                  {renderSortIcon("updated_at")}
                </button>
              </th>
              <th className="px-6 py-4 text-nowrap">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {booksAll.map((product) => (
              <Product
                key={product.id}
                product={product}
                formatDateTime={formatDateTime}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
