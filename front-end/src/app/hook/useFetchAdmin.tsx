import { useEffect, useState } from "react";

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

  const addStaff = async (staffData: FormData) => {
    try {
      const response = await fetch("http://localhost:3200/admins/register", {
        method: "POST",
        body: staffData, // Gửi dữ liệu FormData bao gồm thông tin và ảnh
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text(); // Đọc và log nội dung HTML
        throw new Error("Server returned non-JSON response");
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

  return { admin, addStaff };
}
