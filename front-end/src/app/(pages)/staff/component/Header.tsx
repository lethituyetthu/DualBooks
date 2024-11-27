"use client";
import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Image from "next/image";
import logo from "@/app/publics/img/logo/logo cua thu-06.png";

const Header: React.FC = () => {
  const [admin, setAdmin] = useState<{ username?: string } | null>(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const adminToken = JSON.parse(localStorage.getItem("admin") || "{}");
      setAdmin(adminToken);
    }
  }, []);
  return (
    <header className="bg-primary-400 p-4 flex justify-between items-center">
      {/* Logo and Navigation */}
      <div className="flex items-center">
        <Image src={logo} width={200} alt="logo" />
      </div>

      

      <UserMenu userName={admin?.username||"guest"}/>
    </header>
  );
};

export default Header;
