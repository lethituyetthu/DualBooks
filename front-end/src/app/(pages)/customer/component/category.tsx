"use client";

import React from "react";
import Link from "next/link";

import useFetchCategory from "../hook/useFetchCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Showcategory() {
  const { cate} = useFetchCategory();

  return (
    <div className="max-w-[1100px] m-auto my-8">
      <Carousel className="p-2">
        <CarouselContent className="py-[50px]">
          {cate.map((item) => (
            <CarouselItem
              key={item.id}
              className=" w-10 bg-light-100 basis-1/3 flex  justify-between mx-[30px] rounded-[8px] p-0 hover:shadow-lg hover:shadow-primary-400 transition-all duration-300 ease-in-out "
            >
              <div className="w-[60%] flex flex-col justify-between py-[20px] pl-10">
                <h4 className="text-[23px] font-bold h-[60px] overflow-hidden text-ellipsis line-clamp-2">
                  {item.name}
                </h4>
                <p className="text-[16px] h-[50px] my-3 overflow-hidden text-ellipsis line-clamp-2 mr-7">
                  {item.description}
                </p>
                <Link
                  href={"#"}
                  className="text-[20px] flex items-center hover:underline transition duration-500 h-[40px] text-primary-700 font-bold"
                >
                  Xem ngay
                </Link>
              </div>
              <div className="py-[40px] pr-[25px] w-[40%] ">
                <Image
                  src={`http://localhost:3200/uploads/categories/${item.cate_image}`}
                  width={50}
                  height={0}
                  objectFit="cover"
                  layout="responsive"
                  alt={item.name}
                  className="object-cover "
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