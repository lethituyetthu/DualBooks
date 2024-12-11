"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  image: string;
  cover_image: string;
}

const CategoryProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  useEffect(() => {
    if (categoryId) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(
            `http://localhost:3200/books/category/${categoryId}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await res.json();
          setProducts(data);
        } catch (err) {
          console.error("Error fetching products:", err);
          setError("Error fetching products");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [categoryId]);

  if (!categoryId) {
    return <div className="text-red-500">Invalid category ID</div>;
  }

  if (loading) {
    return <div className="text-gray-500">Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  
  return (
    <div className="max-w-[1200px] mx-auto">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 p-4">
        <a href="/customer" className="hover:text-gray-900">
          Trang chủ
        </a>
        <span>/</span>
        <a href="/customer/products/" className="hover:text-gray-900">
          Sản phẩm
        </a>
        <span>/</span>
        <span className="text font-semibold text-primary-400">Danh mục</span>
      </nav>
      <h1 className="text-2xl font-bold mb-6">
        Sản phẩm trong danh mục {categoryId}
      </h1>
      <div className="grid grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="relative border rounded-lg shadow-md p-4 bg-white flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              {product.image ? (
                <Image
                  src={`http://localhost:3200/uploads/categories/${product.image}`}
                  width={200}
                  height={200}
                  alt={product.name || "No Name"}
                  className="rounded-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                  {product?.cover_image}
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <h3 className="text-xl font-bold mt-4">{product?.title || "Unnamed Product"}</h3>
              <p className="text-sm text-gray-600">{product.description || "No description available"}</p>
              <p className="text-lg font-semibold text-green-600">${product.price ? product.price.toFixed(2) : "0.00"}</p>
              {/* Add to Wishlist Button */}
              <button className="absolute top-3 left-3 bg-white rounded-full p-2 shadow hover:shadow-md transition text-gray-500 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75l6.75 6.75L18.75 6.75" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">Không có sản phẩm trong danh mục</div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductList;
