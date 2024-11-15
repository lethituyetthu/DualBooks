// Import các thư viện và hook cần thiết
import Image from "next/image";
import React, { useState } from "react";
import useFetchAdmin from "@/app/hook/useFetchAdmin";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho các props của ProfileCardStaff
interface ProfileCardProps {
  id: string; // ID của admin
  name: string; // Tên của admin
  role: string; // Vai trò (admin hoặc staff)
  date: string; // Ngày tạo
  img: string; // URL hình ảnh
  email: string; // Email của admin
}

// Component hiển thị thông tin của admin
const ProfileCardStaff: React.FC<ProfileCardProps> = ({
  id,
  name,
  role,
  date,
  img,
  email,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover để hiển thị các nút chỉnh sửa/xóa
  const { deleteAdmin } = useFetchAdmin(); // Hook để xóa admin

  // Hàm định dạng ngày tháng
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Hàm xử lý khi nhấn nút xóa
  const handleDelete = async () => {
    if (confirm(`Bạn có chắc chắn muốn xóa admin ${name}?`)) {
      const response = await deleteAdmin(id); // Gọi API xóa admin
      if (response && !response.error) {
        alert("Đã xóa admin thành công."); // Thông báo thành công
        // Có thể thêm logic để làm mới danh sách admin
      } else {
        alert("Lỗi khi xóa admin!"); // Thông báo lỗi
      }
    }
  };

  return (
    <div
      className="bg-gray-50 p-6 rounded-sm shadow-md flex flex-col items-center w-52 relative"
      onMouseEnter={() => setIsHovered(true)} // Hiển thị nút khi hover
      onMouseLeave={() => setIsHovered(false)} // Ẩn nút khi không hover
    >
      {/* Hiển thị ảnh đại diện của admin */}
      <Image
        className="w-24 h-24 rounded-full mb-4" // Kích thước và hình dạng của ảnh
        width={200}
        height={200}
        src={`http://localhost:3200/uploads/admins/${img}`} // URL ảnh
        alt={`${name} profile`} // Mô tả hình ảnh
        style={{ objectFit: "cover" }} // Giữ tỉ lệ ảnh
      />

      {/* Hiển thị tên admin */}
      <h2 className="text-xl max-w-44 mx-auto">{name}</h2>

      {/* Hiển thị vai trò với màu sắc nổi bật */}
      <p
        className={`mt-2 px-3 py-1 text-sm font-semibold w-20 text-center uppercase rounded-full ${
          role === "admin"
            ? "bg-red-100 text-red-700" // Vai trò admin: màu đỏ
            : "bg-green-100 text-green-700" // Vai trò staff: màu xanh lá
        }`}
      >
        {role}
      </p>

      {/* Hiển thị email và ngày tạo */}
      <p className="text-gray-500 mt-2">{email}</p>
      <p className="text-gray-400 mt-2">{formatDateTime(date)}</p>

      {/* Hiển thị các nút chỉnh sửa và xóa khi hover */}
      {isHovered && (
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-opacity-75rounded-sm flex gap-4 p-2 
      transition-opacity duration-300 ease-in-out opacity-100"
        >
          {/* Nút chỉnh sửa */}
          <Link href={`/admin/editStaff/${id}`}>
            <button className="bg-blue-500 text-white p-2 rounded mr-2 flex items-center hover:bg-blue-600 transition duration-200 ease-in-out">
              <i className="fas fa-edit"></i>
            </button>
          </Link>

          {/* Nút xóa */}
          <button
            className="bg-orange-500 text-white p-2 rounded flex items-center hover:bg-orange-600 transition duration-200 ease-in-out"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
};

// Xuất component
export default ProfileCardStaff;
