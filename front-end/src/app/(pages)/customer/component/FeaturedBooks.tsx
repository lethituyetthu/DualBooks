"use client";


import { useState } from "react";
import BookCard from "./bookCard"; // Assuming you have a BookCard component
import useFetchBook from "@/app/hook/useFetchBook";

// Define Book interface
interface Book {
  title: string;
  author: string;
  price: number;
  cover_image: string;
}

export default function FeaturedBooks() {
  const { featuredBooks, error, loading } = useFetchBook();
  const [cartCount, setCartCount] = useState<number>(0); // State for cart count

  if (loading) {
    return <div>Loading...</div>;
  }

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
        {featuredBooks.map((book: Book, index: number) => (
          <BookCard key={index} book={book} updateCartCount={updateCartCount} />
        ))}
      </div>
  
    </div>
  );
}