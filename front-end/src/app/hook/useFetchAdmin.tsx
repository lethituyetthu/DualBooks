import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface typeAdmin {
  id: string;
  username: string;
  email: string;
  user_img: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function useFetchAdmin() {
  const [admin, setAdmin] = useState<typeAdmin[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await fetch("http://localhost:3200/admins");

        if (!resAll.ok) {
          throw new Error("Error fetching data");
        }

        const result: typeAdmin[] = await resAll.json();
        /*      console.log("Fetched admin data:", result); // Kiểm tra dữ liệu */
        setAdmin(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const addStaff = async (staffData: FormData) => {
    try {
      const response = await fetch("http://localhost:3200/admins/register", {
        method: "POST",
        body: staffData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Máy chủ trả về phản hồi không phải JSON");
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const newStaff = await response.json();
      return newStaff;
    } catch (error) {
      return { error: error.message };
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3200/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi đăng nhập");
      }

      const data = await response.json();

      alert("đăng nhập thành công");

      localStorage.setItem("token", data.token);

      const adminInfo = {
        id: data.admin._id,
        email: data.admin.email,
        username: data.admin.username,
        role: data.admin.role,
      };
      localStorage.setItem("admin", JSON.stringify(adminInfo));

      setIsAuthenticated(true);

      if (data.admin.role === "Staff") {
        router.push("/staff");
      } else {
        router.push("/admin");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/login_admin")
    console.log("Đã đăng xuất");
  };

  

  return { admin, addStaff, login, isAuthenticated, logout};
}
