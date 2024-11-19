"use client";

import React from "react";
import Link from "next/link";

import useFetchCategory from "../../../hook/useFetchCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Showcategory() {
  const { cate, error, loading } = useFetchCategory();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-[1100px] m-auto my-8">
      <Carousel className="p-2">
        <CarouselContent className="py-[50px]">
          {cate.map((item) => (
            <CarouselItem
              key={item.id}
              className="bg-white basis-1/3 flex gap-6 p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-primary-400 transition-all duration-300 ease-in-out mx-4"
            >
              {/* Content Section */}
              <div className="w-3/5 flex flex-col justify-between py-4 pl-6">
                {/* Title */}
                <h4 className="text-2xl font-bold text-gray-800 truncate">
                  {item.name}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 mb-4 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Link */}
                <Link
                  href="#"
                  className="text-base font-medium text-primary-600 hover:text-primary-500 flex items-center gap-2 transition duration-300"
                >
                  Xem ngay
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Image Section */}
              <div className="w-2/5 flex items-center">
                <Image
                  src={`http://localhost:3200/uploads/categories/${item.cate_image}`}
                  width={150}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                  alt={item.name}
                  className="rounded-md shadow"
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
