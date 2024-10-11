import React, { useState } from "react";

interface typeCustomer {
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
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
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

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
          email: data.customer.email,
          name: data.customer.name,
      };
        localStorage.setItem("customer", JSON.stringify(customerInfo));

        setSuccessMessage("Đăng nhập thành công");
        setErrors({});
        console.log("Đăng nhập thành công:", data);
      
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  return { register, login, errors, successMessage };
}
