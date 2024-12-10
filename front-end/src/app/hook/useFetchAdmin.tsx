
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface typeAdmin {
  _id: string;
  username: string;
  email: string;
  user_img: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function useFetchAdmin() {
  const [admin, setAdmin] = useState<typeAdmin[]>([]);
  const [adminDetail, setAdminDetail] = useState<typeAdmin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await fetch("http://localhost:3200/admins");
        if (!resAll.ok) throw new Error("Error fetching data");

        const result: typeAdmin[] = await resAll.json();
        setAdmin(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // Add staff
  const addStaff = async (staffData: FormData) => {
    try {
      const response = await fetch("http://localhost:3200/admins/register", {
        method: "POST",
        body: staffData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3200/admins/loginAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Phân biệt lỗi từ API
        if (response.status === 401) {
          throw new Error("Sai email hoặc mật khẩu. Vui lòng thử lại.");
        } else if (response.status === 403) {
          throw new Error("Tài khoản chưa được xác minh email.");
        } else {
          throw new Error("Đã xảy ra lỗi trong quá trình đăng nhập.");
        }
      }
  
      const data = await response.json();
  
      // Lưu trữ token dưới HttpOnly cookies để tăng cường bảo mật
      document.cookie = `token=${data.token}; HttpOnly; Secure; SameSite=Strict; max-age=900`; // 15 phút
      document.cookie = `refreshToken=${data.refreshToken}; HttpOnly; Secure; SameSite=Strict; max-age=604800`; // 7 ngày
  
      // Lưu thông tin người dùng vào localStorage (Chỉ thông tin không nhạy cảm)
      localStorage.setItem(
        "admin",
        JSON.stringify({
          id: data.admin._id,
          email: data.admin.email,
          username: data.admin.username,
          role: data.admin.role,
        })
      );

      setIsAuthenticated(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.admin.role === "Staff" ? router.push("/staff") : router.push("/admin");
      
      return data;
    } catch (error: any) {
      // Phân biệt lỗi mạng hoặc lỗi từ máy chủ
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        console.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.");
      } else {
        console.error("Lỗi đăng nhập:", error.message);
      }
      return { error: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/login_admin");
  };

  // Delete admin
  const deleteAdmin = async (adminId: string) => {
    try {
      const response = await fetch(`http://localhost:3200/admins/delete/${adminId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting admin");
      
      setAdmin((prevAdmins) => prevAdmins.filter((admin) => admin._id !== adminId));
      return { success: true };
    } catch (error) {
      console.error("Error deleting admin:", error);
      return { error: error.message };
    }
  };

  // Update admin
  const updateAdmin = async (id: string, updatedData: FormData) => {
    try {
      const response = await fetch(`http://localhost:3200/admins/update/${id}`, {
        method: "PUT",
        body: updatedData,
      });

      if (!response.ok) throw new Error("Error updating admin");
      
      return await response.json();
    } catch (error) {
      console.error("Error updating admin:", error);
      return { error: error.message };
    }
  };

  // Fetch admin details by ID
  const fetchDetailAdmin = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3200/admins/${id}`);
      if (!response.ok) throw new Error("Error fetching admin details");

      const data = await response.json();
      setAdminDetail(data);
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  return {
    admin,
    adminDetail,
    isAuthenticated,
    addStaff,
    login,
    logout,
    deleteAdmin,
    updateAdmin,
    fetchDetailAdmin,
  };
}
