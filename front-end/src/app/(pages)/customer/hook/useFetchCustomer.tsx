import React, { useState, useCallback } from "react";

interface typeCustomer {
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

export default function useFetchCustomer() {
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateForm = (formData: typeCustomer, isLogin = false) => {
    const newErrors: Errors = {};

    if (!isLogin && !formData.name) {
      newErrors.name = "Tên không được để trống";
    }
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!isLogin && !formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    }
    if (!isLogin && !formData.address) {
      newErrors.address = "Địa chỉ không được để trống";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    return newErrors;
  };

  // Fetch customer info
  const fetchCustomer = useCallback(async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrors({ email: "Thiếu token. Vui lòng đăng nhập." });
      return;
    }
    try {
      const response = await fetch(`http://localhost:3200/customers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
      } else {
        const data = await response.json();
        return data; // Return customer data
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }, []);

  // Register
  const register = async (formData: typeCustomer) => {
    const validateErrors = validateForm(formData);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
      } else {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrors({});
        window.location.href = "/customer/login";
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  // Login
  const login = async (formData: typeCustomer) => {
    const validateErrors = validateForm(formData, true);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
      } else {
        const data = await response.json();

        localStorage.setItem("token", data.token);

        const customerInfo = {
          id: data.customer._id,
          email: data.customer.email,
          name: data.customer.name,
        };
        localStorage.setItem("customer", JSON.stringify(customerInfo));

        setSuccessMessage("Đăng nhập thành công");
        setErrors({});
        window.location.href = "/customer";
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    setSuccessMessage("Đăng xuất thành công");
    setErrors({});
    console.log("Đã đăng xuất");
  };

  // Edit customer info
  const edit = async (id: string, formData: typeCustomer) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrors({ email: "Thiếu token. Vui lòng đăng nhập." });
      return;
    }
    console.log(token, formData)
    const validateErrors = validateForm(formData);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3200/customers/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(formData) ///222
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
        return;
      }else{
        const data= await response.json();
        console.log("Cập nhật thông tin thành công");
        setSuccessMessage(data.message);
        setErrors({});
      }
     
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật thông tin khách hàng:", error);
      setErrors({ email: "Đã xảy ra lỗi không xác định." });
    }
  };

  return {
    fetchCustomer,
    edit,
    register,
    login,
    logout,
    errors,
    successMessage,
  };
}
