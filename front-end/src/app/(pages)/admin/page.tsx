"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./dasboard/dasboard";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const adminInfo = localStorage.getItem("admin");

    if (!adminInfo) {
      router.replace("/login_admin");
      return;
    }

    try {
      const admin = JSON.parse(adminInfo);
      if (admin.role !== "admin") {
        alert("Bạn không được phân quyền vào admin.");
        router.replace("/login_admin");
      }
    } catch (error) {
      console.error("Lỗi phân tích adminInfo:", error);
      router.replace("/login_admin");
    }
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
