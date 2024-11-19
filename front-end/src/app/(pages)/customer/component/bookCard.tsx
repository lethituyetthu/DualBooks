import React from "react";
import Image from "next/image";
import Link from "next/link";
import useAddToCart from "@/app/hook/useAddToCard";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  cover_image: string;
}

interface BookCardProps {
  book: Book;
  updateCartCount: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, updateCartCount }) => {
  const addToCart = useAddToCart(updateCartCount);

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out">
      {/* Hiển thị hình ảnh sản phẩm */}
      <div className="w-full h-40 flex justify-center">
        <Image
          src={`http://localhost:3200/uploads/books/${book.cover_image}`}
          alt={book.title}
          width={150}
          height={150}
        />
      </div>

      {/* Tên sách */}
      <Link
        href={`/customer/product/${book.id}`}
        className="text-sm font-semibold text-center mt-3 my-auto h-10 font-inter overflow-hidden text-ellipsis line-clamp-2"
      >
        {book.title}
      </Link>

      {/* Tác giả */}
      <p className="text-sm text-gray-600 my-3 text-center">{book.author}</p>

      {/* Giá và nút thêm vào giỏ hàng */}
      <div className="flex items-center justify-between space-x-2 bg-light-300 rounded-lg m-auto w-[90%]">
        {/* Giá sách */}
        <span className="text-brown-700 font-bold text-lg mx-4 text-primary-700">
          {(book.price * 1000).toLocaleString("vi-VN") + " đ"}
        </span>

        {/* Nút thêm vào giỏ hàng */}
        <button
          onClick={() => addToCart(book)}
          className="bg-primary-400 text-white p-2 rounded-lg hover:bg-primary-300 transition-all duration-300"
          aria-label={`Thêm ${book.title} vào giỏ hàng`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
