"use client";
<<<<<<< HEAD
import React from "react";

import BookCard from "./bookCard";

import useFetchBook from "../../../hook/useFetchBook";

export default function NewBooks() {
  const { newBooks, error, loading } = useFetchBook();
=======
import React, { useState } from "react"; // Import useState to manage cart count
import BookCard from "./bookCard";
import useFetchBook from "../../../hook/useFetchBook";

// Define Book interface
interface Book {
  title: string;
  author: string;
  price: number;
  cover_image: string;
}

// Define CartItem interface for better type safety
interface CartItem {
  title: string;
  author: string;
  price: number;
  cover_image: string;
  quantity: number;
}

export default function NewBooks() {
  const { newBooks, error, loading } = useFetchBook();
  const [cartCount, setCartCount] = useState<number>(0); // State for cart count

>>>>>>> origin/nhathuy
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
<<<<<<< HEAD
=======

  // Function to update cart count
  const updateCartCount = () => {
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : []; // Use CartItem type

    // Calculate total quantity
    const totalCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0); // Specify CartItem type
    setCartCount(totalCount); // Update cart count state
  };

>>>>>>> origin/nhathuy
  return (
    <div className="container mx-auto max-w-[1200px]">
      <h2 className="text-center text-3xl font-bold mb-8 text-primary-400 font-itim">
        Sách Mới, Cảm Hứng Mới - Khám Phá Ngay!
      </h2>
      <div className="grid grid-cols-5 gap-5">
<<<<<<< HEAD
        {/* Book Card 1 */}
        {newBooks.map((book: any, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
=======
        {newBooks.map((book: Book, index: number) => (
          <BookCard key={index} book={book} updateCartCount={updateCartCount} />
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="font-bold text-lg">Số lượng trong giỏ: {cartCount}</span>
      </div>
>>>>>>> origin/nhathuy
    </div>
  );
}
