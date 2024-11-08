// ProductList.tsx
import React from "react";
import { Books } from "@/app/types/Books";
import Image from "next/image";

interface ProductListProps {
  book: Books; // Chỉ truyền một sách duy nhất
  onAddToCart: (book: Books) => void;
}

const ProductList: React.FC<ProductListProps> = ({ book, onAddToCart }) => {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div className="bg-gray-50 p-2 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => onAddToCart(book)} // Sự kiện click
    >
      <Image
        src={`http://localhost:3200/uploads/books/${book.cover_image}`}
        alt={book.title}
        width={500}
        height={300}
        className="w-32 h-48 object-cover rounded mb-2"
      />
      <p className="text-sm text-center h-10">{truncateTitle(book.title, 20)}</p>
      <p className="text-sm text-primary-700">
        {(book.price * 1000).toLocaleString("vi-VN") + "đ"}
      </p>
    </div>
  );
};

export default ProductList;
