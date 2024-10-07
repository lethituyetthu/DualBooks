import React from "react";

import BookCard  from "./bookCard";
export default function newBooks() {

  const books: any =  [
    {
      title: "Báo chí Truyền thông - Những góc tiếp cận",
      author: "TS Trần Bá Dung",
      price: 180200,
      image: "/e4udknc6epuveyv0jhdtvhpabc2gb99e.jpeg",
    },
    {
      title: "Cuộc cách mạng công nghiệp lần thứ tư",
      author: "TS Nguyễn Ngọc Anh",
      price: 250000,
      image: "/book2.jpeg",
    },
    {
      title: "Khoa học dữ liệu và ứng dụng",
      author: "PGS. TS Đỗ Văn Dũng",
      price: 300000,
      image: "/book3.jpeg",
    },
    {
      title: "Tư duy phản biện trong kỷ nguyên số",
      author: "GS. TS Phạm Minh Tuấn",
      price: 220000,
      image: "/book4.jpeg",
    }
  ];
  return (
    <div className="container mx-auto max-w-[1200px]">
      <h2 className="text-center text-2xl font-bold mb-8 text-primary-400">
        Sách Mới, Cảm Hứng Mới - Khám Phá Ngay!
      </h2>
      <div className="grid grid-cols-4 gap-16">
        {/* Book Card 1 */}
        {books.map((book:any , index:number)=>(
          <BookCard key={index}  book={book}/>

        ))}
       
      </div>
    </div>
  );
}
