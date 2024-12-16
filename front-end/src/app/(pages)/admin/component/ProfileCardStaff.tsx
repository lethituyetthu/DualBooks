// Import các thư viện và hook cần thiết
import Image from "next/image";
import React, { useState } from "react";
import useFetchAdmin from "@/app/hook/useFetchAdmin";
import Link from "next/link"

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
        window.location.reload()

      } else {
        alert("Lỗi khi xóa admin!"); // Thông báo lỗi
      }
    }
  };

  return (
    <div
  className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-[200px] relative transition-all duration-300 ease-in-out transform hover:scale-105"
  onMouseEnter={() => setIsHovered(true)} // Hiển thị nút khi hover
  onMouseLeave={() => setIsHovered(false)} // Ẩn nút khi không hover
>
  {/* Hiển thị ảnh đại diện của admin */}
  <Image
    className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200"
    width={200}
    height={200}
    src={`http://localhost:3200/uploads/admins/${img}`} // URL ảnh
    alt={`${name} profile`} // Mô tả hình ảnh
    style={{ objectFit: "cover" }} // Giữ tỉ lệ ảnh
  />

  {/* Hiển thị tên admin */}
  <h2 className="text-xl font-semibold max-w-44 text-center text-gray-800">{name}</h2>

  {/* Hiển thị vai trò với màu sắc nổi bật */}
  <p
    className={`mt-2 px-3 py-1 text-sm font-semibold w-20 text-center uppercase rounded-full ${role === "admin" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
  >
    {role}
  </p>

  {/* Hiển thị email và ngày tạo */}
  <p className="text-gray-500 mt-2 text-center">{email}</p>
  <p className="text-gray-400 mt-2 text-center">{formatDateTime(date)}</p>

  {/* Hiển thị các nút chỉnh sửa và xóa khi hover */}
  {isHovered && (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 rounded-sm flex gap-4 p-2 transition-all duration-300 ease-in-out opacity-100 shadow-lg">
      {/* Nút chỉnh sửa */}
      <Link href={`/admin/editStaff/${id}`}>
        <button className="bg-blue-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105">
          <i className="fas fa-edit"></i>
        </button>
      </Link>

      {/* Nút xóa */}
      <button
        className="bg-orange-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-orange-600 transition duration-200 ease-in-out transform hover:scale-105"
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
