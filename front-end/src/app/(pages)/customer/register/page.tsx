"use client";

import Link from "next/link";
import React, { useState } from "react";
import InputField from "../../../../components/ui/input";
import useFetchCustomer from "../../../hook/useFetchCustomer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const RegisterPage = () => {
  const { register, errors } = useFetchCustomer();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
 const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();

    await register(formData)
 }

  return (
    <div className="flex justify-between p-8 max-w-4xl mx-auto">
      {/* Left Side - Register Form */}
      <div className="flex-1 p-8 flex flex-col items-center border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold mb-6 text-primary-600 font-itim">
          Đăng Ký
        </h2>
        <form className="flex flex-col w-full mb-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <InputField
            type="text"
            name="name"
            placeholder="Tên"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Email Field */}
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Phone Field */}
          <InputField
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          {/* Address Field */}
          <InputField
            type="text"
            name="address"
            placeholder="Địa chỉ nhận hàng"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
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

          <button className="p-3 bg-primary-400 text-white rounded-sm hover:bg-opacity-90">
            Đăng Ký Ngay
          </button>
        </form>
        
      </div>

      {/* Right Side - "HELLO" message */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center rounded-lg shadow-md text-center bg-primary-400">
        <h2 className="text-3xl font-itim font-bold mb-4 text-white">HELLO</h2>
        <p className="mb-6 text-white">
          Nếu bạn đã có tài khoản, hãy đăng nhập tại đây
        </p>
        <Link
          href={"/customer/login"}
          className="p-3 bg-light-100 text-dark-700 rounded-sm hover:bg-opacity-90"
        >
          Tham Gia Ngay
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
