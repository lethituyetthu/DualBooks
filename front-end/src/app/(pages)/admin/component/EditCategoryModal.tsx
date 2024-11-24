import Image from "next/image";
import React from "react";

export default function EditCategoryModal({ category, setCategory, onClose, onSubmit }) {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCategory((prev) => ({ ...prev, cate_image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.cate_image) formData.append("cate_image", category.cate_image);
    
    ///console.log(category.name)

    //console.log("form",formData)
          
    /* console.log("FormData Contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    } */

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa thể loại</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Tên Thể Loại</label>
            <input
              type="text"
              name="name"
              placeholder="Nhập tên thể loại"
              value={category.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Mô Tả</label>
            <textarea
              name="description"
              placeholder="Nhập mô tả"
              value={category.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            {category.cate_image && (
              <div className="mb-4 flex justify-center">
                <Image
                  width={150}
                  height={150}
                  src={`http://localhost:3200/uploads/categories/${category.cate_image}`}
                  alt={category.name}
                  className="max-w-full max-h-40 object-contain rounded border"
                />
              </div>
            )}
            <label className="block text-sm font-medium">Hình Ảnh</label>
            <input
              type="file"
              name="cate_image"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-primary-400 hover:bg-primary-300 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
