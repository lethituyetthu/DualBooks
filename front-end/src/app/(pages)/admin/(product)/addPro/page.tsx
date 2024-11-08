"use client";

import { useState } from "react";
import useFetchCategory from "@/app/hook/useFetchCategory";
import useFetchBook from "@/app/hook/useFetchBook";
import InputField from "@/components/ui/input";
import { useRouter } from "next/navigation";


const AddProduct = () => {
  const route = useRouter()
  const { cate } = useFetchCategory();
  const { addBooks, errors } = useFetchBook();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    categoryID: "",
    price: "",
    stock: "",
    cover_image: null,
    description: "", // Thêm trường mô tả
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
      cover_image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, categoryID, price, stock, cover_image, description } = formData;
  
    if (!title || !author || !categoryID || !price || !stock || !description) {
      console.error("Tất cả các trường đều bắt buộc");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('author', author);
    formDataToSend.append('categoryID', categoryID);
    formDataToSend.append('price', price);
    formDataToSend.append('stock', stock);
    formDataToSend.append('description', description);
    
    if(cover_image){
      
      formDataToSend.append('cover_image', cover_image);  
    }
    
    const response = await addBooks(formDataToSend);
  
    if (response && response.error) {
      // Xử lý lỗi nếu có
    } else {
      setFormData({
        title: "",
        author: "",
        categoryID: "",
        price: "",
        stock: "",
        cover_image: null,
        description: "",
      });

      alert("thêm sản phẩm thành công ")
      route.push("/admin/products")

    }
  };
  
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Tiêu đề"
          type="text"
          name="title"
          placeholder="Nhập tiêu đề sản phẩm"
          value={formData.title}
          onChange={handleInputChange}
          error={errors?.title}
          isRequired={true}
        />
        <InputField
          label="Tác giả"
          type="text"
          name="author"
          placeholder="Nhập tên tác giả"
          value={formData.author}
          onChange={handleInputChange}
          error={errors?.author}
          isRequired={true}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium">Danh mục</label>
          <select
            name="categoryID"
            value={formData.categoryID}
            onChange={handleInputChange}
            className="mt-1 block w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Chọn danh mục</option>
            {cate.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <InputField
          label="Giá"
          type="number"
          name="price"
          placeholder="Nhập giá sản phẩm"
          value={formData.price}
          onChange={handleInputChange}
          error={errors?.price}
          isRequired={true}
        />
        <InputField
          label="Số lượng"
          type="number"
          name="stock"
          placeholder="Nhập số lượng"
          value={formData.stock}
          onChange={handleInputChange}
          error={errors?.stock}
          isRequired={true}
        />
        <InputField
          label="Mô tả"
          type="text"
          name="description"
          placeholder="Nhập mô tả sản phẩm"
          value={formData.description}
          onChange={handleInputChange}
          error={errors?.description}
          isRequired={true}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium">Hình ảnh bìa</label>
          <input
            type="file"
            name="cover_image"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary-400 hover:bg-primary-300 text-white px-4 py-2 rounded"
        >
          Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
