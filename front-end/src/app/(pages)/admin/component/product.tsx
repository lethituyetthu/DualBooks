import Image from "next/image";
import React from "react";
import useFetchBook from "@/app/hook/useFetchBook";
import Link from "next/link";

export default function Product({ product, getCategoryName, formatDateTime }) {
  const { deleteBook,books } = useFetchBook();
  
  const handleDelete = () => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      deleteBook(product.id).then(()=>{
        window.location.reload()
      }).catch(error => {
        console.error("Lỗi khi xóa sản phẩm:", error);
      });
    }

  };
  return (
    <tr className="border-b hover:bg-gray-50">
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
      <td className="px-6 py-4 text-nowrap">{product.author}</td>
      <td className="px-6 py-4">{getCategoryName(product.categoryID)}</td>
      <td className="px-6 py-4 text-nowrap"> {(product.price * 1000).toLocaleString("vi-VN") + " đ"}</td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="px-6 py-4">{formatDateTime(product.updated_at)}</td>
      <td className="px-6 py-4 flex">
        <Link href={`/admin/editPro/${product.id}`}>
          <button className="bg-blue-500 text-white p-2 rounded mr-2 flex items-center">
            <i className="fas fa-edit"></i>
          </button>
        </Link>
        <button
          className="bg-orange-500 text-white p-2 rounded flex items-center"
          onClick={handleDelete}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
}
