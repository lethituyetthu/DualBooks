"use client";

import React from "react";
import Link from "next/link";

import useFetchNewProducts from "../../hook/useFetchNewProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ShowNewProducts() {
  const { products } = useFetchNewProducts();

  return (
    <div className="max-w-[1500px] m-auto my-5">
      <Carousel>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="w-10 bg-light-100 basis-1/4 flex justify-between mx-10 rounded-[8px] p-0 shadow-lg shadow-primary-400"
            >
              <div className="w-[60%] flex flex-col justify-between py-[40px] pl-10">
                <h4 className="text-[20px] font-bold h-[60px] overflow-hidden text-ellipsis line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-[16px] h-[50px] overflow-hidden text-ellipsis line-clamp-2">
                  {product.description}
                </p>
                <Link
                  href={"#"}
                  className="text-[20px] hover:underline transition duration-500 h-[40px] text-primary-700 font-bold"
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className="py-5 pr-[25px] w-[40%]">
                <Image
                  src={`http://localhost:3200/uploads/books/${product.product_image}`}
                  width={50}
                  height={0}
                  objectFit="cover"
                  layout="responsive"
                  alt={product.name}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
