"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useFetchCategory from "@/app/hook/useFetchCategory";

const AddCate = () => {
  const router = useRouter();
  const { addCategory } = useFetchCategory();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cate_image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      cate_image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, cate_image } = formData;

    if (!name || !description || !cate_image) {
      alert("Tất cả các trường đều bắt buộc!");
      return;
    }
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("description", description);
    if (cate_image) {
      formDataToSend.append("cate_image", cate_image); // Đính kèm file
    }
    
    


    const response = await addCategory(formDataToSend);

    console.log("res",response);

    if (!response) {
      alert("Lỗi khi thêm thể loại!");
    } else {
      alert("Thêm thể loại thành công!");
      router.push("/admin/category");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm Thể Loại Mới</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tên Thể Loại</label>
          <input
            type="text"
            name="name"
            placeholder="Nhập tên thể loại"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Mô Tả</label>
          <textarea
            name="description"
            placeholder="Nhập mô tả thể loại"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Hình Ảnh</label>
          <input
            type="file"
            name="cate_image"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-400 hover:bg-primary-300 text-white px-4 py-2 rounded"
        >
          Thêm Thể Loại
        </button>
      </form>
    </div>
  );
};

export default AddCate;
