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
import Link from "next/link";
import useFetchCategory from "@/app/hook/useFetchCategory";
import ProductListByCate from "../../component/productListByCate";
import ProductInfo from "../../component/productInfo";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { cate } = useFetchCategory();
  const {
    detailBook,
    fetchDetail,
    loading,
    error,
    searchBookByCate,
    categoryBook,
  } = useFetchBook(); // Hook lấy dữ liệu sách

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  useEffect(() => {
    if (detailBook?.categoryID) {
      searchBookByCate(detailBook.categoryID);
    }
  }, [detailBook?.categoryID]);

  const flattenedCategoryBook = categoryBook.flat();

  const getCategoryName = (categoryId) => {
    const category = cate.find((cat) => cat.id === categoryId);
    return category ? category.name : "Không xác định"; // Nếu không tìm thấy danh mục
  };

  useEffect(() => {
    console.log("Danh sách sản phẩm cùng danh mục:", categoryBook);
  }, [categoryBook]);
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!detailBook) return <p>Không tìm thấy sản phẩm</p>;

  // Destructure dữ liệu sách
  const { title, description, price, cover_image, stock, author, categoryID } =
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
              {getCategoryName(categoryID)}
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
          categoryName={getCategoryName(categoryID)}
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

      <div className=" text-sm bg-primary-400 ">
        <h1 className="text-2xl pt-20 uppercase font-semibold  py-6  text-primary-400 bg-light-50 text-center font-itim border-light-100 border-b">
        Những cuốn sách cùng chủ đề bạn không nên bỏ lỡ
        </h1>
        <ProductListByCate products={flattenedCategoryBook} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
