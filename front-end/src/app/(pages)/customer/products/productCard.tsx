import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  author: string;
}

interface ProductCardProps {
  products: Product[];
  addToWishlist: (product: Product) => void;
}

export default function ProductCard({
  products,
  addToWishlist,
}: ProductCardProps) {
  /* console.log(
    "dd",
    products.map((book: typeBook) => ({
      id: book.id,
      name: book.title,
      price: book.price,
      image: book.cover_image,
      author: book.author,
    })) 
  );*/
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
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
                alt={product.name || "alt"}
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
      ))}
    </div>
  );
}
