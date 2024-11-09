"use client";
<<<<<<< HEAD
import React from "react";

import BookCard from "./bookCard";

import useFetchBook from "../../../hook/useFetchBook";

export default function HotBooks() {
  const { hotBooks, error, loading } = useFetchBook();
=======
import React, { useState } from "react"; // Import useState for managing cart count
import BookCard from "./bookCard";
import useFetchBook from "../../../hook/useFetchBook";

// Define Book interface
interface Book {
  title: string;
  author: string;
  price: number;
  cover_image: string;
}

// Define the HotBooks component
export default function HotBooks() {
  const { hotBooks, error, loading } = useFetchBook();
  const [cartCount, setCartCount] = useState<number>(0); // State for cart count

>>>>>>> origin/nhathuy
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
<<<<<<< HEAD
  return (
    <div className="mt-5">
      <div className="grid grid-cols-5 gap-5">
        {/* Book Card 1 */}
        {hotBooks.map((book: any, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
=======

  // Function to update cart count
  const updateCartCount = () => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : []; // Use your CartItem type if defined

    // Calculate total quantity
    const totalCount = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
    setCartCount(totalCount); // Update cart count state
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-5 gap-5">
        {/* Book Card */}
        {hotBooks.map((book: Book, index: number) => (
          <BookCard key={index} book={book} updateCartCount={updateCartCount} />
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="font-bold text-lg">Số lượng trong giỏ: {cartCount}</span>
      </div>
    </div>
  );
}

>>>>>>> origin/nhathuy
