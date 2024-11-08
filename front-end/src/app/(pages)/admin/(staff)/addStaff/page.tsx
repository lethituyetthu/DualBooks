"use client";
import InputField from "@/components/ui/input";
import React, { useState } from "react";
import useFetchAdmin from "@/app/hook/useFetchAdmin";
import { useRouter } from "next/navigation";
const AddStaff = () => {
  const route = useRouter();
  const { addStaff,errorMessage } = useFetchAdmin();
  const [formData, setFormData] = useState({
    username: "", // Thay đổi từ 'name' thành 'username'
    email: "",
    password: "",
    role: "staff", // Mặc định là Nhân Viên
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffData = new FormData();
    staffData.append("username", formData.username);
    staffData.append("email", formData.email);
    staffData.append("password", formData.password);
    staffData.append("role", formData.role);
    if (selectedFile) {
      staffData.append("user_img", selectedFile);
    }
console.log(staffData)
    const result = await addStaff(staffData);
    console.log(result);
    if (!result.error) {
      alert("Thêm nhân viên thành công");
      route.push("/admin/staffs");
    } else {
      alert("Thêm nhân viên thất bại: " + result.error);
    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen mt-[40px]">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Nhân viên mới</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center mb-2">
            <i className="fas fa-camera text-gray-500"></i>
          </div>

          <div className="mb-4">
            <input
              type="file"
              name="user_img"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <InputField
            label="Tên Người Dùng" // Cập nhật nhãn
            type="text"
            name="username" // Thay đổi từ 'name' thành 'username'
            value={formData.username} // Cập nhật để lấy giá trị từ username
            onChange={handleInputChange}
            placeholder="Nhập Tên Người Dùng" // Cập nhật placeholder
          />

          <InputField
            label="Mật Khẩu"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Nhập Mật Khẩu"
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập Email"
          />

          <div className="flex flex-col">
            <label
              htmlFor="role"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Vai Trò
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary-300"
            >
              <option value="staff">Nhân Viên</option>
              <option value="admin">Quản Lý</option>
            </select>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-[#AF683E] text-white py-2 px-4 rounded-sm hover:bg-[#C18969] transition duration-300"
            >
              Thêm Nhân Viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
