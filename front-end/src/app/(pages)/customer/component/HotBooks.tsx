"use client";
import React from "react";

import BookCard from "./bookCard";
import useFetchBook, { typeBook } from "../hook/useFetchBook";

export default function HotBooks() {
  const { newBooks, error, loading } = useFetchBook(); // Use 'newBooks' instead of 'hotBooks'

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-5 gap-5">
        {/* Render Book Cards */}
        {newBooks && newBooks.map((book: typeBook, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
