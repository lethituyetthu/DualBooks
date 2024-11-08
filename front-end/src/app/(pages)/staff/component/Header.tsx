"use client";
import React from "react";
import UserMenu from "./UserMenu";
import Image from "next/image";
import logo from "@/app/publics/img/logo/logo cua thu-06.png";

const Header: React.FC = () => {
  return (
    <header className="bg-primary-400 p-4 flex justify-between items-center">
      {/* Logo and Navigation */}
      <div className="flex items-center">
        <Image src={logo} width={200} alt="logo" />
        <h2 className="text-white text-2xl mx-4">Đơn Hàng</h2>
      </div>

      {/* Search and Icons */}
      <div className="flex items-center w-[25%] justify-between">
        <div className="w-[300px]">
          <input
            type="text"
            placeholder="Nhập số điện thoại khách hàng..."
            className="flex-grow px-4 py-2 rounded-lg bg-white shadow-sm w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <a className="text-white" href="/" aria-label="Thông báo">
            <i className="fas fa-bell" aria-hidden="true"></i>{" "}
            {/* Biểu tượng thông báo */}
          </a>
          <a className="text-white" href="/" aria-label="Cài đặt">
            <i className="fas fa-cog" aria-hidden="true"></i>{" "}
            {/* Biểu tượng cài đặt */}
          </a>
        </div>
      </div>

      {/* User Menu */}
      
        <UserMenu />
     
    </header>
  );
};

export default Header;
