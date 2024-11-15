"use client";

import { useEffect, useState } from "react";
import useFetchBook from "@/app/hook/useFetchBook"; // Giả sử bạn đã có hook này
import useFetchCategory from "@/app/hook/useFetchCategory";
import InputField from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const route = useRouter();
  const { cate } = useFetchCategory();
  const { id } = params; // Lấy giá trị 'id' từ params
  const { fetchDetail, detailBook, updateBook } = useFetchBook();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    cover_image: "" as string | File,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Để hiển thị preview hình ảnh

  useEffect(() => {
    if (id) {
      fetchDetail(id); // Lấy thông tin chi tiết sản phẩm khi có id
    }
  }, [id]);

  useEffect(() => {
    if (detailBook) {
      setFormData({
        title: detailBook.title,
        author: detailBook.author,
        category: detailBook.category.id,
        price: detailBook.price.toString(),
        stock: detailBook.stock.toString(),
        description: detailBook.description,
        cover_image: detailBook.cover_image,
      });
      setImagePreview(detailBook.cover_image);
    }
  }, [detailBook]);
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
        cover_image: file, // Lưu tệp hình ảnh vào state
      }));
      setImagePreview(URL.createObjectURL(file)); // Tạo URL để xem trước hình ảnh
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const { title, author, category, price, stock, cover_image, description } =
      formData;

    if (!title || !author || !category || !price || !stock || !description) {
      console.error("Tất cả các trường đều bắt buộc");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("author", author);
    formDataToSend.append("category", category);
    formDataToSend.append("price", price);
    formDataToSend.append("stock", stock);
    formDataToSend.append("description", description);
    if (cover_image) {
      formDataToSend.append("cover_image", cover_image);
    }
    const response = await updateBook(id, formDataToSend);
    if (response && response.error) {
      alert("lỗi khi chỉnh sửa sản phẩm !!!");
    } else {
      alert("cập nhật sản phẩm thành công");
      route.push("/admin/products");
    }
  };

  if (!detailBook) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Tiêu đề"
          type="text"
          name="title"
          placeholder="Nhập tiêu đề sản phẩm"
          value={formData.title}
          onChange={handleInputChange}
          isRequired={true}
        />
        <InputField
          label="Tác giả"
          type="text"
          name="author"
          placeholder="Nhập tên tác giả"
          value={formData.author}
          onChange={handleInputChange}
          isRequired={true}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium">Danh mục</label>
          <select
            name="category"
            value={formData.category}
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
          isRequired={true}
        />
        <InputField
          label="Số lượng"
          type="number"
          name="stock"
          placeholder="Nhập số lượng sản phẩm"
          value={formData.stock}
          onChange={handleInputChange}
          isRequired={true}
        />
        <InputField
          label="Mô tả"
          type="teẫ"
          name="description"
          placeholder="Nhập mô tả sản phẩm"
          value={formData.description}
          onChange={handleInputChange}
          isRequired={true}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium">Hình ảnh bìa</label>
          <input
            type="file"
            name="cover_image"
            onChange={handleFileChange}
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
          {imagePreview && (
            <div className="mt-4">
              <Image
                src={`http://localhost:3200/uploads/books/${formData.cover_image}`}
                width={200}
                height={400}
                alt="Preview"
                className=" object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-400 text-white px-4 py-2 rounded"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
