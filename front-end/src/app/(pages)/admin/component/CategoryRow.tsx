import React from "react";
import Image from "next/image";

export default function CategoryRow({ category, onEditClick, onDeleteClick }) {
  return (
    <tr
      className={`border-b  ${
        category.status === "hidden" ? "bg-gray-100" : ""
      }  my-auto `}
    >
      <td className="p-4 border-b">
        <Image
          src={`http://localhost:3200/uploads/categories/${category.cate_image}`}
          width={150}
          height={200}
          alt={category.name}
          className="w-20 h-20 object-contain rounded"
          style={{ objectFit: "contain" }}
        />
      </td>
      <td className="p-4 border-b">{category.name}</td>
      <td className="p-4 border-b">{category.description}</td>
      <td className="p-4 border-b">
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white p-2 rounded-sm mr-2 flex items-center"
            onClick={() => onEditClick(category)}
          >
            <i className="fas fa-edit"></i>
          </button>
          {category.status === "hidden" ? (
            <button
              className="bg-orange-500 text-white p-2 rounded-sm flex items-center"
              onClick={() => onDeleteClick(category.id)}
            >
              <i className="fas fa-eye"></i>
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white p-2 rounded-sm flex items-center"
              onClick={() => onDeleteClick(category.id)}
            >
              <i className="fas fa-eye-slash"></i>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
