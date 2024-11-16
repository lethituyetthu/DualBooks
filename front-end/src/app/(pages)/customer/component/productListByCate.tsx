// components/ProductListByCate.js
import Image from "next/image";
import Link from "next/link";

const ProductListByCate = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-7 boder border-gray-100">
      {products.slice(0, 5).map((book) => (
        <div key={book._id } className="border p-4 rounded-sm shadow-sm bg-white">
          <Image
            src={`http://localhost:3200/uploads/books/${book.cover_image}`}
            alt={book.title}
            width={200}
            height={200}
            className="object-cover mx-auto mb-2"
          />
          <Link href={`/customer/product/${book._id}`} className="font-semibold text-center line-clamp-2 h-10">
            {book.title}
          </Link>
          <p className="text-primary-600 text-center text-[16px] mt-1">
            {(book.price * 1000).toLocaleString("vi-VN")} đ
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductListByCate;
