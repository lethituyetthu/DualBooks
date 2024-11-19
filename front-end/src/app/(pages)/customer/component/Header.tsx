"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/app/publics/img/logo/01.png";
import Link from "next/link";
import NameToken from "./NameToken";

export default function Header() {
  const [customer, setCustomer] = useState<any>(null);
  const [cartCount, setCartCount] = useState<number>(0); // Số lượng sản phẩm trong giỏ hàng
  const [favoriteCount, setFavoriteCount] = useState<number>(0); // Số lượng sản phẩm yêu thích

  // Helper: Lấy số lượng sản phẩm từ localStorage
  const getCountFromLocalStorage = (key: string): number => {
    const existingData = localStorage.getItem(key);
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      if (key === "cart") {
        return parsedData.reduce(
          (sum: number, item: { quantity: number }) => sum + item.quantity,
          0
        );
      }
      return parsedData.length; // Với "favorites", chỉ cần độ dài mảng
    }
    return 0;
  };

  // Hàm cập nhật toàn bộ trạng thái
  const updateCounts = () => {
    setCartCount(getCountFromLocalStorage("cart"));
    setFavoriteCount(getCountFromLocalStorage("favorites"));
  };

  // Load thông tin customer và cập nhật trạng thái khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const customerToken = JSON.parse(localStorage.getItem("customer") || "{}");
      setCustomer(customerToken);
    }
    updateCounts();
  }, []);

  // Lắng nghe thay đổi trong localStorage để cập nhật số lượng
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cart" || event.key === "favorites") {
        updateCounts();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Danh sách liên hệ
  const contactList = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
      ),
      title: "(+84) 123 456 789",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
      title: "dualbooks@gmail.com",
    },
  ];

  const menuList = [
    { title: "trang chủ", link: "/customer" },
    { title: "sản phẩm", link: "/customer/products" },
    { title: "giới thiệu", link: "/customer/gioithieu" },
    { title: "liên hệ", link: "/customer/lienhe" },
  ];

  return (
    <div className="flex h-auto">
      {/* Logo */}
      <div className="relative w-[350px] mx-auto flex justify-center">
        <div className="absolute inset-0 bg-primary-400" />
        <div className="bg-white rounded-tr-[55px] z-10 flex justify-center w-full py-4">
          <Image src={logo} width={137} alt="DualBooks" />
        </div>
      </div>

      <div className="menu w-full">
        {/* Header thông tin liên hệ */}
        <div className="flex justify-evenly text-light-100 items-center h-[50px] bg-primary-400 w-full pr-[5rem]">
          <ul className="flex w-[60%]">
            {contactList.map((e) => (
              <li key={e.title} className="flex justify-between w-auto ml-[20px]">
                {e.icon} <p className="ml-2">{e.title}</p>
              </li>
            ))}
          </ul>

          {/* Support and Login */}
          <ul className="flex w-[30%] justify-between pr-4">
            <li>
              <Link
                href={`/`}
                className="flex justify-between w-auto capitalize hover:text-dark-600 transition-transform duration-300"
              >
                <p>Hỗ Trợ Trực Tuyến</p>
              </Link>
            </li>
            {customer ? (
              <NameToken customer={customer} />
            ) : (
              <li>
                <Link
                  href={`/customer/login`}
                  className="capitalize hover:text-dark-600"
                >
                  <p>Đăng nhập</p>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Header menu & icons */}
        <nav className="flex h-[80px] bg-white items-center w-full justify-evenly pr-[5rem]">
          <ul className="flex w-[60%] justify-start">
            {menuList.map((e) => (
              <li
                key={e.title}
                className="mx-6 h-[100%] hover:text-dark-400 hover:scale-110 transition-transform duration-300"
              >
                <Link href={e.link} className="capitalize text-lg">
                  <p>{e.title}</p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <ul className="flex w-[30%] justify-end items-center">
            {/* Cart Icon */}
            <li className="rounded-full border p-2 m-3 relative">
              <Link href="/customer/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </li>

            {/* Favorites Icon */}
            <li className="rounded-full border p-2 m-3 relative">
              <Link href="/customer/favorites">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </Link>
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
