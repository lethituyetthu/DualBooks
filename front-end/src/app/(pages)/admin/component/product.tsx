import Image from "next/image";
import React from "react";
import useFetchBook from "@/app/hook/useFetchBook";
import Link from "next/link";

export default function Product({ product, formatDateTime }) {
  const { deleteBook, books } = useFetchBook();

  const handleDelete = () => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      deleteBook(product.id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
        });
    }
  };
  return (
    <tr
      className={`border-b  ${
        product.status === "hidden" ? "bg-gray-100" : ""
      }  my-auto `}
    >
      <td className="px-6 py-4">
        <Image
          src={`http://localhost:3200/uploads/books/${product.cover_image}`}
          width={100}
          height={100}
          alt={product.title}
          className="w-16 h-16 object-cover"
        />
      </td>
      <td className="px-6 py-4">{product.title}</td>
      <td className="px-6 py-4 text-nowrap">{product.publisher.name}</td>
      <td className="px-6 py-4 ">{product.author}</td>
      <td className="px-6 py-4">{product.category.name}</td>
      <td className="px-6 py-4 text-nowrap">
        {" "}
        {(product.price * 1000).toLocaleString("vi-VN") + " đ"}
      </td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="px-6 py-4">{formatDateTime(product.updated_at)}</td>
      <td className="px-6 py-4  ">
        <div className="flex">
          <Link href={`/admin/editPro/${product.id}`}>
            <button className="bg-blue-500 text-white p-2 rounded mr-2 flex items-center">
              <i className="fas fa-edit"></i>
            </button>
          </Link>

          {product.status === "hidden" ? (
            <button
              className="bg-orange-500 text-white p-2 rounded flex items-center space-y-4"
              onClick={handleDelete}
            >
              <i className="fas fa-eye"></i>
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white p-2 rounded flex items-center space-y-4"
              onClick={handleDelete}
            >
              <i className="fas fa-eye-slash"></i>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
