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
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Để lưu lỗi nếu có
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await fetch("http://localhost:3200/admins");

        if (!resAll.ok) {
          throw new Error("Error fetching data");
        }

        const result: typeAdmin[] = await resAll.json();
        setAdmin(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // Hàm validate cho các trường
  const validatePassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (username: string) => {
    return username.length >= 3;
  };

  const addStaff = async (staffData: FormData) => {
    const username = staffData.get("username") as string;
    const email = staffData.get("email") as string;
    const password = staffData.get("password") as string;

    if (!validateUsername(username)) {
      setErrorMessage("Tên đăng nhập phải có ít nhất 3 ký tự");
      return { error: "Tên đăng nhập phải có ít nhất 3 ký tự" };
    }

    if (!validateEmail(email)) {
      setErrorMessage("Email không hợp lệ");
      return { error: "Email không hợp lệ" };
    }

    if (!validatePassword(password)) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự và bao gồm cả chữ và số");
      return { error: "Mật khẩu phải có ít nhất 6 ký tự và bao gồm cả chữ và số" };
    }

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
      setErrorMessage(null); // Reset lỗi khi đăng nhập thành công

      if (data.admin.role === "staff") {
        router.push("/staff");
      } else {
        router.push("/admin");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
      return { error: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/login_admin");
    setIsAuthenticated(false);
    console.log("Đã đăng xuất");
  };

  return { admin, addStaff, login, isAuthenticated, logout, errorMessage };
}
