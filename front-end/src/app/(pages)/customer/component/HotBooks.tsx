"use client";
import React from "react";

import BookCard from "./bookCard";

import useFetchBook from "../hook/useFetchBook";

export default function HotBooks() {
  const { hotBooks, error, loading } = useFetchBook();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
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
