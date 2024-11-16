"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const adminInfo = localStorage.getItem("admin");

    if (!adminInfo) {
      // Nếu không có thông tin admin, chuyển hướng đến trang login
      router.push("/login_admin");
      return;
    }

    try {
      const admin = JSON.parse(adminInfo);
      if (admin.role !== "admin") {
        // Nếu không phải quyền staff, thông báo và chuyển hướng
        alert("Bạn không được phân quyền vào admin.");
        router.push("/login_admin");
      }
    } catch (error) {
      console.error("Lỗi phân tích adminInfo:", error);
      router.push("/login_admin");
    }
  }, [router]);

  return <div>admin</div>;
}
