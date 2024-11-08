"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const adminInfo = localStorage.getItem("admin");

    if (!adminInfo) {
      router.push("/login_admin"); 
    } else {
      const admin = JSON.parse(adminInfo);
      if (admin.role !== "admin") {
        alert("bạn không được phân quyền vào Admin")
        router.push("/login_admin"); 
      }
    }
  }, [router]);

  return <div>admin</div>;
}
