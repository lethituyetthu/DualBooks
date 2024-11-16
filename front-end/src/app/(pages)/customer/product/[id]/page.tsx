"use client";

import { useEffect } from "react";
import Image from "next/image";
import useFetchBook from "../../../../hook/useFetchBook"; // Hook lấy dữ liệu sách
import BookDetail from "../../component/bookDetail";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Rating from "../../component/rating";
import FeetBack from "../../component/feetback";
import ReviewForm from "../../component/reviewForm";
import ProductListByCate from "../../component/productListByCate";
import ProductInfo from "../../component/productInfo";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const {
    detailBook,
    fetchDetail,
    loading,
    error,
    categoryBook,
    searchBookByCate,

  } = useFetchBook(); // Hook lấy dữ liệu sách

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  // Fetch sản phẩm cùng danh mục khi detailBook được cập nhật
  useEffect(() => {
    if (detailBook?.category?.id) {
      searchBookByCate(detailBook.category.id);
    }
  }, [detailBook]);

  const flattenedCategoryBook = categoryBook.flat();

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!detailBook) return <p>Không tìm thấy sản phẩm</p>;

  // Destructure dữ liệu sách
  const { title, description, price, cover_image, stock, author, category } =
    detailBook;

  return (
    <div className="max-w-[1200px] m-auto bg-light-50">
      <Breadcrumb className="py-[30px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">DualBooks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">
              {detailBook.category.name}
            </BreadcrumbLink>
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
        <h1 className="text-xl mb-4 bg-primary-400 text-light-100 py-5 pl-3 rounded-sm font-itim">
          MÔ TẢ SẢN PHẨM
</h1>
        <ProductInfo
          title={title}
          cover_image={cover_image}
          author={author}
          categoryName={category.name}
          price={price}
          description={description}
        />

        {/* Giới thiệu cuốn sách */}
        <div className="mt-4 w-full px-5">
          <h2 className="text-lg font-semibold mb-2">Giới thiệu sách</h2>
          <p>{description}</p>
        </div>
      </div>

      {/* Phần đánh giá sp  */}
      <div className="mt-[40px] text-sm ">
        <h1 className="text-xl mb-4 bg-primary-400 text-light-100 py-5 pl-3 rounded-sm font-itim">
          ĐÁNH GIÁ SẢN PHẨM
        </h1>
        <div className="">
          <Rating />
          <div className="flex justify-between">
            <ReviewForm />
            <FeetBack />
          </div>
        </div>
      </div>

      <div className=" text-sm">
        <h1 className="text-2xl px-10 uppercase font-semibold  py-6  text-primary-400 bg-light-50 text-center font-itim border-primary-400 border-b-2">
        Những cuốn sách cùng chủ đề bạn không nên bỏ lỡ
        </h1>
        <ProductListByCate products={flattenedCategoryBook} />
      </div>
    </div>
  );
};

export default ProductDetailPage;