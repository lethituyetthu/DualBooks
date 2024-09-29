import React from "react";
import Image from "next/image";
import logo from "@/app/publics/img/logo/01.png";
export default function Header() {

  // số đt và email
  const list: any = [
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
 
  // hỗ trợ trực tuyến và đăng nhập
  const list2: any = [
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
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      ),
      title: "Hỗ Trợ Trực Tuyến",
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
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      title: "Đăng Nhập",
    },
  ];


  // menu
  const list3: any = [
    { title: "trang chủ" },
    { title: "sản phẩm" },
    { title: "giới thiệu" },
    { title: "liên hệ" },
  ];

  // icon giỏ hàng & yêu thích
  const listIcon: any = [
    {
      id: 1,
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
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      ),
    },
    {
      id: 2,
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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex ">
      <div className="relative w-[350px] mx-auto flex justify-center ">
        {/* Lớp nền nâu */}
        <div className="absolute inset-0 bg-primary-400 " />

        {/* Logo */}
        <div className="bg-white rounded-tr-[55px] z-10 flex justify-center w-full  py-4">
          <Image src={logo} width={137}  alt="DualBooks" />
        </div>
      </div>

      <div className="menu w-full h-[130px]">
      {/* header thông tin liên hệ */}

        <div className="flex justify-evenly text-light-100 items-center h-[50px] bg-primary-400 w-full pr-[5rem] ">
          <ul className="flex w-[60%]">
            {list.map((e) => {
              return (
                <li
                  key={e.title}
                  className="flex justify-between w-auto ml-[20px]"
                >
                  {e.icon && e.icon} <p className="ml-2">{e.title}</p>
                </li>
              );
            })}
          </ul>
          <ul className="flex w-[30%] justify-between pr-4">
            {list2.map((e) => {
              return (
                <li key={e.title}>
                  <a
                    href="#"
                    className="flex justify-between w-auto capitalize"
                  >
                    {e.icon && e.icon} <p className="ml-2">{e.title}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

      {/* header menu & giỏ hàng */}
        <nav className="flex h-[80px] bg-light-100 items-center w-full justify-evenly pr-[5rem]">
          <ul className="flex w-[60%] justify-start">
            {list3.map((e) => {
              return (
                <li key={e.title} className="mx-6 h-[100%]">
                  <a href="#" className="capitalize text-lg h-[100%]">
                    <p>{e.title}</p>
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className="flex w-[30%] justify-end">
            {listIcon.map((e) => {
              return (
                <li
                  key={e.id}
                  className="rounded-full border border-solid border-dark-800 p-2 m-3"
                >
                  <a href="#">{e.icon}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
