"use client";

import Link from "next/link";
import React, { useState } from "react";
<<<<<<< HEAD
import InputField from "../../../../components/ui/input";
=======
import InputField from "../component/input";
>>>>>>> origin/nhathuy
import useFetchCustomer from "../../../hook/useFetchCustomer";

interface LoginFormData {
  email: string;
  password: string;
  
}


const LoginPage = () => {

  const {login, errors, successMessage} = useFetchCustomer()


  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData)
  };

  return (
    <div className="flex justify-between p-8 max-w-4xl mx-auto">
      {/* Left Side - Login Form */}
      <div className="flex-1 p-8 flex flex-col items-center border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold mb-6 text-primary-600 font-itim">Đăng Nhập</h2>
        {successMessage && <p>{successMessage}</p>}
        <form className="flex flex-col w-full mb-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password Field */}
          <InputField
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {/* Remember Me Checkbox */}
          {/* <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="rememberMe">Ghi nhớ tôi</label>
          </div> */}

          {/* Forgot Password */}
          <p className="mb-4 text-right text-primary-600 cursor-pointer hover:underline">
            Quên mật khẩu?
          </p>

          {/* Submit Button */}
          <button className="p-3 bg-primary-400 text-white rounded-sm hover:bg-opacity-90">
            Đăng Nhập
          </button>
        </form>
      </div>

      {/* Right Side - Join DUALS BOOKS */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center rounded-lg shadow-md text-center bg-primary-400">
        <h2 className="text-2xl font-bold mb-4 text-white font-itim">
          Tham Gia cùng DUALS BOOKS
        </h2>
        <p className="mb-6 text-white">
          Nếu bạn chưa có tài khoản, hãy đăng ký ngay.
        </p>
        <Link
          href="/customer/register"
          className="p-3 bg-light-100 text-dark-700 rounded-sm  hover:bg-opacity-90"
        >
          Đăng Ký Ngay Bây Giờ
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
