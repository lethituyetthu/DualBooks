"use client";

import { useEffect, useState } from "react";
import useFetchAdmin from "@/app/hook/useFetchAdmin";
import InputField from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditStaff = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const { fetchDetailAdmin, adminDetail, updateAdmin } = useFetchAdmin();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", // For user to update if necessary
    role: "",
    user_img: "" as string | File,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchDetailAdmin(id); // Fetch admin details by ID
    }
  }, [id]);

  useEffect(() => {
    if (adminDetail) {
      setFormData({
        username: adminDetail.username,
        email: adminDetail.email,
        password: "", // Keep it blank for security; user can update
        role: adminDetail.role,
        user_img: adminDetail.user_img,
      });
      setImagePreview(adminDetail.user_img);
    }
  }, [adminDetail]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        user_img: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, role, user_img } = formData;

    if (!username || !email || !role) {
      console.error("All fields except password are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    if (password) formDataToSend.append("password", password); // Only if updated
    formDataToSend.append("role", role);
    if (user_img) formDataToSend.append("user_img", user_img as Blob);

    const response = await updateAdmin(id, formDataToSend);
    if (response && response.error) {
      alert(" Lỗi khi cập nhật thông tin nhân viên");
    } else {
      alert("cập nhật thông tin nhân viên hoàn tất");
      router.push("/admin/staffs");
    }
  };

  if (!adminDetail) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center max-h-screen mt-[15px]">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
       
        {/* Profile Picture Section */}
        {imagePreview && (
          <div className=" rounded-full mx-auto w-40 h-40 overflow-hidden">
            <Image
              src={`http://localhost:3200/uploads/admins/${formData.user_img}`}
              width={160}
              height={160}
              alt="Profile Preview"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="m-[1.5rem] w-96 mx-auto ">
          <input
            type="file"
            name="user_img"
            onChange={handleFileChange}
            className="mt-1 block w-full border px-3 py-2 rounded border-primary-400"
          />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <InputField
            label="Username"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleInputChange}
            isRequired={true}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            isRequired={true}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter new password (optional)"
            value={formData.password}
            onChange={handleInputChange}
            isRequired={false}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className=" w-full border p-3 rounded border-primary-400"
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-[#AF683E] text-white py-2 px-4 rounded-sm hover:bg-[#C18969] transition duration-300"
            >
              Cập Nhật Thông Tin
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default EditStaff;
