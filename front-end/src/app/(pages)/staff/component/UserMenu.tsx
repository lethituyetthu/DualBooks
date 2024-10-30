/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { FaHome, FaClipboardList, FaChartBar, FaUser, FaSignOutAlt } from "react-icons/fa";
import MenuItem from "./menuItem"; // Đảm bảo đường dẫn đúng

interface UserMenuProps {
  userName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Danh sách menu
  const menuList = [
    { href: "/staff", icon: <FaHome />, title: "Trang Chủ" },
    { href: "/orders", icon: <FaClipboardList />, title: "Đơn Hàng" },
    { href: "/statistics", icon: <FaChartBar />, title: "Thống Kê" },
    { href: "/profile", icon: <FaUser />, title: "Thông Tin" },
    { href: "/logout", icon: <FaSignOutAlt />, title: "Đăng Xuất", className: "text-red-500" },
  ];

  return (
    <div className="relative w-[13%]">
      {/* Avatar */}
      <div onClick={toggleMenu} className="flex items-center cursor-pointer justify-evenly w-[100%]">
        <img
          src="https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-white"
        />
        <div className="ml-3" style={{ color: "white" }}>
          <span className="block font-text-lg">{userName || "Guest"}</span>
          <span className="block text-sm">Staff</span>
        </div>
        <span className="fa text-white">&#xf13a;</span> {/* Dropdown Arrow */}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
          {menuList.map((item) => (
            <MenuItem key={item.href} href={item.href} icon={item.icon} label={item.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
