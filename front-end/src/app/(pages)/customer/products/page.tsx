"use client";
import React, { useState, useEffect } from "react";
import useFetchBook from "../../../hook/useFetchBook";
import useFetchCategory from "@/app/hook/useFetchCategory";
import useFavoriteBooks from "@/app/hook/useFetchWishlist";
import { useRouter, useSearchParams } from "next/navigation";

import ProductCard from "./productCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SnackbarProvider } from "notistack";

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
}

interface Category {
  id: string;
  name: string;
}

const ProductPage = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams(); // Lấy thông tin từ URL
  const cateId = searchParams.get("cateId") || "";
  
  
  // Lấy cateId từ URL (nếu có)
  //console.log(cateId)

  const { books, loading, searchBookByCate, searchBooks } =
    useFetchBook();

    
  const { cate }: { cate: Category[] } = useFetchCategory();
  const { wishlist, addToWishlist } = useFavoriteBooks();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    cateId || ""
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

 

 // Tính toán tổng số trang
//  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
const product1 = books.map((book) => ({
  id: book.id,
  name: book.title,
  price: book.price,
  image: book.cover_image,
  author: book.author,
}));


  // Đồng bộ sản phẩm theo danh mục khi cateId thay đổi
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (cateId) {
        // Kiểm tra nếu có cateId
        try {
          const book = await searchBookByCate(cateId);
          if (book && book.length > 0) {
            // Kiểm tra xem có dữ liệu không
            setFilteredProducts(
              book.map((book: typeBook) => ({
                id: book.id,
                name: book.title,
                price: book.price,
                image: book.cover_image,
                author: book.author,
              }))
            );
          } else {
            setFilteredProducts([]); // Không có dữ liệu
          }
        } catch (error) {
          console.error("Error fetching products by category:", error);
          setFilteredProducts([]); // Xóa danh sách nếu xảy ra lỗi
        }
      } else {
        setFilteredProducts([]); // Xóa danh sách nếu không có danh mục
      }
    };

    fetchProductsByCategory();
  }, [cateId]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);

    if (id === "") {
      // Khi chọn "Tất cả", hiển thị toàn bộ sản phẩm
      setFilteredProducts(
        books.map((book: typeBook) => ({
          id: book.id,
          name: book.title,
          price: book.price,
          image: book.cover_image,
          author: book.author,
        }))
      );

      //console.log("all", books);
      if (cateId) {
        // khi có cateId danh mục
        router.push("/customer/products");
      } else {
        // load lại trang khi ko có cate
        window.location.reload();
      }
    } else {
      // Khi chọn danh mục khác, lọc sản phẩm theo danh mục
      const fetchProductsByCategory = async () => {
        try {
          const book = await searchBookByCate(id);
          setFilteredProducts(
            book.map((book: typeBook) => ({
              id: book.id,
              name: book.title,
              price: book.price,
              image: book.cover_image,
              author: book.author,
            }))
          );
        } catch {
          setFilteredProducts([]);
        }
      };
      fetchProductsByCategory();
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    searchBooks(term);
    setFilteredProducts(
      books.map((book: typeBook) => ({
        id: book.id,
        name: book.title,
        price: book.price,
        image: book.cover_image,
        author: book.author,
      }))
    );
    setCurrentPage(1);
  };
  // Áp dụng bộ lọc giá, từ khóa
  const handleFilter = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;

    console.log(min, max);
    const filtered = books
      .filter(
        (product: typeBook) =>
          product.price * 1000 >= min && product.price * 1000 <= max // Điều kiện lọc
      )
      .map((book: typeBook) => ({
        id: book.id,
        name: book.title,
        price: book.price,
        image: book.cover_image,
        author: book.author,
      }));

    setFilteredProducts(filtered);
    setCurrentPage(1); 
  };
  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
  };

// Phân trang

const listProducts = filteredProducts.length === 0 ? product1 : filteredProducts;

const [currentPage, setCurrentPage] = useState<number>(1);
const itemsPerPage = 16;

const totalPages = Math.ceil(listProducts.length / itemsPerPage);


 // Lấy danh sách sản phẩm hiện tại dựa trên `currentPage`
 const currentProducts = listProducts.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
    <div className="max-w-[1200px] m-auto relative">
      <Breadcrumb className="pt-[20px] pl-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/customer">DualBooks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              {cateId
                ? cate.find((category) => category.id === cateId)?.name
                : "Tất cả "}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>sản phẩm</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

    
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4  space-y-6">
          {/* Tìm kiếm */}
          <div className="border p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Tìm kiếm sản phẩm</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              className="border rounded p-2 w-full"
            />
          </div>
           {/* Price Filter */}
           <div className="border p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Lọc Giá</h2>
            <div className="mb-4">
              <label className="block mb-1">Giá tối thiểu:</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Giá tối đa:</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
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
          {/* Category Filter */}
          <div className="border p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Danh mục </h2>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="all"
                name="category"
                value=""
                checked={selectedCategory === ""}
                onChange={() => handleCategoryChange("")}
                className="mr-2"
              />
              <label htmlFor="all" className="cursor-pointer">
                Tất cả
              </label>
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

         
        </div>

        {/* Product grid */}
        <div className="w-3/4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ProductCard
              products={
                currentProducts/* .length === 0 ? product1 : filteredProducts */
              }
              addToWishlist={handleAddToWishlist}
            />
          )}
           <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === index + 1 ? "bg-primary-400 text-white" : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
        </div>
      </div>
      
    </div>
    </SnackbarProvider>
  );
};

export default ProductPage;
