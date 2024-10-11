"use client";
import React from "react";

import BookCard from "./bookCard";

import useFetchBook from "../hook/useFetchBook";

export default function NewBooks() {
  const { newBooks, error, loading } = useFetchBook();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container mx-auto max-w-[1200px]">
      <h2 className="text-center text-3xl font-bold mb-8 text-primary-400 font-itim">
        Sách Mới, Cảm Hứng Mới - Khám Phá Ngay!
      </h2>
      <div className="grid grid-cols-5 gap-5">
        {/* Book Card 1 */}
        {newBooks.map((book: any, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
