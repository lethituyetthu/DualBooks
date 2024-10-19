"use client";

import { useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../hook/useFetchBook"; // Hook lấy dữ liệu sách
import BookDetail from "../../component/bookDetail";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { detailBook, fetchDetail, loading, error } = useFetchBook(); // Hook lấy dữ liệu sách

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!detailBook) return <p>Không tìm thấy sản phẩm</p>;

  // Destructure dữ liệu sách
  const { title, description, price, cover_image, stock, author, categoryID } =
    detailBook;

  return (

    <div className="max-w-[1200px] m-auto p-4">
      <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">DualBooks</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">{categoryID}</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{title}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

      {/* Phần thông tin sản phẩm */}
      <BookDetail
        title={title}
        description={description}
        price={price}
        cover_image={cover_image}
        stock={stock}
      />
      {/* Phần MÔ TẢ SẢN PHẨM - Nhỏ lại */}
      <div className="mt-[40px] text-sm ">
        <h1 className="text-xl mb-4 bg-primary-400 text-light-100 font-inter py-5 pl-3 rounded-sm">
          MÔ TẢ SẢN PHẨM
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột bên trái: Hình ảnh sản phẩm */}
          <div className="flex justify-center">
            <Image
              src={`http://localhost:3200/uploads/books/${cover_image}`}
              alt={title}
              width={200}
              height={300}
              className="object-cover mb-4"
            />
          </div>

          {/* Cột bên phải: Thông tin chi tiết sản phẩm */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h2>
            <p>
              <strong>Tác giả:</strong> {author}
            </p>
            {/* <p><strong>Dịch giả:</strong> {translator || "Không có"}</p> */}
            <p>
              <strong>Thể loại:</strong> {categoryID}
            </p>
            <p>
              <strong>Kích thước:</strong> 13x20 cm
            </p>
            <p>
              <strong>Nhà xuất bản:</strong> Nhà xuất bản Trẻ
            </p>
            <p>
              <strong>Thương hiệu:</strong> DualBooks
            </p>
            <p>
              <strong>Giá bìa:</strong>{" "}
              {(price * 1000).toLocaleString("vi-VN") + " đ"}
            </p>
            <p>
              <strong>Ngày phát hành:</strong> 2022-10-15
            </p>
          </div>
        </div>
        {/* Giới thiệu cuốn sách */}
        <div className="mt-4 w-full px-5">
          <h2 className="text-lg font-semibold mb-2">Giới thiệu sách</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
